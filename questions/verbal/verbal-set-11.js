EPSO_BANK.registerSet({
  "id": "verbal-11",
  "section": "verbal",
  "title": "Verbal reasoning · Set 11 — Very hard",
  "description": "10 original challenging exam-length passages on fictional procedures and studies. Linked deductions, exceptions, scope and evidence limits. Timed practice: 17 min 30 sec. Editorial difficulty pending learner calibration.",
  "version": 2,
  "challenge": true,
  "questions": [
    {
      "id": "v11-01-c",
      "topic": "Supplier-comparison composition",
      "difficulty": 3,
      "challenge": true,
      "keyType": "inference",
      "passage": "A fictional agency compared the delivery times of two suppliers over the same quarter, using one definition of delivery time. Supplier Birch delivered standard components in an average of four days and specialist components in twelve. Supplier Alder averaged five days for standard components and thirteen for specialist components. Specialist orders generally took longer with either supplier. Birch mainly handled specialist work and Alder mainly standard work, but the agency's summary omitted the exact mix and each supplier's overall average.\n For a planning exercise, an analyst recombined each supplier's observed category averages as if it had handled equal numbers of standard and specialist orders. The exercise did not reassign any actual order and did not predict how delivery times would respond to a changed contract. No observation showed whether either supplier could keep its category averages if the amount or type of its work really changed.",
      "stem": "Which of the following statements is correct?",
      "options": [
        "Birch had the lower observed overall average, as it was faster in each separate category.",
        "Birch's speed in both categories proves that Alder had the smaller share of standard orders.",
        "Under equal weights, the two suppliers' recombined averages come out identical.",
        "With equal order numbers Birch is faster; its overall average and future times are unknown."
      ],
      "answer": 3,
      "hints": [
        "Distinguish observed overall averages from recombinations using common category weights.",
        "Ask whether changing weights in an arithmetic exercise establishes what would happen to actual delivery performance."
      ],
      "optionNotes": [
        "Not supported. Birch was faster in each category, but the summary 'omitted the exact mix and each supplier's overall average', so the observed ranking is unknown.",
        "False. The passage says Alder 'mainly' handled 'standard work'; category speed does not fix the mix.",
        "False. With equal numbers Birch averages eight days and Alder nine, because each of Birch's category means is lower.",
        "Correct. Birch's lower means survive equal weights, but the mix is undisclosed and no observation shows future performance under real change."
      ],
      "explanation": "A standardised comparison can remove a composition difference without measuring the effect of an actual intervention.",
      "reasoning": {
        "model": "Standardised comparison versus intervention prediction",
        "evidence": [
          "standard components in an average of four days and specialist components in twelve",
          "five days for standard components and thirteen for specialist components",
          "equal numbers of standard and specialist orders",
          "did not reassign any actual order"
        ]
      },
      "reviewedAs": "v11-06",
      "solution": [
        "Birch is one day faster in each category. With equal counts, its mean is (4 + 12) / 2 = 8 days, versus (5 + 13) / 2 = 9 days for Alder.",
        "The actual category mixes and overall means are not supplied, so the original aggregate ranking remains unknown.",
        "No orders were reassigned, and no evidence shows whether the category means would persist after a real workload change."
      ],
      "supersedes": "v11-01"
    },
    {
      "id": "v11-02-c",
      "topic": "Rare-species survey sensitivity",
      "difficulty": 3,
      "challenge": true,
      "keyType": "inference",
      "passage": "A fictional woodland study used sound recorders to search for a rare bird. A recognised call in a recording was accepted as evidence that the bird had visited the recorder's detection area, but the absence of a call was not taken as evidence of absence: birds might stay silent, be masked by other sounds or pass beyond the effective range. The researchers described the method as capable of confirming some visits rather than proving absence.\n Both seasons covered the same 30 sites, and every site produced a usable recording each time. Recorders ran for two nights per site in the first season and eight in the second. Recognised calls were found at 14 sites in the first season and 23 in the second. Weather and the number of individual birds were not measured consistently, and the report does not say which sites were positive in both seasons.",
      "stem": "Which of the following statements is correct?",
      "options": [
        "Each first-season positive site yielded a call again, since recording ran for longer.",
        "With a fixed set of sites, only the fourteen earlier positives could yield calls again.",
        "At least nine sites newly yielded calls, but this does not show nine newly occupied sites.",
        "The 23 positive sites prove that at least 23 different birds were present in that season."
      ],
      "answer": 2,
      "hints": [
        "Compare the two positive-site totals on the same set of sites.",
        "How many later positives can fit among the earlier positives, and what does a negative recording actually establish?"
      ],
      "optionNotes": [
        "Not supported. Longer recording gave more chances of detection, but the report 'does not say which sites were positive in both seasons'.",
        "False. Calls came from 23 sites in the second season, which cannot all be among the fourteen earlier positives.",
        "Correct. At most 14 of the 23 positives were earlier positives, and the method cannot prove 'absence' at the other sites earlier.",
        "Not supported. A call shows that 'the bird had visited' an area; one bird could visit several, and individuals were not counted."
      ],
      "explanation": "A bound on newly detected sites is not a bound on newly occupied sites when detection is imperfect.",
      "reasoning": {
        "model": "Existential overlap bound with imperfect detection",
        "evidence": [
          "14 sites in the first season and 23 in the second",
          "capable of confirming some visits rather than proving absence",
          "same 30 sites"
        ]
      },
      "reviewedAs": "v11-03",
      "solution": [
        "Only 14 sites were positive in the first season, while 23 were positive in the second.",
        "At most 14 later positives can come from earlier positive sites, so at least 23 − 14 = 9 had not previously yielded recognised calls.",
        "An earlier negative does not prove that birds were absent, and these counts do not establish the exact overlap."
      ],
      "supersedes": "v11-02"
    },
    {
      "id": "v11-03-c",
      "topic": "Publication queues and logical selection",
      "difficulty": 3,
      "challenge": true,
      "keyType": "inference",
      "passage": "A fictional journal sends a submission to its fast review queue when it has both an open-data statement and a complete methods checklist; otherwise it goes to the standard queue. Fast review changes the order of processing, not the publication standard: papers in either queue are accepted only after independent peer review. An author can move a paper out of the standard queue by supplying the missing documents before an editor is assigned. Once an editor is assigned, the queue is fixed for that review round. A queue entry records the documents' status when the queue decision was made, not their continued public availability. No comparative acceptance rates have been published.\n Paper Rowan entered the standard queue and received an editor on Monday; its missing open-data statement arrived on Tuesday, its checklist already complete. Paper Hazel's fast-queue entry is confirmed, but no editor or review decision has been announced, and a statement has since disappeared from Hazel's web page. No exceptional transfer has been authorised.",
      "stem": "Which of the following statements is correct?",
      "options": [
        "Rowan must now move to fast review, and the missing web statement voids Hazel's entry.",
        "Hazel has already passed peer review, since its fast entry required complete documents.",
        "Rowan's queue is now fixed; Hazel's entry attests past documents, not review success.",
        "Rowan is less likely to be accepted than Hazel, as fast-queue papers are processed first."
      ],
      "answer": 2,
      "hints": [
        "Locate the timing cutoff for queue transfer.",
        "Ask which time and which decision Hazel's queue label actually certifies."
      ],
      "optionNotes": [
        "False. Rowan's editor was assigned before the statement arrived, so its queue 'is fixed'; Hazel's entry reflects documents 'when the queue decision was made'.",
        "Not supported. Papers in either queue 'are accepted only after independent peer review', and no review decision for Hazel has been announced.",
        "Correct. Rowan's documents came after editor assignment, and a queue entry records documents at decision time, not peer-review results.",
        "Not supported. 'No comparative acceptance rates have been published', and fast review changes only processing order."
      ],
      "explanation": "A status can certify a historical condition without proving a later condition or a different kind of approval. Process priority is not outcome quality.",
      "reasoning": {
        "model": "Cutoff timing and historical-status interpretation",
        "evidence": [
          "Once an editor is assigned, the queue is fixed",
          "records the documents' status when the queue decision was made",
          "accepted only after independent peer review",
          "received an editor on Monday"
        ]
      },
      "reviewedAs": "v10-16",
      "supersedes": "v11-03"
    },
    {
      "id": "v11-04-c",
      "topic": "Counterpart obligations in a repair network",
      "difficulty": 3,
      "challenge": true,
      "keyType": "inference",
      "passage": "A fictional repair network recognises workshops as registered partners or occasional subcontractors. Every registered partner holds a current safety audit. Any workshop performing electrical repairs, subcontractors included, also needs an electrical endorsement, which a safety audit does not confer and mechanical work does not require. Endorsements are issued by the network's own assessor or by a recognised external board. Both routes require evidence of a supervised electrical repair assessment, which partner audits do not include. The network's directory shows registrations and advertised services, not assessment records.\n Workshop Elm is a registered partner and has performed an electrical repair under the stated rules, with no exception; the directory does not say which endorsement route it used. Workshop Ash is also a partner, but the available report records only mechanical repairs and no electrical work, endorsement or assessment for it. The two workshops share an owner and premises, but registrations, audits and endorsements attach separately to each workshop.",
      "stem": "Which of the following statements is correct?",
      "options": [
        "Ash holds an endorsement, as its shared owner supplies the assessment evidence behind Elm's.",
        "Elm's record implies an audit and a supervised assessment; Ash's endorsement is unproven.",
        "Partner audits include a supervised electrical assessment to secure electrical safety.",
        "Elm's endorsement came from the external board, since the directory lists no assessor record."
      ],
      "answer": 1,
      "hints": [
        "Find the prerequisite shared by both endorsement routes.",
        "Keep workshop-specific obligations separate from shared ownership and partner status."
      ],
      "optionNotes": [
        "False. Endorsements 'attach separately to each workshop', and nothing records an endorsement or assessment for Ash.",
        "Correct. Elm's partner status entails an audit, and its compliant electrical repair entails an endorsement, which on 'both routes' requires a supervised assessment.",
        "False. The supervised assessment is something 'partner audits do not include'.",
        "Not supported. The directory shows 'not assessment records', so it cannot reveal which route Elm used."
      ],
      "explanation": "Combine shared route prerequisites with a separate status obligation. Similar organisations do not inherit each other's authorisations merely through a common owner.",
      "reasoning": {
        "model": "Shared route prerequisites across nontransferable entities",
        "evidence": [
          "Every registered partner holds a current safety audit",
          "Both routes require evidence of a supervised electrical repair assessment",
          "performed an electrical repair under the stated rules",
          "attach separately to each workshop"
        ]
      },
      "reviewedAs": "v10-15",
      "supersedes": "v11-04"
    },
    {
      "id": "v11-05-c",
      "topic": "Food-storage inspection domains",
      "difficulty": 3,
      "challenge": true,
      "keyType": "inference",
      "passage": "A fictional food depot checks temperature and packaging separately. A batch can enter distribution only if its temperature record is acceptable and its packages pass inspection. Each batch file holds a transport logger record and a seal inspection result. The room display shows only the current room reading, which does not establish a batch's temperature history before arrival. A missing logger record can be replaced by an approved supplier certificate, but not by a room reading. A certificate covers temperature history only and does not waive package inspection.\n Batch Cedar arrived without a logger record. Cedar's supplier certificate has now been approved, and its packages have passed inspection. Batch Fern has a complete acceptable transport logger record but failed package inspection. The room temperature is acceptable for both. Neither batch has an exemption, and no other release requirement applies. The depot has not published the cause of Fern's package failure or which suppliers provided either batch.",
      "stem": "Which of the following statements is correct?",
      "options": [
        "All batches with acceptable logger records must be released, Fern's included.",
        "Neither batch qualifies, as a supplier certificate can never stand in for a logger record.",
        "Cedar meets both release conditions; Fern's logger cannot offset its failed packages.",
        "Fern's supplier damaged its packages in transport, a failure that Cedar's supplier avoided."
      ],
      "answer": 2,
      "hints": [
        "Separate the temperature-history condition from the packaging condition.",
        "Determine exactly which evidence an approved supplier certificate is allowed to replace."
      ],
      "optionNotes": [
        "False. A batch is released 'only if' its temperature record is acceptable 'and its packages pass inspection'; Fern failed inspection.",
        "False. 'A missing logger record can be replaced by an approved supplier certificate'.",
        "Correct. Cedar's approved certificate replaces its missing logger record and its packages passed; Fern's good history does not cure its package failure.",
        "Not supported. The depot 'has not published the cause of Fern's package failure' or the suppliers."
      ],
      "explanation": "Alternative evidence for one prerequisite does not remove a separate prerequisite.",
      "reasoning": {
        "model": "Different evidence routes completing independent conditions",
        "evidence": [
          "only if its temperature record is acceptable and its packages pass inspection",
          "replaced by an approved supplier certificate",
          "Cedar's supplier certificate has now been approved",
          "Fern has a complete acceptable transport logger record but failed package inspection"
        ]
      },
      "reviewedAs": "v11-18",
      "solution": [
        "Release needs acceptable temperature history and satisfactory packaging.",
        "Cedar's approved certificate replaces its missing logger record and its packaging passes, so both conditions are satisfied.",
        "Fern's acceptable logger addresses history, but its packaging failure remains; one condition cannot substitute for the other."
      ],
      "supersedes": "v11-05"
    },
    {
      "id": "v11-06-c",
      "topic": "Conservation marks and loaned objects",
      "difficulty": 3,
      "challenge": true,
      "keyType": "inference",
      "passage": "Under a fictional collections service's rules, an object is classed as conserved only after its treatment dossier has been approved. Every approved treatment dossier receives a digital authenticity mark, and no exception allows an approved dossier to remain unmarked. A mark does not show that conservation took place, however: marked dossiers can also record examination without treatment. Lending an object is not in itself a treatment or a dossier approval.\n During a temporary transfer to a gallery, some loaned objects were found to have dossiers without an authenticity mark. The service confirmed that these dossiers were genuinely unmarked, not merely missing a mark in the public catalogue. The report did not identify the objects concerned, the number of marked dossiers among the loans or the contents of the unmarked ones. Cleaning transport cases and checking hanging systems before the exhibition do not count as conservation, and the report did not claim that the loaned objects shared one treatment category.",
      "stem": "Which of the following statements is correct?",
      "options": [
        "Some loaned objects cannot be classed as conserved, as their dossiers lack the required mark.",
        "A marked dossier is enough to class an object as conserved, as a mark shows treatment.",
        "None of the loaned objects can be classed as conserved, given the unmarked dossiers found.",
        "Some of the genuinely unmarked dossiers had nonetheless received treatment approval."
      ],
      "answer": 0,
      "hints": [
        "Write the implications in order: conserved, approved dossier, authenticity mark.",
        "Then reason backwards from the confirmed existence of unmarked loan dossiers."
      ],
      "optionNotes": [
        "Correct. Conserved requires an approved dossier, and 'Every approved treatment dossier receives a digital authenticity mark'; unmarked dossiers therefore mean some loans are not conserved.",
        "False. 'Marked dossiers can also record examination without treatment.'",
        "Overstated. Only 'some loaned objects' had unmarked dossiers; the others are not shown to be unconserved.",
        "False. 'No exception allows an approved dossier to remain unmarked', and these dossiers were 'genuinely unmarked'."
      ],
      "explanation": "An implication can be used contrapositively, but not reversed. Existence of one excluded subgroup does not exclude the entire group.",
      "reasoning": {
        "model": "Contrapositive chain with existential information",
        "evidence": [
          "classed as conserved only after its treatment dossier has been approved",
          "Every approved treatment dossier receives a digital authenticity mark",
          "some loaned objects were found to have dossiers without an authenticity mark"
        ]
      },
      "reviewedAs": "v10-06",
      "supersedes": "v11-06"
    },
    {
      "id": "v11-07-c",
      "topic": "Green-space access and group nesting",
      "difficulty": 3,
      "challenge": true,
      "keyType": "inference",
      "passage": "A fictional park programme offers evening access to residents holding either a local keycard or a permit from a participating school; holding both is allowed. Every local keycard holder has completed an identity check. A school permit can be issued without that check, but everyone entering on a school permit must enter with a named supervisor from the programme's roster present, adults included. Adults using a keycard can enter unsupervised. Children require a rostered supervisor regardless of entry document, and a supervisor's presence does not itself confer a document. The gate log records lawful admissions and ages, not the document used or any identity check.\n The log shows an adult, Orla, lawfully admitted without any rostered supervisor present, and a child, Ren, lawfully admitted with one. Their document files are not released. No admission used an exception or any other kind of document. Nothing in the record shows whether Ren held one document or both, or whether Ren had separately completed an identity check.",
      "stem": "Which of the following statements is correct?",
      "options": [
        "Even entrants holding just a school permit must have passed an identity check.",
        "Orla's only possible document was a keycard, with its identity check; Ren's is unknown.",
        "Children on a keycard need no supervisor, so Ren's supervisor shows a school permit was used.",
        "Orla has no connection with any participating school, since she entered unsupervised."
      ],
      "answer": 1,
      "hints": [
        "Use absence of a supervisor to eliminate Orla's unavailable route.",
        "For Ren, determine whether the supervisor requirement distinguishes the routes or is shared by both."
      ],
      "optionNotes": [
        "False. 'A school permit can be issued without that check'; the check is tied to keycards.",
        "Correct. Without a supervisor Orla cannot have entered on a school permit, so she used a keycard, and every holder 'has completed an identity check'. Children need a supervisor on either route.",
        "False. 'Children require a rostered supervisor regardless of entry document'.",
        "Not supported. Her entry route shows only which document she used, not whether she has any link with a school."
      ],
      "explanation": "The same observed accompaniment has different inferential value for adults and children. A necessary condition becomes informative only when it distinguishes the available routes.",
      "reasoning": {
        "model": "Age-dependent route elimination and converse traps",
        "evidence": [
          "Every local keycard holder has completed an identity check",
          "everyone entering on a school permit must enter with a named supervisor",
          "Children require a rostered supervisor regardless",
          "adult, Orla, lawfully admitted without any rostered supervisor"
        ]
      },
      "reviewedAs": "v10-18",
      "supersedes": "v11-07"
    },
    {
      "id": "v11-08-c",
      "topic": "Tender-review precedence",
      "difficulty": 3,
      "challenge": true,
      "keyType": "inference",
      "passage": "A fictional purchasing authority evaluates bids through a technical screen and then a price comparison, which only bids passing the screen can enter. A missing mandatory safety certificate prevents a pass unless the issuer confirms, before the technical decision, that a valid certificate already existed at the submission deadline; a newly issued certificate does not qualify. Clerical corrections are allowed after submission, but a correction cannot change the equipment offered. If a bidder changes the equipment, the authority treats the resulting proposal as a new bid, which cannot enter a round whose deadline has passed. A lower price waives neither the screen nor these rules.\n Bid Rowan omitted its certificate, and the issuer later confirmed, before the technical decision, that it was valid at the deadline. Rowan also corrected a transposed address without changing its equipment. Bid Hazel included a valid certificate but, after the deadline, replaced its equipment with a model it considered safer. The authority has not said how Rowan's other technical features were assessed.",
      "stem": "Which of the following statements is correct?",
      "options": [
        "Rowan's correction was accepted because its price was lower than Hazel's revised price.",
        "Rowan has passed the technical screen in full, despite its certificate and address issues.",
        "Hazel's safer model stays in the round as its original bid, which had a valid certificate.",
        "Rowan's omission and address fix do not exclude it; Hazel's new equipment is a new bid."
      ],
      "answer": 3,
      "hints": [
        "Apply the certificate exception to its existence date, not its confirmation date.",
        "Then distinguish clerical correction from a change to the offered equipment."
      ],
      "optionNotes": [
        "Not supported. No prices are reported, and 'a lower price waives neither the screen nor these rules'.",
        "Overstated. Rowan's certificate omission is cured, but the authority 'has not said how Rowan's other technical features were assessed'.",
        "False. Changing the equipment makes the proposal 'a new bid', which cannot enter a round whose deadline has passed.",
        "Correct. The issuer confirmed validity at the deadline before the decision, the address fix changes no equipment, and Hazel's change creates a new bid after the deadline."
      ],
      "explanation": "An exception can cure missing evidence of an earlier fact without permitting a substantive late change. Removing an exclusion is also weaker than proving eventual selection.",
      "reasoning": {
        "model": "Evidence timing and substantive-versus-clerical change",
        "evidence": [
          "valid certificate already existed at the submission deadline",
          "a correction cannot change the equipment offered",
          "treats the resulting proposal as a new bid",
          "corrected a transposed address without changing its equipment"
        ]
      },
      "reviewedAs": "v10-05",
      "supersedes": "v11-08"
    },
    {
      "id": "v11-09-c",
      "topic": "Training exemption provenance",
      "difficulty": 3,
      "challenge": true,
      "keyType": "inference",
      "passage": "A fictional professional college admits candidates to its advanced workshop only after they pass a foundation assessment or receive a valid experience exemption. Attending an introductory briefing does not count as admission. An exemption requires a current certificate from either the Northern or the Southern board, which have equal standing; no other body's certificate qualifies. Both boards issue their certificates only after verifying completion of supervised practice, and neither requires the college's assessment. Holding a certificate does not by itself create an exemption: the candidate must apply for one.\n Lea was admitted to the advanced workshop under these rules. The college confirms that she has never taken its foundation assessment, rather than merely that no result appears in one of its systems. Her exemption file is not public. She attended a briefing three months before admission and has worked in the profession for several years. The released information does not identify the board that issued her certificate.",
      "stem": "Which of the following statements is correct?",
      "options": [
        "The Northern or Southern board verified Lea's supervised practice; which is unknown.",
        "Lea's admission shows she completed the college assessment indirectly through her board.",
        "Lea's supervised practice was verified before she attended the introductory briefing.",
        "Candidates admitted after the assessment had also obtained a board certificate beforehand."
      ],
      "answer": 0,
      "hints": [
        "Eliminate Lea's unavailable admission route.",
        "Follow the remaining route back through certificate eligibility and both boards' common requirement."
      ],
      "optionNotes": [
        "Correct. Without the assessment, Lea needed an exemption and so a certificate from one of the boards, each issued 'only after verifying completion of supervised practice'.",
        "False. The college confirms 'that she has never taken its foundation assessment'.",
        "Not supported. The passage gives no date for the verification of Lea's practice, only for her briefing.",
        "Not supported. Neither board 'requires the college's assessment', but nothing says assessed candidates hold certificates."
      ],
      "explanation": "An observed admission can establish a shared prerequisite of two alternative certification routes without identifying the route actually taken.",
      "reasoning": {
        "model": "Alternative routes with shared prerequisites",
        "evidence": [
          "only after they pass a foundation assessment or receive a valid experience exemption",
          "Both boards issue their certificates only after verifying completion of supervised practice",
          "she has never taken its foundation assessment"
        ]
      },
      "reviewedAs": "v10-02",
      "supersedes": "v11-09"
    },
    {
      "id": "v11-10-c",
      "topic": "Restricted dataset linkage",
      "difficulty": 3,
      "challenge": true,
      "keyType": "inference",
      "passage": "A fictional statistics unit lets analysts use de-identified survey files after confidentiality training, but linking them to employment records also requires approval from a linkage panel. An approval names both a project and a version of its linkage plan. Even replacing a variable with a less detailed one does not remove the need to seek approval for an amended plan; the panel decides whether the change can be handled through a simplified review, which is still a review rather than an exemption.\n The panel has approved a team's new seasonal-work project for annual employment status under a revised plan. The decision explicitly excludes monthly status. The team's older job-change project also holds a valid approval for annual data, but no decision transfers approval between projects. The team now proposes running the seasonal project on monthly observations, publishing only annual totals and keeping its existing secure environment. No approval covers those monthly inputs, and the panel has not said that annual outputs lift the input restriction.",
      "stem": "Which of the following statements is correct?",
      "options": [
        "No approval covers the monthly inputs, whatever the secure environment or annual outputs.",
        "The older approval extends to the monthly plan because the secure environment is unchanged.",
        "The team chose monthly observations because annual data hid seasonal changes in employment.",
        "Publishing annual totals makes the use of monthly inputs authorised under the decision."
      ],
      "answer": 0,
      "hints": [
        "For each approval, list the project and input-data version it names.",
        "Does summarising monthly inputs into annual outputs change the scope of permission to use those inputs?"
      ],
      "optionNotes": [
        "Correct. Both approvals concern annual data, the seasonal decision 'explicitly excludes monthly status', and no ruling says annual outputs lift that restriction.",
        "False. An approval 'names both a project and a version', and 'no decision transfers approval between projects'.",
        "Not supported. The passage gives no reason for the team's proposal to use monthly observations.",
        "False. The decision 'explicitly excludes monthly status', whatever form the published totals take."
      ],
      "explanation": "Permission attaches to its stated inputs and project. Transformation of outputs does not retrospectively authorise excluded inputs.",
      "reasoning": {
        "model": "Input scope versus transformed output and project transfer",
        "evidence": [
          "names both a project and a version",
          "the panel decides whether the change can be handled through a simplified review",
          "decision explicitly excludes monthly status"
        ]
      },
      "reviewedAs": "v11-09",
      "solution": [
        "The decisions approve named annual inputs within their respective project scopes.",
        "The proposed work uses monthly observations, which the approvals exclude.",
        "Shared safeguards and annual output do not extend the approved input scope or transfer permission between projects."
      ],
      "supersedes": "v11-10"
    }
  ]
});
