EPSO_BANK.registerSet({
  "id": "verbal-16",
  "section": "verbal",
  "title": "Verbal reasoning · Set 16 — Very hard",
  "description": "Ten original, demanding inference problems. Combine dispersed evidence, scope restrictions and alternative explanations. Editorial difficulty; first-attempt calibration pending.",
  "version": 1,
  "challenge": true,
  "questions": [
    {
      "id": "v16-01",
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
      "passage": "A fictional statistics office releases a linked dataset only when both its licensing and disclosure conditions are met. Licensing is satisfied by an open licence covering every source or by specific permission from each restricted-source owner. A source described as freely viewable is not necessarily openly licensed. Permission for analysis does not include onward distribution unless the permission says so expressly.\n\nDisclosure clearance is obtained through full anonymisation or an approved secure-access environment. A dataset with stable person-level keys remains identifiable under these rules even when names are removed. An approved environment requires an independent security assessment performed after its latest software migration. An older assessment remains usable only when the migration changes neither access control nor export functions. If either changes, a new assessment is required; an internal developer's assurance is insufficient. Public release notices need not reproduce permissions or security reports.\n\nThe office validly released a dataset linking one openly licensed source to a freely viewable restricted register. It retained stable person-level keys and used an environment whose export function changed in a recent migration. The register owner had earlier permitted analysis alone. No other licensing, anonymisation or clearance route existed. The release notice identifies neither a further permission nor a new assessment.",
      "stem": "Which of the following statements is supported by the passage?",
      "options": [
        "The register owner had specifically permitted onward distribution, and an independent assessment followed the migration that altered the environment’s export function.",
        "The earlier analysis permission covered onward distribution because the restricted register was already freely viewable to members of the public.",
        "The independent assessor had helped the internal developers design the environment’s original export function before the migration changed its operation.",
        "The register owner charged the statistics office a distribution fee that exceeded the cost of carrying out the environment’s independent security assessment."
      ],
      "answer": 0,
      "hints": [
        "Trace the conditions in both directions; distinguish requirements from sufficient evidence.",
        "A freely viewable restricted source is not an open licence."
      ],
      "optionNotes": [
        "Correct. Restricted licensing needs distribution-specific permission; retained person keys exclude anonymisation, and changed exports invalidate reliance on the older assessment.",
        "False. Analysis permission and public visibility do not supply distribution rights.",
        "Not supported. The assessor’s earlier involvement is not stated.",
        "Not supported. No fees or cost comparison are provided."
      ],
      "explanation": "A freely viewable restricted source is not an open licence. Analysis-only permission cannot authorise distribution. Stable person keys exclude full anonymisation. The export change defeats the old-assessment exception. Secure access therefore needs a post-migration independent assessment."
    },
    {
      "id": "v16-02",
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
      "passage": "A fictional inquiry holds five hearings, one per day from Monday through Friday, without overlap. The hearings concern accounts, buildings, contracts, data and equipment. A published timetable is complete: no hearing is repeated and no extra hearing occupies a day. References to an earlier day mean strictly earlier, not the same day. These scheduling rules govern hearings, not when witnesses arrive at the inquiry.\n\nBuildings must be heard immediately after accounts. Contracts must be heard before data, but not on Monday. Equipment must be heard after data unless buildings is on Friday. If buildings is on Friday, contracts must instead be on Tuesday. Accounts cannot be on Thursday because its auditor is unavailable then. The chair confirms that all these rules were followed; nobody used a waiver, remote substitute or additional evening session. Friday is an ordinary hearing day and does not create any exception apart from the one expressly stated.\n\nThe inquiry's public summary lists the five topics alphabetically, rather than in chronological order. It records that the equipment witnesses arrived on Monday and remained available all week. Their arrival therefore does not itself establish when the equipment hearing took place. The task is to recover what the scheduling constraints require.",
      "stem": "Which of the following statements is supported by the passage?",
      "options": [
        "The buildings hearing was on Friday, enabling the inquiry to use the stated exception to hearing equipment after the data session.",
        "The equipment hearing was on Friday, after the data hearing, despite its witnesses having arrived at the inquiry on Monday.",
        "The contracts hearing took place on Monday before the inquiry heard accounts and buildings on two consecutive days later in the week.",
        "The equipment witnesses attended the buildings hearing before giving evidence at their own hearing on the final day of the timetable."
      ],
      "answer": 1,
      "hints": [
        "Trace the conditions in both directions; distinguish requirements from sufficient evidence.",
        "Friday buildings would require Thursday accounts, which is forbidden."
      ],
      "optionNotes": [
        "False. Friday buildings would force forbidden Thursday accounts.",
        "Correct. Buildings cannot be Friday because accounts cannot be Thursday; accounts-buildings must occupy Monday-Tuesday, leaving contracts-data-equipment Wednesday-Friday.",
        "False. Contracts is expressly excluded from Monday.",
        "Not supported. Witness availability does not establish attendance at another hearing."
      ],
      "explanation": "Friday buildings would require Thursday accounts, which is forbidden. Equipment must consequently follow data. Contracts precedes data and cannot be Monday. The accounts-buildings pair therefore occupies Monday-Tuesday. Contracts, data and equipment fill Wednesday-Friday in that order."
    },
    {
      "id": "v16-03",
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
      "passage": "A fictional repository accepts a provenance claim only when the claimed site is connected to the deposited specimen through an unbroken identification chain. A field label alone is insufficient when containers were pooled. After pooling, provenance can be restored by a unique genetic match to a separately stored site reference or by a contemporaneous transfer log listing the specimen's individual tag. A later list copied from memory does not count as contemporaneous.\n\nGenetic matching qualifies only when the site reference was stored separately before pooling and was not itself relabelled from the pooled collection. Matching a specimen to another pooled specimen establishes similarity without restoring a site identity. Transfer logs are valid only when their signing officer was authorised at the time of transfer. An officer's authority ends on transfer to another unit unless the repository renews it in writing beforehand. Subsequent ratification does not repair an earlier unauthorised log.\n\nA site claim was validly accepted for a specimen from pooled containers. No separately stored site reference existed. Its individual tag appeared in a transfer log signed by officer Ivo after Ivo moved to another unit. The public catalogue gives the signature date but no renewal document. No alternative provenance route or exception applied.",
      "stem": "Which of the following statements is supported by the passage?",
      "options": [
        "A genetic match to another specimen in the pooled collection supplied the missing site identity despite the absence of a separately stored reference.",
        "The repository renewed Ivo’s authority because the transfer log contained more individual tags than logs signed by officers in the original unit.",
        "Ivo’s written renewal preceded the move, and the qualifying tag record was made during transfer rather than reconstructed from later memory.",
        "Ivo copied the individual tag into the public catalogue immediately after signing the transfer log while working in the new repository unit."
      ],
      "answer": 2,
      "hints": [
        "Trace the conditions in both directions; distinguish requirements from sufficient evidence.",
        "Pooling defeats label-only provenance."
      ],
      "optionNotes": [
        "False. Matching within the pooled collection does not restore site identity.",
        "Not supported. The repository’s reason and comparative tag counts are unstated.",
        "Correct. With genetic restoration unavailable, a contemporaneous individual log is necessary, signed under authority renewed before the move.",
        "Not supported. The catalogue’s preparation date and compiler are not given."
      ],
      "explanation": "Pooling defeats label-only provenance. No separately stored reference exists, excluding genetic restoration. The remaining route needs a contemporaneous individual-tag log. The signing officer had moved units. Only a written renewal before that move preserves signing authority."
    },
    {
      "id": "v16-04",
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
      "passage": "A fictional courier service routes a parcel through one of three hubs: North, Central or South. Parcels containing a battery cannot use South. North accepts a battery only if the parcel has a current test label. Central accepts it only when a dangerous-goods officer authorises the consignment. Ordinary handling training does not constitute dangerous-goods authorisation. These restrictions apply even when the battery is switched off.\n\nA test label ceases to be current after the battery casing is modified, unless the modification is performed under the original test laboratory's approved design. A supplier's claim that a modification is minor does not establish approved design. Dangerous-goods officers may authorise through an individual inspection or a remotely reviewed packing record. Both routes require an accredited packer to have sealed the parcel after its most recent opening. A label attached before reopening does not prove later sealing. The service's tracking page omits inspection and packing records.\n\nA battery parcel was validly routed after an unapproved casing modification. It had also been reopened after its original packing. Its tracking page records dispatch but no hub, fresh seal or authorisation. No new battery test had occurred and no special route existed.",
      "stem": "Which of the following statements is supported by the passage?",
      "options": [
        "The battery’s switched-off state removed the South restriction and allowed the service to avoid both test-label and dangerous-goods requirements.",
        "The unapproved casing modification left the original label current because the supplier considered the alteration minor rather than a new battery design.",
        "The dangerous-goods officer chose remote review because the accredited packer was unavailable for an individual inspection of the consignment.",
        "The parcel used Central, with officer authorisation and a fresh seal applied by an accredited packer after its latest opening."
      ],
      "answer": 3,
      "hints": [
        "Trace the conditions in both directions; distinguish requirements from sufficient evidence.",
        "A battery cannot use South."
      ],
      "optionNotes": [
        "False. Switching off does not remove routing restrictions.",
        "False. Supplier judgment cannot establish approved-design status.",
        "Not supported. The authorisation route and reasons are unspecified.",
        "Correct. Battery excludes South; unapproved modification and no retest exclude North, leaving Central and its shared post-opening accredited-seal requirement."
      ],
      "explanation": "A battery cannot use South. Unapproved casing modification invalidates the label. No retest restores North eligibility. Central therefore needs dangerous-goods authorisation. Either authorisation route needs accredited sealing after the final opening."
    },
    {
      "id": "v16-05",
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
      "passage": "A fictional grant audit sampled successful projects from two funding streams. Stream R used open competition, while stream S used nominations. The auditors selected only completed projects from R but selected both completed and discontinued projects from S. Among audited projects, R had the higher fraction meeting its original output target. Within the subset of completed projects, S had the higher fraction. Neither statement describes all funded projects.\n\nThe streams used different definitions of completion. R counted an extension beyond the original deadline as completion if the extension had been authorised; S recorded such projects as discontinued for the audit. Several organisations received grants from both streams, but the report did not identify which audited projects shared organisations. Output targets had also been revised for some projects, although success was judged against original targets. The report does not give the distribution of revisions by stream or completion status.\n\nThe auditors regard the published sample counts as accurate. They neither randomised the funding route nor reconstructed a common completion definition. A reader proposes that R's larger overall audited success fraction establishes that open competition itself caused more projects to succeed than nominations. The report supplies no separate estimate of that effect.",
      "stem": "Which of the following statements is supported by the passage?",
      "options": [
        "The accurate sample fractions do not isolate a funding-route effect, given different selection rules and incompatible definitions of project completion.",
        "The overall audited fractions and the completed-project fractions both rank R above S when success is measured against the original output targets.",
        "The projects whose targets were revised received larger grants on average than the projects evaluated without any revision to their original targets.",
        "The organisations funded through both streams used the nomination route to finance the same activities that were assessed under their open-competition grants."
      ],
      "answer": 0,
      "hints": [
        "Trace the conditions in both directions; distinguish requirements from sufficient evidence.",
        "The audited populations have different selection rules."
      ],
      "optionNotes": [
        "Correct. Different audited populations and completion definitions alone prevent these descriptive fractions from identifying a causal funding-route effect.",
        "False. Completed-project fractions rank S above R.",
        "Not supported. Grant sizes by revision status are not reported.",
        "Not supported. Shared organisations do not establish shared financed activities."
      ],
      "explanation": "The audited populations have different selection rules. Completion is defined differently by stream. Some organisations recur without linked identification. Original-target comparisons coexist with unequally described revisions. No randomised or adjusted estimate isolates the funding-route effect."
    },
    {
      "id": "v16-06",
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
      "passage": "A fictional oversight panel distinguishes inspected files, disputed files and files eligible for public release. Every inspected file has either a signed consent or a statutory disclosure order, and no file has both. A disputed file with consent can be released only after independent mediation. A disputed file with an order can be released only after the order survives an appeal. These are requirements, not promises that release will occur.\n\nEvery file from the harbour office is disputed. Some harbour files were publicly released, and every publicly released harbour file had been inspected. No order covering a harbour file survived an appeal. Independent mediation is performed either by an external mediator or by an internal mediator from a unit uninvolved in the original file. In either case the mediator must read the complete file, including confidential annexes. Reading the public summary alone does not suffice. The panel's published statistics do not identify individual released files or mediators.\n\nNo emergency release exception exists, and the statements cover the same period and file population. A missing mediator name in the statistics does not mean mediation was absent. The panel asks what can be inferred about at least some harbour files without turning necessary conditions into guarantees of release.",
      "stem": "Which of the following statements is supported by the passage?",
      "options": [
        "Some publicly released harbour files relied on orders that had survived appeal, rather than consent followed by the required independent mediation.",
        "At least one inspected harbour file had consent and was read with its confidential annexes by a mediator independent of its originating work.",
        "Every inspected file with a signed consent was publicly released once its mediator had read the complete file and all confidential annexes.",
        "The independent mediator who read a released harbour file worked outside the panel rather than in an uninvolved internal unit during that period."
      ],
      "answer": 1,
      "hints": [
        "Trace the conditions in both directions; distinguish requirements from sufficient evidence.",
        "Some released harbour files exist."
      ],
      "optionNotes": [
        "False. No harbour order survived appeal.",
        "Correct. Released harbour files exist, are inspected and disputed, cannot use an appealed order, and therefore require consent and complete-file mediation.",
        "Overstated. The passage expressly states that these requirements do not promise release.",
        "Not supported. Either independent mediation arrangement could qualify."
      ],
      "explanation": "Some released harbour files exist. All such files are inspected and disputed. No surviving order is available for them. The exclusive inspected-file alternatives force consent. Release then requires independent mediation including the confidential annexes."
    },
    {
      "id": "v16-07",
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
      "passage": "A fictional depot releases a temperature-sensitive shipment only with current temperature assurance and a valid destination permit. Temperature assurance uses a continuous logger or an approved manual-monitoring arrangement. A logger's record is continuous only if no interval is missing between final packing and arrival. Restarting the logger does not fill a previous gap. Manual monitoring requires two independent readings at each checkpoint and a trained custodian throughout transfer.\n\nA custodian's certificate remains valid for two years unless the shipment's refrigerant changes. A change then requires a supplement covering that refrigerant before handling begins. Both independent readers must use instruments calibrated after their latest battery replacement. A destination permit can be general or consignment-specific; a general permit excludes experimental products. A specific permit must name the shipment's batch. The public dispatch page lists neither readers' calibration dates nor permit documents.\n\nAn experimental batch was validly released after arrival. Its logger had a missing interval, both manual instruments had recently received new batteries, and the refrigerant changed before transfer. No alternate custodian, manual exception or other assurance route applied. The shipment used its original custodian, whose published certificate preceded the refrigerant change.",
      "stem": "Which of the following statements is supported by the passage?",
      "options": [
        "Restarting the logger at arrival restored a continuous record over the missing interval and removed the need for the manual-monitoring arrangement.",
        "The two independent readers performed their post-battery calibrations at the destination depot on the same day that the experimental batch arrived.",
        "The batch had a specific destination permit, while the original custodian held a refrigerant supplement and both readers used post-battery calibrated instruments.",
        "The original custodian had handled this experimental product before the refrigerant change and before either manual instrument received its new battery."
      ],
      "answer": 2,
      "hints": [
        "Trace the conditions in both directions; distinguish requirements from sufficient evidence.",
        "An experimental batch needs a batch-specific permit."
      ],
      "optionNotes": [
        "False. Restart cannot fill the missing interval.",
        "Not supported. Calibration location and exact date are unreported.",
        "Correct. Missing logs force manual assurance with supplemented training and recalibration; experimental status excludes the general permit.",
        "Not supported. The custodian’s earlier experience with this product is unspecified."
      ],
      "explanation": "An experimental batch needs a batch-specific permit. The logger gap defeats continuous assurance. Manual monitoring therefore requires the trained original custodian. The refrigerant change requires a pre-handling supplement. Both instruments need calibration after battery replacement."
    },
    {
      "id": "v16-08",
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
          "Vale’s recent same-person coauthorship excludes Vale.",
          "Tavi’s current institution also creates a conflict, leaving Neri and Sol.",
          "Neri’s expired qualification and pending renewal force a waiver.",
          "That waiver needs independent written assessment of work in the precise field."
        ]
      },
      "passage": "A fictional journal assigns each paper to two independent reviewers. A reviewer is ineligible for a paper when currently employed by an author's institution or when having coauthored with an author during the previous three years. A change of surname does not create a different person. A shared former institution alone creates no conflict. Both reviewers must be eligible; having an eligible majority is insufficient.\n\nReviewers can hold a current subject qualification or receive an individual competence waiver. Qualifications expire when their stated term ends; an application for renewal does not extend them. A waiver requires an external specialist independent of authors and reviewers to provide a written assessment of the reviewer's work in the paper's precise field. A general endorsement of scholarly quality is insufficient. The two reviewers may have received waivers from the same specialist, provided that specialist is independent of the authors and reviewers. Public publication records do not disclose the journal's assignment decisions or waiver documents.\n\nA valid assignment selected two reviewers from Neri, Sol, Vale and Tavi, including at least one field specialist. Only Neri and Vale were field specialists. Vale had coauthored with an author two years earlier under a former surname. Tavi currently worked at an author’s institution. Neri’s qualification expired before assignment and renewal remained pending. No other competence route or conflict exception applied.",
      "stem": "Which of the following statements is supported by the passage?",
      "options": [
        "Vale became eligible for this paper when the surname changed because the earlier publication appeared under a different name in the public record.",
        "Neri’s pending renewal application extended the expired qualification through assignment and made an individual competence waiver unnecessary for the review.",
        "The independent specialist who assessed Neri’s field competence also assessed Sol before both reviewers were assigned to the same paper.",
        "An independent specialist had assessed Neri’s work in this paper’s precise field for the competence waiver needed to make the assignment valid."
      ],
      "answer": 3,
      "hints": [
        "Trace the conditions in both directions; distinguish requirements from sufficient evidence.",
        "Both assigned reviewers must be eligible."
      ],
      "optionNotes": [
        "False. Surname changes do not alter personal identity for conflicts.",
        "False. Applying does not extend qualification.",
        "Not supported. The same specialist is permitted but not required.",
        "Correct. Recent coauthorship excludes Vale and current author-institution employment excludes Tavi; the specialist requirement forces Neri, whose expired qualification needs a field-assessed waiver."
      ],
      "explanation": "At least one assigned reviewer must be a field specialist. Only Neri and Vale qualify by field. Vale’s recent same-person coauthorship excludes Vale. Tavi’s current institution also creates a conflict, leaving Neri and Sol. Neri’s expired qualification and pending renewal force a waiver. That waiver needs independent written assessment of work in the precise field."
    },
    {
      "id": "v16-09",
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
      "passage": "A fictional city allows a vehicle into its restricted zone only with an environmental entitlement and an eligible journey. Environmental entitlement comes from a current low-emission certificate or a heritage exemption. The exemption applies only to vehicles used without commercial payment. A journey paid by a sponsor on behalf of passengers still counts as commercial. Certificate validity ends after an engine conversion unless a new emissions assessment is completed.\n\nA journey is eligible through a standing service permit or an individual essential-trip authorisation. Standing permits attach to the registered operator, not the vehicle, and cease on a transfer to a new legal operator. Individual authorisation requires a verified destination appointment. Appointment verification can be electronic or by a signed facility letter; either must name the vehicle's passengers and the journey date. A general statement that the facility is open is insufficient. The public zone-entry record displays the number plate and time but not the underlying certificates.\n\nA sponsor-paid vehicle validly entered after an engine conversion and transfer to a new legal operator. Its old standing permit had not been transferred or reissued. No other entitlement, journey category or exception applied. The zone record shows neither a new emissions assessment nor a passenger appointment.",
      "stem": "Which of the following statements is supported by the passage?",
      "options": [
        "A fresh emissions assessment and a date-specific verified passenger appointment were necessary for this commercially paid vehicle’s valid entry.",
        "Sponsor payment did not count as commercial use, so the vehicle’s heritage exemption removed the need for a current emissions assessment after conversion.",
        "The signed facility letter was prepared by the person who performed the vehicle’s new emissions assessment after its engine conversion.",
        "The new legal operator had served the same passengers before it acquired the converted vehicle and requested access to the restricted zone."
      ],
      "answer": 0,
      "hints": [
        "Trace the conditions in both directions; distinguish requirements from sufficient evidence.",
        "Sponsor payment makes the journey commercial."
      ],
      "optionNotes": [
        "Correct. Sponsor payment excludes heritage; conversion requires a new assessment, and operator transfer removes standing permission, leaving verified essential-trip authority.",
        "False. Sponsor-paid travel is expressly commercial.",
        "Not supported. Verification need not use a letter, and no common author is given.",
        "Not supported. Prior service to these passengers is unspecified."
      ],
      "explanation": "Sponsor payment makes the journey commercial. Heritage eligibility is excluded. Engine conversion requires renewed emissions assessment. The new operator lacks a standing permit. Individual authority therefore needs verified named passengers and journey date."
    },
    {
      "id": "v16-10",
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
      "passage": "A fictional design exhibition ranks five entries, named Amber, Birch, Coral, Dune and Elm, from first to fifth with no ties. The ranks refer to the final award, not to exhibition floor positions or jury voting order. Each entry occupies exactly one rank. The organisers publish the following constraints as a complete and accurate account of the relationships needed here.\n\nBirch ranks immediately above Coral. Amber ranks below Dune. Elm ranks below Amber unless Coral is fifth. Birch cannot be fourth. If Coral is fifth, Dune ranks second. Elm cannot rank second. No special prize changes these relationships: a separate audience prize has no effect on the final ranking. The jury confirms that every condition held simultaneously and that an entry with an audience prize could occupy any final rank consistent with those conditions.\n\nThe programme lists Amber first because names are printed alphabetically, and a floor-plan photograph shows Elm beside Dune. Neither publication states an award rank. A commentator assumes the printed order reflects the jury's ordering and puts Amber above Birch. The constraints, rather than alphabetical order or physical adjacency, determine whether that claim is justified and which entry necessarily occupies the last place.",
      "stem": "Which of the following statements is supported by the passage?",
      "options": [
        "Coral ranked fifth, activating the condition that would place Dune second in the final ordering of the five exhibition entries.",
        "Elm ranked fifth, while Dune preceded Amber and Birch immediately preceded Coral in the final award ordering.",
        "Birch ranked fourth, with Coral immediately below it, regardless of the audience prize awarded during the exhibition programme.",
        "Elm received the audience prize after the jury had already placed it beside Dune on the exhibition floor for public viewing."
      ],
      "answer": 1,
      "hints": [
        "Trace the conditions in both directions; distinguish requirements from sufficient evidence.",
        "Fifth-place Coral requires fourth-place Birch, which is forbidden."
      ],
      "optionNotes": [
        "False. Coral fifth would require forbidden fourth-place Birch.",
        "Correct. Coral cannot be fifth because that requires fourth-place Birch; Elm therefore follows Amber, and the immediate pair plus Dune-Amber-Elm chain force Elm last.",
        "False. Birch is expressly forbidden fourth place.",
        "Not supported. The audience winner and floor-plan timing are not given."
      ],
      "explanation": "Fifth-place Coral requires fourth-place Birch, which is forbidden. Elm must therefore follow Amber. Dune precedes Amber, giving Dune-Amber-Elm. Birch-Coral occupy an adjacent pair. Any placement of that pair consistent with the chain leaves Elm last."
    }
  ]
});
