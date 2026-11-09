EPSO_BANK.registerSet({
  id: "verbal-22",
  section: "verbal",
  title: "Verbal reasoning · Set 22 (medium)",
  description: "Ten medium passages of exam length on EU disaster aid, economic and technological history, biology, energy, language, land management and public health. One-step inferences and careful paraphrases.",
  version: 1,
  questions: [
    {
      "id": "v22-01-r2",
      "supersedes": "v22-01",
      "topic": "EU disaster aid",
      "difficulty": 2,
      "keyType": "inference",
      "passage": "The European Union Solidarity Fund was created in 2002, after severe floods in central Europe. It helps Member States and accession countries cope with major natural disasters and, since 2020, also with major public health emergencies. It does not compensate individuals or businesses: it reimburses part of the public cost of emergency operations, such as restoring essential infrastructure, providing temporary accommodation and cleaning up, and insured damage is not eligible.\n\nTo count as 'major', direct damage must exceed three billion euros at 2011 prices or 0.6 per cent of the country's gross national income, whichever is lower. A government must apply within twelve weeks; the Commission then assesses the request and the Parliament and Council must approve the amount, so aid has often arrived months after the event. Advance payments were introduced to shorten the delay, but critics say the Fund still suits reconstruction better than immediate relief.",
      "stem": "Which of the following statements is correct?",
      "options": [
        "Since 2020 the Fund has covered health emergencies instead of natural disasters.",
        "Most applications to the Fund have probably come from accession countries.",
        "At EUR 200 billion GNI, direct damage must exceed EUR 1.2 billion to qualify.",
        "Advance payments ensure that aid now arrives immediately after a disaster."
      ],
      "answer": 2,
      "hints": [
        "Treat the GNI in the statement as a hypothetical case to which the passage rule applies.",
        "Calculate 0.6% of 200 billion, then select the lower threshold."
      ],
      "optionNotes": [
        "False. Since 2020 the Fund helps 'also with major public health emergencies', in addition to natural disasters.",
        "Not supported. Accession countries are eligible, but the text gives no information about who applies most.",
        "Correct. 0.6% of EUR 200 billion is EUR 1.2 billion, below EUR 3 billion. The damage must exceed that lower threshold.",
        "Overstated. Advance payments were introduced 'to shorten the delay', and critics say the Fund still suits reconstruction better than immediate relief."
      ],
      "explanation": "Apply the lower-of-two rule to a specified GNI. A precise case avoids relying on an undefined description of an economy as small."
    },
    {
      id: "v22-02",
      topic: "Plague and labour markets",
      difficulty: 2,
      keyType: "combination",
      passage:
        "The Black Death, which swept across Europe between 1347 and 1351, killed between a third and a half of the population. With so many workers dead, land was plentiful but labour scarce, and surviving peasants could demand higher wages or better terms. Rulers tried to stop this. In England, laws of 1349 and 1351 ordered wages to be held at their pre-plague levels and made it an offence to leave an employer in search of better pay. They proved hard to enforce, since employers short of hands often broke them themselves, and records suggest that real wages for many English labourers rose over the following decades.\n\nThe effects differed by region. In much of western Europe, peasants' bargaining power contributed to the decline of serfdom, whereas in parts of central and eastern Europe landowners eventually tightened their control over peasants.",
      stem: "Which of the following statements is correct?",
      options: [
        "The English wage laws did not prevent the later rise in many labourers' wages.",
        "Serfdom became stronger in western Europe after the plague than before it.",
        "The English laws allowed workers to leave an employer to seek better pay.",
        "Labour shortages were probably worst in central and eastern Europe."
      ],
      answer: 0,
      hints: [
        "What were the English laws meant to do, and what do the records suggest happened?",
        "Compare the effects described for western and for central and eastern Europe."
      ],
      optionNotes: [
        "Correct. The laws ordered wages to be held at pre-plague levels, yet 'real wages for many English labourers rose over the following decades'.",
        "False. In much of western Europe peasants' bargaining power 'contributed to the decline of serfdom'.",
        "False. The laws 'made it an offence to leave an employer in search of better pay'.",
        "Not supported. The text contrasts how landowners responded in the east; it does not say where shortages were worst."
      ],
      explanation: "The key combines the purpose of a law with the evidence about what followed. A regional contrast in responses is not evidence about where the shortage itself was greatest."
    },
    {
      id: "v22-03",
      topic: "Gut microbiome",
      difficulty: 2,
      keyType: "inference",
      passage:
        "The human body hosts trillions of microorganisms, most of them bacteria in the gut. Textbooks long said they outnumbered human cells by ten to one, but a 2016 recalculation put the ratio closer to one to one. Gut bacteria break down dietary fibre that human enzymes cannot digest, and some produce vitamins such as vitamin K.\n\nPeople with conditions such as obesity or type 2 diabetes often have a different mix of gut bacteria from healthy people. Such associations do not show which comes first: a disease, or the medicines and diet that accompany it, may change the microbiome rather than the other way round. Experiments in mice suggest a causal role, but evidence in humans is weaker. One treatment is well established: transplanting faecal bacteria from a healthy donor is highly effective against recurrent infections with Clostridioides difficile, which often flourishes after antibiotics.",
      stem: "Which of the following statements is correct?",
      options: [
        "The 2016 recalculation also found more microbial species than expected.",
        "Faecal transplants are now widely used to treat type 2 diabetes.",
        "Gut bacteria are needed to digest all of the foods that humans eat.",
        "A different gut mix in sick people could be a result of their disease."
      ],
      answer: 3,
      hints: [
        "What does the text say associations between disease and gut bacteria do not show?",
        "Which treatment does the text call 'well established', and for what?"
      ],
      optionNotes: [
        "Not supported. The 2016 recalculation concerned the ratio of microbes to human cells; the text says nothing about the number of species.",
        "Not supported. The only treatment the text calls well established is against recurrent C. difficile; it says nothing about treating diabetes with transplants.",
        "Overstated. Bacteria break down 'dietary fibre that human enzymes cannot digest', not all foods.",
        "Correct. Associations 'do not show which comes first': a disease or its treatment 'may change the microbiome rather than the other way round'."
      ],
      explanation: "Correlation is not causation, and the text says so directly. The distractors invent a finding about species, stretch the one well-established treatment to a different disease and widen the digestion of fibre to all foods."
    },
    {
      id: "v22-04",
      topic: "Geothermal energy",
      difficulty: 2,
      keyType: "paraphrase",
      passage:
        "Iceland's volcanic geology gives it unusually easy access to underground heat. About nine in ten Icelandic homes are heated with geothermal energy, mostly through district networks that pipe hot water from boreholes to buildings. Electricity is a separate matter: most of the country's power comes from hydroelectric dams fed by glacial rivers, while geothermal plants supply roughly a quarter to a third. Almost all of Iceland's electricity and heating is therefore renewable, although transport and the fishing fleet still depend largely on imported oil. Cheap power has attracted aluminium smelters, which use the majority of the electricity generated.\n\nGeothermal energy is not entirely free of emissions, as fluids from deep reservoirs release carbon dioxide and hydrogen sulphide. Near Reykjavík, a project captures some of these gases and injects them into basalt rock, where the carbon dioxide turns into stable minerals.",
      stem: "Which of the following statements is correct?",
      options: [
        "Most of the electricity generated in Iceland is used to heat homes.",
        "Geothermal plants supply less of Iceland's electricity than dams do.",
        "The gases captured near Reykjavík are sold to industry after capture.",
        "Iceland's fishing fleet will probably switch to geothermal power soon."
      ],
      answer: 1,
      hints: [
        "Separate what the text says about heating from what it says about electricity.",
        "Which source supplies most of Iceland's power?"
      ],
      optionNotes: [
        "False. Homes are heated mostly by hot water from district networks, and aluminium smelters 'use the majority of the electricity generated'.",
        "Correct. 'Most of the country's power comes from hydroelectric dams', while geothermal plants supply 'roughly a quarter to a third'.",
        "Not supported. The gases are injected into basalt rock; nothing is said about selling them.",
        "Not supported. Transport and the fishing fleet 'still depend largely on imported oil'; the text makes no prediction."
      ],
      explanation: "A careful paraphrase requires keeping heating and electricity apart. Two distractors add an invented commercial use and an invented forecast."
    },
    {
      id: "v22-05",
      topic: "Endangered languages",
      difficulty: 2,
      keyType: "inference",
      passage:
        "Of the roughly 7,000 languages spoken today, around 40 per cent are considered endangered. A language rarely disappears because its last speakers die suddenly; it usually fades when parents stop passing it on to their children, often because another language offers better access to education or work. Once a generation grows up without it, the language is unlikely to recover without deliberate effort.\n\nRevival is difficult but not impossible. Hebrew, used for centuries mainly in religious and scholarly writing, became the everyday language of millions in the twentieth century, and Welsh has benefited from its use in schools and broadcasting. Manx, the language of the Isle of Man, lost its last native speaker in 1974, yet a small community now speaks it again after learning it through classes and a Manx-medium primary school. Such cases depend on sustained public support and on families choosing to use the language at home.",
      stem: "Which of the following statements is correct?",
      options: [
        "Most endangered languages vanish when their last speakers die suddenly.",
        "Revival can succeed for any language as long as schools teach it.",
        "A language with no native speakers left is not always lost for good.",
        "Public support alone was enough to bring Manx back into use."
      ],
      answer: 2,
      hints: [
        "What happened to Manx after 1974?",
        "On what two conditions does the text say revival depends?"
      ],
      optionNotes: [
        "False. 'A language rarely disappears because its last speakers die suddenly'; it usually fades when parents stop passing it on.",
        "Overstated. Revival is 'difficult but not impossible' and depends on public support and on families using the language at home.",
        "Correct. Manx 'lost its last native speaker in 1974', yet a small community 'now speaks it again'.",
        "False. Revival depends on public support 'and on families choosing to use the language at home', so public support alone is not enough."
      ],
      explanation: "One counter-example is enough to support 'not always'. The overstated options drop one of the two conditions the text sets for revival."
    },
    {
      id: "v22-06",
      topic: "Wildfire management",
      difficulty: 2,
      keyType: "inference",
      passage:
        "Prescribed burning, the deliberate setting of low-intensity fires under controlled conditions, aims to reduce the dry grass, shrubs and dead wood that let wildfires grow large. Aboriginal Australians used fire to manage land for thousands of years, and foresters in parts of the United States have relied on it for decades. In southern Europe it is less common, although Portugal and Spain have expanded its use after a series of deadly fires, as abandoned farmland has filled with shrubs and young forest. Many Mediterranean plants are also adapted to periodic fire and regenerate quickly.\n\nBurning is not risk-free. It can be carried out only in narrow windows of suitable weather, when wind, temperature and humidity keep the fire manageable, and those windows may become shorter as summers lengthen. Smoke affects nearby towns, and on rare occasions a prescribed fire escapes control.",
      stem: "Which of the following statements is correct?",
      options: [
        "Portugal and Spain may now burn more land deliberately than the United States.",
        "Mediterranean plants recover from every fire within a few months.",
        "Prescribed burning removes the risk of large wildfires where it is used.",
        "Longer summers could leave fewer suitable days for prescribed burning."
      ],
      answer: 3,
      hints: [
        "When can prescribed burning be carried out, and how might that change?",
        "Compare 'aims to reduce' with what the options promise."
      ],
      optionNotes: [
        "Not supported. The text says Portugal and Spain have expanded their use; it makes no comparison with the United States.",
        "Overstated. 'Many' Mediterranean plants 'regenerate quickly'; the text says nothing about every fire or a few months.",
        "Overstated. Burning 'aims to reduce' the fuel that lets wildfires grow large; it does not remove the risk.",
        "Correct. Burning needs 'narrow windows of suitable weather', and 'those windows may become shorter as summers lengthen'."
      ],
      explanation: "The key restates a stated limitation in practical terms. Both overstated options turn an aim or a tendency into a guarantee."
    },
    {
      id: "v22-07",
      topic: "History of printing",
      difficulty: 2,
      keyType: "combination",
      passage:
        "Printing with movable type is often credited to Johannes Gutenberg, who produced his Bible in Mainz around 1455, but the technique had been invented earlier in East Asia. In the eleventh century the Chinese artisan Bi Sheng made individual characters from baked clay, and in 1377 Korean monks printed the Jikji, the oldest surviving book printed with movable metal type.\n\nOne explanation for printing's faster impact in Europe lies in writing systems. Chinese requires thousands of distinct characters, so for many purposes carving a whole page on a wooden block remained more practical, whereas a European alphabet needed only a few dozen letters. Gutenberg also combined several innovations, including a hand mould for casting identical letters and an oil-based ink. Historians add that printing's impact depended on markets, literacy and the religious conflicts that created demand for pamphlets.",
      stem: "Which of the following statements is correct?",
      options: [
        "Metal movable type was used in Korea before Gutenberg printed his Bible.",
        "Bi Sheng cast his movable characters from metal in the eleventh century.",
        "Korean printers probably gave up movable type because metal was costly.",
        "The alphabet alone explains why printing changed Europe faster than China."
      ],
      answer: 0,
      hints: [
        "Compare the dates 1377 and 1455.",
        "How many explanations does the text give for the faster impact of printing in Europe?"
      ],
      optionNotes: [
        "Correct. The Jikji was printed 'with movable metal type' in 1377, and Gutenberg's Bible dates from 'around 1455'.",
        "False. Bi Sheng made his characters 'from baked clay'.",
        "Not supported. The text does not say that Korean printers gave up movable type, or why.",
        "Overstated. Writing systems are 'one explanation'; the text also names Gutenberg's innovations, markets, literacy and religious conflict."
      ],
      explanation: "Two dates in the first paragraph combine into the key. 'One explanation' cannot support a claim that the alphabet alone explains the difference."
    },
    {
      id: "v22-08",
      topic: "Urban sanitation",
      difficulty: 2,
      keyType: "inference",
      passage:
        "In the hot summer of 1858, the smell from the River Thames, into which London's sewage drained, became so overpowering that it was called the Great Stink. At the time many doctors believed that cholera spread through foul air, or 'miasma'; the physician John Snow had argued in 1854 that it spread through contaminated water, but his view was not yet widely accepted. Ironically, it was fear of the smell, rather than an understanding of water-borne disease, that persuaded Parliament to act.\n\nWithin weeks it funded a system designed by the engineer Joseph Bazalgette, whose intercepting sewers carried waste eastwards to be released downstream of the city. Much of the network was completed in the 1860s and 1870s. When cholera struck London in 1866, the worst-affected district was one not yet connected to the new sewers, which helped convince sceptics that the water theory was correct.",
      stem: "Which of the following statements is correct?",
      options: [
        "John Snow's water theory persuaded Parliament to fund the sewers in 1858.",
        "Parliament's quick decision may have rested on a theory later shown wrong.",
        "The new sewers released London's waste into the Thames above the city.",
        "The 1866 outbreak convinced every London doctor that cholera was water-borne."
      ],
      answer: 1,
      hints: [
        "What, according to the text, persuaded Parliament to act?",
        "Which theory of cholera did the 1866 outbreak support?"
      ],
      optionNotes: [
        "False. It was 'fear of the smell, rather than an understanding of water-borne disease' that persuaded Parliament.",
        "Correct. Parliament acted out of fear of the smell, in line with the belief in 'miasma', and the 1866 outbreak later helped show that 'the water theory was correct'.",
        "False. Waste was carried eastwards 'to be released downstream of the city'.",
        "Overstated. The outbreak 'helped convince sceptics'; the text does not say every doctor was convinced."
      ],
      explanation: "The key links the motive for a decision with later evidence about the theory behind it. The irony the text points out is easy to reverse."
    },
    {
      id: "v22-09",
      topic: "Computer chess",
      difficulty: 2,
      keyType: "paraphrase",
      passage:
        "In May 1997 IBM's Deep Blue defeated the world chess champion Garry Kasparov in a six-game match, a year after Kasparov had won their first encounter. Deep Blue relied above all on speed: special chips let it examine some 200 million positions per second, and it scored them with an evaluation function tuned with the help of grandmasters. It did not learn from experience; its knowledge of chess had largely been supplied by its designers.\n\nTwo decades later, a program called AlphaZero, given only the rules of chess, taught itself by playing millions of games against itself and soon outperformed the strongest conventional engines, while examining far fewer positions per second. Many players described its style as more intuitive and more willing to sacrifice material for long-term advantage. Today even programs on ordinary phones can beat the best humans, and professionals use them routinely to prepare.",
      stem: "Which of the following statements is correct?",
      options: [
        "IBM avoided a third match because it feared that Deep Blue would lose.",
        "Professional players generally prefer AlphaZero's style to other engines'.",
        "Unlike Deep Blue, AlphaZero began with no chess knowledge beyond the rules.",
        "Deep Blue's designers supplied all of the chess knowledge it used."
      ],
      answer: 2,
      hints: [
        "What was AlphaZero given at the start?",
        "Compare 'largely' with the options about Deep Blue's knowledge."
      ],
      optionNotes: [
        "Not supported. The text does not mention a third match or IBM's reasons for anything.",
        "Not supported. Many players found AlphaZero's style intuitive; the text says nothing about preferences.",
        "Correct. AlphaZero was 'given only the rules of chess' and taught itself, whereas Deep Blue's knowledge had been supplied by its designers.",
        "Overstated. Deep Blue's knowledge 'had largely been supplied by its designers', not entirely."
      ],
      explanation: "A paraphrase of 'given only the rules'. The distractors add a motive and a preference, and turn 'largely' into 'all'."
    },
    {
      id: "v22-10",
      topic: "Seed banks",
      difficulty: 2,
      keyType: "paraphrase",
      passage:
        "The Svalbard Global Seed Vault, opened in 2008 on a Norwegian Arctic island, stores duplicate samples of seeds held by gene banks around the world as a backup. Seeds are kept at minus eighteen degrees in chambers cut into a mountain, where permafrost would keep them frozen for some time even if cooling failed. Norway owns the facility, but the depositing gene banks retain ownership of their seeds, and only they can withdraw them; samples are not tested or used for research at Svalbard itself.\n\nThe first withdrawal came in 2015, when an agricultural research centre that had moved its headquarters from Aleppo because of the war in Syria retrieved duplicates to rebuild its collections in Lebanon and Morocco. In 2017 meltwater entered the entrance tunnel; no seeds were affected, but Norway made the tunnel more watertight.",
      stem: "Which of the following statements is correct?",
      options: [
        "Seeds stored at Svalbard are tested regularly to check that they still grow.",
        "Only the gene bank that deposited a sample is entitled to withdraw it.",
        "The research centre turned to Svalbard because its own gene bank was destroyed.",
        "Svalbard holds samples of every seed variety kept in the world's gene banks."
      ],
      answer: 1,
      hints: [
        "Who owns the seeds in the vault, and who may take them out?",
        "Check what is and is not done with samples at Svalbard itself."
      ],
      optionNotes: [
        "False. Samples 'are not tested or used for research at Svalbard itself'.",
        "Correct. The depositing gene banks 'retain ownership of their seeds, and only they can withdraw them'.",
        "Not supported. The centre moved its headquarters 'because of the war in Syria'; the text does not say its gene bank was destroyed.",
        "Overstated. The vault stores duplicates of seeds held by gene banks; nothing suggests it holds every variety."
      ],
      explanation: "An absolute key can be a faithful paraphrase of an absolute statement in the text. The distractors contradict the vault's rules, add an unstated cause and widen its coverage."
    }
  ]
});
