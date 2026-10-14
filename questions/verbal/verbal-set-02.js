EPSO_BANK.registerSet({
  id: "verbal-02",
  section: "verbal",
  title: "Verbal Reasoning · Set 2",
  description: "25 EPSO-level passages on EU institutions, law, the single market, environment and science.",
  version: 3,
  questions: [
    {
      id: "v02-01",
      topic: "Citizens' participation",
      difficulty: 2,
      keyType: "inference",
      passage:
        "The European Citizens' Initiative, introduced by the Treaty of Lisbon and available since 2012, allows citizens to invite the European Commission to propose legislation in an area where the EU has the power to act. An initiative must be organised by a group of at least seven citizens living in seven different Member States, and it must collect at least one million signatures within twelve months. The signatures must come from at least seven Member States, and in each of those a minimum number must be reached: the country's number of Members of the European Parliament multiplied by the total number of Members.\n\nBefore collection begins, the Commission checks whether the proposed initiative is admissible; it can refuse to register initiatives that manifestly fall outside its powers or are abusive or frivolous. Once an initiative has collected enough verified signatures, the organisers meet the Commission and present it at a public hearing in the European Parliament.\n\nThe Commission must then set out, within six months, what action it intends to take, if any, and its reasons. It is not obliged to propose legislation, and only a handful of the initiatives that reached one million signatures have led directly to new laws, which has led some observers to question the instrument's effectiveness.",
      stem: "Which of the following statements is correct?",
      options: [
        "However many signatures are gathered, support from only six Member States would never be enough.",
        "Once an initiative has succeeded, the Commission is obliged to propose a new law within six months.",
        "The Commission itself verifies the signatures before the organisers present the initiative.",
        "The instrument has largely failed, as few successful initiatives have led directly to new laws."
      ],
      answer: 0,
      hints: [
        "There are two signature conditions. Are they alternatives, or must both be met?",
        "In the last sentence, whose opinion is the doubt about effectiveness?"
      ],
      optionNotes: [
        "Correct. Signatures 'must come from at least seven Member States', a condition separate from the one-million total, so six countries are never enough.",
        "False. The Commission sets out what action it will take, 'if any', and 'is not obliged to propose legislation'.",
        "Not supported. The text mentions 'verified signatures' but does not say who carries out the verification.",
        "Overstated. The text reports that 'some observers' question the instrument's effectiveness; it does not itself conclude that the instrument has failed."
      ],
      explanation: "The key applies one of two cumulative conditions to a new case. Its absolute wording is justified because the rule itself is absolute. The 'largely failed' option turns a doubt that the text attributes to some observers into the text's own verdict."
    },
    {
      id: "v02-02",
      topic: "EU law",
      difficulty: 3,
      keyType: "inference",
      passage:
        "National courts are the ordinary courts of EU law: they apply it in the cases that come before them. When a national court is unsure how a provision of EU law should be interpreted, or whether an act of an EU institution is valid, it may refer a question to the Court of Justice of the European Union (CJEU). A court against whose decisions there is no judicial remedy under national law, typically a supreme court, is in principle obliged to make such a reference, although the CJEU has accepted exceptions, for example where the correct interpretation is so obvious as to leave no reasonable doubt.\n\nThe CJEU does not decide the dispute itself. It answers the question referred, and the national court then applies that answer to the facts of the case. Its interpretation binds not only the referring court but also other national courts dealing with the same issue. Only the CJEU can declare an EU act invalid; national courts may reject arguments that an act is invalid, but they cannot set it aside on their own authority.\n\nThe procedure has produced many of the landmark rulings that shaped EU law, including those establishing the principles of direct effect and primacy.",
      stem: "Which of the following statements is correct?",
      options: [
        "A court of last instance must refer every question of EU law, however obvious the answer is.",
        "Once it has answered the question, the CJEU goes on to settle the national dispute itself.",
        "A national judge who doubts an EU regulation's validity is never entitled to set it aside alone.",
        "Lower courts probably refer questions less often than supreme courts, as they are not obliged to."
      ],
      answer: 2,
      hints: [
        "Who can declare an EU act invalid, and what are national courts not allowed to do?",
        "Is the obligation on courts of last instance absolute, or does it admit exceptions?"
      ],
      optionNotes: [
        "False. The duty applies only 'in principle': the CJEU accepts exceptions where the interpretation is 'so obvious as to leave no reasonable doubt', which contradicts 'however obvious'.",
        "False. The CJEU 'does not decide the dispute itself'; the national court 'applies that answer to the facts'.",
        "Correct. 'Only the CJEU can declare an EU act invalid', and national courts 'cannot set it aside on their own authority'.",
        "Not supported. Only the duty of courts of last instance is described; the text says nothing about how often any court refers."
      ],
      explanation: "The key turns a general rule into its consequence for one judge, and the text is absolute on that point. The 'every question' option is contradicted by the exception introduced by 'although'. The option about lower courts sounds reasonable but compares frequencies that the text never gives."
    },
    {
      id: "v02-03",
      topic: "EU institutions",
      difficulty: 1,
      keyType: "paraphrase",
      passage:
        "The European Court of Auditors, based in Luxembourg, is the EU's independent external auditor. Despite its name, it is not a court of law and has no judicial powers. It checks that EU funds are correctly accounted for, raised and spent in accordance with the rules, and that they achieve value for money. It has one member from each Member State, appointed by the Council for a renewable six-year term after consulting the European Parliament.\n\nEach year the Court publishes an annual report on the implementation of the EU budget, including an estimate of the level of error in spending. An error does not necessarily mean that money has been lost or misused: it often reflects payments that did not fully comply with the rules, for example because of procurement mistakes or missing documents. The Court also publishes special reports on specific policies and programmes.\n\nWhen its auditors detect suspected fraud, they pass the information to the European Anti-Fraud Office (OLAF), which can investigate, or to the European Public Prosecutor's Office. The Parliament, on a recommendation from the Council, decides each year whether to approve the Commission's management of the budget, a procedure known as discharge, in which the Court's findings play an important part.",
      stem: "Which of the following statements is correct?",
      options: [
        "OLAF has recovered most of the EU money that the Court identified as lost through fraud.",
        "The Court's findings alone determine whether the Commission is granted discharge each year.",
        "Most errors detected by the Court are probably caused by missing documents, not fraud.",
        "Spending that the Court reports as erroneous may not have involved any loss of EU money."
      ],
      answer: 3,
      hints: [
        "What does the text say an 'error' does and does not necessarily mean?",
        "Missing documents are given as one example. Of what?"
      ],
      optionNotes: [
        "Not supported. The text says OLAF 'can investigate'; it reports nothing about money recovered.",
        "Overstated. The findings 'play an important part', but the decision belongs to the Parliament, on a recommendation from the Council.",
        "Not supported. Missing documents are one example ('for example') of non-compliance; the text does not say which cause is most common.",
        "Correct. An error 'does not necessarily mean that money has been lost or misused'."
      ],
      explanation: "The key restates a definition in other words. One trap turns 'an important part' into sole control; another promotes an example into the main cause. An example in a text never tells you how common something is."
    },
    {
      id: "v02-04",
      topic: "EU budget",
      difficulty: 2,
      keyType: "inference",
      passage:
        "The EU's long-term budget, the multiannual financial framework (MFF), sets the maximum annual amounts that the Union may spend in each broad policy area over a period of at least five years; the current framework covers 2021–2027. The MFF regulation is adopted by the Council acting unanimously, after obtaining the consent of the European Parliament. Annual budgets, adopted jointly by the Parliament and the Council, must then stay within its ceilings.\n\nThe budget is financed mainly from 'own resources': customs duties on imports from outside the EU, a share of the value added tax collected by Member States, a contribution based on non-recycled plastic packaging waste, and contributions based on each Member State's gross national income (GNI). The GNI-based resource is by far the largest source of revenue, which is one reason why debates about the budget often focus on what each country pays in and receives back.\n\nUnlike national governments, the EU may not run a deficit in its annual budget. To finance the NextGenerationEU recovery instrument, however, the Member States authorised the Commission to borrow on the capital markets on an exceptional and temporary basis, with repayment planned until 2058.",
      stem: "Which of the following statements is correct?",
      options: [
        "Customs duties on imports from outside the EU probably bring in more revenue than any other source.",
        "Any one Member State is in a position to block the adoption of a new multiannual framework.",
        "The EU's annual budget amounts to roughly one per cent of the Union's gross national income.",
        "Debates about the budget are entirely about what each Member State pays in and gets back."
      ],
      answer: 1,
      hints: [
        "What voting rule applies to the MFF regulation in the Council?",
        "Budget debates 'often' focus on one issue. Is that the same as always?"
      ],
      optionNotes: [
        "False. The GNI-based resource 'is by far the largest source of revenue'.",
        "Correct. The Council adopts the MFF 'acting unanimously', so any one Member State can withhold agreement.",
        "Not supported. The text gives no figure for the size of the budget; this relies on outside knowledge.",
        "Overstated. Debates 'often focus' on what countries pay and receive; the text does not say they concern nothing else."
      ],
      explanation: "The key draws the practical consequence of unanimity. The customs option is hedged, but a cautious tone does not rescue a claim the text contradicts. The outside-knowledge figure may be familiar, yet the passage never mentions it."
    },
    {
      id: "v02-05",
      topic: "EU institutions",
      difficulty: 2,
      keyType: "inference",
      passage:
        "The Council of the EU, where national ministers meet, is chaired by a Member State presidency that rotates every six months in an order fixed in advance. To ensure continuity, the three presidencies that follow each other work together as a 'trio' on a common 18-month programme. The presidency's role is to organise meetings, broker compromises between Member States and represent the Council in negotiations with the European Parliament; it is expected to act as a neutral broker rather than to push its own national interests. The Foreign Affairs Council is an exception: it is chaired by the High Representative of the Union for Foreign Affairs and Security Policy.\n\nThe European Council, which brings together the heads of state or government, is a separate institution. It has a permanent president, elected by its members by qualified majority for a term of two and a half years, renewable once. The president chairs its meetings and represents the EU externally on foreign and security matters at that level, without prejudice to the powers of the High Representative. The European Council defines the EU's general political directions and priorities but does not exercise legislative functions.",
      stem: "Which of the following statements is correct?",
      options: [
        "The longest anyone is allowed to serve as President of the European Council is five years.",
        "Presidencies held by smaller Member States tend to be more successful at brokering compromises.",
        "The rotating presidency chairs every configuration of the Council of the EU without exception.",
        "The President of the European Council is solely responsible for representing the EU abroad."
      ],
      answer: 0,
      hints: [
        "One term is two and a half years. How many times can it be renewed?",
        "Look for the words 'exception' and 'without prejudice'."
      ],
      optionNotes: [
        "Correct. One term of two and a half years, 'renewable once', gives a maximum of five years.",
        "Not supported. The text describes the presidency's role but never compares presidencies.",
        "False. The Foreign Affairs Council 'is an exception': it is chaired by the High Representative, not by the rotating presidency.",
        "Overstated. The president represents the EU on foreign and security matters 'at that level', 'without prejudice to the powers of the High Representative'."
      ],
      explanation: "The key needs a simple calculation from a stated rule, a common EPSO inference. The option about chairing every configuration is contradicted by the stated exception, and the option about representing the EU abroad removes the limit the text places on the president's role."
    },
    {
      id: "v02-06",
      topic: "European organisations",
      difficulty: 2,
      keyType: "combination",
      passage:
        "The Council of Europe is often confused with EU bodies, but it is a separate international organisation. Founded in 1949 and based in Strasbourg, it has 46 member states, including all 27 EU Member States; Russia was expelled in 2022. Its best-known achievement is the European Convention on Human Rights, whose application is overseen by the European Court of Human Rights, also in Strasbourg. Individuals who have exhausted the remedies available in their own country can bring a complaint against a state that is party to the Convention.\n\nBy contrast, the European Council and the Council of the EU are institutions of the European Union, and the Court of Justice of the EU, which ensures that EU law is interpreted and applied uniformly, sits in Luxembourg. The two systems nevertheless interact: the EU's Charter of Fundamental Rights states that rights corresponding to those in the Convention have the same meaning and scope, and the Treaty of Lisbon requires the EU itself to accede to the Convention, a process that has dragged on for years and is not yet complete. The Council of Europe and the EU also share the same flag, twelve gold stars on a blue background.",
      stem: "Which of the following statements is correct?",
      options: [
        "The EU Charter of Fundamental Rights simply reproduces the European Convention on Human Rights.",
        "Russia was expelled from the Council of Europe in 2022 following its full-scale invasion of Ukraine.",
        "Most complaints to the court in Strasbourg are brought against countries that are EU Member States.",
        "Every EU Member State belongs to the Council of Europe, but the EU itself has not yet joined the Convention."
      ],
      answer: 3,
      hints: [
        "How many of the Council of Europe's members are EU Member States?",
        "Has the EU's accession to the Convention been completed?"
      ],
      optionNotes: [
        "Overstated. Rights that correspond to Convention rights have 'the same meaning and scope'; nothing says the Charter contains nothing else.",
        "Not supported. The text gives the date of the expulsion but not the reason; this relies on outside knowledge.",
        "Not supported. The text gives no breakdown of the complaints brought in Strasbourg.",
        "Correct. Its members include 'all 27 EU Member States', while the EU's accession to the Convention 'is not yet complete'."
      ],
      explanation: "The key combines two facts from different paragraphs, and its absolute word rests on 'all 27'. The Russia option reuses the passage's wording but adds a cause the text never gives. The Charter option turns a partial correspondence into identity."
    },
    {
      id: "v02-07",
      topic: "Enlargement",
      difficulty: 3,
      keyType: "combination",
      passage:
        "To join the EU, a country must meet the accession criteria defined by the European Council in Copenhagen in 1993. These require stable institutions guaranteeing democracy, the rule of law, human rights and respect for and protection of minorities; a functioning market economy able to cope with competitive pressure and market forces within the Union; and the ability to take on the obligations of membership, including the capacity to implement EU law effectively. The EU's own capacity to absorb new members while maintaining the momentum of integration is also an important consideration.\n\nAccession negotiations cannot start until all Member States agree, and they are conducted in clusters of chapters covering areas such as competition, the environment and justice. Since 2020 the 'fundamentals', including the rule of law and the functioning of democratic institutions, are opened first and closed last, so that progress on them sets the pace of the negotiations as a whole. Negotiations on any chapter can be halted if the candidate's reforms stall or go into reverse.\n\nWhen negotiations are complete, the accession treaty must be approved by the Council unanimously, consented to by the European Parliament and ratified by every Member State and by the candidate country.",
      stem: "Which of the following statements is correct?",
      options: [
        "Once accession talks have opened, they continue whatever happens to the candidate's reforms.",
        "Most candidates are likely to need more than ten years to complete their accession talks.",
        "Every Member State has a veto over both the opening of talks and the final accession treaty.",
        "The EU's capacity to absorb new members is the decisive test of any country's application."
      ],
      answer: 2,
      hints: [
        "Look at what is needed before talks start and what is needed after they end.",
        "How does the text describe the EU's capacity to absorb new members?"
      ],
      optionNotes: [
        "False. Negotiations 'can be halted if the candidate's reforms stall or go into reverse'.",
        "Not supported. The text gives no information on how long negotiations usually take.",
        "Correct. Talks 'cannot start until all Member States agree', and the treaty needs unanimity in the Council and ratification 'by every Member State'.",
        "Overstated. Absorption capacity is 'an important consideration', not the decisive test."
      ],
      explanation: "The key combines the first and the last stage of the procedure; both require every Member State, so the absolute wording is supported. The absorption option upgrades 'an important consideration' to the deciding factor."
    },
    {
      id: "v02-08",
      topic: "EU Treaties",
      difficulty: 3,
      keyType: "combination",
      passage:
        "Article 50 of the Treaty on European Union, introduced by the Treaty of Lisbon, allows a Member State to withdraw from the Union in accordance with its own constitutional requirements. The state concerned notifies the European Council of its intention, and the EU then negotiates a withdrawal agreement with it, taking account of the framework for its future relationship with the Union. The agreement is concluded by the Council acting by qualified majority, after obtaining the consent of the European Parliament; the withdrawing state does not take part in the Council's discussions on its own departure.\n\nThe Treaties cease to apply to that state from the date the agreement enters into force or, failing that, two years after the notification, unless the European Council, in agreement with the state concerned, unanimously decides to extend this period. A state that has left may later ask to rejoin, but it must then go through the ordinary accession procedure like any other candidate.\n\nThe United Kingdom was the first country to use the procedure. It notified its intention in March 2017 and, after the deadline had been extended three times, left the EU on 31 January 2020. A transition period, during which EU law continued to apply to it, lasted until the end of that year.",
      stem: "Which of the following statements is correct?",
      options: [
        "A withdrawal agreement must be approved unanimously by the remaining Member States in the Council.",
        "Without an agreement, departure can be put off beyond two years only if the European Council agrees unanimously.",
        "The UK's transition period could have been extended had both sides agreed to this in 2020.",
        "The withdrawing state is excluded from all Council business while its departure is negotiated."
      ],
      answer: 1,
      hints: [
        "Two different voting rules appear: one for concluding the agreement, one for extending the deadline.",
        "The withdrawing state is excluded from one specific kind of discussion. Which?"
      ],
      optionNotes: [
        "False. The agreement is concluded by the Council 'acting by qualified majority'.",
        "Correct. Failing an agreement, the period ends after two years unless the European Council 'unanimously decides to extend' it, with the state's agreement.",
        "Not supported. The text gives the end date of the transition period but says nothing about whether it could have been extended.",
        "Overstated. It is excluded from 'the Council's discussions on its own departure', not from all Council business."
      ],
      explanation: "The key combines the default rule with the condition for extending it; 'only' is right because unanimity is a necessary condition. The transition option is an outside-knowledge trap: it may be true, but the passage does not say it."
    },
    {
      id: "v02-09",
      topic: "The euro",
      difficulty: 2,
      keyType: "inference",
      passage:
        "Euro banknotes are identical across the euro area, whereas euro coins have a common side and a national side chosen by the issuing country. All coins in circulation can be used anywhere in the euro area, whatever their national side. Each year, euro-area countries may also issue two commemorative €2 coins, which are legal tender throughout the area, as well as collector coins, which are legal tender only in the issuing country and are not intended for circulation.\n\nThe European Central Bank has the exclusive right to authorise the issue of euro banknotes; in practice they are issued by the ECB and the national central banks. Coins are issued by the national authorities, but the ECB approves the volume of coins they may issue each year. Several small states outside the EU, such as Monaco, San Marino and the Vatican City, use the euro under formal agreements with the EU and may issue a limited number of their own coins. A few other territories use the euro without any such agreement.\n\nSince 2019 the ECB and the national central banks have no longer issued €500 banknotes, although existing ones remain legal tender. In some euro-area countries, cash payments are rounded so that one- and two-cent coins are rarely needed.",
      stem: "Which of the following statements is correct?",
      options: [
        "€500 notes issued before 2019 will probably lose their status as legal tender in the coming years.",
        "Every euro coin issued by a euro-area country is legal tender throughout the euro area.",
        "Rounding of cash payments has made one- and two-cent coins unnecessary across the euro area.",
        "A €1 coin issued by Spain for circulation is valid for payment in every euro-area country."
      ],
      answer: 3,
      hints: [
        "Which coins can be used anywhere, and which only at home?",
        "Is rounding described for the whole euro area?"
      ],
      optionNotes: [
        "Not supported. The text says existing €500 notes 'remain legal tender' and makes no forecast.",
        "False. Collector coins 'are legal tender only in the issuing country', so not every euro coin is valid throughout the euro area.",
        "Overstated. Rounding happens only 'in some euro-area countries', and there the coins are 'rarely needed', not unnecessary.",
        "Correct. 'All coins in circulation can be used anywhere in the euro area, whatever their national side.'"
      ],
      explanation: "The key applies a general rule about circulating coins to one coin. The 'every euro coin' option looks almost identical but is contradicted by the collector-coin exception. Read absolute options against the exceptions in the text, not against their tone."
    },
    {
      id: "v02-10",
      topic: "Single market",
      difficulty: 2,
      keyType: "inference",
      passage:
        "Since June 2017, people travelling in the EU have been able to use their mobile phones abroad at no extra cost under the 'roam like at home' rules: calls, texts and data are charged at domestic rates, deducted from the customer's normal allowance. The rules were extended in 2022 for another ten years and also apply in Iceland, Liechtenstein and Norway, which belong to the European Economic Area.\n\nRoaming is intended for periodic travel. Operators may apply a fair use policy to prevent abuse, for example when a customer lives permanently in another country or spends most of the time abroad, and in such cases they may charge a small regulated surcharge after warning the customer. For customers on very cheap unlimited data plans, the amount of data available at domestic prices while roaming can also be capped.\n\nSince 2022, customers have also been entitled to the same quality of service abroad as at home where the visited network allows it, and to free access to emergency services. Roaming in other countries, for instance Switzerland or the United Kingdom, is not covered, and calls made from home to another EU country are subject to separate price caps.",
      stem: "Which of the following statements is correct?",
      options: [
        "A customer on a very cheap unlimited data plan may not get unlimited data at home prices abroad.",
        "The regulated surcharge for fair-use cases is set at the same level in every Member State.",
        "Calls from home to another EU country will probably be charged at domestic rates from 2032.",
        "Since 2022, travellers have been guaranteed the same quality of mobile service abroad as at home."
      ],
      answer: 0,
      hints: [
        "Look for the rule about 'very cheap unlimited data plans'.",
        "Is the right to the same quality of service unconditional?"
      ],
      optionNotes: [
        "Correct. For very cheap unlimited plans, data at domestic prices 'can also be capped'.",
        "Not supported. The surcharge is described as 'small' and 'regulated'; the text says nothing about its level in different countries.",
        "Not supported. The text says only that such calls 'are subject to separate price caps'; it gives no date or forecast.",
        "Overstated. The same quality is due only 'where the visited network allows it'."
      ],
      explanation: "The key applies an exception to the general rule. The quality option drops a condition, and the two unsupported options add a detail (a uniform level, a date) to something the text mentions only in general terms."
    },
    {
      id: "v02-11",
      topic: "Climate policy",
      difficulty: 3,
      keyType: "combination",
      passage:
        "The EU Emissions Trading System (ETS), launched in 2005, works on the 'cap and trade' principle. A cap is set on the total amount of certain greenhouse gases that can be emitted by the installations covered, and the cap is reduced over time so that total emissions fall. Within the cap, companies receive or buy emission allowances, which they can trade with one another. Each year a company must surrender enough allowances to cover all its emissions, or face heavy fines.\n\nThe system covers power and heat generation, energy-intensive industry and aviation within Europe, and it was extended to maritime transport from 2024. In its early years, too many allowances were issued and prices collapsed, so a market stability reserve was introduced to absorb the surplus. Some industries at risk of moving production outside the EU have received a share of their allowances free of charge; these free allocations are being phased out as a carbon border adjustment mechanism, which puts a price on the emissions embedded in certain imports, is phased in.\n\nA second, separate system covering fuel used in buildings and road transport is due to start later, and part of its revenues will support vulnerable households.",
      stem: "Which of the following statements is correct?",
      options: [
        "The market stability reserve was introduced in 2019 to absorb the surplus of allowances.",
        "For some industries, free allowances are giving way to a carbon charge on certain imports.",
        "Shipping firms have probably cut their emissions faster than airlines since joining the ETS.",
        "The existing ETS already covers greenhouse gas emissions from all sectors of the EU economy."
      ],
      answer: 1,
      hints: [
        "Why were free allowances given, and what is being introduced as they disappear?",
        "Which sectors will be covered only by a second, later system?"
      ],
      optionNotes: [
        "Not supported. The text explains why the reserve was introduced but gives no date.",
        "Correct. Free allocations are 'being phased out as a carbon border adjustment mechanism… is phased in', and that mechanism prices the emissions in certain imports.",
        "Not supported. The text gives no comparison of emission reductions between sectors.",
        "False. Fuel used in buildings and road transport will be covered by 'a second, separate system' that is 'due to start later', so the existing ETS does not cover all sectors."
      ],
      explanation: "The key links two clauses of one sentence: the phase-out of free allowances and the phase-in of the border mechanism. The reserve option is a close paraphrase with one added detail, a date the text never gives."
    },
    {
      id: "v02-12",
      topic: "Agriculture",
      difficulty: 2,
      keyType: "inference",
      passage:
        "The Common Agricultural Policy (CAP), launched in 1962, is one of the EU's oldest policies and still accounts for a large share of the EU budget. It is organised in two 'pillars'. The first pillar consists mainly of direct payments to farmers, together with market measures, and is financed entirely from the EU budget. The second pillar supports rural development, for example investment in farms, environmental schemes and support for young farmers; unlike the first pillar, it is co-financed by Member States.\n\nSince 2023, each Member State has implemented the CAP through a national strategic plan approved by the Commission, giving governments more freedom to design measures suited to local conditions. A portion of direct payments is reserved for 'eco-schemes', which reward farmers for practices that benefit the climate and the environment, and to receive full support farmers must respect a set of basic standards known as conditionality.\n\nCritics argue that direct payments, which are largely linked to the area farmed, still favour large landowners, with a significant share of the money going to a small proportion of recipients. Supporters reply that the payments stabilise farm incomes, which are often lower and more volatile than incomes in other sectors.",
      stem: "Which of the following statements is correct?",
      options: [
        "Around a third of the EU's long-term budget is spent on the Common Agricultural Policy.",
        "Direct payments are linked entirely to the area farmed, which is why large landowners benefit.",
        "Unlike rural development, direct payments to farmers are not co-financed by Member States.",
        "Eco-schemes have probably helped to make farm incomes more stable since their introduction."
      ],
      answer: 2,
      hints: [
        "Which pillar do direct payments belong to, and how is that pillar financed?",
        "How closely are direct payments linked to the area farmed?"
      ],
      optionNotes: [
        "Not supported. The text says only 'a large share'; the figure relies on outside knowledge.",
        "Overstated. Direct payments are 'largely linked' to the area farmed, not entirely.",
        "Correct. Direct payments make up most of the first pillar, which is 'financed entirely from the EU budget', whereas rural development 'is co-financed by Member States'.",
        "Not supported. Supporters say direct payments stabilise incomes; the text gives no evidence about the effect of eco-schemes."
      ],
      explanation: "The key places direct payments in the first pillar and applies that pillar's financing rule. The 'entirely linked' option hardens 'largely', and the eco-scheme option attaches a claim made about direct payments to a different measure."
    },
    {
      id: "v02-13",
      topic: "Regional policy",
      difficulty: 2,
      keyType: "inference",
      passage:
        "EU cohesion policy aims to reduce disparities between regions. For the 2021–2027 period, regions are grouped into three categories according to their GDP per inhabitant compared with the EU average. 'Less developed regions' have a GDP per head below 75% of the average; 'transition regions' lie between 75% and 100%; and 'more developed regions' are above 100%. Less developed regions receive the largest share of funding and the highest EU co-financing rates, so that national or regional authorities have to contribute a smaller share of the cost of each project.\n\nIn addition, the Cohesion Fund supports Member States, rather than individual regions, whose gross national income per inhabitant is below 90% of the EU average, financing transport networks and environmental projects. Funds are managed jointly: the Commission negotiates partnership agreements and programmes with each country, while national and regional authorities select and monitor projects.\n\nEvaluations generally find that cohesion spending has supported growth in poorer regions, but they also point to persistent problems, including slow absorption of the funds available and administrative capacity that varies greatly between countries. Some regions have remained below 75% of the EU average for decades.",
      stem: "Which of the following statements is correct?",
      options: [
        "A region whose GDP per head rose from 74% to 76% of the EU average would move into another category.",
        "The Cohesion Fund allocates its money directly to individual regions within the Member States.",
        "Evaluations show that cohesion spending has largely closed the gap between poorer and richer regions.",
        "Absorption of cohesion funds has been slowest in the Member States that joined most recently."
      ],
      answer: 0,
      hints: [
        "Place 74% and 76% in the bands given in the text.",
        "Does the Cohesion Fund support regions or countries?"
      ],
      optionNotes: [
        "Correct. 74% is below the 75% threshold for less developed regions; 76% falls in the transition band.",
        "False. It supports 'Member States, rather than individual regions'.",
        "Overstated. Evaluations find that spending 'supported growth', but some regions have stayed below 75% 'for decades'.",
        "Not supported. Slow absorption is named as a problem, but the text does not say where it is worst."
      ],
      explanation: "The key tests a threshold. The evaluation option turns 'supported growth' into closing the gap, which the last sentence undermines; a hedge such as 'largely' does not make an unsupported claim acceptable."
    },
    {
      id: "v02-14",
      topic: "Health",
      difficulty: 2,
      keyType: "combination",
      passage:
        "The European Health Insurance Card (EHIC) is issued free of charge by national health insurance providers. It gives the holder access to medically necessary, state-provided healthcare during a temporary stay in another EU country, as well as in Iceland, Liechtenstein, Norway and Switzerland, under the same conditions and at the same cost as people insured in that country. If treatment is free for locals, it is free for EHIC holders too; if locals pay a contribution, so do card holders, although they may be able to claim a refund at home.\n\n'Medically necessary' care is care that cannot reasonably wait until the person returns home. It includes treatment for chronic or pre-existing conditions, such as kidney dialysis, although some of these treatments must be arranged in advance with the facility providing them.\n\nThe card is not an alternative to travel insurance. It does not cover private healthcare, the cost of returning home after an illness, or lost or stolen property, and it does not cover treatment when the purpose of the trip is to obtain medical care. Travellers are therefore generally advised to take out private travel insurance as well.",
      stem: "Which of the following statements is correct?",
      options: [
        "Card holders who pay a contribution abroad are always refunded in full by their insurer at home.",
        "The card is issued free of charge and remains valid for five years from the date of issue.",
        "Most travellers who carry the card probably also take out private travel insurance.",
        "A tourist who needs regular dialysis can, with some advance planning, be treated using the card."
      ],
      answer: 3,
      hints: [
        "What does the text say about chronic conditions and advance arrangements?",
        "How certain is the refund at home?"
      ],
      optionNotes: [
        "Overstated. Card holders 'may be able to claim a refund at home'; the text promises neither a refund in every case nor a full one.",
        "Not supported. The card is issued 'free of charge', but the text says nothing about how long it is valid.",
        "Not supported. Travellers are 'advised' to take insurance; the text does not say how many do.",
        "Correct. Dialysis is given as an example of covered care, although some such treatments 'must be arranged in advance'; a tourist is not travelling to obtain care."
      ],
      explanation: "The key combines the coverage of chronic conditions with the advance-arrangement condition and the exclusion of trips made for treatment. The validity option is a close paraphrase that adds one unstated detail."
    },
    {
      id: "v02-15",
      topic: "Chemicals regulation",
      difficulty: 3,
      keyType: "combination",
      passage:
        "REACH, the EU regulation on chemicals that entered into force in 2007, places the burden of proof on industry rather than on public authorities. Companies that manufacture or import a chemical substance in quantities of one tonne or more per year must register it with the European Chemicals Agency (ECHA) in Helsinki, providing information on its properties, its uses and how it can be handled safely; the amount of information required increases with the quantity produced. The principle is often summarised as 'no data, no market': a substance that has not been registered cannot be manufactured or placed on the EU market in those quantities.\n\nSubstances of very high concern, such as those that cause cancer or accumulate in living organisms, can be placed on a list from which they may be moved to an authorisation list. Once that happens, they can be used only with a specific authorisation, which is granted only if the risks are adequately controlled or if the socio-economic benefits outweigh them and no suitable alternative exists. Certain uses of other substances can also be restricted across the EU.\n\nEnvironmental organisations argue that identifying and restricting harmful chemicals takes too long, while industry points to the high cost of registration for small companies.",
      stem: "Which of the following statements is correct?",
      options: [
        "Companies must register every substance they make or import under REACH, whatever the quantity.",
        "A firm producing ten tonnes of a substance a year must supply more data than one producing two.",
        "The cost of registration is likely to have driven a number of small firms out of the EU market.",
        "Any substance found to cause cancer is automatically placed on the authorisation list."
      ],
      answer: 1,
      hints: [
        "Do both quantities require registration, and how does the information required change with quantity?",
        "How does a substance reach the authorisation list?"
      ],
      optionNotes: [
        "False. Registration applies to quantities of 'one tonne or more per year', and 'no data, no market' applies only 'in those quantities'; the text sets a threshold, so not every quantity counts.",
        "Correct. Both quantities reach the one-tonne threshold, and 'the amount of information required increases with the quantity produced'.",
        "Not supported. Industry 'points to the high cost' for small companies; the text reports no firms leaving the market.",
        "Overstated. Such substances 'can be placed' on a list and 'may be moved' to the authorisation list; nothing is automatic."
      ],
      explanation: "The key applies two rules, the threshold and the sliding scale, to two quantities. The registration option is contradicted by the one-tonne threshold, and the cancer option removes the decision to list a substance, so nothing is automatic."
    },
    {
      id: "v02-16",
      topic: "Consumer information",
      difficulty: 2,
      keyType: "paraphrase",
      passage:
        "In March 2021, the EU energy label for several household appliances, including fridges, dishwashers, washing machines and televisions, was rescaled. Over the years so many products had reached the top classes that the old A+++ to D scale no longer helped consumers distinguish between them. The new labels use a simpler A to G scale without plus signs, and the top class was deliberately left almost empty when the new scale was introduced, so that it can be filled as technology improves.\n\nBecause the requirements for each class were tightened, a product previously rated A+++ might now be rated C or D, even though its energy consumption has not changed. To avoid confusion, retailers had to replace the old labels within a short transition period. The new labels also carry a QR code linking to an EU database with further product information, and some show additional details such as the noise level or the water consumption per cycle.\n\nOther products, such as light sources, were rescaled later, and the rescaling of further categories, including tumble dryers and space heaters, was scheduled for the following years. The label applies to appliances sold in the EU, whether they are manufactured inside or outside it.",
      stem: "Which of the following statements is correct?",
      options: [
        "Every product rated A+++ under the old scale was reclassified as C or D under the new one.",
        "QR codes on the labels have probably led consumers to choose more efficient appliances.",
        "When the new scale was introduced, few if any appliances qualified for its highest class.",
        "All appliance categories sold in the EU were rescaled at the same time in March 2021."
      ],
      answer: 2,
      hints: [
        "What was done deliberately with the top class?",
        "How many appliance categories were rescaled in March 2021?"
      ],
      optionNotes: [
        "Overstated. A product previously rated A+++ 'might now be rated C or D'; the text does not say every such product was.",
        "Not supported. The text describes the QR code but reports no effect on purchases.",
        "Correct. The top class 'was deliberately left almost empty' when the new scale was introduced.",
        "False. Only 'several' categories were rescaled in March 2021; light sources 'were rescaled later' and further categories were scheduled for the following years."
      ],
      explanation: "The key paraphrases 'left almost empty'. One option turns a possibility ('might') into a rule for every product; another gives a single rescaling date that the text contradicts, since other categories followed later."
    },
    {
      id: "v02-17",
      topic: "Single market",
      difficulty: 1,
      keyType: "paraphrase",
      passage:
        "Under an EU directive, USB-C has become the common charging port for a wide range of electronic devices. The requirement has applied to mobile phones, tablets, digital cameras, headphones, handheld video game consoles, portable speakers and similar devices since the end of December 2024, and it applies to laptops from April 2026. Devices that support fast charging must also use a common fast-charging protocol, so that any compatible charger delivers the same speed.\n\nConsumers can also buy a new device without a charger, and packaging must show by means of a pictogram whether a charger is included, together with information about the power the device needs. The Commission expects these measures to reduce electronic waste and to save consumers money, since many households already own several compatible chargers.\n\nDevices that are too small to have a USB-C port, such as smartwatches and some fitness trackers, are not covered. The directive also allows the Commission to update the rules as technology evolves; wireless charging, which is becoming more common, is likely to be the next area for harmonisation.",
      stem: "Which of the following statements is correct?",
      options: [
        "Laptops have been required to have a USB-C port since the end of December 2024.",
        "Since the end of 2024, every electronic device sold in the EU has had to have a USB-C port.",
        "Wireless chargers will probably have to follow a common EU standard from 2028 onwards.",
        "Buyers can tell from a symbol on the packaging whether a charger comes with the device."
      ],
      answer: 3,
      hints: [
        "What must packaging show, and how?",
        "Two dates appear. Which products does each apply to?"
      ],
      optionNotes: [
        "False. Laptops are covered 'from April 2026'.",
        "Overstated. Many devices are covered, but small ones such as smartwatches are not, and laptops followed later.",
        "Not supported. Wireless charging is 'likely to be the next area for harmonisation', but no date is given.",
        "Correct. Packaging 'must show by means of a pictogram whether a charger is included'."
      ],
      explanation: "The key restates a labelling duty. The wireless option keeps the passage's forecast but adds a date, a typical close-paraphrase trap."
    },
    {
      id: "v02-18",
      topic: "European Parliament",
      difficulty: 3,
      keyType: "inference",
      passage:
        "Members of the European Parliament are elected every five years by direct universal suffrage. The number of seats per Member State is based on 'degressive proportionality': larger countries have more seats than smaller ones, but smaller countries have more seats per inhabitant. No Member State may have fewer than six or more than 96 seats. Following the 2024 elections, the Parliament had 720 members.\n\nEach country organises the election according to its own rules within a common framework. All countries use a form of proportional representation, but some form a single national constituency while others are divided into regions, and some allow voters to express preferences for individual candidates. The minimum voting age is 18 in most Member States but 16 in some, such as Austria, Belgium, Germany and Malta. EU citizens living in another Member State can vote and stand there, or vote in their home country, but not in both.\n\nOnce elected, most MEPs sit in transnational political groups rather than in national delegations. Turnout in European elections fell steadily from 62% in 1979 to about 43% in 2014, before rising to just over 50% in 2019 and 2024.",
      stem: "Which of the following statements is correct?",
      options: [
        "On average, MEPs from small Member States represent fewer citizens than those from large ones.",
        "Germany, as the most populous Member State, is the only country holding the maximum of 96 seats.",
        "Turnout tends to be higher in Member States where people are allowed to vote from sixteen.",
        "Because MEPs sit in political groups, national delegations play no part in the Parliament."
      ],
      answer: 0,
      hints: [
        "Turn 'more seats per inhabitant' around: what does it mean for inhabitants per seat?",
        "Does the text say which country holds the largest number of seats?"
      ],
      optionNotes: [
        "Correct. More seats per inhabitant means fewer inhabitants per seat in small countries.",
        "Not supported. The text gives the 96-seat ceiling but does not say which country reaches it; this relies on outside knowledge.",
        "Not supported. The text gives no turnout figures by voting age.",
        "Overstated. 'Most' MEPs sit in political groups 'rather than in national delegations'; the text does not say the delegations have no role."
      ],
      explanation: "The key inverts a ratio, a frequent EPSO inference. The Germany option is an outside-knowledge trap: it may be true, but the passage only states the ceiling."
    },
    {
      id: "v02-19",
      topic: "European Commission",
      difficulty: 3,
      keyType: "combination",
      passage:
        "The President of the European Commission is proposed by the European Council, acting by qualified majority and taking into account the results of the European Parliament elections. The candidate is then elected by the Parliament by a majority of its component members; if the candidate fails to obtain that majority, the European Council must propose a new candidate within a month. The President-elect, together with the Council, then adopts the list of the other Commissioners, one from each Member State, on the basis of suggestions by national governments.\n\nEach candidate Commissioner appears at a hearing before the relevant parliamentary committee, and committees have on several occasions rejected candidates, forcing governments to nominate someone else. The whole College is then subject to a single vote of consent by the Parliament, after which it is formally appointed by the European Council.\n\nThe Parliament can later force the entire Commission to resign by adopting a motion of censure by a two-thirds majority of the votes cast, representing a majority of its members. No motion of censure has ever been adopted, although in 1999 the Santer Commission resigned before a likely vote.",
      stem: "Which of the following statements is correct?",
      options: [
        "A motion of censure needs the support of two-thirds of all the Members of the Parliament.",
        "The Santer Commission resigned mainly because of allegations of fraud and mismanagement.",
        "Though it votes on the College as a whole, the Parliament has in practice shaped who becomes a Commissioner.",
        "The choice of the Commission President rests solely with the European Parliament."
      ],
      answer: 2,
      hints: [
        "What happened after committee hearings on several occasions?",
        "Two-thirds of what, exactly, is needed for a motion of censure?"
      ],
      optionNotes: [
        "False. The text requires two-thirds 'of the votes cast', representing a majority of members, not two-thirds of all members.",
        "Not supported. The text gives no reason for the 1999 resignation; this relies on outside knowledge.",
        "Correct. The formal vote covers the whole College, but committees 'have on several occasions rejected candidates, forcing governments to nominate someone else'.",
        "False. The Parliament elects the President, but the candidate 'is proposed by the European Council', so the choice does not rest with the Parliament alone."
      ],
      explanation: "The key combines the single formal vote with the practical effect of the hearings. The censure option misreads the base of the two-thirds majority, a contradiction rather than an exaggeration."
    },
    {
      id: "v02-20",
      topic: "Borders",
      difficulty: 2,
      keyType: "paraphrase",
      passage:
        "Frontex, the European Border and Coast Guard Agency, is based in Warsaw. It supports EU Member States and Schengen-associated countries in managing the EU's external borders, for example by coordinating joint operations, deploying border guards from its standing corps, carrying out risk analysis and assisting with the return of people who have no right to stay. The standing corps, created in 2019, is being built up to a planned 10,000 officers, made up of agency staff and officers seconded by Member States.\n\nHowever, Member States retain primary responsibility for controlling their own sections of the external border. Frontex staff deployed on a Member State's territory operate under the command of that state, and an operation requires its agreement. The agency may intervene without such a request only in a narrow set of circumstances, and even then the Member State concerned must cooperate.\n\nThe agency has a Fundamental Rights Officer and a complaints mechanism, which anyone who believes their rights have been violated during a Frontex operation can use. Reports of alleged pushbacks at the borders have nevertheless led to investigations and to the resignation of its executive director in 2022.",
      stem: "Which of the following statements is correct?",
      options: [
        "The executive director resigned in 2022 after an OLAF inquiry into alleged pushbacks.",
        "Anyone who thinks Frontex staff violated their rights can complain to the agency.",
        "Frontex can never act on a Member State's territory unless that state has asked it to.",
        "The standing corps is likely to reach its planned strength of 10,000 officers by 2027."
      ],
      answer: 1,
      hints: [
        "What mechanism exists for people who believe their rights were violated?",
        "Is intervention without a request completely impossible?"
      ],
      optionNotes: [
        "Not supported. The text links the resignation to 'investigations' but does not say who carried them out.",
        "Correct. The complaints mechanism can be used by 'anyone who believes their rights have been violated' during an operation.",
        "False. The agency 'may intervene without such a request' in 'a narrow set of circumstances', which contradicts 'never'.",
        "Not supported. The corps 'is being built up'; the text gives no date for reaching full strength."
      ],
      explanation: "The key paraphrases a stated right. The 'never' option is contradicted by a narrow exception, and the two unsupported options each add a detail (an investigator, a date) to facts the text gives only in general."
    },
    {
      id: "v02-21",
      topic: "Justice",
      difficulty: 2,
      keyType: "inference",
      passage:
        "The European Public Prosecutor's Office (EPPO), based in Luxembourg, started operating in June 2021. It is an independent body responsible for investigating, prosecuting and bringing to judgment crimes against the EU's financial interests, such as fraud involving EU funds, corruption and serious cross-border VAT fraud involving damage of at least €10 million.\n\nThe EPPO was set up through 'enhanced cooperation', which means that not all Member States take part; in non-participating countries, national authorities remain responsible for these offences, and the EPPO relies on cooperation agreements with them. It works through European Delegated Prosecutors located in the participating Member States, who conduct investigations under the supervision of a central office and bring cases before national courts, applying national criminal procedure.\n\nBefore the EPPO existed, the investigation of fraud against the EU budget depended entirely on national prosecutors, whose priorities and resources varied widely, and on the European Anti-Fraud Office (OLAF), which can carry out administrative investigations but cannot prosecute. OLAF continues to exist, and the two bodies are expected to complement each other. In its first years, the EPPO opened investigations into estimated damages running into billions of euros.",
      stem: "Which of the following statements is correct?",
      options: [
        "Most of the EPPO's investigations so far have concerned fraud involving agricultural subsidies.",
        "Since 2021, the EPPO has prosecuted fraud against the EU budget in all of the Member States.",
        "The EPPO investigates every crime against the EU's financial interests, whatever the damage.",
        "A cross-border VAT fraud causing €5 million of damage is below the EPPO's VAT threshold."
      ],
      answer: 3,
      hints: [
        "Check the damage threshold for VAT fraud.",
        "In which countries does the EPPO operate?"
      ],
      optionNotes: [
        "Not supported. The text gives the total estimated damage but no breakdown by sector.",
        "False. 'Not all Member States take part'; in non-participating countries 'national authorities remain responsible for these offences'.",
        "Overstated. Its VAT competence starts at €10 million, and it does not operate in non-participating countries.",
        "Correct. The VAT competence covers fraud 'involving damage of at least €10 million'."
      ],
      explanation: "The key applies a numerical threshold to a new figure. The option about all Member States is contradicted by the enhanced cooperation, and the 'whatever the damage' option drops the threshold for VAT fraud."
    },
    {
      id: "v02-22",
      topic: "Marine science",
      difficulty: 1,
      keyType: "paraphrase",
      passage:
        "Reef-building corals live in partnership with microscopic algae that live inside their tissues. The algae provide the coral with most of its food through photosynthesis and give it much of its colour. When water temperatures stay unusually high for a prolonged period, corals become stressed and expel the algae, turning white, a process known as bleaching. Heat is the main trigger, but strong sunlight, pollution and changes in salinity can also contribute.\n\nA bleached coral is not dead, and it can recover if conditions return to normal quickly enough for the algae to recolonise its tissues. If the stress continues, however, the coral is likely to starve and die. Even corals that survive may grow and reproduce more slowly for some time and become more vulnerable to disease.\n\nScientists warn that more frequent marine heatwaves give reefs less time to recover between bleaching events. Some coral species and some individual colonies are more heat-tolerant than others, and researchers are studying whether these could be used to help restore damaged reefs, although they caution that such efforts cannot replace reductions in greenhouse gas emissions.",
      stem: "Which of the following statements is correct?",
      options: [
        "A coral that survives bleaching may still be weakened for some time afterwards.",
        "Bleached corals usually recover within a few weeks once the water temperature falls.",
        "Heat is the only factor capable of causing corals to lose their algae and turn white.",
        "More than half of the world's coral reefs have bleached at least once since 2000."
      ],
      answer: 0,
      hints: [
        "What does the text say about corals that survive?",
        "Is heat described as the only cause or the main one?"
      ],
      optionNotes: [
        "Correct. Survivors 'may grow and reproduce more slowly for some time and become more vulnerable to disease'.",
        "Not supported. Corals 'can recover' if conditions return to normal quickly enough; the text gives no typical recovery time.",
        "False. Heat is 'the main trigger', but strong sunlight, pollution and changes in salinity 'can also contribute', so heat is not the only factor.",
        "Not supported. The text gives no global figures."
      ],
      explanation: "The key paraphrases the after-effects of bleaching. The recovery option sounds cautious, but its time frame is invented; a hedge does not make a claim supported."
    },
    {
      id: "v02-23",
      topic: "History of science",
      difficulty: 2,
      keyType: "inference",
      passage:
        "In 1928, Alexander Fleming noticed that a mould contaminating one of his bacterial cultures had killed the surrounding bacteria. He named the active substance penicillin and published his observations, but he struggled to purify it in useful quantities, and for about a decade the discovery attracted little attention.\n\nAt the end of the 1930s, a team at the University of Oxford led by Howard Florey and Ernst Chain developed methods to extract and purify the drug, and in 1940 they showed that it protected infected mice. The first human patient they treated, a policeman, improved at first in 1941 but died when supplies ran out. Because British industry was stretched by the war, much of the development of large-scale production took place in the United States, where researchers found a more productive strain of mould and better fermentation methods.\n\nBy the time of the Normandy landings in 1944, penicillin was available in sufficient quantities to treat Allied troops. In 1945, Fleming, Florey and Chain shared the Nobel Prize in Physiology or Medicine. In his Nobel lecture, Fleming warned that bacteria could become resistant if the drug was used in doses that were too low.",
      stem: "Which of the following statements is correct?",
      options: [
        "Large-scale production of penicillin was developed entirely in the United States.",
        "Fleming's warning about resistance was probably ignored by most doctors at the time.",
        "The first patient most likely died because the drug ran short, not because it failed.",
        "By 1944 penicillin was available in quantities sufficient to treat everyone who needed it."
      ],
      answer: 2,
      hints: [
        "What happened to the first patient before he died, and when did he die?",
        "Who exactly could be treated with penicillin by 1944?"
      ],
      optionNotes: [
        "Overstated. 'Much of' the development took place in the United States, not all of it.",
        "Not supported. The text reports the warning but not how doctors responded to it.",
        "Correct. He 'improved at first' and died 'when supplies ran out', which points to the shortage rather than to the drug failing.",
        "Overstated. By 1944 there was enough 'to treat Allied troops'; the text does not extend this to everyone."
      ],
      explanation: "The key infers a probable cause from the sequence 'improved at first… died when supplies ran out', and its hedge matches the strength of that evidence. Two options widen a limited statement: 'much of' becomes 'entirely', and 'Allied troops' becomes 'everyone'."
    },
    {
      id: "v02-24",
      topic: "Energy technology",
      difficulty: 2,
      keyType: "inference",
      passage:
        "A heat pump does not generate heat by burning fuel. Instead, it uses electricity to move heat from one place to another, for example from the outside air, the ground or water into a building. Because it moves heat rather than creating it, a heat pump can deliver several units of heat for each unit of electricity it consumes; this ratio is known as the coefficient of performance.\n\nAir-source heat pumps work even when the outside air is cold, but their efficiency falls as the temperature difference between outside and inside increases. Ground-source systems draw on the more stable temperature below the surface and are therefore more efficient in winter, but they cost more to install because of the drilling or digging required. Heat pumps also work best in well-insulated buildings with large radiators or underfloor heating, because they deliver heat at lower temperatures than gas boilers.\n\nThe climate benefit of a heat pump depends partly on how the electricity it uses is generated. The running cost depends on the price of electricity relative to that of gas, which differs considerably between countries; where electricity is expensive, savings on bills can be small even though the heat pump uses less energy overall.",
      stem: "Which of the following statements is correct?",
      options: [
        "Most new homes in the EU are likely to be built with heat pumps rather than gas boilers.",
        "Installing a heat pump does not guarantee lower energy bills in every country.",
        "Thanks to their efficiency in winter, ground-source heat pumps are the better choice for every household.",
        "Because they deliver heat at lower temperatures, heat pumps cannot work in poorly insulated buildings."
      ],
      answer: 1,
      hints: [
        "What determines the running cost of a heat pump?",
        "Ground-source systems have one advantage and one drawback."
      ],
      optionNotes: [
        "Not supported. The text gives no information on new homes.",
        "Correct. Running costs depend on electricity prices relative to gas, which differ between countries, and 'savings on bills can be small'.",
        "Overstated. Ground-source systems are more efficient in winter but 'cost more to install', so the text does not make them best for everyone.",
        "Overstated. Heat pumps 'work best' in well-insulated buildings; the text does not say they cannot work elsewhere."
      ],
      explanation: "The key draws a careful conclusion from a conditional statement. Both overstated options keep a stated advantage and ignore the limit beside it: 'work best' is not 'only work', and greater efficiency is not the better choice for everyone."
    },
    {
      id: "v02-25",
      topic: "Urban environment",
      difficulty: 1,
      keyType: "paraphrase",
      passage:
        "Cities are often several degrees warmer than the surrounding countryside, especially at night. This 'urban heat island' effect arises because materials such as asphalt, concrete and brick absorb solar heat during the day and release it slowly after sunset, while buildings, air conditioning and traffic produce additional waste heat. Cities also have less vegetation, so less cooling comes from the evaporation of water from plants and soil, and tall buildings can trap heat and reduce air flow.\n\nDuring heatwaves the effect increases health risks, especially for older people, young children and people with chronic illnesses, partly because high night-time temperatures prevent the body from recovering from the heat of the day. Within a single city, temperatures can vary considerably between neighbourhoods, and poorer districts with fewer trees are often among the hottest.\n\nMeasures such as planting trees, creating parks and green roofs, and using lighter-coloured surfaces that reflect more sunlight can reduce temperatures locally. Air conditioning protects people indoors but releases heat outside and, depending on how the electricity is produced, can add to greenhouse gas emissions, so planners increasingly combine it with passive measures such as shading and ventilation.",
      stem: "Which of the following statements is correct?",
      options: [
        "Green roofs lower city temperatures more effectively than lighter-coloured surfaces.",
        "The poorest districts of a city are always the hottest ones during a heatwave.",
        "Planting trees and creating parks can lower temperatures across an entire city.",
        "Warm nights add to the health risk by denying the body a chance to recover."
      ],
      answer: 3,
      hints: [
        "Why do high night-time temperatures increase health risks?",
        "Are poorer districts 'always' or 'often' among the hottest, and do greening measures work locally or citywide?"
      ],
      optionNotes: [
        "Not supported. Both measures are listed; the text does not compare them.",
        "Overstated. Poorer districts with fewer trees are 'often among the hottest', not always the hottest.",
        "Overstated. Such measures 'can reduce temperatures locally'; the text does not say they cool a whole city.",
        "Correct. High night-time temperatures 'prevent the body from recovering from the heat of the day'."
      ],
      explanation: "The key paraphrases a causal explanation. One trap hardens 'often among' into 'always'; the other keeps the hedge 'can' but widens 'locally' to the whole city."
    }
  ]
});
