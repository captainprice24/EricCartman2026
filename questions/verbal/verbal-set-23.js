EPSO_BANK.registerSet({
  id: "verbal-23",
  section: "verbal",
  title: "Verbal reasoning · Set 23 (medium)",
  description: "Ten medium passages of exam length on EU opinion polling, raw materials, technology, health, food, natural hazards and history. One-step inferences and careful paraphrases.",
  version: 1,
  questions: [
    {
      id: "v23-01",
      topic: "Opinion polling in the EU",
      difficulty: 2,
      keyType: "inference",
      passage:
        "Since 1974 the European Commission has commissioned regular surveys of public opinion known as the Standard Eurobarometer. Each wave interviews about 1,000 people aged 15 and over in every Member State, although only about 500 are interviewed in the smallest countries, Cyprus, Luxembourg and Malta. Interviews were traditionally conducted face to face, but during the COVID-19 pandemic some were moved online. Alongside the standard waves, Special Eurobarometer surveys explore particular themes in depth, and Flash Eurobarometers, carried out mainly by telephone or online, give quick snapshots on specific questions.\n\nBecause the same questions are asked over many years, the surveys allow trends to be tracked, such as trust in the Union or concern about climate change. Critics note, however, that the wording of a question can shape the answers, and that results from small national samples carry larger margins of error.",
      stem: "Which of the following statements is correct?",
      options: [
        "About 1,000 people are interviewed in Malta in each standard wave.",
        "Malta's national results carry wider margins of error than larger countries'.",
        "Flash Eurobarometers usually interview more people per country than standard waves.",
        "Since the pandemic, all Eurobarometer interviews have been conducted online."
      ],
      answer: 1,
      hints: [
        "How many people are interviewed in the smallest countries?",
        "What do critics say about small national samples?"
      ],
      optionNotes: [
        "False. In the smallest countries, including Malta, 'only about 500 are interviewed'.",
        "Correct. Malta's sample is about 500, and 'results from small national samples carry larger margins of error'.",
        "Not supported. The text gives sample sizes only for the standard waves; it says nothing about how many people Flash surveys interview.",
        "Overstated. During the pandemic 'some' interviews were moved online, not all of them."
      ],
      explanation: "The key applies a general caution about small samples to the case of one named country. The distractors ignore the exception, swap the roles of two survey types and turn 'some' into 'all'."
    },
    {
      "id": "v23-02-r2",
      "supersedes": "v23-02",
      "topic": "Lighthouse technology",
      "difficulty": 2,
      "keyType": "inference",
      "passage": "Early lighthouses relied on open fires or lamps backed by metal mirrors, which wasted much of the light they produced. In 1822 the French physicist Augustin Fresnel designed a new kind of lens made of concentric rings of glass prisms. Because each ring bent the light towards a single beam, the lens could be far thinner and lighter than a solid lens of the same power, and it sent a much larger share of the light out to sea. The first was installed at the Cordouan lighthouse in 1823, and the design soon spread around the world.\n\nTo help sailors identify them, lighthouses were given distinctive patterns of flashes, produced by rotating the lens or screening the light. Most lighthouses are now automated, and satellite navigation has reduced reliance on them, but they still serve as a backup when electronic systems fail.",
      "stem": "Which of the following statements is correct?",
      "options": [
        "Lighthouse lenses of equal power need not have equal weight.",
        "Satellite navigation has made lighthouses unnecessary for sailors.",
        "Fresnel lenses were probably first used to replace open fires at Cordouan.",
        "Every lighthouse can be identified by the colour of its light alone."
      ],
      "answer": 0,
      "hints": [
        "The comparison holds optical power constant while changing the lens construction.",
        "What does a lighter lens of the same power show about the relationship between power and weight?"
      ],
      "optionNotes": [
        "Correct. The ring-based design is lighter than a solid lens of the same power, so equal power need not mean equal weight.",
        "False. Lighthouses 'still serve as a backup when electronic systems fail'.",
        "Not supported. The first Fresnel lens was installed at Cordouan in 1823; the text does not say what it replaced there.",
        "Not supported. Lighthouses are identified by 'distinctive patterns of flashes'; colour is not mentioned."
      ],
      "explanation": "A comparison in which one property stays equal and another differs disproves the assumption that the first property fixes the second."
    },
    {
      id: "v23-03",
      topic: "Indoor agriculture",
      difficulty: 2,
      keyType: "inference",
      passage:
        "Vertical farms grow crops indoors in stacked layers under LED lights, usually with their roots in nutrient solutions rather than soil. Because water is recycled and the climate is controlled, they use far less water and land per kilogram than open fields, need few or no pesticides and can produce close to cities all year round.\n\nTheir weakness is energy. Sunlight is free, whereas artificial light must be paid for, so vertical farms concentrate on high-value, fast-growing crops such as lettuce and herbs; staples such as wheat or potatoes would need too much light per unit of value to be profitable. When energy prices rose sharply in 2022, several vertical-farming companies in Europe and North America closed or scaled back. Supporters argue that cheaper renewable electricity and more efficient LEDs could change the economics, while sceptics expect the sector to remain a niche.",
      stem: "Which of the following statements is correct?",
      options: [
        "Vertical farms now produce most of the lettuce sold in European cities.",
        "A fall in electricity costs could widen the range of crops worth growing indoors.",
        "Vertical farms mainly sell their produce to supermarkets in city centres.",
        "Vertical farms use no water at all, because it is recycled indefinitely."
      ],
      answer: 1,
      hints: [
        "Why do vertical farms avoid staples such as wheat?",
        "What do supporters say could change the economics?"
      ],
      optionNotes: [
        "Not supported. The text says vertical farms concentrate on lettuce and herbs, not what share of the market they hold.",
        "Correct. Staples are avoided because artificial light costs too much per unit of value, and supporters argue that cheaper electricity 'could change the economics'.",
        "Not supported. Vertical farms can produce close to cities, but the text says nothing about who buys their produce.",
        "False. Vertical farms use 'far less water' per kilogram than open fields, which means they still use some."
      ],
      explanation: "The key follows the energy constraint through to its consequence. 'Far less' and 'none' are not the same, and a focus on lettuce is not a market share."
    },
    {
      "id": "v23-04-r2",
      "supersedes": "v23-04",
      "topic": "Loneliness and health",
      "difficulty": 2,
      "keyType": "inference",
      "passage": "Researchers distinguish loneliness from social isolation. Isolation is an objective condition, measured by how few contacts a person has, whereas loneliness is the painful feeling that one's relationships are fewer or less satisfying than one would like. The two often occur together, but not always: some people with many contacts feel lonely, while some who live largely alone do not.\n\nStudies have linked persistent loneliness to a higher risk of heart disease, stroke and depression, although it is harder to establish how far loneliness causes these conditions and how far illness leads people to withdraw. Contrary to a common assumption, surveys in several countries find that young adults report loneliness at least as often as older people. Some governments now treat the issue as a public policy matter: the United Kingdom appointed a minister with responsibility for loneliness in 2018, and Japan followed in 2021.",
      "stem": "Which of the following statements is correct?",
      "options": [
        "A survey limited to few contacts would not include all lonely people.",
        "Loneliness has been proven to be the direct cause of heart disease.",
        "Older people usually report more loneliness than young adults do.",
        "Japan appointed a minister for loneliness before the United Kingdom did."
      ],
      "answer": 0,
      "hints": [
        "Consider the people with many contacts who still feel lonely.",
        "Can the subjective feeling uniquely identify the objective number of relationships?"
      ],
      "optionNotes": [
        "Correct. The passage includes lonely people with many contacts, so the feeling alone cannot establish that contacts are few.",
        "Overstated. Loneliness has been 'linked' to a higher risk, but cause and effect are 'harder to establish'.",
        "False. Young adults report loneliness 'at least as often as older people'.",
        "False. The United Kingdom made its appointment in 2018, and Japan 'followed in 2021'."
      ],
      "explanation": "Related measures are not interchangeable. A stated counterexample defeats an inference from the feeling to the number of contacts."
    },
    {
      id: "v23-05",
      topic: "Tsunami warning",
      difficulty: 2,
      keyType: "combination",
      passage:
        "On 26 December 2004 an earthquake off the coast of Sumatra triggered a tsunami that killed around 230,000 people in fourteen countries. The Pacific Ocean had had a warning system since 1949, but the Indian Ocean had none, and many coastal communities received no alert even hours after the earthquake. An Indian Ocean warning system became operational in 2006, combining seismometers, deep-ocean pressure sensors and tide gauges.\n\nDetecting a tsunami is only part of the task. Warnings must reach people on the coast quickly through sirens, broadcasts and mobile phones, and they must trust and act on them. For communities close to the earthquake, the first waves may arrive within minutes, faster than any official alert. Education campaigns therefore teach residents to treat strong shaking or a sudden retreat of the sea as a signal to move to higher ground at once.",
      stem: "Which of the following statements is correct?",
      options: [
        "The 2004 tsunami struck before any ocean had a tsunami warning system.",
        "Since 2006 the warning system has prevented any further tsunami deaths.",
        "Near the epicentre, natural warning signs can matter more than sirens.",
        "Most victims in 2004 ignored alerts that they had received in time."
      ],
      answer: 2,
      hints: [
        "How quickly can the first waves arrive near the earthquake?",
        "Which ocean already had a warning system in 2004?"
      ],
      optionNotes: [
        "False. The Pacific Ocean 'had had a warning system since 1949'.",
        "Not supported. The system became operational in 2006; the text says nothing about deaths since then.",
        "Correct. Near the earthquake the waves 'may arrive within minutes, faster than any official alert', so residents are taught to act on shaking or a retreating sea.",
        "Not supported. The text says many communities 'received no alert'; it does not say that victims ignored alerts."
      ],
      explanation: "The key combines the speed of near-field waves with the purpose of education campaigns. One distractor overlooks the Pacific system; another turns 'no alert' into ignored alerts."
    },
    {
      id: "v23-06",
      topic: "Critical raw materials",
      difficulty: 2,
      keyType: "inference",
      passage:
        "The rare earth elements, a group of seventeen metals, are not especially rare in the Earth's crust, but they are seldom found in concentrations that are worth mining, and separating them from one another is chemically difficult and polluting. They are essential for the powerful permanent magnets used in electric vehicle motors and many wind turbines.\n\nChina accounts for most of the world's rare earth refining, and the European Union depends heavily on imports. Its Critical Raw Materials Act, adopted in 2024, sets benchmarks for 2030: the Union should extract at least 10 per cent of its annual consumption of strategic raw materials, process 40 per cent and recycle 25 per cent, and no more than 65 per cent of any strategic raw material should come from a single third country. The benchmarks are not binding targets for individual companies, and new mines and refineries typically take many years to open.",
      stem: "Which of the following statements is correct?",
      options: [
        "Rare earths are scarce in the crust, which explains why they are expensive.",
        "The Act requires each European company to recycle a quarter of its rare earths.",
        "The benchmarks still allow most of a material to come from China.",
        "The Union will be able to process all of its own rare earths by 2030."
      ],
      answer: 2,
      hints: [
        "What limit does the Act set on dependence on a single third country?",
        "Are the benchmarks binding on individual companies?"
      ],
      optionNotes: [
        "False. Rare earths 'are not especially rare in the Earth's crust'; the difficulty lies in concentration and separation.",
        "False. The benchmarks 'are not binding targets for individual companies'.",
        "Correct. Up to 65 per cent of a strategic raw material may come from a single third country, which is still a majority.",
        "Overstated. The 2030 benchmark is to process 40 per cent of annual consumption, not all of it."
      ],
      explanation: "The key reads a numerical ceiling correctly: 65 per cent is a limit, but it still allows a majority. The distractors contradict two explicit statements and inflate a benchmark."
    },
    {
      "id": "v23-07-r2",
      "supersedes": "v23-07",
      "topic": "Medieval art",
      "difficulty": 2,
      "keyType": "combination",
      "passage": "The Bayeux Tapestry, which tells the story of the Norman conquest of England in 1066, is not strictly a tapestry. Tapestries are woven, whereas this work is an embroidery: coloured wool stitched onto strips of linen. It is about 70 metres long and only half a metre high, and it shows scenes from the events leading up to the Battle of Hastings and from the battle itself, with short Latin captions.\n\nMost historians think it was commissioned by Bishop Odo of Bayeux, William the Conqueror's half-brother, and made in England in the decade after the conquest, probably by English embroiderers. Its final section is missing, so no one knows exactly how the story originally ended. Because it presents events largely from the Norman point of view, historians use it alongside written chronicles, comparing its version with other accounts rather than treating it as a neutral record.",
      "stem": "Which of the following statements is correct?",
      "options": [
        "An embroidery made in England need not present an English view of the conquest.",
        "Historians treat the work as a neutral record of the conquest.",
        "It is known for certain that Bishop Odo designed every scene himself.",
        "The missing final section probably showed William's coronation."
      ],
      "answer": 0,
      "hints": [
        "Compare the proposed place of manufacture with the viewpoint historians find in the narrative.",
        "Must making a work on one side mean that its story favours that side?"
      ],
      "optionNotes": [
        "Correct. Historians generally place manufacture in England while describing a predominantly Norman account; the two descriptions are compatible.",
        "False. Historians compare it with other accounts 'rather than treating it as a neutral record'.",
        "Overstated. Most historians 'think' Odo commissioned it; the text does not say he designed any scenes, let alone all of them.",
        "Not supported. 'No one knows exactly how the story originally ended.'"
      ],
      "explanation": "Distinguish the origin of an object from the perspective expressed by its contents. Neither production location nor subject matter alone establishes neutrality."
    },
    {
      "id": "v23-08-r2",
      "supersedes": "v23-08",
      "topic": "Wine and plant disease",
      "difficulty": 2,
      "keyType": "inference",
      "passage": "In the 1860s vineyards in southern France began to die for no obvious reason. The cause turned out to be phylloxera, a tiny insect native to North America that feeds on the roots of grapevines. It had probably arrived on American vines imported for experiments, and over the next decades it spread across most of Europe's wine regions, destroying a large share of the vineyards.\n\nAmerican vines had evolved alongside the insect and could tolerate it, while European vines could not. After many remedies failed, including flooding vineyards and injecting chemicals into the soil, growers adopted grafting: European varieties were joined onto resistant American roots, so that the grapes remained European while the roots resisted attack. Most European vineyards are grafted today. A few areas escaped, notably those with very sandy soils, in which the insect does not thrive, and some ungrafted vines survive there.",
      "stem": "Which of the following statements is correct?",
      "options": [
        "Grafting changed only the roots of European vines, not the grapes they bore.",
        "Flooding vineyards proved the most effective defence against phylloxera.",
        "American vines lacked resistance to the pest that European vines had learned to tolerate.",
        "Ungrafted vineyards survived mainly because their owners had banned American imports."
      ],
      "answer": 0,
      "hints": [
        "What part of the vine did grafting replace, and what part did it keep?",
        "Why were American vines in France in the first place?"
      ],
      "optionNotes": [
        "Correct. European varieties were joined onto American roots, 'so that the grapes remained European while the roots resisted attack'.",
        "False. Flooding was among the 'many remedies' that 'failed'.",
        "False. American vines could tolerate the insect, while European vines could not; the statement reverses their resistance.",
        "Not supported. Sandy soils are identified as a reason the insect does not thrive; no owners’ import bans or their relative contribution are reported."
      ],
      "explanation": "The key draws the consequence of grafting: new roots, unchanged grapes. One distractor reverses the order of events; another turns 'most' into 'every'."
    },
    {
      id: "v23-09",
      topic: "Flood defence",
      difficulty: 2,
      keyType: "combination",
      passage:
        "In February 1953 a storm surge broke through dykes in the south-western Netherlands, killing more than 1,800 people. The government responded with the Delta Works, a series of dams, sluices and storm-surge barriers designed to shorten the coastline and protect the low-lying delta of the Rhine, Meuse and Scheldt.\n\nThe original plan was to close off the Eastern Scheldt estuary completely with a dam. In the 1970s, however, environmental groups and fishermen protested that a closed dam would destroy the estuary's tidal ecosystem and its shellfish industry. The government changed course: the barrier completed in 1986 consists of huge movable gates that normally stay open, letting the tide flow in and out, and close only when a dangerous surge is forecast. It cost considerably more than a fixed dam. The last major element of the Delta Works, a barrier protecting the port of Rotterdam, was finished in 1997.",
      stem: "Which of the following statements is correct?",
      options: [
        "The Eastern Scheldt barrier was completed before the 1953 storm surge.",
        "The Eastern Scheldt barrier usually stays closed except in calm weather.",
        "Protecting the estuary's ecosystem added to the cost of the barrier.",
        "Fishermen opposed every element of the Delta Works from the start."
      ],
      answer: 2,
      hints: [
        "Why was the original plan for a fixed dam changed?",
        "How does the cost of the movable barrier compare with a fixed dam?"
      ],
      optionNotes: [
        "False. The barrier was completed in 1986, as part of the response to the 1953 surge.",
        "False. Its gates 'normally stay open' and close 'only when a dangerous surge is forecast'.",
        "Correct. Movable gates were chosen to preserve the 'tidal ecosystem', and the barrier 'cost considerably more than a fixed dam'.",
        "Overstated. Fishermen protested against closing the Eastern Scheldt completely; the text does not say they opposed every element."
      ],
      explanation: "The key combines the reason for the redesign with its cost. Two distractors reverse explicit facts; the third widens a specific protest."
    },
    {
      id: "v23-10",
      topic: "Wartime codebreaking",
      difficulty: 2,
      keyType: "inference",
      passage:
        "The German Enigma machine encrypted messages using rotors whose settings changed every day. In the early 1930s, mathematicians of the Polish Cipher Bureau, led by Marian Rejewski, worked out how the machine was wired and found ways to recover its daily settings. In July 1939, weeks before the outbreak of war, they shared their methods with British and French intelligence.\n\nAt Bletchley Park in England, codebreakers including Alan Turing and Gordon Welchman built on the Polish work, designing electromechanical machines, called bombes, that tested possible settings far faster than people could. The German navy's version of Enigma proved harder to break, and progress there depended partly on capturing codebooks from ships. The resulting intelligence, known as Ultra, was kept secret for decades after the war. Historians agree that it gave the Allies a significant advantage, but they disagree about how much it shortened the war.",
      stem: "Which of the following statements is correct?",
      options: [
        "The British codebreakers broke Enigma without any help from earlier work.",
        "The bombes tested possible settings more quickly than human codebreakers.",
        "Breaking naval Enigma depended only on captured codebooks.",
        "Historians agree that Ultra shortened the war by about two years."
      ],
      answer: 1,
      hints: [
        "What did the bombes do, and how did their speed compare with people?",
        "On what point do historians agree, and on what do they disagree?"
      ],
      optionNotes: [
        "False. The codebreakers at Bletchley Park 'built on the Polish work'.",
        "Correct. The bombes 'tested possible settings far faster than people could'.",
        "Overstated. Progress on naval Enigma depended 'partly' on capturing codebooks.",
        "False. Historians 'disagree about how much it shortened the war'; no figure is agreed."
      ],
      explanation: "The key restates a comparison carefully. The distractors erase the Polish contribution, turn 'partly' into 'only' and invent an agreed figure."
    }
  ]
});
