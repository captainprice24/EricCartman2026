EPSO_BANK.registerSet({
  "id": "verbal-16",
  "section": "verbal",
  "title": "Verbal reasoning · Set 16 — Very hard",
  "description": "Ten original, demanding inference problems in exam-length passages. Combine dispersed evidence, scope restrictions and alternative explanations. Editorial difficulty; first-attempt calibration pending.",
  "version": 2,
  "challenge": true,
  "questions": [
    {
      "id": "v16-01-c",
      "topic": "Restricted data release",
      "difficulty": 3,
      "challenge": true,
      "keyType": "inference",
      "reasoning": {
        "model": "permission-scope-and-source-combination",
        "stages": 5,
        "evidence": [
          "A freely viewable restricted source is not an open licence.",
          "Analysis-only permission cannot authorise distribution.",
          "Stable person keys exclude full anonymisation.",
          "The export change defeats the old-assessment exception.",
          "Secure access therefore needs a post-migration independent assessment."
        ]
      },
      "passage": "A fictional statistics office releases a linked dataset only when both its licensing and disclosure conditions are met. Licensing requires an open licence covering every source or specific permission from each restricted-source owner. A freely viewable source is not necessarily openly licensed, and permission for analysis excludes onward distribution unless it expressly says otherwise. Disclosure clearance requires full anonymisation or an approved secure-access environment. Data with stable person-level keys remain identifiable even when names are removed. An approved environment needs an independent security assessment made after its latest software migration. An older assessment remains usable only if the migration changed neither access control nor export functions; a developer's internal assurance is insufficient.\n\nThe office validly released a dataset linking an openly licensed source to a freely viewable restricted register. It kept stable person-level keys, and a recent migration changed its environment's export function. The register owner had earlier permitted analysis alone. No other route existed, and release notices need not reproduce permissions or security reports.",
      "stem": "Which of the following statements is supported by the passage?",
      "options": [
        "The owner also permitted distribution, and an independent assessment followed the migration.",
        "The analysis permission covered distribution because anyone could already view the register.",
        "The independent assessor had helped to design the environment's original export function.",
        "The register owner charged a distribution fee higher than the cost of the security assessment."
      ],
      "answer": 0,
      "hints": [
        "Distinguish permission to view a source from permission to reuse it, and check the source's licence status.",
        "Then ask which disclosure route survives once stable person-level keys are kept."
      ],
      "optionNotes": [
        "Correct. The register is restricted and its owner had permitted 'analysis alone', so a further specific permission was needed; kept keys exclude anonymisation, and the changed 'export function' rules out the older assessment.",
        "False. A freely viewable source 'is not necessarily openly licensed', and analysis permission 'excludes onward distribution unless it expressly says otherwise'.",
        "Not supported. The passage says nothing about who designed the export function.",
        "Not supported. No fees or costs are mentioned."
      ],
      "explanation": "Both conditions must be met. The restricted register needs its owner's specific permission, and analysis-only permission does not reach distribution. Stable keys rule out anonymisation, so the secure environment is needed, and its changed export function rules out reliance on the old assessment. A valid release therefore implies both a further permission and a post-migration independent assessment.",
      "supersedes": "v16-01"
    },
    {
      "id": "v16-02-c",
      "topic": "Hearing order constraints",
      "difficulty": 3,
      "challenge": true,
      "keyType": "inference",
      "reasoning": {
        "model": "conditional-ordering-and-fixed-endpoint",
        "stages": 5,
        "evidence": [
          "Friday buildings would require Thursday accounts, which is forbidden.",
          "Equipment must consequently follow data.",
          "Contracts precedes data and cannot be Monday.",
          "The accounts-buildings pair therefore occupies Monday-Tuesday.",
          "Contracts, data and equipment fill Wednesday-Friday in that order."
        ]
      },
      "passage": "A fictional inquiry holds five hearings, on accounts, buildings, contracts, data and equipment, one on each day from Monday to Friday. The chair confirms that every rule below was followed and that no waiver or extra session was used. Buildings must be heard on the day immediately after accounts. Contracts must be heard before data, but not on Monday. Equipment must be heard after data unless buildings is on Friday; if buildings is on Friday, contracts must instead be on Tuesday. Accounts cannot be on Thursday, when its auditor is unavailable. Friday creates no exception other than the one stated.\n\nThe inquiry's public summary lists the five topics alphabetically rather than chronologically. It also records that the equipment witnesses arrived on Monday and remained available all week. Their arrival does not by itself show when the equipment hearing took place, because the rules govern hearings, not witnesses. The task is to work out what the rules require.",
      "stem": "Which of the following statements is supported by the passage?",
      "options": [
        "Buildings was heard on Friday, so equipment did not have to be heard after data.",
        "Equipment was heard on Friday, even though its witnesses had arrived on Monday.",
        "Contracts was heard on Monday, before accounts and buildings later in the week.",
        "The equipment witnesses attended the buildings hearing before giving their own evidence."
      ],
      "answer": 1,
      "hints": [
        "Write the five days in a row and test where the accounts-buildings pair can go.",
        "Check what a Friday buildings hearing would require of accounts."
      ],
      "optionNotes": [
        "False. Buildings on Friday would put accounts on Thursday, but accounts 'cannot be on Thursday'.",
        "Correct. Since buildings cannot be on Friday, equipment follows data, which follows contracts; contracts cannot be on Monday, so accounts and buildings take Monday and Tuesday and equipment falls on Friday.",
        "False. Contracts must be heard 'before data, but not on Monday'.",
        "Not supported. The witnesses 'remained available all week', but nothing says which hearings they attended."
      ],
      "explanation": "A Friday buildings hearing would force accounts onto Thursday, which is forbidden, so equipment must follow data and contracts must precede data without being on Monday. The only arrangement left is accounts, buildings, contracts, data and equipment from Monday to Friday. The witnesses' arrival is a distraction.",
      "supersedes": "v16-02"
    },
    {
      "id": "v16-03-c",
      "topic": "Research specimen provenance",
      "difficulty": 3,
      "challenge": true,
      "keyType": "inference",
      "reasoning": {
        "model": "sample-lineage-and-method-selection",
        "stages": 5,
        "evidence": [
          "Pooling defeats label-only provenance.",
          "No separately stored reference exists, excluding genetic restoration.",
          "The remaining route needs a contemporaneous individual-tag log.",
          "The signing officer had moved units.",
          "Only a written renewal before that move preserves signing authority."
        ]
      },
      "passage": "A fictional repository accepts a provenance claim only when an unbroken identification chain links the claimed site to the deposited specimen. If containers were pooled, a field label alone is insufficient. Provenance can then be restored by a unique genetic match to a site reference stored separately before pooling, or by a contemporaneous transfer log listing the specimen's individual tag. Matching one pooled specimen to another shows similarity, not site identity, and a list later copied from memory is not contemporaneous. A log is valid only if its signing officer was authorised at the time of transfer. An officer's authority ends on moving to another unit unless the repository renews it in writing beforehand; later ratification cannot repair an unauthorised log.\n\nA site claim was validly accepted for a specimen from pooled containers. No separately stored site reference existed. The specimen's tag appeared in a transfer log signed by officer Ivo after moving unit. The public catalogue gives the signature date but no renewal document. No other route applied.",
      "stem": "Which of the following statements is supported by the passage?",
      "options": [
        "A genetic match to another pooled specimen supplied the missing site identity.",
        "Ivo's authority was renewed because the log listed more tags than those of the old unit.",
        "Ivo's renewal was put in writing before the move, and the log was made during transfer.",
        "Ivo copied the specimen's tag into the public catalogue immediately after signing the log."
      ],
      "answer": 2,
      "hints": [
        "Follow the specimen's identity through pooling; a label establishes less once material has been combined.",
        "Then check whose authority the remaining route depends on, and when that authority had to exist."
      ],
      "optionNotes": [
        "False. 'Matching one pooled specimen to another shows similarity, not site identity'.",
        "Not supported. The passage gives no reason for any renewal and does not compare numbers of tags.",
        "Correct. Without a separate reference only a contemporaneous log remains, and Ivo signed after moving, so authority needed renewal 'in writing beforehand'.",
        "Not supported. Nothing is said about who compiled the catalogue or when."
      ],
      "explanation": "Pooling defeats the label, and the absence of a separate reference rules out genetic restoration. The accepted claim must therefore rest on a contemporaneous log. Because Ivo signed after moving unit, the log is valid only if Ivo's authority was renewed in writing before the move; later ratification would not help.",
      "supersedes": "v16-03"
    },
    {
      "id": "v16-04-c",
      "topic": "Courier routing eligibility",
      "difficulty": 3,
      "challenge": true,
      "keyType": "inference",
      "reasoning": {
        "model": "nested-classification-and-binding-gate",
        "stages": 5,
        "evidence": [
          "A battery cannot use South.",
          "Unapproved casing modification invalidates the label.",
          "No retest restores North eligibility.",
          "Central therefore needs dangerous-goods authorisation.",
          "Either authorisation route needs accredited sealing after the final opening."
        ]
      },
      "passage": "A fictional courier routes each parcel through one of three hubs: North, Central or South. A parcel containing a battery cannot use South. North accepts a battery parcel only with a current test label, and Central accepts one only when a dangerous-goods officer authorises the consignment. These restrictions apply even when the battery is switched off. A test label stops being current once the battery casing is modified, unless the work follows the original laboratory's approved design; a supplier's claim that a change is minor does not establish approved design. Officers may authorise after an individual inspection or a remote review of the packing record. Either way, an accredited packer must have sealed the parcel after its most recent opening.\n\nA battery parcel was validly routed after an unapproved casing modification, and it had been reopened since its original packing. Its tracking page shows dispatch but no hub, fresh seal or authorisation, as such pages omit packing records. No new battery test had taken place, and no special route existed.",
      "stem": "Which of the following statements is supported by the passage?",
      "options": [
        "Switching the battery off lifted the South ban as well as the label and authorisation rules.",
        "The original label stayed current because the supplier judged the modification minor.",
        "The officer chose a remote review because the packer was unavailable for an inspection.",
        "The parcel went through Central, with an officer's approval and an accredited fresh seal."
      ],
      "answer": 3,
      "hints": [
        "Apply the battery rules to each hub in turn before inferring which one was used.",
        "Then check what both authorisation methods have in common."
      ],
      "optionNotes": [
        "False. 'These restrictions apply even when the battery is switched off'.",
        "False. The modification was unapproved, and 'a supplier's claim that a change is minor does not establish approved design'.",
        "Not supported. The passage does not say which authorisation method was used, or why.",
        "Correct. A battery excludes South, and the unapproved modification without a new test excludes North; Central needs an officer, and either method needs an accredited packer's seal 'after its most recent opening'."
      ],
      "explanation": "South is closed to batteries, and North needs a current label, which the unapproved modification ended and no new test restored. Central is the only hub left, so an officer must have authorised the consignment. Both authorisation methods require an accredited seal after the latest opening, and the parcel had been reopened.",
      "supersedes": "v16-04"
    },
    {
      "id": "v16-05-c",
      "topic": "Grant audit sampling",
      "difficulty": 3,
      "challenge": true,
      "keyType": "inference",
      "reasoning": {
        "model": "conditional-selection-and-generalisation",
        "stages": 5,
        "evidence": [
          "The audited populations have different selection rules.",
          "Completion is defined differently by stream.",
          "Some organisations recur without linked identification.",
          "Original-target comparisons coexist with unequally described revisions.",
          "No randomised or adjusted estimate isolates the funding-route effect."
        ]
      },
      "passage": "A fictional grant audit sampled successful projects from two streams: R, awarded by open competition, and S, awarded by nomination. From R the auditors selected only completed projects; from S they selected completed and discontinued ones. Among all audited projects, R had the higher share meeting its original output target, but among completed projects S had the higher share. The streams also defined completion differently: R counted a project with an authorised extension as completed, whereas S recorded it as discontinued. Several organisations held grants from both streams, but the report does not identify their projects. Some targets had been revised, although success was judged against original targets, and the report does not show how revisions were distributed.\n\nThe auditors consider the published counts accurate. They neither randomised the funding route nor applied a common definition of completion. A reader claims that R's higher overall share proves that open competition itself makes projects succeed more often. The report gives no separate estimate of such an effect.",
      "stem": "Which of the following statements is supported by the passage?",
      "options": [
        "Different samples and completion rules stop the accurate shares isolating a route effect.",
        "Both the overall and the completed-project shares rank R above S against original targets.",
        "Projects with revised targets received larger grants on average than unrevised projects.",
        "Organisations funded by both streams used nominations to fund the same audited activities."
      ],
      "answer": 0,
      "hints": [
        "Compare how projects entered each audit sample before interpreting the success shares.",
        "Ask whether 'completed' means the same thing in both streams."
      ],
      "optionNotes": [
        "Correct. R's sample held 'only completed projects' while S's included discontinued ones, and the streams 'defined completion differently', so accurate shares still do not isolate a causal effect.",
        "False. 'Among completed projects S had the higher share'.",
        "Not supported. Grant sizes are not reported.",
        "Not supported. The report 'does not identify their projects', let alone shared activities."
      ],
      "explanation": "The two samples were drawn by different rules and measured completion differently, so the comparison is between unlike groups. Without randomisation, a common definition or a separate estimate, accurate descriptive shares cannot show that the funding route itself caused the difference.",
      "supersedes": "v16-05"
    },
    {
      "id": "v16-06-c",
      "topic": "Petition witness membership",
      "difficulty": 3,
      "challenge": true,
      "keyType": "inference",
      "reasoning": {
        "model": "quantified-intersection-and-exclusions",
        "stages": 5,
        "evidence": [
          "Some released harbour files exist.",
          "All such files are inspected and disputed.",
          "No surviving order is available for them.",
          "The exclusive inspected-file alternatives force consent.",
          "Release then requires independent mediation including the confidential annexes."
        ]
      },
      "passage": "A fictional oversight panel classifies files as inspected, disputed or eligible for public release. Every inspected file has either a signed consent or a statutory disclosure order, and no file has both. A disputed file with consent may be released only after independent mediation; a disputed file with an order may be released only after the order survives an appeal. These are conditions for release, not promises that release will follow. Independent mediation is carried out by an external mediator or by an internal mediator from a unit uninvolved in the original file. Either way, the mediator must read the complete file, including its confidential annexes; reading the public summary is not enough.\n\nEvery harbour office file is disputed. Some harbour files were publicly released, and every released harbour file had been inspected. No order covering a harbour file survived an appeal. There is no emergency release exception. The panel's statistics do not identify individual released files or their mediators.",
      "stem": "Which of the following statements is supported by the passage?",
      "options": [
        "Some released harbour files relied on disclosure orders that had survived an appeal.",
        "At least one harbour file had consent and an independent mediator who read its annexes.",
        "Every inspected file with consent was released once a mediator had read it in full.",
        "The mediator who read a released harbour file came from outside the panel, not an internal unit."
      ],
      "answer": 1,
      "hints": [
        "Treat each release condition as a one-way requirement, and note which statements confirm that something exists.",
        "Ask which of the two routes remains open for the harbour files that were released."
      ],
      "optionNotes": [
        "False. 'No order covering a harbour file survived an appeal'.",
        "Correct. Released harbour files exist, were inspected and are disputed; no order survived appeal, so they had consent and needed a mediator who read 'its confidential annexes'.",
        "Overstated. Mediation is a condition, 'not promises that release will follow', so it does not guarantee release of every such file.",
        "Not supported. Either an external mediator or one from an uninvolved internal unit qualifies, and the statistics do not identify mediators."
      ],
      "explanation": "Some released harbour files exist, and each was inspected and disputed. An inspected file has consent or an order, never both, and no harbour order survived appeal, so released harbour files must have had consent and therefore independent mediation of the complete file. Necessary conditions must not be turned into guarantees.",
      "supersedes": "v16-06"
    },
    {
      "id": "v16-07-c",
      "topic": "Cold-chain vaccine custody",
      "difficulty": 3,
      "challenge": true,
      "keyType": "inference",
      "reasoning": {
        "model": "reset-events-and-parallel-certification",
        "stages": 5,
        "evidence": [
          "An experimental batch needs a batch-specific permit.",
          "The logger gap defeats continuous assurance.",
          "Manual monitoring therefore requires the trained original custodian.",
          "The refrigerant change requires a pre-handling supplement.",
          "Both instruments need calibration after battery replacement."
        ]
      },
      "passage": "A fictional depot releases a temperature-sensitive shipment only with temperature assurance and a valid destination permit. Assurance comes from a continuous logger record or approved manual monitoring. A logger record is continuous only if no interval between final packing and arrival is missing; restarting the logger does not fill an earlier gap. Manual monitoring needs two independent readings at each checkpoint, using instruments calibrated after their latest battery replacement, and a trained custodian throughout transfer. A custodian's certificate lasts two years, but if the refrigerant changes, a supplement covering it is needed before handling begins. A general permit excludes experimental products, and a specific permit must name the batch.\n\nAn experimental batch was validly released after arrival. Its logger record had a missing interval, both manual instruments had recently received new batteries, and the refrigerant changed before transfer. The original custodian, whose published certificate predates that change, handled the shipment. No other custodian or assurance route applied, and the dispatch page lists neither calibration dates nor permits.",
      "stem": "Which of the following statements is supported by the passage?",
      "options": [
        "Restarting the logger restored a continuous record, so manual monitoring became unnecessary.",
        "Both readers recalibrated their instruments at the depot on the very day the batch arrived.",
        "The permit named the batch; the custodian held a supplement; both devices were recalibrated.",
        "The custodian had already handled this experimental product before the refrigerant changed."
      ],
      "answer": 2,
      "hints": [
        "Check whether an experimental batch can rely on the ordinary permit.",
        "Then decide which assurance route the logger gap leaves, and what that route requires."
      ],
      "optionNotes": [
        "False. 'Restarting the logger does not fill an earlier gap'.",
        "Not supported. The place and date of calibration are not given.",
        "Correct. The gap forces manual monitoring, so the custodian needed a supplement after the refrigerant change and the instruments recalibration after 'their latest battery replacement'; an experimental batch needs a specific permit.",
        "Not supported. The custodian's earlier experience with this product is not mentioned."
      ],
      "explanation": "A general permit excludes experimental products, so the permit named the batch. The logger gap rules out continuous assurance, leaving manual monitoring by the original custodian, whose certificate predates the refrigerant change and so needed a supplement. Both instruments also needed calibration after their new batteries.",
      "supersedes": "v16-07"
    },
    {
      "id": "v16-08-c",
      "topic": "Anonymous review conflicts",
      "difficulty": 3,
      "challenge": true,
      "keyType": "inference",
      "reasoning": {
        "model": "identity-link-and-alternative-assignment",
        "stages": 6,
        "evidence": [
          "At least one assigned reviewer must be a field specialist.",
          "Only Neri and Vale qualify by field.",
          "Vale's recent same-person coauthorship excludes Vale.",
          "Tavi's current institution also creates a conflict, leaving Neri and Sol.",
          "Neri's expired qualification and pending renewal force a waiver.",
          "That waiver needs independent written assessment of work in the precise field."
        ]
      },
      "passage": "A fictional journal assigns each paper to two reviewers, both of whom must be eligible. A reviewer is ineligible if currently employed at an author's institution or having coauthored with an author within the previous three years; a change of surname does not make someone a different person. Each reviewer also needs a current subject qualification or an individual competence waiver. A qualification expires when its term ends; applying for renewal does not extend it. A waiver requires an external specialist, independent of authors and reviewers, to assess in writing the reviewer's work in the paper's precise field; a general endorsement is insufficient. Both reviewers may use the same specialist.\n\nA valid assignment chose two reviewers from Neri, Sol, Vale and Tavi, including at least one field specialist; only Neri and Vale were specialists. Vale had coauthored with an author two years earlier under a former surname. Tavi currently works at an author's institution. Neri's qualification had expired before assignment, with renewal pending. No other route or exception applied.",
      "stem": "Which of the following statements is supported by the passage?",
      "options": [
        "Vale was eligible because the joint publication appeared under a former surname.",
        "Neri's pending renewal kept the qualification in force, so no waiver was needed.",
        "The specialist who assessed Neri also granted Sol a waiver before the two were assigned.",
        "An independent specialist assessed in writing Neri's competence in this exact field."
      ],
      "answer": 3,
      "hints": [
        "Test each candidate's eligibility separately; both assigned reviewers must be eligible.",
        "Once the pair is fixed, check how the field specialist meets the competence requirement."
      ],
      "optionNotes": [
        "False. 'A change of surname does not make someone a different person', so Vale's coauthorship two years earlier still disqualifies Vale.",
        "False. 'Applying for renewal does not extend it'.",
        "Not supported. Both reviewers 'may use the same specialist', but nothing shows that Sol needed or received a waiver.",
        "Correct. Vale and Tavi are ineligible, so the specialist must be Neri; with an expired qualification, Neri needed a waiver based on written assessment in 'the paper's precise field'."
      ],
      "explanation": "Vale's recent coauthorship and Tavi's current employment exclude them, leaving Neri and Sol. Since a field specialist is required, Neri must be one of the reviewers. Neri's qualification had lapsed and renewal does not extend it, so Neri needed a waiver resting on an independent written assessment in the precise field.",
      "supersedes": "v16-08"
    },
    {
      "id": "v16-09-c",
      "topic": "Metropolitan fleet access",
      "difficulty": 3,
      "challenge": true,
      "keyType": "inference",
      "reasoning": {
        "model": "class-membership-and-expired-certificate",
        "stages": 5,
        "evidence": [
          "Sponsor payment makes the journey commercial.",
          "Heritage eligibility is excluded.",
          "Engine conversion requires renewed emissions assessment.",
          "The new operator lacks a standing permit.",
          "Individual authority therefore needs verified named passengers and journey date."
        ]
      },
      "passage": "A fictional city admits a vehicle to its restricted zone only with an environmental entitlement and an eligible journey. The entitlement comes from a current low-emission certificate or a heritage exemption. The exemption covers only use without commercial payment, and a journey paid by a sponsor on behalf of passengers counts as commercial. A certificate lapses after an engine conversion unless a new emissions assessment is completed. A journey is eligible under a standing service permit or an individual essential-trip authorisation. Standing permits belong to the registered operator, not the vehicle, and end on transfer to a new operator. Individual authorisation needs a verified destination appointment, confirmed electronically or by a signed facility letter naming the passengers and journey date; a statement that the facility is open is insufficient.\n\nA sponsor-paid vehicle validly entered the zone after an engine conversion and transfer to a new legal operator. Its old permit had not been reissued. No other entitlement or exception applied. The public entry record shows only plate and time.",
      "stem": "Which of the following statements is supported by the passage?",
      "options": [
        "Entry required a new emissions assessment and a verified appointment for that date.",
        "Sponsor payment was not commercial, so a heritage exemption made reassessment needless.",
        "The facility letter was signed by the person who carried out the new emissions check.",
        "The new operator had carried the same passengers before acquiring the converted vehicle."
      ],
      "answer": 0,
      "hints": [
        "Use the passage's definition of commercial use rather than the everyday meaning.",
        "Then ask what the operator transfer does to the journey side of the test."
      ],
      "optionNotes": [
        "Correct. Sponsor payment rules out the exemption and the conversion ends the old certificate, so a new assessment was needed; the transfer ended the permit, leaving an appointment naming 'the passengers and journey date'.",
        "False. A journey 'paid by a sponsor on behalf of passengers counts as commercial'.",
        "Not supported. Confirmation may be electronic, and nothing links any letter to the assessor.",
        "Not supported. Earlier service to these passengers is not mentioned."
      ],
      "explanation": "Sponsor payment makes the journey commercial, so only a current certificate can supply the environmental entitlement, and after the conversion that requires a new assessment. The transfer ended the standing permit, so the journey must have had individual authorisation based on a verified appointment for the named passengers and date.",
      "supersedes": "v16-09"
    },
    {
      "id": "v16-10-c",
      "topic": "Exhibition award score order",
      "difficulty": 3,
      "challenge": true,
      "keyType": "inference",
      "reasoning": {
        "model": "ranking-with-linked-conditions",
        "stages": 5,
        "evidence": [
          "Fifth-place Coral requires fourth-place Birch, which is forbidden.",
          "Elm must therefore follow Amber.",
          "Dune precedes Amber, giving Dune-Amber-Elm.",
          "Birch-Coral occupy an adjacent pair.",
          "Any placement of that pair consistent with the chain leaves Elm last."
        ]
      },
      "passage": "A fictional design exhibition ranks five entries, Amber, Birch, Coral, Dune and Elm, from first to fifth for its final award, with no ties. The organisers confirm that the following conditions held together. Birch ranks immediately above Coral. Amber ranks below Dune. Elm ranks below Amber unless Coral is fifth. Birch cannot be fourth. If Coral is fifth, Dune ranks second. Elm cannot rank second. A separate audience prize has no effect on the final ranking, and its winner could hold any rank consistent with these conditions.\n\nThe programme lists Amber first because names are printed alphabetically, and a floor-plan photograph shows Elm beside Dune. Neither publication states an award rank. A commentator assumes that the printed order reflects the jury's ranking. Only the conditions above can settle whether that assumption is justified and which entry must come last.",
      "stem": "Which of the following statements is supported by the passage?",
      "options": [
        "Coral ranked fifth, which triggered the rule that placed Dune in second position.",
        "Elm came last, with Dune above Amber and Birch directly above Coral in the ranking.",
        "Birch ranked fourth, with Coral immediately below it in the final award order.",
        "Elm won the audience prize after being placed beside Dune on the exhibition floor plan."
      ],
      "answer": 1,
      "hints": [
        "Sketch the five ranks and test where Coral can go, given where Birch must then be.",
        "Once the exception is ruled out, combine the two chains and see which rank is forced."
      ],
      "optionNotes": [
        "False. Coral fifth would put Birch fourth, but 'Birch cannot be fourth'.",
        "Correct. Coral cannot be fifth, so Elm ranks below Amber, which ranks below Dune; every placement of the Birch-Coral pair then leaves Elm fifth.",
        "False. 'Birch cannot be fourth'.",
        "Not supported. The audience prize winner and the timing of the floor plan are not given."
      ],
      "explanation": "Coral fifth would need Birch fourth, which is forbidden, so the exception never applies and Elm ranks below Amber. With Dune above Amber, the chain Dune-Amber-Elm must fit around the Birch-Coral pair, and every allowed arrangement leaves Elm last. Alphabetical order and floor position are irrelevant.",
      "supersedes": "v16-10"
    }
  ]
});
