const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");

admin.initializeApp();

const cfg = functions.config();
const smtpHost   = cfg.notify?.smtp_host || "";
const smtpPort   = Number(cfg.notify?.smtp_port || 465);
const smtpSecure = (cfg.notify?.smtp_secure || "true") === "true"; // true for 465
const smtpUser   = cfg.notify?.smtp_user || "";
const smtpPass   = cfg.notify?.smtp_pass || "";
const toEmail    = cfg.notify?.to_email   || "";
const fromEmail  = cfg.notify?.from_email || smtpUser;

const transporter = nodemailer.createTransport({
  host: smtpHost,
  port: smtpPort,
  secure: smtpSecure, // 465 = SMTPS, 587 = STARTTLS (set secure=false)
  auth: { user: smtpUser, pass: smtpPass },
});

exports.onSlotTaken = functions.firestore
  .document("tiktokathon_slots/{slotId}")
  .onUpdate(async (change, context) => {
    const before = change.before.data();
    const after = change.after.data();

    if (before?.taken === false && after?.taken === true) {
      const { index, labelIST, labelEST, labelCST, takenByName, bookTitle, email } = after;

      const subject = `TikTokathon booking — Slot #${index}`;
      const text =
        `A slot has been booked.\n\n` +
        `Slot: #${index}\n` +
        `IST: ${labelIST}${labelEST ? ` | EST: ${labelEST}` : ""}${labelCST ? ` | CST: ${labelCST}` : ""}\n` +
        `Name: ${takenByName}\n` +
        `Book: ${bookTitle}\n` +
        `Email: ${email || "—"}\n`;

      try {
        await transporter.sendMail({ to: toEmail, from: fromEmail, subject, text });
      } catch (err) {
        console.error("Email send failed:", err);
      }
    }
    return null;
  });
