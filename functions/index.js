const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");

admin.initializeApp();

// 🔧 Shared SMTP / notify config (same as your previous event)
const cfg = functions.config();
const smtpHost   = cfg.notify?.smtp_host || "";
const smtpPort   = Number(cfg.notify?.smtp_port || 465);
const smtpSecure = (cfg.notify?.smtp_secure || "true") === "true"; // true for 465
const smtpUser   = cfg.notify?.smtp_user || "";
const smtpPass   = cfg.notify?.smtp_pass || "";
// You can point this to summon@inkboundsociety.com via functions:config
const toEmail    = cfg.notify?.to_email   || "";
const fromEmail  = cfg.notify?.from_email || smtpUser;

const transporter = nodemailer.createTransport({
  host: smtpHost,
  port: smtpPort,
  secure: smtpSecure, // 465 = SMTPS, 587 = STARTTLS (set secure=false)
  auth: { user: smtpUser, pass: smtpPass },
});

/* ---------------------------------------------------
 * 1) Existing TikTokathon email notifier (unchanged)
 * ---------------------------------------------------*/
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
        console.error("Email send failed (TikTokathon):", err);
      }
    }
    return null;
  });

/* ---------------------------------------------------
 * 2) NEW: Inkbound Santa booking email notifier
 * ---------------------------------------------------*/

// Optional helper to make the 24h slot a bit friendlier in the email
function describeSlot(value) {
  const map = {
    "16:00": "4:00 – 4:10 pm",
    "16:10": "4:10 – 4:20 pm",
    "16:20": "4:20 – 4:30 pm",
    "16:30": "4:30 – 4:40 pm",
    "16:40": "4:40 – 4:50 pm",
    "16:50": "4:50 – 5:00 pm",
    "17:00": "5:00 – 5:10 pm",
    "17:10": "5:10 – 5:20 pm",
    "17:20": "5:20 – 5:30 pm",
    "17:30": "5:30 – 5:40 pm",
    "17:40": "5:40 – 5:50 pm",
    "17:50": "5:50 – 6:00 pm",
    "18:00": "6:00 – 6:10 pm",
    "18:10": "6:10 – 6:20 pm",
    "18:20": "6:20 – 6:30 pm",
    "18:30": "6:30 – 6:40 pm",
    "18:40": "6:40 – 6:50 pm",
    "18:50": "6:50 – 7:00 pm",
  };

  if (!value) return "No slot preference given";
  return `${value} (${map[value] || "approximate"})`;
}

exports.onSantaBookingCreated = functions.firestore
  .document("inkbound_santa_bookings/{docId}")
  .onCreate(async (snap, context) => {
    const data = snap.data() || {};

    const {
      parentName,
      email,
      phone,
      children = [],
      preferredSlot,
      wantsPhoto,
      notes,
      totalChildren,
      totalCost,
      eventDate,
      status,
      createdAt,
    } = data;

    const slotDescription = describeSlot(preferredSlot);

    // 🔴 NEW: mark the chosen slot as taken in santa_slots
    if (preferredSlot) {
      try {
        await admin
          .firestore()
          .doc(`santa_slots/${preferredSlot}`)
          .set(
            {
              taken: true,
              lastBookingId: snap.id,
              lastParentName: parentName || null,
              updatedAt: admin.firestore.FieldValue.serverTimestamp(),
            },
            { merge: true }
          );
        console.log("Santa slot marked taken:", preferredSlot);
      } catch (err) {
        console.error("Failed to mark santa slot taken:", err);
      }
    }

    // Build children summary for plain text
    const childrenText =
      children.length > 0
        ? children
            .map((child, idx) => {
              return [
                `Child ${idx + 1}:`,
                `  Name: ${child.name || "-"}`,
                `  Age: ${child.age || "-"}`,
                `  Favourite things: ${child.favouriteThings || "-"}`,
                `  Christmas wish: ${child.christmasWish || "-"}`,
                `  Secret for Santa: ${child.secretForSanta || "-"}`,
              ].join("\n");
            })
            .join("\n\n")
        : "No child info recorded.";

    const subject = `Inkbound Santa booking — ${parentName || "New booking"}`;

    const text =
      `A new Inkbound Santa booking has been made.\n\n` +
      `Parent / Guardian:\n` +
      `  Name: ${parentName || "-"}\n` +
      `  Email: ${email || "-"}\n` +
      `  Phone: ${phone || "-"}\n\n` +
      `Booking details:\n` +
      `  Event date: ${eventDate || "2025-12-16"}\n` +
      `  Preferred slot: ${slotDescription}\n` +
      `  Wants photo: ${wantsPhoto ? "Yes" : "No"}\n` +
      `  Total children: ${totalChildren || 0}\n` +
      `  Total cost: €${totalCost || 0}\n` +
      `  Status: ${status || "pending"}\n` +
      `  Created at: ${
        createdAt ? (createdAt.toDate?.().toISOString?.() || createdAt) : "—"
      }\n\n` +
      `Notes:\n` +
      `${notes || "-"}\n\n` +
      `Children:\n` +
      `${childrenText}\n`;

    try {
      await transporter.sendMail({
        to: toEmail,
        from: fromEmail,
        subject,
        text,
      });
      console.log("Santa booking email sent for:", parentName);
    } catch (err) {
      console.error("Email send failed (Santa booking):", err);
    }

    return null;
  });
