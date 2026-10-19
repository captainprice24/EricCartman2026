EPSO_BANK.registerSet({
  "id": "verbal-17",
  "section": "verbal",
  "title": "Verbal reasoning · Set 17 — Very hard",
  "description": "Ten original, demanding inference problems. Combine dispersed evidence, scope restrictions and alternative explanations. Editorial difficulty; first-attempt calibration pending.",
  "version": 1,
  "challenge": true,
  "questions": [
    {
      "id": "v17-01",
      "topic": "Export assay licensing",
      "difficulty": 3,
      "challenge": true,
      "keyType": "inference",
      "reasoning": {
        "model": "nested-route-to-assessor-competence",
        "stages": 6,
        "evidence": [
          "The 1880 carrier makes the object listed.",
          "The 1920 inscription alone does not create a modern reproduction.",
          "Withheld consent forces an origin assay.",
          "Unreissued ownership-change licensing forces supervision.",
          "The supervisor’s superseded method training needs a supplement.",
          "That supplement must postdate the method change."
        ]
      },
      "passage": "A fictional museum can export an unlisted object freely, but a listed object needs a certificate. An object is listed when its carrier dates before 1900, unless it is a modern reproduction. A reproduction means that both carrier and inscription were produced after 1900; a later inscription on an older carrier does not qualify. The exported object had a carrier dated 1880 and an inscription added in 1920.\n\nA certificate requires either owner consent or an origin assay. The object's owner withheld consent. An origin assay is accepted from a licensed laboratory, or from an unlicensed laboratory under external supervision. A laboratory loses its licence when ownership changes unless the regulator reissues it. Supervision requires an assessor with current method training. Training for a superseded method qualifies only if the assessor passed a supplement after the method change. Long experience and attendance at a briefing do not replace that supplement. The certificate register need not publish training documents.\n\nThe export was validly completed. The sole assay laboratory had changed owner and had no reissued licence. Its supervisor had trained under the superseded method and attended a briefing after the change. No other export, assay, supervision or training route applied.",
      "stem": "Which of the following statements is supported by the passage?",
      "options": [
        "The supervisor’s briefing attendance was sufficient because the assay laboratory retained its licence after its change of ownership under external supervision.",
        "The required method supplement was passed after the change but before the supervisor attended the briefing mentioned in the export record.",
        "The supervisor had passed a method supplement after the change; the later inscription did not remove the older carrier from certification requirements.",
        "The supervisor’s practical assessment occurred after the laboratory changed owner, rather than between the method revision and that later ownership transfer."
      ],
      "answer": 2,
      "hints": [
        "Trace the conditions in both directions; distinguish requirements from sufficient evidence.",
        "The 1880 carrier makes the object listed."
      ],
      "optionNotes": [
        "False. No reissued licence exists, and a briefing cannot replace the supplement.",
        "Not supported. The supplement is required but its order relative to the briefing is not stated.",
        "Correct. The old carrier defeats reproduction, consent fails, the unlicensed assay needs supervision, and superseded training needs a post-change supplement.",
        "Not supported. The supplement follows the method change; its order relative to the later ownership transfer is not specified."
      ],
      "explanation": "The 1880 carrier makes the object listed. The 1920 inscription alone does not create a modern reproduction. Withheld consent forces an origin assay. Unreissued ownership-change licensing forces supervision. The supervisor’s superseded method training needs a supplement. That supplement must postdate the method change."
    },
    {
      "id": "v17-02",
      "topic": "Rail wagon admission",
      "difficulty": 3,
      "challenge": true,
      "keyType": "inference",
      "reasoning": {
        "model": "classification-to-calibration-chain",
        "stages": 6,
        "evidence": [
          "Liquid cargo requires specialist admission regardless of mass.",
          "Changed axle count invalidates the old certificate.",
          "The removed second scale prevents a two-scale assessment.",
          "One current scale therefore needs an independent check weight.",
          "Independence excludes the scale-calibrating laboratory.",
          "Resurfacing requires later certification of the weight’s mass."
        ]
      },
      "passage": "A fictional rail terminal admits a wagon through the ordinary lane unless its cargo is liquid or its axle load exceeds the general limit. Either condition requires specialist admission. Specialist admission needs a sealed load certificate or an on-site balance assessment. A certificate covers only the cargo and axle configuration tested. Altering the number of axles invalidates it even when total cargo mass falls.\n\nAn on-site assessment uses either two current scales or one current scale with an independent check weight. A scale becomes noncurrent after relocation unless recalibrated afterwards. The terminal's sole second scale was removed permanently before the arrival in question. A check weight is independent only when its mass was certified by a laboratory other than the one calibrating the scale. Certification must postdate the weight's latest resurfacing. Neither a weight's engraved original mass nor a supplier declaration supplies that certification. Admission records do not publish laboratory identities.\n\nA liquid-cargo wagon was validly admitted after its axle count changed. Its load certificate predated that change. The sole available scale had been relocated and then recalibrated; the check weight had been resurfaced after its engraved mass was recorded. No other lane, scale or assessment procedure existed.",
      "stem": "Which of the following statements is supported by the passage?",
      "options": [
        "The engraved mass remained sufficient because the terminal’s available scale had already been recalibrated after relocation before the wagon arrived.",
        "The weight-certifying laboratory also calibrated the terminal’s scale, provided that both operations followed the relocation and resurfacing events.",
        "The required weight certification probably occurred after the scale calibration, rather than before it, because both events followed the relevant physical changes.",
        "A laboratory other than the scale’s calibrator established the resurfaced weight’s mass, with certification issued after the surface work was completed."
      ],
      "answer": 3,
      "hints": [
        "Trace the conditions in both directions; distinguish requirements from sufficient evidence.",
        "Liquid cargo requires specialist admission regardless of mass."
      ],
      "optionNotes": [
        "False. An engraving cannot supply post-resurfacing certification.",
        "False. The independent weight requires a different laboratory.",
        "Not supported. Each event has its own lower bound; their mutual ordering is unspecified.",
        "Correct. Liquid forces specialist admission; changed axles defeat the old certificate, one scale forces an independent check weight, and resurfacing fixes its certification lower bound."
      ],
      "explanation": "Liquid cargo requires specialist admission regardless of mass. Changed axle count invalidates the old certificate. The removed second scale prevents a two-scale assessment. One current scale therefore needs an independent check weight. Independence excludes the scale-calibrating laboratory. Resurfacing requires later certification of the weight’s mass."
    },
    {
      "id": "v17-03",
      "topic": "Adverse-event consent review",
      "difficulty": 3,
      "challenge": true,
      "keyType": "inference",
      "reasoning": {
        "model": "derived-risk-to-qualified-signature",
        "stages": 6,
        "evidence": [
          "Contractor interviews of minors are new donor contact.",
          "The analysis-only approval cannot cover it.",
          "Minor contact excludes delegated chair approval.",
          "Ordinary approval requires an independent clinician among three eligible members.",
          "The attending investigator and alternate cannot fill an eligible place.",
          "With no other physical participant, the clinician must attend completely through a verified live connection."
        ]
      },
      "passage": "A fictional ethics office permits an unchanged-risk study amendment by administrative notice. An amendment changes risk when it adds donor contact or discloses coded records to a new institution. Both acts count even when a contractor performs them. A changed-risk amendment instead requires committee approval, unless an existing approval expressly covers the same new activity and institution. A general permission to analyse samples does not cover donor contact.\n\nCommittee approval is valid through an ordinary meeting or a delegated chair decision. Delegation excludes amendments involving contact with minors. Ordinary meetings require three eligible members, including an independent clinician. An employed investigator on the study is ineligible, and an attending conflicted member cannot be replaced by an alternate. The clinician can attend remotely only with a verified live connection showing the complete meeting. A recording watched afterwards cannot count as attendance. The public amendment record lists decisions rather than every participant's connection evidence.\n\nAn amendment was validly approved to let a contractor interview minor donors at a newly involved institution. The old approval permitted sample analysis alone. Two eligible nonclinical members attended, alongside an attending investigator and that investigator's alternate. No other person was physically present, and no special approval route applied.",
      "stem": "Which of the following statements is supported by the passage?",
      "options": [
        "An eligible independent clinician joined the complete meeting live; a later recording or the conflicted investigator’s alternate could not fill that role.",
        "The investigator’s alternate counted as the third eligible member, allowing the independent clinician to review the complete meeting only after it ended.",
        "The independent clinician attended remotely before the contractor began interviewing minors, and also personally approved the contractor’s interview script.",
        "The independent clinician’s connection was verified by the committee chair rather than another office member before the live meeting began."
      ],
      "answer": 0,
      "hints": [
        "Trace the conditions in both directions; distinguish requirements from sufficient evidence.",
        "Contractor interviews of minors are new donor contact."
      ],
      "optionNotes": [
        "Correct. New minor contact changes risk; old approval fails, chair delegation excludes minors, and valid ordinary quorum needs live remote independent clinical attendance.",
        "False. An attending conflicted member cannot be replaced, and later viewing is not attendance.",
        "Not supported. Clinical attendance is necessary; personal script approval is not stated.",
        "Not supported. The verifier’s identity and exact pre-meeting timing are unspecified."
      ],
      "explanation": "Contractor interviews of minors are new donor contact. The analysis-only approval cannot cover it. Minor contact excludes delegated chair approval. Ordinary approval requires an independent clinician among three eligible members. The attending investigator and alternate cannot fill an eligible place. With no other physical participant, the clinician must attend completely through a verified live connection."
    },
    {
      "id": "v17-04",
      "topic": "Council remote adoption",
      "difficulty": 3,
      "challenge": true,
      "keyType": "inference",
      "reasoning": {
        "model": "inferred-meeting-class-and-service-route",
        "stages": 6,
        "evidence": [
          "Extension to exempt residents makes the renamed charge nonroutine.",
          "The incomplete-text signature prevents a unanimous valid waiver.",
          "Full notice is therefore necessary.",
          "No portal acknowledgment leaves postal service.",
          "The replaced secretary requires explicit later reauthorisation.",
          "Effective delivery must precede the full notice start."
        ]
      },
      "passage": "A fictional council may adopt a routine decision at a short-notice meeting. A decision is nonroutine if it creates a new charge or extends a charge to previously exempt residents. Renaming an existing charge does not prevent that classification. Nonroutine decisions need a full notice period unless every member signs a waiver. A signature counts only if the member had the complete proposed text before signing.\n\nWhen full notice is used, the period starts after effective delivery to every member. Electronic delivery is effective through a designated portal with receipt acknowledgment. Postal delivery requires an authorised recipient at the member's nominated address. A former secretary's authority ends when the member appoints a replacement, unless renewed explicitly afterwards. The public minutes can omit acknowledgments and recipient-authority records. A later vote in favour does not retrospectively validate an earlier signature on an incomplete waiver.\n\nA newly renamed charge was validly adopted after being extended to an exempt residential group. One member signed a waiver before receiving its complete text and did not sign again. That member's portal gave no acknowledgment. A former secretary signed the postal receipt after being replaced. No other delivery, waiver or adoption route existed.",
      "stem": "Which of the following statements is supported by the passage?",
      "options": [
        "The later favourable vote validated the incomplete-text waiver, so renewal of the former secretary’s postal authority was unnecessary for valid adoption.",
        "The member had explicitly renewed the former secretary’s authority, and effective postal delivery preceded the beginning of the full notice period.",
        "The member’s replacement secretary was forbidden to receive notice after the former secretary’s authority had been renewed for this particular delivery.",
        "The notice period began when the complete text was first dispatched electronically, although that member’s designated portal never acknowledged its receipt."
      ],
      "answer": 1,
      "hints": [
        "Trace the conditions in both directions; distinguish requirements from sufficient evidence.",
        "Extension to exempt residents makes the renamed charge nonroutine."
      ],
      "optionNotes": [
        "False. A later favourable vote cannot repair the defective waiver.",
        "Correct. Extending the charge makes it nonroutine, the defective waiver forces full notice, failed portal delivery leaves post, and the replaced secretary needs renewed authority.",
        "Not supported. Renewing the former secretary does not imply that the replacement lost authority.",
        "False. Dispatch without acknowledgment is not effective electronic delivery."
      ],
      "explanation": "Extension to exempt residents makes the renamed charge nonroutine. The incomplete-text signature prevents a unanimous valid waiver. Full notice is therefore necessary. No portal acknowledgment leaves postal service. The replaced secretary requires explicit later reauthorisation. Effective delivery must precede the full notice start."
    },
    {
      "id": "v17-05",
      "topic": "Seed accession release",
      "difficulty": 3,
      "challenge": true,
      "keyType": "inference",
      "reasoning": {
        "model": "derived-status-to-sample-timing",
        "stages": 6,
        "evidence": [
          "Collection within the active alert area triggers quarantine.",
          "Alive-for-sowing release excludes destruction.",
          "A negative certificate is necessary.",
          "The warm reserve fails despite its intact seal.",
          "The fresh sample must follow that failure.",
          "The reused instrument requires sterilisation after its last other-accession use."
        ]
      },
      "passage": "A fictional seed library releases ordinary accessions on demand but quarantines any accession collected in an area under a current pathogen alert. The alert applies to collection location, not the later storage location. Quarantined accessions can leave through destruction or under a negative pathogen certificate. Moving them to another store does not remove quarantine. The accession at issue was released alive for sowing after being collected inside an active alert area.\n\nA negative certificate requires an approved laboratory using either a freshly drawn sample or a preserved reserve. A reserve qualifies only while its seal remains intact and its storage temperature never exceeds the specified maximum. If either condition fails, a fresh sample must be drawn after the failure. Sampling can be done by library staff or an outside collector; either must use instruments sterilised after their latest use on another accession. A supplier's original sterility seal does not establish sterility after subsequent use. Public release records do not reproduce sampling logs.\n\nThe only reserve had warmed above the maximum before certification. Its seal remained intact. The sole sampling instrument had previously been used on another accession. No alternative reserve, instrument or release exception existed.",
      "stem": "Which of the following statements is supported by the passage?",
      "options": [
        "The intact reserve seal preserved its eligibility despite the excessive storage temperature, so a new sample and subsequent sterilisation were unnecessary.",
        "The fresh sample was collected by outside staff, whose instruments were sterilised after the reserve warmed above its specified temperature maximum.",
        "After the reserve exceeded its storage limit, a new sample was collected with an instrument sterilised since its most recent use on another accession.",
        "The required instrument sterilisation probably occurred after its prior use but before the reserve’s temperature failure was discovered by library staff."
      ],
      "answer": 2,
      "hints": [
        "Trace the conditions in both directions; distinguish requirements from sufficient evidence.",
        "Collection within the active alert area triggers quarantine."
      ],
      "optionNotes": [
        "False. Either reserve failure condition disqualifies it.",
        "Not supported. Staff identity is unrestricted, and sterilisation need not follow the warming event.",
        "Correct. Alert collection forces quarantine; live release excludes destruction, warmed reserve fails despite intact seal, and fresh sampling needs post-use sterilisation.",
        "Not supported. The discovery date and its order relative to sterilisation are not stated."
      ],
      "explanation": "Collection within the active alert area triggers quarantine. Alive-for-sowing release excludes destruction. A negative certificate is necessary. The warm reserve fails despite its intact seal. The fresh sample must follow that failure. The reused instrument requires sterilisation after its last other-accession use."
    },
    {
      "id": "v17-06",
      "topic": "Treasury grant signature",
      "difficulty": 3,
      "challenge": true,
      "keyType": "inference",
      "reasoning": {
        "model": "ownership-class-to-time-specific-authority",
        "stages": 6,
        "evidence": [
          "Private minority ownership excludes the public route.",
          "The community lease requires an enforceable purchase restriction.",
          "Thirty years excludes treasurer delegation.",
          "Full board approval needs the sole independent auditor.",
          "Leaving the firm makes registration inactive.",
          "Professional reactivation under either route requires a post-consulting independence declaration."
        ]
      },
      "passage": "A fictional treasury pays a capital grant only after an eligible project receives valid financial approval. A project is eligible through public ownership or an approved community lease. Public ownership means the applicant is wholly owned by public bodies; a private minority shareholder excludes that route. A community lease must include a purchase restriction enforceable throughout the grant term. A statement of intended community use does not create that restriction.\n\nFinancial approval follows either a full board decision or a delegated treasurer signature. Delegation excludes leases extending beyond twenty years. Full board approval requires two finance members and an independent auditor, none involved in preparing the application. An auditor's registration becomes inactive on leaving the registered audit firm unless reactivated by the professional body. The firm itself cannot reactivate it. Reactivation can be based on an examination or supervised practice; either route requires a fresh independence declaration after the auditor's latest consulting engagement.\n\nPavo’s audit registration remained inactive until the consulting engagement had ended. A grant was validly paid to a partly privately owned applicant holding a thirty-year community lease. Its board approval included the required finance members and auditor Pavo, who had left the audit firm and then completed a consulting engagement. No other auditor, financial approval or eligibility route existed.",
      "stem": "Which of the following statements is supported by the passage?",
      "options": [
        "The treasurer’s delegation covered the thirty-year lease because public bodies held most of the applicant’s shares despite the remaining private minority ownership.",
        "Pavo’s former firm reactivated the audit registration after consulting ended, making a further declaration to the professional body unnecessary for board approval.",
        "The professional body required Pavo to use an examination rather than supervised practice because the consulting engagement followed departure from the former firm.",
        "Pavo’s registration had been professionally reactivated using an independence declaration made after the consulting engagement, and the lease contained an enforceable purchase restriction."
      ],
      "answer": 3,
      "hints": [
        "Trace the conditions in both directions; distinguish requirements from sufficient evidence.",
        "Private minority ownership excludes the public route."
      ],
      "optionNotes": [
        "False. Private minority ownership excludes public ownership and delegation excludes the thirty-year lease.",
        "False. The firm cannot reactivate registration.",
        "Not supported. Either reactivation route remains available.",
        "Correct. Private ownership forces a restricted community lease; its duration excludes delegated approval, and the sole auditor needs professional reactivation with a post-consulting declaration."
      ],
      "explanation": "Private minority ownership excludes the public route. The community lease requires an enforceable purchase restriction. Thirty years excludes treasurer delegation. Full board approval needs the sole independent auditor. Leaving the firm makes registration inactive. Professional reactivation under either route requires a post-consulting independence declaration."
    },
    {
      "id": "v17-07",
      "topic": "Survey drone flight clearance",
      "difficulty": 3,
      "challenge": true,
      "keyType": "inference",
      "reasoning": {
        "model": "inferred-boundary-to-firmware-test",
        "stages": 6,
        "evidence": [
          "Touching another district defeats the exemption.",
          "Beyond-range flight excludes direct approval.",
          "A certified automated corridor is necessary.",
          "Changed firmware cancels earlier device certification.",
          "Fresh compatibility testing requires a current new key.",
          "Revoked backup restoration cannot meet post-revocation generation."
        ]
      },
      "passage": "A fictional mapping authority exempts a flight from coordination only if it remains inside one district and below the published altitude ceiling. Touching a neighbouring district counts as crossing even when no photograph is taken there. A coordinated flight needs either direct air-traffic approval or an approved automated corridor. A corridor remains approved only while the aircraft's telemetry device uses its certified firmware version.\n\nDirect approval requires the control station to be within continuous radio range. A flight beyond that range must therefore use a qualifying corridor. A firmware change cancels device certification until a fresh compatibility test. Testing can be performed by the device maker or an independent laboratory; either must use an encryption key generated after the most recent key revocation. Restoring an earlier backup does not make a revoked key current. A test summary need not publish the key itself or its generation date.\n\nA flight was validly cleared along a route touching a neighbouring district and passing beyond radio range. Its telemetry firmware had changed, and its former encryption key had been revoked before the compatibility procedure. A backup of the old key remained available. No alternative flight, radio or coordination arrangement applied.",
      "stem": "Which of the following statements is supported by the passage?",
      "options": [
        "The compatibility test used a key generated after the revocation; restoring the old backup could not support the required corridor certification.",
        "The flight avoided coordination because it photographed only its home district, even though its route touched a neighbouring district beyond radio range.",
        "The compatibility test was performed by an independent laboratory rather than the device maker because the flight extended beyond continuous radio range.",
        "The replacement key was generated after the new firmware was installed, rather than before installation but after the previous key was revoked."
      ],
      "answer": 0,
      "hints": [
        "Trace the conditions in both directions; distinguish requirements from sufficient evidence.",
        "Touching another district defeats the exemption."
      ],
      "optionNotes": [
        "Correct. Boundary crossing forces coordination; radio range excludes direct approval, changed firmware forces recertification, and either testing route needs a newly generated post-revocation key.",
        "False. Touching the neighbouring district counts as crossing.",
        "Not supported. Either testing provider is allowed.",
        "Not supported. Revocation supplies the lower bound, not firmware installation."
      ],
      "explanation": "Touching another district defeats the exemption. Beyond-range flight excludes direct approval. A certified automated corridor is necessary. Changed firmware cancels earlier device certification. Fresh compatibility testing requires a current new key. Revoked backup restoration cannot meet post-revocation generation."
    },
    {
      "id": "v17-08",
      "topic": "Translated diploma recognition",
      "difficulty": 3,
      "challenge": true,
      "keyType": "inference",
      "reasoning": {
        "model": "scope-to-qualified-translation-chain",
        "stages": 6,
        "evidence": [
          "Unlisted branch campus excludes automatic recognition.",
          "Absent regulator verification requires an authenticated transcript.",
          "Its third language requires authorised translation.",
          "No supervisor means Mira must hold current registration.",
          "Relocation requires confirmation by the receiving jurisdiction.",
          "Confirmation needs an identity check after the legal name change."
        ]
      },
      "passage": "A fictional licensing council recognises a diploma through an automatic list or an individual equivalence decision. The automatic list names institution, campus and teaching language. A listed institution's branch is not covered when its campus or language differs. An individual decision requires a complete authenticated transcript unless a professional regulator has sent a recognised direct verification. An employer's confirmation of employment is not a regulator's verification.\n\nA transcript outside the council's two working languages needs an authorised translation. Translation can be done by a registered translator or under a registered supervisor. Registration ceases on relocation to another jurisdiction unless the receiving jurisdiction confirms it. For either a translator or supervisor, confirmation requires an identity check performed after the person's latest legal name change. An earlier passport check does not establish the later identity. The recognition register may omit translations and identification records.\n\nA diploma was validly recognised from an unlisted branch campus, with its transcript in a third language. No regulator had verified it directly. Translator Mira had relocated and changed legal name after the published passport check. The name change occurred before any receiving-jurisdiction confirmation. Mira worked without a supervisor, and no other translation, verification or recognition route applied.",
      "stem": "Which of the following statements is supported by the passage?",
      "options": [
        "The institution’s entry on the automatic list covered the branch campus because the diploma’s teaching language matched the language of the listed institution.",
        "Relocation made renewed territorial registration necessary; without a supervising translator, Mira needed identity confirmation under the later legal name.",
        "The passport check before the name change supplied the identity evidence required after relocation, without any subsequent check under the new legal identity.",
        "Mira’s identity check under the later legal name took place after relocation, rather than before relocation but after the name change."
      ],
      "answer": 1,
      "hints": [
        "Trace the conditions in both directions; distinguish requirements from sufficient evidence.",
        "Unlisted branch campus excludes automatic recognition."
      ],
      "optionNotes": [
        "False. Campus differences alone defeat automatic coverage.",
        "Correct. Unlisted campus forces equivalence; no regulator verification forces a transcript, its language forces translation, and the unsupervised relocated translator needs renewed registration with post-name-change identity.",
        "False. Earlier identity checks do not establish the later legal identity.",
        "Not supported. The check must follow the name change, but its order relative to relocation is unspecified."
      ],
      "explanation": "Unlisted branch campus excludes automatic recognition. Absent regulator verification requires an authenticated transcript. Its third language requires authorised translation. No supervisor means Mira must hold current registration. Relocation requires confirmation by the receiving jurisdiction. Confirmation needs an identity check after the legal name change."
    },
    {
      "id": "v17-09",
      "topic": "Port consignment authority",
      "difficulty": 3,
      "challenge": true,
      "keyType": "inference",
      "reasoning": {
        "model": "nested-identity-and-insurance-validity",
        "stages": 6,
        "evidence": [
          "Registered foreign ownership excludes domestic release.",
          "Only the bonded channel remains.",
          "The sole agent needs authority naming the changed owner.",
          "The suspended insurer cannot supply a qualifying bond.",
          "No other bond exists, leaving cash.",
          "Cash must actually clear into the protected account before release."
        ]
      },
      "passage": "A fictional port releases a consignment through a domestic-owner channel or an international bonded channel. Domestic-owner status requires the ship's registered owner to be incorporated locally. A local charterer is not its registered owner. The bonded channel requires either the owner or an authorised agent to provide a current cargo guarantee. An agent's authority must name the present owner; a guarantee or mandate for the former owner does not transfer after a sale.\n\nA cargo guarantee may be an insurer bond or a cash deposit. Insurer bonds qualify only while the insurer holds a current licence. A licence suspended during a solvency investigation cannot support a newly issued guarantee, even if the bond is dated before the suspension. Cash deposits are effective only when cleared into the port's protected account. A payment instruction or pending transfer is insufficient. Agents may fund the deposit through a bank or an owner loan; either route still requires cleared funds. Release summaries do not publish all mandates or account entries.\n\nA foreign-owned ship's cargo was validly released after the ship changed registered owner. The charterer was local. Only agent Osa acted, the proposed insurer's licence was suspended, and no other insurer bond existed. No domestic-owner exception or alternative guarantee route applied.",
      "stem": "Which of the following statements is supported by the passage?",
      "options": [
        "The local charterer supplied domestic-owner status, allowing Osa to use the former owner’s mandate without providing a current cargo guarantee.",
        "The cash deposit was funded through an owner loan rather than a bank because the proposed insurer’s licence remained suspended at release.",
        "Osa held authority naming the new registered owner, and a cash deposit had cleared into the protected port account before cargo release.",
        "The protected-account deposit cleared after the new owner issued Osa’s mandate, rather than before the mandate but still before release."
      ],
      "answer": 2,
      "hints": [
        "Trace the conditions in both directions; distinguish requirements from sufficient evidence.",
        "Registered foreign ownership excludes domestic release."
      ],
      "optionNotes": [
        "False. A local charterer does not establish domestic registered ownership.",
        "Not supported. Either deposit funding route is permitted.",
        "Correct. Foreign ownership excludes the domestic channel; the sole agent needs new-owner authority, and no licensed insurer bond leaves cleared cash under either funding route.",
        "Not supported. Both must be effective at release but their mutual order is not fixed."
      ],
      "explanation": "Registered foreign ownership excludes domestic release. Only the bonded channel remains. The sole agent needs authority naming the changed owner. The suspended insurer cannot supply a qualifying bond. No other bond exists, leaving cash. Cash must actually clear into the protected account before release."
    },
    {
      "id": "v17-10",
      "topic": "Sensitive archive publication",
      "difficulty": 3,
      "challenge": true,
      "keyType": "inference",
      "reasoning": {
        "model": "derived-scope-to-post-move-audit",
        "stages": 6,
        "evidence": [
          "Stable numbers keep the file restricted.",
          "The predecessor-only waiver cannot cover the new entity.",
          "Approved redaction is consequently required.",
          "Changed export functionality defeats local certification.",
          "The outside processor’s moved site needs renewed accreditation.",
          "Either audit route must examine the actual production system after the move."
        ]
      },
      "passage": "A fictional archive publishes a file openly when it contains neither living-person identifiers nor sealed donor restrictions. Removing names alone does not remove identifiers when stable personal numbers remain. A restricted file can instead be published under a donor waiver or through a legally approved redaction process. A waiver must name the actual recipient institution; a waiver for a predecessor does not transfer when the archive becomes a new legal entity.\n\nApproved redaction requires either a certified local tool or an accredited outside processor. Tool certification ends after a change to its export function. Outside accreditation applies to a named processing site and is suspended when processing moves elsewhere until a fresh site audit. An audit can be conducted in person or remotely with live access; either must examine the production system after the move. A pre-move demonstration copy does not qualify. The archive's publication catalogue need not include site audits or processing agreements.\n\nA file retaining stable personal numbers was validly published after the archive became a new legal entity. Its sole donor waiver named the predecessor. The local tool's export function had changed, without recertification. Its outside processor had moved production sites. No other publication or processing route existed.",
      "stem": "Which of the following statements is supported by the passage?",
      "options": [
        "The predecessor’s waiver covered the new legal entity because the personal names had been removed even though stable personal numbers remained.",
        "The processor’s fresh site audit was probably conducted remotely with live access rather than through a personal visit to the new production system.",
        "The new site audit occurred after publication, allowing the processor’s suspended accreditation to support the earlier redaction retrospectively.",
        "The outside processor had received a fresh audit examining the production system at the new site after processing moved there."
      ],
      "answer": 3,
      "hints": [
        "Trace the conditions in both directions; distinguish requirements from sufficient evidence.",
        "Stable numbers keep the file restricted."
      ],
      "optionNotes": [
        "False. Neither retained identifiers nor legal-entity changes are repaired by removing names.",
        "Not supported. Either audit route is allowed.",
        "False. Suspended accreditation cannot support processing before the required fresh audit.",
        "Correct. Remaining identifiers restrict publication, the old-entity waiver fails, the uncertified local tool fails, and the moved processor needs a fresh post-move production audit."
      ],
      "explanation": "Stable numbers keep the file restricted. The predecessor-only waiver cannot cover the new entity. Approved redaction is consequently required. Changed export functionality defeats local certification. The outside processor’s moved site needs renewed accreditation. Either audit route must examine the actual production system after the move."
    }
  ]
});
