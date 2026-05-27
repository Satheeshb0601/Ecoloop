const wasteRules = {
    organic: {
        method: "Composting",
        co2SavedPerKg: 0.8,
        reasoning: "Organic waste rots in covered dumps and creates methane gas. Making compost at home turns this waste into very healthy soil for your plants.",
        decomposition: "2 weeks to 6 months (depending on moisture and mixing).",
        steps: [
            "Keep wet food waste (like vegetable peels, tea leaves, leftover food) separate from dry plastic waste.",
            "Take an old bucket or a clay pot and make small holes in it for air.",
            "Put your wet waste inside, and cover it with dry brown items (dry leaves, sawdust, or torn newspaper pieces).",
            "Sprinkle a little water so it stays lightly wet, and mix it with a stick every 3-4 days.",
            "When it looks and smells like dark wet soil, your homemade compost fertilizer is ready!"
        ],
        diyIdeas: [
            { title: "Banana Peel Water", desc: "Keep banana peels in a bottle of water for 2 days. Use this water for your indoor plants. It gives them good nutrients." },
            { title: "Citrus Bio-Enzyme", desc: "Mix sweet lime or lemon peels with jaggery and water in a plastic bottle. Keep it closed for a few weeks to make a natural, chemical-free floor cleaner." },
            { title: "Eggshell Powder", desc: "Wash used eggshells, dry them in the sun, and crush them into a fine powder. Mix this in plant pots for calcium." },
            { title: "Coconut Shell Wall Hanging", desc: "Clean the inside and outside of leftover coconut shells. Paint the outer parts of 3-4 shells, and tie them together using a rope in a vertical order to make an appealing homely craft." }
        ]
    },
    plastic: {
        method: "Recycling / Reusing",
        co2SavedPerKg: 1.5,
        reasoning: "Plastic takes hundreds of years to destroy and harms animals. We must reuse it at home or give it to the local scrap dealer for recycling.",
        decomposition: "Up to 450 years or never.",
        steps: [
            "Wash the plastic item so no oil or food is stuck to it.",
            "Crush empty water and cold drink bottles so they take up less space.",
            "Collect all clean plastic in one dry bag.",
            "Give it to your local scrap buyer. Do not throw it with wet food garbage!"
        ],
        diyIdeas: [
            { title: "Bottle Planters", desc: "Cut a large plastic bottle in half. Make small holes at the bottom for water to drop out. Fill with soil and grow mint or coriander on your balcony." },
            { title: "Plastic Bag Mats", desc: "If you have many thin plastic polythene bags, cut them into long strips. Join them to make a thick plastic rope, and weave them into a waterproof sitting mat." },
            { title: "Spoon & Drawer Box", desc: "Cut the bottom half of thick milk packets or shampoo bottles. Wash them well and keep them in your kitchen drawers to separately hold spoons, forks, and knives." },
            { title: "Outdoor Broom", desc: "Cut a large 2-liter soft drink bottle from the bottom into very thin strips all around. Attach a stick to the neck of the bottle to use as a strong outdoor broom." }
        ]
    },
    paper: {
        method: "Recycling",
        co2SavedPerKg: 1.0,
        reasoning: "Giving old newspapers and boxes for recycling saves trees and water.",
        decomposition: "2 to 6 weeks if kept outside.",
        steps: [
            "Make sure the paper is dry. Wet or oily paper (like a greasy pizza box) cannot be recycled properly.",
            "Open and flatten all cardboard boxes.",
            "Collect all newspapers, magazines, and notebooks.",
            "Sell it to the local paper scrap buyer. They send it directly to paper mills."
        ],
        diyIdeas: [
            { title: "Monsoon Seed Balls", desc: "Tear old newspaper into pieces and soak in water to make a paste. Mix this paste with mud and flower seeds. Let it dry into hard balls. Throw them in empty dirt plots before the rains to grow free trees." },
            { title: "Woven Paper Baskets", desc: "Roll old newspaper pages tightly into thin, long sticks. Weave these paper sticks together just like bamboo to make beautiful dry fruit baskets." },
            { title: "Shelf Liners", desc: "Use thick layers of old newspaper to cover the bottom of your kitchen shelves and wooden wardrobes. It absorbs moisture and prevents insects in the rainy season." },
            { title: "Cardboard Photo Frames", desc: "Cut thick cardboard box pieces into rectangles. Cover them beautifully with leftover ethnic cloth or paint them to make free photo frames for your walls." }
        ]
    },
    ewaste: {
        method: "E-Waste Drop-off",
        co2SavedPerKg: 2.5,
        reasoning: "Broken phones, batteries, and wires have toxic inside materials. Throwing them in the dustbin will poison the soil and street water.",
        decomposition: "1-2 million years.",
        steps: [
            "Never throw old batteries, chargers, or phones in the regular dustbin.",
            "Keep all broken electronics in a completely dry cardboard box at home.",
            "Tape the ends of old torch or remote batteries so they don't catch fire.",
            "Ask your local municipality about E-waste collection drives, or drop them at specialized electronic showrooms that accept e-waste."
        ],
        diyIdeas: [
            { title: "Tech Wall Frame", desc: "Clean an old broken computer green board (motherboard). Stick it inside a deep photo frame and hang it in your room for a very unique, modern decoration." },
            { title: "Wire Tie Organizers", desc: "Take an old, useless rubber mousepad. Cut it into thin strips. Use these rubber strips as strong ties to fold and organize your working TV and phone cables." },
            { title: "Heavy Pen Stands", desc: "Old floppy drives or thick hard drive casings are very heavy and stable. Once cleaned, use them simply as heavy desktop paperweights or pen stands." },
            { title: "Broken Screen Mirrors", desc: "Sometimes old tablet screens are completely dark but very reflective. Clean the screen perfectly and use it as a dark-tinted pocket mirror." }
        ]
    },
    glass: {
        method: "Reusing & Recycling",
        co2SavedPerKg: 0.3,
        reasoning: "Glass breaks easily and is dangerous in mixed garbage, but it can be melted and reused forever by factories.",
        decomposition: "1 million years.",
        steps: [
            "Empty the glass bottle or jar completely and wash it with soap.",
            "Remove the metal twisting lid (put that with metal waste).",
            "Be very careful to avoid breaking it. Broken glass will hurt the garbage collectors.",
            "Give it to your scrap dealer or put it safely in a strong bag before disposal."
        ],
        diyIdeas: [
            { title: "Kitchen Spice Jars", desc: "Clean old jam or pickle jars with hot water to remove the sticky label sticker. Dry them and use them to safely store turmeric, chili powder, or whole spices in your kitchen." },
            { title: "Money Plant Vase", desc: "Wash an old glass bottle nicely. Fill it with plain water and put a Money Plant stem in it. It looks beautiful on a window and brings fresh oxygen to the room." },
            { title: "Painted Festival Lanterns", desc: "Paint the outside of small glass jars with bright transparent glass colors. Place a small wax candle inside to make a beautiful, safe lantern for festivals." },
            { title: "Safe Lentil Storage", desc: "Plastic containers can sometimes let moisture in. Storing your lentils and rice in large cleaned glass coffee jars prevents insects and fungus." }
        ]
    },
    metal: {
        method: "Metal Recycling",
        co2SavedPerKg: 4.0,
        reasoning: "Metals like iron, steel, and aluminum are highly valuable. Recycling them uses much less energy than mining new metal.",
        decomposition: "50 to 500 years.",
        steps: [
            "Wash out food tins (like those for beans or sweets) so they don't smell and attract ants.",
            "Push the sharp cut lid entirely inside the tin so nobody cuts their hands.",
            "Crush soft aluminum cans (like cold drink cans) by stepping on them to save space.",
            "Keep aside in a dry bag and sell to your local scrap dealer."
        ],
        diyIdeas: [
            { title: "Balcony Hanging Planters", desc: "Make small holes in the bottom of old oil or powder tins. Paint them brightly, tie them with a strong metal wire, and hang them on your balcony grill with small flowers." },
            { title: "Hanging Wind Chimes", desc: "Clean various sizes of small metal tins. Paint them and hang them closely together using a strong string. When the wind blows, they make a nice sound." },
            { title: "Pen & Spoon Holders", desc: "Wash tall food cans safely. Take some brown coir rope (jute) and stick it tightly around the tin using glue. It makes a beautiful, natural-looking stand for your kitchen spoons or desk pens." },
            { title: "Balcony Bird Feeder", desc: "Cut a small open window on the side of a large tin can. Smooth the sharp edges. Hang it on a tree securely and put rice grains inside for the birds." }
        ]
    },
    clothes: {
        method: "Donating & Textile Recycling",
        co2SavedPerKg: 3.5,
        reasoning: "Making new clothes requires thousands of liters of drinking water. Reusing old cloth saves our water supply and reduces factory pollution.",
        decomposition: "Cotton: 1-5 months. Synthetic bags: 200 years.",
        steps: [
            "Wash the old clothes properly.",
            "Check if they are torn. If they are in good condition, fold them nicely and donate them to a local charity, NGO, or someone in need.",
            "If they are badly torn or faded, do not donate them as wearable clothes.",
            "Instead, use the torn ones in the house for the ideas below, or ask local tailors if they need scrap cloth."
        ],
        diyIdeas: [
            { title: "Cloth Grocery Bags", desc: "Stop asking for plastic bags at the market! Stitch old thick cotton shirts or jeans into strong carrying bags for buying your daily vegetables and groceries." },
            { title: "Floor Mopping Rags", desc: "Cut old soft cotton t-shirts or old pyjamas into thick squares. Use them to mop the floor daily or clean the dust from your wooden furniture and ceiling fans." },
            { title: "Patchwork Quilts", desc: "In many homes, old soft traditional wear or scarves are placed on top of each other and stitched together in a criss-cross pattern to make a warm, thick blanket or sitting mat." },
            { title: "Traditional Cushion Covers", desc: "Cut the front embroidered part of old traditional dresses that don't fit anymore, and stitch them to make beautiful covers for your sofa pillows." }
        ]
    }
};
