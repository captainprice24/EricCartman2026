/* Original hand-authored verbal challenge items; reordered for balanced set-level cues. */
EPSO_BANK.registerSet({
  id: "verbal-11",
  section: "verbal",
  title: "Verbal reasoning · Set 11 — Very hard",
  description: "10 original challenging passages on fictional procedures and studies. Linked deductions, exceptions, scope and evidence limits. Timed practice: 17 min 30 sec. Editorial difficulty pending learner calibration.",
  version: 1,
  challenge: true,
  questions: [
    {
      id: "v11-01",
      topic: "Supplier-comparison composition",
      difficulty: 3,
      challenge: true,
      keyType: "inference",
      passage:
        "A fictional agency compared the average delivery time of two suppliers. Supplier Birch delivered standard components in an average of four days and specialist components in twelve. Supplier Alder averaged five days for standard components and thirteen for specialist components. The figures covered completed orders in the same quarter, using the same definition of delivery time.\n\nThe agency also published each supplier's overall average, but its short summary omitted the proportions of standard and specialist orders assigned to each. Staff explained that specialist orders generally took longer regardless of supplier. Birch had been used mainly for specialist components, while Alder handled mainly standard components. The exact mix and the overall averages are not supplied in the account available here.\n\nFor an internal planning exercise, the analyst assigned equal numbers of standard and specialist orders to each supplier, retaining each supplier's observed category averages. The exercise did not reassign any actual order and did not predict how delivery times would respond to a changed contract. It excluded every difference other than the mix when recombining the existing category means. No observation established that either supplier could maintain its existing means under a real change in the amount or type of work.",
      stem: "Which of the following statements is correct?",
      options: [
        "Birch had the lower observed overall average before the common-mix exercise because its advantage was present in each separate category.",
        "Alder's lower standard-order share follows from Birch being faster in both categories, even though the precise observed category proportions were unpublished.",
        "The exercise eliminates Birch's category advantages because identical weights make the two suppliers' retained delivery-time figures identical.",
        "Common category weights preserve Birch's lower stated mean, without establishing its observed aggregate ranking or future workload response."
      ],
      answer: 3,
      hints: [
        "Identify the exact groups, conditions and dates in the passage.",
        "Derive what the stated facts force before adding a cause, outcome or converse that has not been established."
      ],
      optionNotes: [
        "Overstated. The actual mixes and overall means are undisclosed; within-category advantages do not determine the observed aggregate ranking.",
        "False. Being faster within each category does not by itself establish the observed weights, and the narrative places more specialist work with Birch.",
        "False. Common weights do not make the distinct category means identical.",
        "Correct. Birch's lower mean in each category survives identical weights; different observed weights and untested workload responses remain separate questions."
      ],
      explanation: "Combine the case facts with the stated definitions and scope limits. A necessary consequence is different from a plausible explanation or an unreported outcome.",
      reasoning: {
        model: "Standardised comparison versus intervention prediction",
        evidence: [
          "four days for standard components and specialist components in twelve",
          "five days for standard components and thirteen for specialist components",
          "equal numbers of standard and specialist orders",
          "did not reassign any actual order"
        ]
      },
      reviewedAs: "v11-06"
    },
    {
      id: "v11-02",
      topic: "Rare-species survey sensitivity",
      difficulty: 3,
      challenge: true,
      keyType: "inference",
      passage:
        "A fictional woodland study used sound recorders to search for a rare bird. A recognisable call in a recording was accepted as evidence that the bird had visited the recorder's detection area. The absence of a recognised call was treated differently: birds might remain silent, be masked by other sounds or pass outside the effective detection range. Researchers described the method as capable of confirming some visits rather than proving absence.\n\nIn the first season, recorders operated for two nights at each site. In the second, they operated for eight nights. Recognised calls were found at 14 sites in the first season and 23 in the second. Weather and the number of individual birds were not measured consistently between seasons. The report did not identify which sites had positive recordings in both periods.\n\nBoth surveys covered the same 30 sites. Every site had a usable recording in each season; only the listening duration differed as described. The released totals do not identify sites with positive calls in both years. No additional site was introduced, and the report gives no evidence of whether a previously silent site had previously been visited by the bird. The conservation group is examining what the positive-site totals alone force before interpreting any apparent expansion of occupied habitat.",
      stem: "Which of the following statements is correct?",
      options: [
        "Every site positive in the first season also yielded a call in the second, because the longer recording period increased opportunities for detection.",
        "The same fixed set of sites means only the fourteen previously positive sites could yield calls again.",
        "At least nine sites newly yielded calls, without establishing nine newly occupied sites or identifying the full overlap.",
        "The 23 positive sites establish that at least 23 different individual birds were present, because each site yielded a recognised call."
      ],
      answer: 2,
      hints: [
        "Identify the exact groups, conditions and dates in the passage.",
        "Derive what the stated facts force before adding a cause, outcome or converse that has not been established."
      ],
      optionNotes: [
        "Overstated. The totals leave the overlap unreported; greater opportunity does not establish every old site's later result.",
        "False. The fixed set contains other sites, and twenty-three cannot fit into fourteen.",
        "Correct. Twenty-three positives cannot all fit among fourteen old positives; at least nine come from previously negative sites. Non-detection does not prove prior absence.",
        "Overstated. A single bird can potentially visit multiple detection areas; the site totals do not identify distinct individuals."
      ],
      explanation: "Combine the case facts with the stated definitions and scope limits. A necessary consequence is different from a plausible explanation or an unreported outcome.",
      reasoning: {
        model: "Existential overlap bound with imperfect detection",
        evidence: [
          "14 sites in the first season and 23 in the second",
          "capable of confirming some visits rather than proving absence",
          "same 30 sites"
        ]
      },
      reviewedAs: "v11-03"
    },
    {
      id: "v11-03",
      topic: "Publication queues and logical selection",
      difficulty: 3,
      challenge: true,
      keyType: "inference",
      passage:
        "A fictional journal places a submission in its fast review queue when it has both an open-data statement and a complete methods checklist. Otherwise it goes to the standard queue. Fast review changes the order of processing, not the publication standard. Papers in either queue are accepted only after independent peer review; a fast-queue entry is not a peer-review result.\n\nAn author can request transfer from the standard queue by supplying the missing documents before an editor is assigned. Once an editor is assigned, the queue is fixed for that review round even if documents arrive later. A queue entry records the documents' status when the queue decision was made, rather than guaranteeing their continued public availability. The journal has not published comparative acceptance rates for the two queues.\n\nPaper Rowan entered the standard queue and received an editor on Monday. Its missing open-data statement arrived on Tuesday, with the checklist already complete. Paper Hazel's fast-queue entry is confirmed, but no editor or peer-review decision for it has been announced. A statement later disappeared from Hazel's public web page. Both papers remain under consideration. Neither has been withdrawn, and no exceptional queue transfer has been authorised after editorial assignment.",
      stem: "Which of the following statements is correct?",
      options: [
        "Rowan's completed documents require immediate transfer to fast review, while Hazel's missing web statement proves its original queue decision was invalid.",
        "Hazel has already passed peer review because its fast-queue entry required complete documentary evidence before an editor was assigned.",
        "Rowan's queue is fixed for this round; Hazel's entry records earlier documents, not peer-review success or continuing web availability.",
        "Rowan has a lower acceptance probability than Hazel because standard review applies to incomplete submissions and the fast queue is processed first."
      ],
      answer: 2,
      hints: [
        "Locate the timing cutoff for queue transfer.",
        "Ask which time and which decision Hazel's queue label actually certifies."
      ],
      optionNotes: [
        "False. Rowan's editor assignment fixes its queue; a later web change does not prove earlier documentary absence.",
        "False. Fast entry does not constitute independent peer-review acceptance.",
        "Correct. The cutoff timing fixes Rowan, while Hazel's label concerns the decision-time documents rather than later events or merit.",
        "Not supported. No comparative acceptance probabilities are reported."
      ],
      explanation: "A status can certify a historical condition without proving a later condition or a different kind of approval. Process priority is not outcome quality.",
      reasoning: {
        model: "Cutoff timing and historical-status interpretation",
        evidence: [
          "Once an editor is assigned, the queue is fixed",
          "records the documents' status when the queue decision was made",
          "accepted only after independent peer review",
          "received an editor on Monday"
        ]
      },
      reviewedAs: "v10-16"
    },
    {
      id: "v11-04",
      topic: "Counterpart obligations in a repair network",
      difficulty: 3,
      challenge: true,
      keyType: "inference",
      passage:
        "A fictional repair network recognises workshops as either registered partners or occasional subcontractors. Every registered partner holds a current safety audit. Any workshop performing electrical repairs also needs an electrical endorsement, including a subcontractor that holds no partner registration. Mechanical work does not itself establish or require that endorsement. A current safety audit does not automatically confer an endorsement.\n\nThe network accepts electrical endorsements from either its own assessor or a recognised external board. Both routes require evidence of a supervised electrical repair assessment. Partner audits do not include that assessment. A workshop can hold an external endorsement before joining the network, but it must be current on the date electrical work is performed. The directory publishes partner registration and advertised services rather than all underlying assessment records.\n\nWorkshop Elm appears as a registered partner and has performed an electrical repair under the stated rules, with no exception. The directory does not say which endorsement route Elm used. Workshop Ash also appears as a partner, but the available report records mechanical repairs only and gives no electrical work, endorsement or supervised-assessment evidence for it. The workshops share an owner and premises, yet registrations, audits and endorsements attach separately to each workshop rather than transferring through common ownership.",
      stem: "Which of the following statements is correct?",
      options: [
        "Ash holds an electrical endorsement because its shared owner and current partner registration supply the same underlying assessment evidence as Elm's compliant repair.",
        "Elm's repair entails supervised assessment and its registration an audit; Ash's matching registration and owner do not establish an endorsement.",
        "Every partner audit verifies supervised electrical assessment, since the network requires both safety and electrical safeguards from workshops doing electrical work.",
        "Elm obtained its endorsement from the external board because no network-assessor record appeared among the directory's advertised services."
      ],
      answer: 1,
      hints: [
        "Find the prerequisite shared by both endorsement routes.",
        "Keep workshop-specific obligations separate from shared ownership and partner status."
      ],
      optionNotes: [
        "False. The rules explicitly forbid transfer through ownership and distinguish audit from electrical assessment.",
        "Correct. Either endorsement route entails supervised assessment; partner status entails an audit. Neither ownership nor partner status supplies Ash's endorsement.",
        "False. The assessment requirement for electrical work is extended to all partner audits, which do not include it.",
        "Not supported. A directory that does not list underlying assessments cannot identify the issuing route."
      ],
      explanation: "Combine shared route prerequisites with a separate status obligation. Similar organisations do not inherit each other's authorisations merely through a common owner.",
      reasoning: {
        model: "Shared route prerequisites across nontransferable entities",
        evidence: [
          "Every registered partner holds a current safety audit",
          "Both routes require evidence of a supervised electrical repair assessment",
          "performed an electrical repair under the stated rules",
          "attach separately to each workshop"
        ]
      },
      reviewedAs: "v10-15"
    },
    {
      id: "v11-05",
      topic: "Food-storage inspection domains",
      difficulty: 3,
      challenge: true,
      keyType: "inference",
      passage:
        "A fictional food depot uses separate checks for room temperature and package integrity. A batch can enter distribution only if its temperature record is acceptable and its packages pass inspection. An acceptable room temperature does not establish an individual batch's complete temperature history, which includes transport before arrival.\n\nThe depot's temperature display shows the current room reading. Its batch file holds a transport logger record and a seal inspection result. A missing logger record can be replaced by an approved supplier certificate, but a current room reading cannot replace it. A certificate concerns temperature history only; it does not waive the package inspection. In one month, 40 batches arrived and six required additional documentation, without the report specifying their eventual decisions.\n\nCedar's supplier certificate has now been approved, and its packages have passed the required inspection. Batch Fern has a complete acceptable transport logger record but failed package inspection. Current room temperature is acceptable for both. Neither batch has an emergency exemption, and there are no additional release requirements in this case. The depot has not published the cause of Fern's package failure or which supplier supplied either batch. Staff are checking whether different kinds of positive evidence cover both criteria for each batch before releasing either one.",
      stem: "Which of the following statements is correct?",
      options: [
        "All batches with acceptable transport records must be released, so Fern's logger overrides the package finding under the same route used for Cedar.",
        "Both batches remain ineligible because a supplier certificate can never replace a logger record and the room display concerns only current temperature.",
        "Cedar satisfies all release conditions through packaging and approved history; Fern's satisfactory logger leaves its package failure unresolved.",
        "Fern's supplier caused its package defect during transport, while Cedar's supplier avoided the same handling failure by providing a certificate."
      ],
      answer: 2,
      hints: [
        "Identify the exact groups, conditions and dates in the passage.",
        "Derive what the stated facts force before adding a cause, outcome or converse that has not been established."
      ],
      optionNotes: [
        "False. One satisfied condition is expanded into sufficient release despite the separate package requirement.",
        "False. An approved supplier certificate is an explicitly permitted substitute.",
        "Correct. Approved certificate substitutes for history only, completing Cedar's conjunction; Fern meets history but fails the independent package condition.",
        "Not supported. Neither cause nor supplier identity is reported."
      ],
      explanation: "Combine the case facts with the stated definitions and scope limits. A necessary consequence is different from a plausible explanation or an unreported outcome.",
      reasoning: {
        model: "Different evidence routes completing independent conditions",
        evidence: [
          "only if its temperature record is acceptable and its packages pass inspection",
          "replaced by an approved supplier certificate",
          "Cedar's supplier certificate has now been approved",
          "Fern has a complete acceptable transport logger record but failed package inspection"
        ]
      },
      reviewedAs: "v11-18"
    },
    {
      id: "v11-06",
      topic: "Conservation marks and loaned objects",
      difficulty: 3,
      challenge: true,
      keyType: "inference",
      passage:
        "A fictional collections service uses three distinct labels. An object is classed as conserved only after its treatment dossier has been approved. Every approved treatment dossier receives a digital authenticity mark. The service's rules do not require every marked dossier to describe conservation; marked dossiers can also record examination without treatment. A public loan is not in itself a treatment or a dossier approval.\n\nDuring a temporary transfer, some loaned objects were found to have dossiers without an authenticity mark. The service confirmed that these were genuinely unmarked dossiers, not merely cases where a mark was missing from the public catalogue. No exception allows an approved treatment dossier to remain unmarked. The report did not identify the individual loaned objects, the number of marked dossiers among the loans or the contents of unmarked dossiers.\n\nThe receiving gallery displayed 40 transferred objects, alongside 25 items from its permanent holdings. Its display labels described artists and materials rather than treatment histories. Preparations for the exhibition included cleaning transport cases and checking hanging systems, neither of which the service classifies as conservation of the objects. The gallery's records of those preparations therefore supplied no alternative conservation classification for the objects with unmarked dossiers. The report made no claim that every loaned object was in the same treatment category.",
      stem: "Which of the following statements is correct?",
      options: [
        "Not every loaned object can be classified as conserved: some lack a dossier mark that conservation approval would require.",
        "An authenticity mark is sufficient for conservation classification, since a marked dossier cannot concern examination without treatment.",
        "No loaned object can be classified as conserved, since the service found some unmarked dossiers among the transferred collection.",
        "Some genuinely unmarked dossiers had received treatment approval, since the absence of a public catalogue mark does not identify their contents."
      ],
      answer: 0,
      hints: [
        "Write the implications in order: conserved, approved dossier, authenticity mark.",
        "Then reason backwards from the confirmed existence of unmarked loan dossiers."
      ],
      optionNotes: [
        "Correct. Conserved implies approved, which implies marked. Some confirmed unmarked loan dossiers therefore entail some loaned objects were not conserved.",
        "False. The passage explicitly allows marked dossiers recording examination without treatment.",
        "Overstated. Some unmarked loan dossiers are expanded into no conserved loans.",
        "False. No approved dossier can remain unmarked, and these dossiers were confirmed genuinely unmarked."
      ],
      explanation: "An implication can be used contrapositively, but not reversed. Existence of one excluded subgroup does not exclude the entire group.",
      reasoning: {
        model: "Contrapositive chain with existential information",
        evidence: [
          "classed as conserved only after its treatment dossier has been approved",
          "Every approved treatment dossier receives a digital authenticity mark",
          "some loaned objects were found to have dossiers without an authenticity mark"
        ]
      },
      reviewedAs: "v10-06"
    },
    {
      id: "v11-07",
      topic: "Green-space access and group nesting",
      difficulty: 3,
      challenge: true,
      keyType: "inference",
      passage:
        "A fictional park programme offers evening access to residents with either a local keycard or a permit from a participating school. Every local keycard holder has completed an identity check. A school permit can be issued without that check, but every school-permit holder must enter with a named supervisor from the programme's roster present, including adult permit-holders. Holding both documents is permitted.\n\nAdults can enter without a supervisor when using a local keycard. Children require a rostered supervisor regardless of entry document. A supervisor's presence does not by itself confer an entry document. The gate log lists lawful evening admissions and ages but does not identify the document used. It does not record identity checks or distinguish group visits from solo visits.\n\nThe log includes an adult, Orla, lawfully admitted without any rostered supervisor present, and a child, Ren, lawfully admitted with a supervisor. Orla's and Ren's document files are not released. The programme confirms that no admission used an exception or a document other than the two stated kinds. Their names are not sufficient to identify relationships to the participating schools. The report gives no evidence about whether Ren held one entry document or both, or whether Ren had independently completed an identity check.",
      stem: "Which of the following statements is correct?",
      options: [
        "Every lawful admission establishes a completed identity check, because a local keycard is one of the two permitted evening-entry documents.",
        "Orla's entry entails a keycard and identity check; Ren's supervisor does not distinguish the two permissible entry routes.",
        "Children entering on a local keycard need no rostered supervisor, so Ren's accompanying supervisor establishes use of a school permit.",
        "Orla was unrelated to the participating schools because an adult without a supervisor could not have any connection to their permit arrangements."
      ],
      answer: 1,
      hints: [
        "Use absence of a supervisor to eliminate Orla's unavailable route.",
        "For Ren, determine whether the supervisor requirement distinguishes the routes or is shared by both."
      ],
      optionNotes: [
        "Overstated. A prerequisite of one permitted route is extended to all admissions.",
        "Correct. Without a rostered supervisor Orla cannot use school-permit entry; the remaining keycard route entails an identity check. Ren can use either route.",
        "False. Children need a rostered supervisor regardless of entry document; presence does not identify school-permit entry.",
        "Not supported. Entry-route inference does not establish absence of any school relationship."
      ],
      explanation: "The same observed accompaniment has different inferential value for adults and children. A necessary condition becomes informative only when it distinguishes the available routes.",
      reasoning: {
        model: "Age-dependent route elimination and converse traps",
        evidence: [
          "Every local keycard holder has completed an identity check",
          "every school-permit holder must enter with a named supervisor",
          "Children require a rostered supervisor regardless",
          "adult, Orla, lawfully admitted without any rostered supervisor"
        ]
      },
      reviewedAs: "v10-18"
    },
    {
      id: "v11-08",
      topic: "Tender-review precedence",
      difficulty: 3,
      challenge: true,
      keyType: "inference",
      passage:
        "A fictional purchasing authority evaluates bids through a technical screen and a price comparison. A bid enters the price comparison only if it passes the technical screen. Missing a mandatory safety certificate prevents a pass unless the certificate's issuer confirms, before the technical decision, that a valid certificate already existed at the submission deadline. A newly issued certificate cannot satisfy that exception.\n\nThe authority permits clerical corrections after submission, but a correction cannot change the equipment offered. If a bidder changes the equipment, the authority treats the resulting proposal as a new bid, which cannot enter a round whose submission deadline has passed. A lower quoted price does not waive either the technical screen or the submission rules. The round attracted 22 bids, but no ranking has been released.\n\nBid Rowan omitted its certificate. The issuer later confirmed, before the technical decision, that the certificate was valid at the deadline. Rowan also corrected a transposed address without changing its equipment. Bid Hazel included a valid certificate but replaced the offered equipment after the deadline with a model it considered safer. The authority has not announced which technically admissible bids will win or how Rowan's non-certificate technical features were assessed.",
      stem: "Which of the following statements is correct?",
      options: [
        "The authority accepted Rowan's address correction because its quoted price was lower than Hazel's revised price for the replacement equipment.",
        "Rowan passed the entire technical screen, although its omitted certificate needed later issuer confirmation and its submitted address needed correction.",
        "Hazel's safer replacement remains eligible under the original submission because a valid certificate accompanied that submission before the deadline.",
        "Rowan is not excluded by the certificate omission or address correction, whereas Hazel's equipment replacement cannot enter this closed round as the original bid."
      ],
      answer: 3,
      hints: [
        "Apply the certificate exception to its existence date, not its confirmation date.",
        "Then distinguish clerical correction from a change to the offered equipment."
      ],
      optionNotes: [
        "Not supported. No comparative prices or acceptance motive is supplied.",
        "Overstated. The report leaves the assessment of Rowan’s other technical features undisclosed.",
        "False. The replacement is a new bid after the round's deadline regardless of the earlier certificate.",
        "Correct. Issuer confirmation meets the omission exception, the address correction changes no equipment, and Hazel's replacement is a late new bid."
      ],
      explanation: "An exception can cure missing evidence of an earlier fact without permitting a substantive late change. Removing an exclusion is also weaker than proving eventual selection.",
      reasoning: {
        model: "Evidence timing and substantive-versus-clerical change",
        evidence: [
          "valid certificate already existed at the submission deadline",
          "a correction cannot change the equipment offered",
          "treats the resulting proposal as a new bid",
          "corrected a transposed address without changing its equipment"
        ]
      },
      reviewedAs: "v10-05"
    },
    {
      id: "v11-09",
      topic: "Training exemption provenance",
      difficulty: 3,
      challenge: true,
      keyType: "inference",
      passage:
        "A fictional professional college admits candidates to its advanced workshop only after they pass a foundation assessment or receive a valid experience exemption. Attendance at an introductory briefing does not count as advanced admission. An experience exemption requires a current certificate from either the Northern or Southern board; no other bodies' certificates qualify. The two boards use different forms but have equal standing under the college's rules.\n\nBoth boards issue their certificates only after verifying completion of supervised practice. Neither requires the college's foundation assessment. A certificate remains current for two years, and a valid certificate can exist without the college having recorded an exemption, since the candidate must apply for one. The college keeps assessment results and exemption decisions in different systems. Last year 64 candidates entered the advanced workshop, but their entry routes were not published.\n\nLea was admitted to the advanced workshop under these rules. The college confirms that she has never taken its foundation assessment, rather than merely that a result is absent from one system. Her exemption file is not publicly available. She attended a briefing three months before admission and has worked in the profession for several years. The released information does not identify either board as the issuer of her certificate.",
      stem: "Which of the following statements is correct?",
      options: [
        "Lea's admission entails board-verified supervised practice, although neither the briefing nor the released file identifies her certifying board.",
        "Lea's admission shows that she completed the college assessment indirectly through the board's verification of supervised practice.",
        "Lea's supervised practice was verified before her introductory briefing, because that briefing could not itself confer an experience exemption.",
        "Candidates who completed the college assessment had previously obtained a current board certificate, because both routes draw on supervised-practice evidence."
      ],
      answer: 0,
      hints: [
        "Eliminate Lea's unavailable admission route.",
        "Follow the remaining route back through certificate eligibility and both boards' common requirement."
      ],
      optionNotes: [
        "Correct. No assessment leaves valid exemption; either qualifying board issues its required certificate only after verifying practice. The briefing does not identify the board or explain the full route.",
        "False. The college confirms she never took the assessment; board verification is a different condition.",
        "Not supported. The briefing is irrelevant as an entry route, but this does not establish when practice verification happened.",
        "Not supported. The assessment route need not involve a board certificate, and its candidates’ prior certification histories are not given."
      ],
      explanation: "An observed admission can establish a shared prerequisite of two alternative certification routes without identifying the route actually taken.",
      reasoning: {
        model: "Alternative routes with shared prerequisites",
        evidence: [
          "only after they pass a foundation assessment or receive a valid experience exemption",
          "Both boards issue their certificates only after verifying completion of supervised practice",
          "she has never taken its foundation assessment"
        ]
      },
      reviewedAs: "v10-02"
    },
    {
      id: "v11-10",
      topic: "Restricted dataset linkage",
      difficulty: 3,
      challenge: true,
      keyType: "inference",
      passage:
        "A fictional statistics unit permits analysts to use de-identified survey files after completing confidentiality training. Linking those files to employment records requires additional approval from a linkage panel. Completion of training does not imply that linkage has been approved. The panel considers the proposed linkage purpose, the variables to be used and the safeguards in the analysis environment.\n\nAn approval names both a project and a version of its linkage plan. Replacing a variable with a less detailed one does not automatically remove the need to seek approval for an amended plan; the panel decides whether the change can be handled through a simplified review. A simplified review is still a review, not a general exemption. The unit approved 16 linkages last year but gave no average review time.\n\nThe panel approved the team's new seasonal-work project for annual employment status under a revised plan. The decision explicitly excludes monthly status. The original job-change project's earlier annual-data approval also remains valid, but no decision transfers approval between projects. The team now proposes running the seasonal project using monthly observations and publishing only annual totals. It will keep the existing secure environment. No approval specifically covers those monthly inputs, and the panel has not said that annual outputs remove the input restriction.",
      stem: "Which of the following statements is correct?",
      options: [
        "Neither annual-data approval covers the monthly inputs; shared safeguards and annual output do not change the named input scope.",
        "The old project's approval transfers to the new monthly plan when the secure environment is unchanged.",
        "The seasonal project's approved outputs establish that its monthly inputs underwent a simplified review before the revised decision was issued.",
        "Publishing annual totals makes monthly input use authorised because the new decision's annual-data condition concerns the final reported figures."
      ],
      answer: 0,
      hints: [
        "Identify the exact groups, conditions and dates in the passage.",
        "Derive what the stated facts force before adding a cause, outcome or converse that has not been established."
      ],
      optionNotes: [
        "Correct. Both decisions cover annual inputs in their named scopes, while the proposed computation uses excluded monthly observations.",
        "False. Approvals are project/version-specific and no transfer decision exists.",
        "Not supported. No monthly-input review or approval is reported.",
        "False. The decision explicitly excludes monthly status; annual output does not change the input named in the plan."
      ],
      explanation: "Combine the case facts with the stated definitions and scope limits. A necessary consequence is different from a plausible explanation or an unreported outcome.",
      reasoning: {
        model: "Input scope versus transformed output and project transfer",
        evidence: [
          "names both a project and a version",
          "the panel decides whether the change can be handled through a simplified review",
          "decision explicitly excludes monthly status"
        ]
      },
      reviewedAs: "v11-09"
    }
  ]
});
