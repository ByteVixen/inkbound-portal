import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

type FluffyStory = {
  id: string;
  title: string;
  author: string;
  excerpt: string;
  fullText: string;
};

const VOTING_END = new Date("2026-03-13T23:59:59");
const VOTE_STORAGE_KEY = "make-it-fluffy-vote-2026";

const stories: FluffyStory[] = [
  {
    id: "vegas-valentine",
    title: "My Vegas Valentine",
    author: "Terrah Faire",
    excerpt:
      "The arena is different after a game. It’s quiet, but the ice holds memory. There is one fan still in the seats, and I look at her through the glass.",
    fullText: `The arena is different after a game. It’s quiet, but the ice holds memory. While it might be fresh without tracks and scuffs in it, you can still feel the echo of the teams going at it. Every shot on goal is heard in the stands. The boards still hum where each of us was slammed up against it, and I can feel the vibrations in my blood. It’s Vegas. The city never sleeps, and neither does the rink. 
There is one fan still in the seats, and I look at her through the glass. 
“So how was your night at the Boy Aquarium?” I ask playfully. 
The laugh I get is a perfect melody, not unlike the woman it comes out of. “It was fun. Up until the punching, I had a great time.”
I shrug it off. The punching is part of it, and I don’t fight often but when I do I give it my all. A couple of minutes in a penalty box is worth the message it sends to the other team. The crowd loves it. 
“I figured a girl that trashed and Air B&B and crashed a rental car out of spite wouldn’t mind a little punching.” 
“I didn’t care about the Air B&B and the rental car. That’s the difference.”
She didn’t care about those things… but she does care about me. That’s what the silence between the breaths she took to say those words is screaming. 
“Are you coming down?” I ask. I ditched my gear after the game, but when no one was watching I put my skates back on to come out here. No one thinks much of it anyway. Sometimes I’ll sit on the bench after the last buzzer and just think. We all have pre and post-game rituals, and sometimes that is mine. 
“I don’t have skates.”
Lifting the pair I got for her by the laces that are tied together, I stand steadfast and comfortable on the ice balanced perfectly on my blades. It’s as natural as walking or breathing at this point in my life. I’ve been on the ice since I was three years old, and for the first time in a long time my heart is pounding over it. 
“You just… have skates in my size?” 
“Been sitting on the bench the whole game.” 
She smiles as she gets up, and I watch her come down and over the barrier gate to our tunnel. The doors to the ice are wide open, left that way after a game for equipment and machinery to come and go with ease. I paid our guys to leave the lights up. My phone is in the pocket of my sweats for music later. Tonight, I’m about to make a shot on goal that if I miss… it means I’m losing the biggest game of my life. 
I meet her at our bench, and she starts to take off her shoes. “You’re dangerous,” she says, voice dipping into my gut and squeezing my nerves enough to make my tremble with anticipation. 
“So I’ve been told,” I say to distract from the fluttering feeling I’m getting. It’s been two weeks. Two weeks of smiling at my phone when I see her name pop up. Of feeling warm and fuzzy after I changed her text alert to a custom chime. Of taking her out on the town to places only locals know about and where my name on the back of a jersey gets me things other people can’t. 
If this goes well, she is going to be wearing my name on her back. I’ve got an extra jersey hanging in my locker – clean, because I wouldn’t subject a woman to such cruelty. 
I help lace her up and she wobbles like a filly taking her first steps toward the ice. 
“Don’t let me die.” 
The smile on my face and the laugh that answers her are both genuine. The peace this girl brings to my life is unlike anything I have ever dreamed. She is incredible. Yes, its only been two weeks but there are some pieces of your life that just fit too well. We were pulled together like magnets that were edged just close enough to recognize a kindred spirit in one another. Finding her sobbing on the sidewalk, makeup running, clothes a mess, with a smoking engine as a backdrop is about the last thing I would call a Hollywood style meet-cute, but it led us here. 
She’s so sweet, and genuine. Everything she’s said to me, the way she treats me…. It’s not because I’m a pro-athlete, because I can get her things or into places that she could never dream of. It’s because she cares – because she wants to be kind. How someone would blow up his whole life, miss his shot to marry this girl by cheating on her with a stripper during his bachelor party I will never understand. 
When she told me how she caught him, the reason she was even in that strip club… I’m man, ok? I imagined her doing exactly what she had planned to do for him while she was there and…. If a girl ever put that much thought into a surprise for me? I would be on my knees in an instant. 
I come back to the present when her brand-new skates meet the ice. I had our equipment guys make sure they were sharp and ready. Reaching out for her, I feel my heart and my nerves go still. The arena lights glow off her amber-brown hair, the team color streaks in it like a roadmap to the transformation she has gone through since finding her cheating ex-fiancé. 
“Just hold onto me if you feel like you’re going to fall,” I coach her. She’s surprisingly steady on her skates, which I suppose shouldn’t surprise me. I bet you could throw this girl into anything, and she would kick ass at it. I glide us back to center ice, where the light it better and I can see her more clearly. 
She lets go of my hand and the absence of her skin on mine makes my heart twist. I ache for this girl – long for her. I want to be with her, orbiting her presence because she brings peace to my chaos and quiets the roaring in my head when I’m trapped in there. When I’m with her… I can breathe. 
That was the moment it hit me. The thing I couldn’t place about her and how I feel around her. When I’m with her, I feel the way I do on the ice. In control. Like I belong. 
“Are you ok?” she murmurs, brushing the line of stitches above my eye gently. 
It stings, but I’m used to it after all these years. “Better now.” My voice is softer than I’ve ever heard it before, and the tone is rich. “I want to tell you something.” 
Those gorgeous brown eyes look up at me expectantly, and I can see the fear of rejection in them. She tries to let go of me to shell back up, but I don’t let her. I hold onto her waist and pull her in so she can’t run. I’ve watched her become bold in my shadow until she became the light casting it. Seeing her trying to shrink and dim herself now nearly breaks my heart, but I keep going. 
“I treat life the way I treat the game. Practice. Repetition. Drills and structure until everything becomes muscle memory. Showing up every day, even when I don’t want to.” 
“That sounds about right.” Her jaw is tight, lips barely moving when she speaks. I can feel the tremble in her hands in mine as I hold her there. Her voice is meek, nearly a whisper because she’s trying to fade before my very eyes. 
“You are a game I wasn’t ready for. Like I skipped the whole season and now I’m in the playoffs.” 
“I was supposed to be getting married tomorrow,” she says, voice breaking like glass. I can hear the pieces of her heart that she had taped back together hitting the ice. “I thought I had my chance, and I lost it.”
“You don’t lose love, but sometimes you miss the goal when you take the shot. Just like on the ice, sometimes another player gets control of the puck and makes another pass at it.” 
Her eyes are glistening and I hate that her douchebag ex is even part of this conversation, but I come to the realization that I have to thank him. If he hadn’t royally messed up, I wouldn’t be here now with her. 
“I thought he was the one.”
“He wasn’t right for you,” I say, taking a deep breath and swallowing hard. It’s now or never, and so I shoot my shot. “But I am.” 
Her eyes get wide and round, those soft pink lips falling open, chest going still as she holds her breath. 
“I’m falling in love with you.” The declaration is as soft as a summer breeze, as quiet as snowfall in winter, but the impact is a meteor hitting the Earth’s crust and cracking both of us open forcing vulnerability. 
Scanning my eyes, I watch her take inventory of everything about me, down to the way I’m standing with her in my arms making sure she won’t fall. “You’re serious.”
“Wouldn’t say it if I wasn’t,” I assure her. I know she’s going to need a lot of reassurance. She burned a bridge and pissed on the ashes when she trashed everything that had his name on it. Rebuilding that bridge to connect with another soul with as much trust as she used to have is going to require work, effort, but…. “I promise to keep showing up. I don’t quit. I will fight for you the way no one ever has before, even when I have blood running into one eye and I can’t see.” 
She barks out a pained laugh, looking at the line of stitches on my brow again. 
“I am falling in love with you because of who you are, not because of what was done to you.” 
Her lips quiver and she looks up at me. “Are you going to kiss me or do I have to kiss you?” 
When my lips meet hers it feels different this time. It’s not the hot and heavy of the two of us crashing together and tangling our lives until we can’t tell which way is up.  It feels steady. Controlled and deliberate. Instead of taking me by storm, it quiets the noise and gives me clarity. I am falling in love with this girl and this proves that I’m not making a mistake. Vegas can be messy. People do stupid things here a million times a day. 
She isn’t messy. She isn’t a mistake. Meeting her might have been an accident but keeping her isn’t. 
The old saying is “what happens in Vegas, stays in Vegas.” Well. We happened here, and so I have to find a way for her to stay here. Like my life depends on it. You miss one hundred percent of the shots you don’t take, both on the ice and in life. I refuse to miss this one. This girl is mine, and I’m going to make this happen. I will make it so she can stay.`,
  },
  {
    id: "best-valentine-ever",
    title: "Best Valentine Ever",
    author: "Tullie Summers",
    excerpt:
      "The knock at the door has me grinning. It’s Valentine’s and I have spent the last four hours plucking and primping for this date.",
    fullText: `The knock at the door has me grinning. It’s Valentine’s and I have spent the last four hours plucking and primping for this date. I swing it open leaning slightly in an attempt to be seductive but I quickly stand straight, leaning forward into the hall. 
I look left.
I look right. 
I glance down.
I jolt backwards. 
What can only be described as a ball of animated black fluff is calmly sitting there with a bow tied around its neck, a hot pink note attached. I can’t help the chuckle, surely Mike is hiding nearby waiting for my reaction. I bend down and pick the puppy up, angling it so I can read the note. 
'Funny story, my ex messaged me. 
But I didn’t want you to be alone, so…
Happy Valentine’s Day?
Love Mike'
My jaw hangs open as I stand there in my little black dress and heels that give me legs for miles. I blink, absolutely stunned. I want to be mad but truly I should’ve seen this coming. Mike and Carly have a small town romance that never seems to reach that happily ever after. Or any ending at all. I swear it has more episodes than Grey's Anatomy. I huff, turning and shutting the door with my heel a little too sharply. 
“Guess it’s just you and me, buddy…are you a buddy?” I scrunch up my face and hold the dog aloft. Confirmation comes as a stream of urine drenching the front of my dress. “Alright then.” I grumble and set him on the ground. 
“This is ridiculous.” I gripe as I step out of my heels. “I don’t have anything for a damn dog. Let alone one with no manners or house training.” I glare at the innocent, adorable dog as I unzip my dress and let it fall to the floor with my dignity. He cocks his head to the side momentarily and then runs off to cause chaos elsewhere. I roll my eyes.
I stomp back to the shower and dial my bestie while I wait for the water to warm up. It rings and rings and rings. She doesn’t answer and I lean my head on the counter with my eyes closed. This is the third year in a row I’ve spent Valentine’s day alone. The sound of something being dragged poorly has me glancing through the open door to see the little twerp tugging my heel towards the bed room. Okay, not completely alone this year. I actually laugh this time. I tap my fingers on the counter for a minute before I press my other best friend’s contact and step into the shower.  
It rings once.
“Hey, you.” His familiar pitch comes through my shitty phone speaker as I start to scrub the pee, body glitter and hopes from my skin. 
“Connor! You will not believe what Mike did!” I holler over the sound of the shower running. 
“Let me guess, ditched you for Carly?” He deadpans and I glare at the phone even though I know he can’t see me. “Like I said he would two weeks ago.” He doubles down. 
“He gave me a damn dog!” I announce, more annoyed that Connor was right than at actually being stood up. 
“What?” He laughs, a bellowing noise that makes it impossible to not smile. 
“I’m so serious! He put a note on the dog and just left it on my door step. Like who the hell does that?” I squirt more soap onto my loofa and scrub again. “I don’t even have anything for a dog.”
“Well, my date’s here, Char. Good luck with your new dog I guess.” He laughs.
“Wait, Connor!” I hear the line close and half groan half scream in irritation. Well, those were the only two people I’d call to hide a body or adjust to a dog unexpectedly. I twist the shower off, stepping out —and immediately slip on cold tile. My ass hits the ground with a thud as I spy that damn dog dragging my fuzzy pink bath mat into the living room. I don’t even have the strength to curse.
I snatch my towel off the rack as I stand while trying to find my patience. I love dogs, I am going to make this work one way or another. I make quick work of drying and wander into my closet to put on my favorite pink sweat set. That adorable little bastard has already rummaged in my sock basket and I roll my eyes again. 
“Okay, we need toys obviously!” I call to him. “And you need a name, mister.” I prop my hands on my hips as I spy him standing down my hallway. While making my way to the couch, I pick him up and stare into his eyes intently. “Scooter...no. Henry? No. I could call you Valentine.” His tail wags and I smirk. “Valentine it is.” 
I sit on the couch and release him to cause more curious mayhem on my poor apartment while I scroll my phone. Delivery is the biggest perk of living in the city. Filling a cart full of dog supplies and not checking the total before charging it to Mike’s credit card, saved from ordering us dinner a few nights ago,  I smile. Since he is the one who dropped this multi-year responsibility on me, he should at least cover the start up costs, right?
While I’m at it, I order dinner. 
“We need dinner for two, Valentine.” I smile as I stare at him chewing on my other heel under the coffee table. He yips and growls, tossing his head around to entice me to come play. “I hope you like steak and lobster.” I confirm the order and toss my phone on the couch. 
Reaching a hand towards Valentine he bounces around excitedly and I laugh at the squeaky noises he makes. I tap my fingers playfully on the ground and he charges to attack me. I scoop him up and nuzzle his tiny growling form. He is genuinely a warm loaf of fluff. He licks my nose and I scrunch up my face with a smile as I set him down. 
“Best Valentine ever.” I murmur, watching him run.`,
  },
  {
    id: "hell-of-a-pair",
    title: "Hell Of A Pair",
    author: "Rob T.",
    excerpt:
      "Gene first noticed the thing in the corner of his room four weeks before it medically diagnosed him.",
    fullText: `Gene first noticed the thing in the corner of his room four weeks before it medically diagnosed him.

Gene, a thirty-seven years old, mid-level insurance adjuster, who had been divorced for two years, had been sleeping like a man hunted by his own thoughts. His life had become nothing but emails, spreadsheets, reheated dinners, and late nights scrolling through news he didn’t want to read. His life felt like a rerun, played again and again. A sick syndication. Seeing things felt inevitable, hell he even kind of expected it. 

Gene had always slept badly. He spent more and more of his nights lying awake and staring at the ceiling until his eyes hurt. He would close them tight and watch the colors shift, and little light specs float through his eye fluid. On occasion he would hear his own spinal fluid. Turns out it’s normal. He googled it. Because of his lack of sleep and his- be kind, rewind- life, the insomnia was easy to brush off.

Things really fell apart the night the shadow started showing up. At first, it was just a shape in the corner. A darker space where dark had absolutely no business being. Something that didn’t belong in the room. Not a cast shadow from the odd coat or hat, not pareidolia, or some random insect. He choked it up to exhaustion…  Then the paralysis began.

He would wake, eyes open, lungs working overtime, his heart thumping and his brain screaming. Nothing else responded. Not a finger. Not a toe. Not even his fucking tongue. He lay trapped inside himself, a prisoner in his own mind watching that damned shadow stretch taller, then wider, until it peeled itself off the corner like smoke made solid.

Each night the strange shadow came closer. One step nearer to the bed. Each night he lay there unable to move. Tears sometimes tracing his cheeks. Every night it took a step closer… Then another. Gene tried everything. Sleep podcasts. White noise. Prayer, even though he wasn’t the praying type. Nothing fucking stopped it, and every morning he woke exhausted, convinced something was waiting for him to fall asleep again.

After three weeks, the thing reached the foot of the bed. Gene sobbed when it happened. Not proud of it, but there it was. Tears rolled sideways into his ears and pooled, making every sound uncomfortable and unearthly, hell pick an UN. All of this happening while the thing stood there, head cocked as if it was studying him. Working out just the right strings to pull to give Gene a heart attack, or break his mind.

The next night, the damned thing climbed onto the bed, settling onto the mattress. Gene felt the weight. Felt the dip beside his legs. He still couldn’t move. Couldn’t scream. Terror chewed through his chest while the creature slowly, oh so fucking slowly, crawled closer, Up close, it was… enormous. Muscles like carved smoke wrapped around something solid. Massive horns curled from its skull. Its red, burning coal, eyes cast faint light across the sheets.

Then it laughed. A dry, delighted sound, like autumn leaves burning. Gene woke, shit, showered and shaved. Went through his day like it was a dream and before he knew it… Night fell. He thought of trying to sleep on the couch again, but it hadnt worked last time and it had fucked up his back. So, he crawled into bed. That night… things escalated. The paralysis hit as usual. The room cooled. The shadow peeled itself free and approached with unmistakable enthusiasm. This time, instead of looming, when it got to him, it reached out with its long, branchlike arm and it grabbed him. Gene tried to scream, but the fucking thing flipped him onto his stomach with the most casual ease. Like it was turning a page in a book.

Inside his skull, Gene panicked. "Oh God, oh no, what is happening." The demon cackled and announced, in a voice like gravel poured into a tin bucket, “Tonight, Gene…we get creative.” Something cold pressed against him. He could feel probing fingers pulling his boxers down and the creature's fingers roughly searching and probing into areas that only his doctor should go... Gene screamed silently, convinced he was about to die in the weirdest possible way. 

Then—

The laughter suddenly stopped. Silence filled the room. Gene felt the creature freeze. “…Huh,” the demon muttered. The paralysis loosened just enough for Gene to rasp, “WHAT?” “Hang on,” said the demon. Its fingers continued to explore, “Hang on a second.” “What the fuck do you MEAN hang on?!” With his long cold finger still literally INSIDE Gene, the demon shifted awkwardly. “I… uh…” Gene felt it remove the finger and lean away, confusion radiating off it. The demon… not the finger. 

“Gene,” the creature said, suddenly sounding less demonic and a little more like an old guy about to deliver bad news at work, “I don’t really know how to say this.” “Say WHAT, for fucks sake.” “Look, give me a break, okay, I’ve never had to do this... it's not part of the job.” “What fucking Job entails you shoving a finger up my ass?” “Oh, you know, the whole paralysis Demon routine. Fear harvesting. The standard menace package. We get a lot of creative freedom, actually.”

Gene blinked. “You’re… a fucking professional?” “Oh yeah. We have a union and everything.” “YOU HAVE A UNION?” “Of course we do, all 7 hells have — damn it Focus, Gene.” A pause. Then, gently: “I think you should see a doctor.” Silence. Gene blinked again. “What?” 

“Something felt… off. Not the scared kind of off, more like… Bad off. I’m pretty sure something’s wrong with your prostate.” Gene stared at the wall, brain derailing. “You’re telling me,” Gene whispered, “a sleep paralysis demon just gave me a medical diagnosis?”

“Hey,” the demon said defensively, “I’m not saying I’m a Doctor, alright, just saying it doesn't feel right, and trust me, this isn’t fucking typical for me either, okay pal.” Gene swallowed. “Are you… serious?” “Your health is always serious, Gene.” The paralysis suddenly faded. The demon stepped back, oddly sheepish. “Anyways,” it muttered, “sorry about the whole terror thing. It's part of the gig, it’s nothing personal. So… yeah, uh, bye.” And just like that, it vanished. Gene didn’t sleep again that night.

Two weeks later, two weeks of beautiful, paralysis free sleep, Gene sat in a doctor’s office, numb. Prostate cancer. Fucking Prostate Cancer! It had been caught early, and apparently it is highly treatable. The doctor kept talking, after saying the words, but Gene’s brain replayed one sentence: "I think you should see a doctor." over, and over. Gene went home in what he would always describe as a fog. 

That night, the demon returned. It didn’t bother with theatrics this time. Just appeared at the end of the bed, arms crossed. “Well?” it asked, in the tone of an angry Italian Nonna. Gene sat upright. No paralysis. “You… you were right,” he said quietly. The demon shifted. “Oh. Good. I mean—good that you caught it, not good that you are sick.” 

“You saved my life.” said Gene in a barely there voice. The creature shrugged. “Part of the service.” "Is It, though?" Gene asked. "No," the demon snickered. "Not really." “What’s your name?” Gene asked. There was a long pause, and it looked like the creature was rolling around his options in his mind. “Marabas.” He said, finally. “That’s… that’s surprisingly normal.” “Demonic registry requires names that have Proto-Indo-European roots when dealing with humans.” “Of course it does.” Gene said with a smirk. They stared at each other awkwardly.

“So,” Gene said, “what happens now?” Marabas scratched his chin. “Honestly? Usually I move on, but paperwork gets messy if I accidentally save a client.” “Client?” Gene asked. “Yeah, uh… You.” Gene laughed, hysterical and tired. “Well,” he said, “I guess you’re stuck with me.”
Marabas gave an awkward smile. They chatted the rest of the night, and many nights after that.

Surgery came and went in a blur. Hospitals were lonely places at night. Machines beeped. Hallways hummed, and everyone was in a hurry. Sleep finally came for Gene, though it came shallow and nervous. The first night after surgery, Gene woke to find Marabas sitting in a visitor’s chair, flipping through a highlighter magazine. It was upside down.

“You are really terrible at reading,” Gene croaked. Marabas jumped. “You’re alive.” “Yeah.” Gene said. “Good, that’s good.” “You were worried?” Asked Gene. “Don’t make it fucking weird, Gene." Gene laughed despite the pain it caused. The demo—- Marabas stayed. Every damned night, while Gene drifted in and out of medicated sleep, Marabas always lurked nearby. Sometimes pacing. Sometimes watching hospital television with disgust.

“Humans watch the strangest things,” he complained during a cooking show marathon.
“You literally scare people for a living.” “Yeah, but I have standards, who in the hell pairs American Cheese with Salmon, or worse puts pineapple on pizza. People say I'm a monster.”

Recovery was slow, but overtime Gene healed, and began to feel alive again. All the while Marabas never left. At first, Gene assumed the demon would eventually move on, but weeks passed, then months passed and Marabas kept showing up nearly every single night, sitting at the foot of the bed and chatting, or raiding Gene’s fridge at 3 a.m.

“You, uh, eat?” Gene asked one night. “Of course I eat, Christ, I'm not dead, Gene. Besides this is more like stress snacking,” Marabas replied, chomping chips loudly. Eventually, curiosity got the better of Gene.“So,” he asked, “what exactly do you do?” Marabas stretched and blew air from his lips making a light fup noise. “How does one distill one's craft into just a few words?.... Lets see, I specialize in night terrors, Sleep paralysis, existential dread. Classic demonic services shit.”

“And, do you like it?” Gene asked. “Eh, It’s a job.” Marabas said. Gene hesitated. “You were supposed to terrorize me and instead you saved me.” Marabas looked uncomfortable. “Yeah, well.” he said, crumpling the bag of chips. “Don’t expect that to become a habit.” But something between them had clearly shifted. The fear was gone, and Gene doubted it would ever return. In its place sat something strange and warm. Holy shit, was it... Friendship.

2 months later was the first time Gene went on a job with Marabas, it was totally, 100% positively an accident. Just so we’re clear. Gene woke at 2 a.m. to find his bedroom gone. In its place stood a different room, unfamiliar, dimly lit. To his left, a terrified college student lay frozen in bed. Marabas stood beside Gene, cracking his knuckles.

“Oh crap,” the demon muttered. “You weren’t supposed to come.” “How did I get here, then, and where are we?” “I don’t know and clearly I’m at work, Gene.” "Oh, dang... should I… go?." "Nah, it's cool, hang back, man. I just gotta get this done real quick, and we can head back to your place and watch more ‘F-Troop’."  Marabas stalked forward, looming over the student. Gene watched, suddenly sympathetic.

“Hey,” he whispered, “maybe don’t go full nightmare?” Marabas paused. “You’re asking me to half-ass it?” “No, No... I would never. By all means whole-ass it, just maybe...ease into it.” The demon rolled his eyes and mimed a Jerking-Off motion. “Ugh, Fine.” 

The night terror that followed was… surprisingly mild. Some whispers. A shadowy figure. Enough to spook for sure, but not enough to traumatize. Gene was Proud of Marabas. Later, back in Gene’s room, Marabas frowned. “You’re going to ruin my reputation.” “You’re welcome.” Gene said. 

Months continued to pass. Gene got healthier by the day. Stronger. Follow-up appointments came back clean. Life settled into something almost... normal. Except for the fact that his best friend was a god damned demon. Literally, a fucking Demon. They watched movies together. Argued about music. Debated whether pineapple belonged on pizza. They agreed that it doesn't. 

“Hey, Mar?” Gene asked. “What’s up?” “So... why did you actually stick around?” Marabas hesitated. “I needed to make sure you got healthy enough for me to go back to torturing you again.” He said it as seriously as he could, but Gene could tell by the flicker in his eyes that he wasn't telling the truth. Gene stared at him, then Mar said, “Most humans only see me at my worst. Fear, panic, helplessness, you know all that demon shit. You… talked to me.” Gene shrugged. “Yeah, after you told me to see a doctor.” “Fuck it, it still counts.” They sat in comfortable silence.

Finally, Marabas stood. “Well, good hang and all, but I got work.” Gene laid back down. “Try not to traumatize anyone too badly.” “No promises, I'm a scary son of a bitch.” Mar said. "Enough with the negative self talk." Said Gene. Mar looked confused, before responding. "What?” He thought for a second then his eyes lit up in recognition. “Oh, no my mother is actually a hell hound, so it's not a negative thing, it's just factual." 

The demon paused at the door. “Hey, Gene?” “Yeah?” said Gene. Mar smirked. “Try not to fucking die, okay? The paperwork is a nightmare.” Then, unlike every other time, he simply walked out of the door. Gene smiled and went back to sleep, And for the first time in years, the darkness didn’t feel empty. It felt like company.

Gene kept tagging along on Marabas's jobs, and he noticed something. Fear worked. But it didn’t always have to destroy. One night they visited a warehouse worker drinking himself into exhaustion. Marabas manifested behind him at 3 a.m., towering over the bed. Gene whispered, “Make him rethink the overtime.” Mar nodded and leaned in close, whispering dread into the man’s dreams. Two weeks later, the man quit and started therapy.

Another job: a woman ignoring chest pains. Marabas haunted her nights until she went to the ER. Heart issue caught early. Gene started helping aim the fear. Marabas grumbled constantly but he kept going, and the results improved. One job truly affected them.

They appeared in a small apartment. A teenager lay frozen in bed, eyes wet with fear. Bruises marked her arms. Voices argued in another room. Gene swallowed. “Hey, Mar…” The demon saw it. 
“Don’t scare her,” Gene whispered. “Gene... That’s my fucking job.” “I know man, I know it is... but not tonight, not this one." Mar hesitated. Then knelt beside the girl. His voice softened. “Run.” The girl left home two days later. Authorities got involved.

A week later Gene got a clean bill of health. Total Remission. He could not wait to share the news with Mar. That night Mar arrived and was unusually quiet. “I was offered a promotion at work,” he said. Gene smiled weakly. “That’s good.” "Apparently the terrors you helped on inspired true fear."  Marabas said. "That's good, right?" Gene responded. "Whats the new gig?" “Different dimension. New assignment... I can go even crazier with the scares." said Mar, then silence stretched.

“Well,” Gene said, forcing calm, “congratulations.” Mar studied him. Then shrugged. “I declined it.” Gene blinked. “What, why?” Mar scratched one horn. “Someone’s gotta keep you alive.” Gene laughed. They sat quietly. Then Mar stood. “Well, I've got work, so...” Gene grabbed his coat. “Who’s the mark tonight?” “Guy who thinks he has every disease he sees on T.V. every fucking one of them, well all but the very real issues with his pancreas.” Mar said. “Let’s go.” said Gene.

The room dissolved. Another bedroom formed. Another terrified sleeper lay frozen. Marabas’ red eyes burned. Gene crossed his arms. “Let’s save another one.” The demon grinned. And the next morning, somewhere, someone woke terrified — but alive.

Gene slept peacefully now. No more Terrors, no more fear of living or replaying the mistakes of his past like bad T.V. Land episodes. Now he looked forward to life, to friendship and to helping others. Because of Marabas, his once sleep paralysis demon, Gene loved life for the adventure it was… because sometimes, the monster under your bed is not there to drag you into the darkness... Sometimes he’s there to show you the light and give you a reason to wake up tomorrow.`,
  },
  {
    id: "under-the-fig-tree",
    title: "Under the Fig Tree",
    author: "S. Heredia",
    excerpt:
      "Zahara de los Atunes had a way of waking slowly, like it didn’t trust the sun at first.",
    fullText: `Zahara de los Atunes had a way of waking slowly, like it didn’t trust the sun at first. The light crept over the whitewashed walls in soft gold, slid across tiled roofs, and finally stretched down to the shore where the sea was already breathing against the sand.
Decon stood barefoot at the waterline, trousers rolled to his calves, casting his net into the shallows with practiced ease. He’d done this since he was a boy. The rhythm of it lived in his bones, throw, pull, shift, and breathe. Normally the repetition cleared his mind.
Today it didn’t.
He felt her before he saw her.
That awareness came over him the way the tide slid in, steady, and undeniable. He didn’t turn right away. He didn’t have to. He knew the way she moved across sand. Knew the cadence of her steps. Knew the weight of her attention when it landed on him.
“You missed,” Loli called out.
He pulled the net in without looking back. Fish flashed silver against the morning light.
“I didn’t miss,” he said calmly.
She was closer now. He could hear the smile in her voice. “The left side sagged. Very sloppy.”
He finally turned.
She stood at the edge of the surf, skirts gathered loosely in one hand, dark curls flying wild in the wind. She must’ve run down from the cottage because her cheeks were flushed and she was trying very hard to look composed.
“Sloppy,” he repeated flatly.
She bent slightly to inspect the catch. “I suppose I’ve seen worse.”
“You haven’t.”
She grinned. “That confidence is exactly why I’m marrying you.”
He stepped out of the water and crossed the distance between them in a few long strides. The sea dripped from his skin, cool against the warming air.
“You’re marrying me because I’m the only man in this village who doesn’t faint when you argue.”
“That’s not true,” she said lightly. “Mateo doesn’t faint.”
“Mateo sweats through his shirt and calls you ‘ma’am.’”
Her laugh broke bright and unrestrained, and it hit him somewhere deep and unguarded.
He reached for her waist without thinking. She fit there automatically, as if she’d always belonged in the curve of his arm.
“You’re up early,” he said.
“I couldn’t sleep.”
He studied her face more closely. “Why.”
She looked at him like the answer should’ve been obvious. “We’re getting married in a month.”
“Yes.”
“That’s it?” she demanded. “Yes?”
He shrugged. “It’s still happening in a month whether you panic about it or not.”
“I’m not panicking.”
“You’re vibrating.”
She shoved his shoulder. “I am not.”
“You are.”
She stepped closer, pressing her body lightly against his damp chest. “Maybe I just wanted to see you before the whole village starts asking me questions.”
“What questions?”
“What color the ribbons are. Whether we’ll have musicians. If I’m wearing my hair up or down. If you’re going to cry.”
“I’m not going to cry.”
“You cried when my grandmother hugged you last week.”
“That was different.”
Her eyes sparkled. “Was it?”
He lowered his forehead to hers, breath mingling.
“You’re not getting cold feet, are you?”
The teasing drained from her expression instantly.
“Cold feet?” she whispered. “Decon, I’d walk across broken shells barefoot if it meant I got to marry you.”
The words struck him.
She traced the faint scar near his eyebrow, her touch gentle. “Are you nervous?”
He hesitated just long enough for her to notice.
“Only about doing it right,” he admitted.
“Doing what right?”
“Being the man you deserve.”
Her expression softened into something fierce and tender all at once. She framed his face with both hands.
“I’m not marrying some grand idea,” she said. “I’m marrying you. The man who fixes roofs without being asked. The man who gives away half his catch when he knows someone needs it. The man who pretends he isn’t soft but absolutely is.”
“I’m not soft.”
“You carried a baby goat three miles because it looked at you sadly.”
“It was injured.”
“You named it.”
“It needed a name.”
She laughed again, and he gave up pretending he wasn’t smiling.
“I love you,” she said simply.
“I know,” he answered.
Her mouth fell open in exaggerated offense.
“That’s your response?”
He leaned close to her ear. “I love you too.”
That was all it took. She melted against him, satisfied.
They walked the shoreline together after that, the village slowly waking behind them. The tide pools shimmered between rocks, and she crouched to trail her fingers through the water. He steadied her at the waist without thinking.
“You’re going to fall,” he warned.
“I won’t.”
“You will.”
She glanced back at him, eyes shining. “Do you ever think about it?”
“About what.”
“Our life.”
He didn’t joke this time. “Every day.”
“What do you see?”
He brushed sand from her knee absentmindedly. “I see this. The sea. The cottage. You, yelling at me for leaving my boots by the door.”
“I will absolutely yell about that.”
“I know.” He paused. “I see kids running around that fig tree.”
Her breath caught. “You do?”
He nodded. “A boy with your temper.”
“My temper?”
“And a girl who looks at me like I’m her whole world.”
She went quiet in a way that felt sacred.
“You’d be a good father,” she whispered.
“I’d just try.”
“That’s the same thing.”
Later, back at the cottage, the warmth of the afternoon settled around them. The shutters were open. The air smelled like herbs and sun-bleached linen. Loli leaned against the door after closing it, studying him.
“You’ve been tense all day.”
“I haven’t.”
“Yes you have.”
He exhaled slowly. “Everyone’s watching. Like they’re waiting for something.”
“For what.”
“For me to mess this up.”
She crossed the room and placed her palm against his chest.
“No one’s waiting for that,” she said gently. “You think I said yes because I was bored? Or because I couldn’t do better?”
His jaw tightened.
“I said yes because when you look at me, I feel safe. I feel chosen. I feel like the world could tilt and you’d just plant your feet and hold it steady.”
He pulled her into him then, burying his face in her hair.
“You’re not going to mess this up,” she whispered. “We’re not glass. We’re oak.”
He laughed softly against her shoulder.
She leaned back just enough to look at him. “You don’t have to be perfect. You just have to stay.”
“I’m not going anywhere.”
“Good.”
He kissed her slowly. Not rushed. Not desperate. Certain.
Her fingers slid into his hair, and he traced the line of her waist like he was memorizing it. The kiss deepened, softened, and slowed again. It wasn’t hunger that filled the space between them. It was belonging.
When they finally pulled apart, she rested her forehead against his.
“In a month,” she murmured, “I’ll be your wife.”
“You already act like it.”
“And you already act like my husband.”
They ended the evening beneath the fig tree as the sky turned pink and gold. The village hummed gently in the distance. She rested her head on his shoulder, and he laced his fingers through hers.
“Promise me something,” she said.
“What.”
“When things get hard… and they will… don’t shut me out.”
He didn’t hesitate. “I won’t.”
“Promise.”
“I promise.”
She smiled, satisfied, and leaned into him.
“You ready?” he asked quietly.
“For what.”
“For the rest of our lives.”
She looked up at him, eyes glowing in the fading light.
“I’ve been ready,” she said.
And for once, he didn’t feel nervous. Just steady. Just sure. Just in love.`,
  },
  {
    id: "origins-of-the-circle-c",
    title: "Origins of the Circle C",
    author: "Skye Lynn Bailey",
    excerpt:
      "The pain in my shoulder didn’t feel that terrible now. Of course, I was also fading in and out of consciousness from blood loss.",
    fullText: `The pain in my shoulder didn’t feel that terrible now. Of course, I was also fading in and out of consciousness from blood loss. Thoughts of my family kept pulling me back. I’d received word a year and a half before that my older brother had lost his life to the fucking Nazis. Six months ago, the message came that they’d gotten my second eldest brother. I hoped Ma, Pa, and my sisters were holdin’ up.

A voice came from above me. “Will, wake up. Stay with me.”

It took all of my strength to open my eyelids. I grinned weekly. “You aren’t getting rid of me that easily.”

“We have to move you. It’s going to hurt like hell.”

It didn’t matter. All that mattered is surviving this fucking bullet in my shoulder and gettin’ back home to my rose. I’d known Vivian Rose my entire life. Despite the sharp pain in my shoulder as they loaded me in the jeep, I couldn’t help but smile. 

To keep the pain from my mind as the jeep bounced along the rutted ground, I lost myself in my thoughts. My Viv had written to me every day since I left. Every time I received mail, there would be a stack of letters. Her last batch included a letter telling me Mr. Jones had been drafted. I’d been working for Mr. Jones since I was ten. He and Martha had no kids of their own, so they had treated me like a son. 

They weren’t affected as the banks began to fail, because Mr. Jones kept all his money in a feed sack tucked under his bed. That’s why they were able to pay me quite well. In fact, they paid me so well, I was able to purchase a beautiful ring for Viv. I’ll never forget our last night together. I’d seen her two nights before I enlisted. I told her to meet me at the big oak tree in Mr. Jones’s pasture the next night. Her parents were real strict, so we set a time after dark. I waited and waited. Every sound snapping me to attention. I’d just about given up when I saw her running through the field.

I switched the bouquet of wildflowers from one hand to the other, so I could wipe my palms on my britches. It seemed like it was taking forever for her to reach me. I’d already waited an hour for her, and I didn’t want to wait a moment longer. Sprintin’ down the hill, I raced across the field to meet her.

“Will,” she panted, “sorry I’m late. I didn’t think Daddy was ever gonna go to sleep.” The moment her eyes landed on the bouquet, she blushed. “Are those for me?”

“They will be. Let’s go up to the top of the hill under the tree.”

We walked side-by-side in silence. My nerves were gettin’ to me somethin’ awful. She looked up at me and smiled. I wanted more than anything to kiss those lips, but I’d always been a gentleman.

“Can I have the flowers now?” The skirt of her dress swung like a bell as she twisted her hips.

I lowered myself onto one knee and held the flowers out. Her eyes widened, and she covered her gasp with her fingers. I pulled the platinum ring with the single square-cut sapphire from my pocket. Tears began forming in her eyes. 

“Vivian Rose, I love you. I can’t wait another moment to call you mine. I plan on leaving for the war tomorrow, and I can’t stand the thought of you findin’ someone else while I’m gone. Will you do me the honor of marrying me when I return?”

“Oh Will, I love you, too. I would wait my entire life for you. Yes, I’ll marry you.”

I slid the ring on her finger. “You just made me the happiest man in all of Oklahoma.” I stood and wrapped my arms around her. I knew if I died and didn’t return, I still wouldn’t regret my life because at that moment she was finally mine.

I know it was improper, but I couldn’t stand the thought of leaving her without having a taste. I slowly moved in and placed my lips on hers. She tasted like peach cobbler and ice cream; she was so sweet.

My private part hardened like a steel rod. “Viv, I know we should wait until we get married, but I want you now. I want a beautiful memory to think back on during the hard times of war.”

She stepped back away from me. I knew I had made a mistake. She looked up thoughtfully into the canopy of the tree overhead. “As long as we are married in the eyes of our Lord, I don’t see why we shouldn’t be able to consummate it.”

I grasped her hands so fast it took her by surprise. “I, William Crawford, in front of our Lord and Savior, take you to be my wife. I will cherish you for all of eternity in the good times and the bad.”

Smiling up at me, she said, “I, Vivian Rose, in front of our Lord and Savior, take you to be my husband. I will cherish you and be yours for all of eternity in the good times and the bad.”

I kissed my new wife with a soul-shattering kiss. I knew we had to do something to seal our union in writing. I took my pocket knife out. At the tree, I whittled away the bark in the shape of a heart. Then I carved our initials. 

She ran her fingers over the inscription ‘WC & VR’. Then she turned to me and slowly began unbuttoning her dress. My mouth went dry as it pooled around her feet, leaving her in a slip and stockings. She started to lean over to unlace her boots. I stopped her and knelt before her. I slowly unlaced them, taking in the scent of her a mere inch away from my face. 

I slid her stockings off one-by-one. She pulled the straps of her slip off her shoulders, letting it fall. She removed her brazier, revealing small round breasts. Dipping my head, I brushed my tongue across one hardened peak, and she called out my name. I’d never heard something so beautiful. Removing her panties, I relished the sight before me. 
“You are more gorgeous than the most expensive piece of art.” 

She watched as I rid myself of my own clothes. When I removed my underwear, I watched as her eyes widened in surprise and maybe a little fear as she saw my private parts standing at attention. Reaching out timidly, she slowly ran her fingertips along my length.

I wrapped her in my arms and kissed her, lowering her to the soft grass as I went. Her bits were drenched as I worked a finger inside of her. I slowly worked in another. I was by no means a small man, so I knew what was coming would cause her some discomfort. 

When my fingers were wet with her moisture, I rubbed it along my length. “This is gonna hurt for just a minute,” I whispered. I continued kissing her as I slowly entered her. With every inch, I paused to let her adjust. When I finally pushed through her barrier, I stopped and stared into her eyes. “I love you.”

“I love you too, William.”  She pressed herself against me, so I began moving. 

It being our first time, I didn’t last long. Not wanting to leave her with a child while I was gone, I pulled out at the last minute and spilled my seed on the ground. “Are you okay, my rose?”

“I am perfect.”

My memories were interrupted when the jeep pulled to a stop at the aide station. I was moved under the tent where men screamed around me. They injected me with a shot of morphine before I lost consciousness.

Four months later

The feeling of uselessness enveloped me. I’d been staying around my parents’ home for over a week, and I still couldn’t use my arm. When I got home, both my sisters had moved out and started their own families. Vivian had moved in to help with my care. 

I resented the fact I had to rely on anyone. Once I was home without the bullets flying at me, I was forced to come to terms with losing my brothers, both biological and the ones I gained in war. Vivian was perfect though. She was compassionate, caring, and understanding of my mood swings. 

A knock sounded at the door and I went to answer it.

A man in a suit greeted me. “Mr. William Crawford?”

“Yes.”

“I have news for you. Can I come in?”

I stood back to allow him to enter. We sat at the kitchen table while Vivian served us glasses of water. “What’s this about, sir?” 

“Do you remember Fredrick Jones?”

“Of course. The man is like a father to me.”

“Then I’m sorry to tell you the war got him.”

“How is Mrs. Jones handling the news?” I asked.

“She has decided to live with her sister back east.”

“What will happen to their farm then?”

“That’s what I wanted to talk to you about.” The man pulled a stack of papers from the envelope. “I am Mr. Jones’s attorney. I have his will. He has left you all sixty acres of the property and the livestock. Here’s a letter from him.”

I unfolded the paper and began reading, so that Vivian could hear.

“Dear William, you have been like a son. I pray you make it through this war. It appears I shall be joining you on the frontlines. What they want this old codger for, I will never understand. But, nevertheless, what the government wants, the government gets. I reckon I won’t make it back, so I want to ensure that everything is taken care of when I’m gone. 

“My wife will go and live with her sister. We have no need for any more money than we already have. Therefore, we have decided to give you our farm in the event of my passing. We are also leaving you with a nice little bundle in that secret spot I told you about. It should help you get settled in. I do have one request. You keep the boys on that have been taking care of my animals. Pay them a good wage to help their mothers survive these hard times. 

“I wish you all the luck in the world. Thank you for devoting your childhood to helping this old man.”

Vivian fell into the seat beside me. “It’s yours? All of Mr. Jones’s land? Just like that?”

“Here is the deed. I assume you know of the secret place,” the attorney said.

I nodded. The money Mr. Jones used on the regular was under his bed. The large sum he would never use in his lifetime was stored under the floorboards in the living room. 
“I’ll be going now. Let me know if there is anything I can help with in the future.” Vivian showed him to the door. 

When she returned, she sat beside me. “We should go. I’m sure the animals need tending to, and I’d like to meet the boys who work there.”

Thirty minutes later, we were standing in the living room, looking into the hole in the floor. There were feed sacks upon feed sacks. I turned to Vivian. “First thing we do is give all six of those boys a large sum for their dedication. Then, we are going to have a wedding.”

“A wedding?” Vivian asked.

“A right proper wedding for you and me. We will start our new life where it all began. Under that oak tree out on the hill.”

“I don’t need a wedding.”

“I know, but the government thinks different. Not to mention, what little girl doesn’t dream of a wedding.” I wrapped my arm around her. I’d do anything for the woman. She was my world.

“I did always want one.” She looked up into my eyes. “I think I may be with child. My monthlies are late.”

There was nothing that could have made the day better than the prospect of us having our own child. I was sad to have lost Mr. Jones, but all the blessings he had left me to care for my own family eased that pain. 

“I think our new farm needs a name,” 

“Oh, I think so too. What should we call it?”

I thought on it while we stood on the front porch of the yellow farmhouse. “I think we’ll call it the Circle C.”

Vivian leaned into me, wrapping her arm around my waist. “I think it’s perfect.”`,
  },
];

function formatStoryText(text: string) {
  return text
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

export default function MakeItFluffyPage() {
  const [selectedStoryId, setSelectedStoryId] = useState<string | null>(null);
  const [votedStoryId, setVotedStoryId] = useState<string | null>(null);
  const [showVoteMessage, setShowVoteMessage] = useState(false);

  const votingClosed = new Date() > VOTING_END;

  useEffect(() => {
    const stored = localStorage.getItem(VOTE_STORAGE_KEY);
    if (stored) {
      setVotedStoryId(stored);
    }
  }, []);

  const selectedStory = useMemo(
    () => stories.find((story) => story.id === selectedStoryId) ?? null,
    [selectedStoryId]
  );

  const handleVote = (storyId: string) => {
    if (votingClosed || votedStoryId) return;

    localStorage.setItem(VOTE_STORAGE_KEY, storyId);
    setVotedStoryId(storyId);
    setShowVoteMessage(true);

    window.setTimeout(() => {
      setShowVoteMessage(false);
    }, 3500);
  };

  return (
    <main className="relative min-h-screen overflow-hidden font-marcellus text-white">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-24 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-amber-500/10 blur-3xl" />
        <div className="absolute left-1/4 top-1/3 h-[320px] w-[320px] rounded-full bg-pink-500/10 blur-3xl" />
        <div className="absolute right-1/4 top-1/2 h-[320px] w-[320px] rounded-full bg-rose-500/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-12">
        <div className="mb-10 text-center">
          <p className="mb-3 text-xs uppercase tracking-[0.25em] text-amber-300/90">
            ✦ Inkbound Valentine’s Event ✦
          </p>

          <h1 className="mb-4 text-4xl md:text-5xl text-amber-400">
            Make It Fluffy
          </h1>

          <p className="mx-auto max-w-3xl text-gray-300 leading-relaxed">
            Read the shortlisted entries and cast one vote for your favourite.
            Voting closes on <span className="text-amber-200">Friday, March 13, 2026</span>,
            and the winner will be announced that same night on live.
          </p>
        </div>

        <div className="mb-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-amber-700/40 bg-white/5 p-5 backdrop-blur-xl">
            <p className="mb-2 text-sm font-semibold text-amber-300">How voting works</p>
            <p className="text-sm text-gray-300">
              You get <span className="text-amber-200">one vote per browser</span>.
              Once you vote, your button locks.
            </p>
          </div>

          <div className="rounded-2xl border border-amber-700/40 bg-white/5 p-5 backdrop-blur-xl">
            <p className="mb-2 text-sm font-semibold text-amber-300">Voting closes</p>
            <p className="text-sm text-gray-300">
              Friday, March 13, 2026 at 11:59 PM.
            </p>
          </div>

          <div className="rounded-2xl border border-amber-700/40 bg-white/5 p-5 backdrop-blur-xl">
            <p className="mb-2 text-sm font-semibold text-amber-300">Winner reveal</p>
            <p className="text-sm text-gray-300">
              Announced live the same night.
            </p>
          </div>
        </div>

        {showVoteMessage && (
          <div className="mb-8 rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-4 text-center text-emerald-100 backdrop-blur-xl">
            Vote recorded. Good.
          </div>
        )}

        {votingClosed && (
          <div className="mb-8 rounded-2xl border border-red-500/40 bg-red-500/10 p-4 text-center text-red-100 backdrop-blur-xl">
            Voting is now closed. The winner will be announced on live tonight.
          </div>
        )}

        {votedStoryId && !votingClosed && (
          <div className="mb-8 rounded-2xl border border-amber-500/40 bg-amber-500/10 p-4 text-center text-amber-100 backdrop-blur-xl">
            You’ve already cast your vote for{" "}
            <span className="font-semibold">
              {stories.find((story) => story.id === votedStoryId)?.title}
            </span>
            .
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-[1fr_1.25fr]">
          <section className="space-y-4">
            {stories.map((story) => {
              const isSelected = selectedStoryId === story.id;
              const isVotedFor = votedStoryId === story.id;

              return (
                <article
                  key={story.id}
                  className={`rounded-2xl border p-5 backdrop-blur-xl transition ${
                    isSelected
                      ? "border-amber-400 bg-white/10"
                      : "border-white/10 bg-white/5"
                  }`}
                >
                  <div className="mb-3 flex items-start justify-between gap-3">
                    <div>
                      <h2 className="text-2xl text-amber-300">{story.title}</h2>
                      <p className="text-sm text-gray-400">By {story.author}</p>
                    </div>

                    {isVotedFor && (
                      <span className="rounded-full border border-emerald-400/40 bg-emerald-500/10 px-3 py-1 text-xs uppercase tracking-[0.18em] text-emerald-200">
                        Your vote
                      </span>
                    )}
                  </div>

                  <p className="mb-4 text-sm leading-7 text-gray-300">
                    {story.excerpt}
                  </p>

                  <div className="flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() =>
                        setSelectedStoryId((current) =>
                          current === story.id ? null : story.id
                        )
                      }
                      className="rounded-full border border-white/20 px-4 py-2 text-sm font-semibold uppercase tracking-[0.16em] transition hover:border-white/40 hover:bg-white/10"
                    >
                      {isSelected ? "Hide story" : "Read story"}
                    </button>

                    <button
                      type="button"
                      onClick={() => handleVote(story.id)}
                      disabled={votingClosed || !!votedStoryId}
                      className={`rounded-full px-4 py-2 text-sm font-semibold uppercase tracking-[0.16em] transition ${
                        votingClosed || votedStoryId
                          ? "cursor-not-allowed border border-white/10 bg-white/10 text-gray-400"
                          : "border border-amber-400/70 bg-amber-700 text-white hover:bg-amber-600 shadow-[0_0_18px_rgba(225,167,48,0.4)]"
                      }`}
                    >
                      {isVotedFor ? "Voted" : "Vote"}
                    </button>
                  </div>
                </article>
              );
            })}
          </section>

          <section className="rounded-2xl border border-amber-700/40 bg-white/5 p-6 backdrop-blur-xl min-h-[500px]">
            {selectedStory ? (
              <>
                <div className="mb-6 border-b border-white/10 pb-4">
                  <p className="mb-2 text-xs uppercase tracking-[0.2em] text-amber-300/90">
                    ✦ Story Reader ✦
                  </p>
                  <h2 className="text-3xl text-amber-300">{selectedStory.title}</h2>
                  <p className="mt-1 text-sm text-gray-400">
                    By {selectedStory.author}
                  </p>
                </div>

                <div className="max-h-[75vh] overflow-y-auto pr-2 space-y-4">
                  {formatStoryText(selectedStory.fullText).map((paragraph, index) => (
                    <p
                      key={index}
                      className="whitespace-pre-wrap leading-8 text-gray-200"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap gap-3 border-t border-white/10 pt-5">
                  <button
                    type="button"
                    onClick={() => handleVote(selectedStory.id)}
                    disabled={votingClosed || !!votedStoryId}
                    className={`rounded-full px-5 py-2.5 text-sm font-semibold uppercase tracking-[0.18em] transition ${
                      votingClosed || votedStoryId
                        ? "cursor-not-allowed border border-white/10 bg-white/10 text-gray-400"
                        : "border border-amber-400/70 bg-amber-700 text-white hover:bg-amber-600 shadow-[0_0_18px_rgba(225,167,48,0.4)]"
                    }`}
                  >
                    {votedStoryId === selectedStory.id ? "Your Vote" : "Vote for this story"}
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedStoryId(null)}
                    className="rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold uppercase tracking-[0.18em] transition hover:border-white/40 hover:bg-white/10"
                  >
                    Close
                  </button>
                </div>
              </>
            ) : (
              <div className="grid h-full place-items-center text-center">
                <div>
                  <p className="mb-3 text-xs uppercase tracking-[0.2em] text-amber-300/90">
                    ✦ Story Reader ✦
                  </p>
                  <h2 className="mb-3 text-3xl text-amber-300">
                    Choose a story
                  </h2>
                  <p className="mx-auto max-w-md text-gray-300 leading-7">
                    Pick an entry from the left to read the full story, then cast
                    your one vote for your favourite.
                  </p>
                </div>
              </div>
            )}
          </section>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            to="/"
            className="rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold uppercase tracking-[0.18em] transition hover:border-white/40 hover:bg-white/10"
          >
            Back to home
          </Link>

         
        </div>
      </div>
    </main>
  );
}