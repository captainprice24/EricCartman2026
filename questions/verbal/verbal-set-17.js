EPSO_BANK.registerSet({
  "id": "verbal-17",
  "section": "verbal",
  "title": "Verbal reasoning · Set 17 — Very hard",
  "description": "Ten original, demanding inference problems in exam-length passages. Combine dispersed evidence, scope restrictions and alternative explanations. Editorial difficulty; first-attempt calibration pending.",
  "version": 2,
  "challenge": true,
  "questions": [
    {
      "id": "v17-01-c",
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
          "The supervisor's superseded method training needs a supplement.",
          "That supplement must postdate the method change."
        ]
      },
      "passage": "A fictional museum may export an unlisted object freely, but a listed object needs a certificate. An object is listed if its carrier dates from before 1900, unless it is a modern reproduction, meaning that both carrier and inscription were made after 1900. A certificate requires the owner's consent or an origin assay. An assay must come from a licensed laboratory or an unlicensed one under external supervision. A laboratory loses its licence when its ownership changes unless the regulator reissues it. A supervising assessor needs current method training; training in a superseded method counts only if the assessor passed a supplement after the method changed. Experience or a briefing cannot replace the supplement.\n\nAn object with a carrier from 1880 and an inscription added in 1920 was validly exported. Its owner had withheld consent. The sole assay laboratory had changed owner without a reissued licence. Its supervisor had trained in the superseded method and attended a briefing after the method change. No other route applied.",
      "stem": "Which of the following statements is supported by the passage?",
      "options": [
        "The briefing sufficed because the laboratory kept its licence after its change of owner.",
        "The supervisor passed the supplement after the method change but before the briefing.",
        "The object remained listed, and its supervisor passed a post-change supplement.",
        "The supervisor passed the supplement after the laboratory changed owner."
      ],
      "answer": 2,
      "hints": [
        "Classify the whole object, carrier as well as inscription, before looking at the certificate routes.",
        "Then follow the assay route step by step to the person who supervised it."
      ],
      "optionNotes": [
        "False. The laboratory 'changed owner without a reissued licence', and a briefing 'cannot replace the supplement'.",
        "Not supported. The supplement must follow the method change, but its order relative to the briefing is not stated.",
        "Correct. A reproduction needs 'both carrier and inscription' made after 1900, so the object is listed; without consent or a licence, the supervisor's superseded training needed a post-change supplement.",
        "Not supported. The supplement must follow the method change; its timing relative to the ownership change is not given."
      ],
      "explanation": "The 1880 carrier makes the object listed despite the later inscription. With consent withheld, an assay was needed, and the laboratory had lost its licence, so the assay required supervision. The supervisor's training was in a superseded method, which counts only with a supplement passed after the method change.",
      "supersedes": "v17-01"
    },
    {
      "id": "v17-02-c",
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
          "Resurfacing requires later certification of the weight's mass."
        ]
      },
      "passage": "A fictional rail terminal admits a wagon through its ordinary lane unless the cargo is liquid or the axle load exceeds the general limit; either condition requires specialist admission. This needs a sealed load certificate or an on-site balance assessment. A certificate covers only the cargo and axle configuration tested, so changing the number of axles invalidates it even if cargo mass falls. An on-site assessment uses two current scales or one current scale with an independent check weight. A relocated scale is current only if recalibrated afterwards. A check weight is independent only if its mass was certified, after its latest resurfacing, by a laboratory other than the one calibrating the scale. Neither an engraved mass nor a supplier declaration is certification.\n\nA liquid-cargo wagon was validly admitted after its axle count changed; its certificate predated the change. The second scale had been permanently removed, and the remaining scale relocated and then recalibrated. The check weight had been resurfaced since its mass was engraved. No other procedure existed.",
      "stem": "Which of the following statements is supported by the passage?",
      "options": [
        "The engraved mass sufficed because the scale had been recalibrated after relocation.",
        "The same laboratory both certified the check weight and calibrated the terminal's scale.",
        "The weight was probably certified after the scale was recalibrated rather than before.",
        "A laboratory other than the scale's calibrator certified the weight after resurfacing."
      ],
      "answer": 3,
      "hints": [
        "Check whether the type of cargo changes the admission route, whatever the wagon's mass.",
        "Then ask which on-site assessment is still possible with the scales that remain."
      ],
      "optionNotes": [
        "False. 'Neither an engraved mass nor a supplier declaration is certification'.",
        "False. An independent weight must be certified 'by a laboratory other than the one calibrating the scale'.",
        "Not supported. Each event must follow its own physical change, but their order relative to each other is not stated.",
        "Correct. Liquid cargo needs specialist admission, the axle change voids the certificate and only one scale remains, so an independent weight certified after resurfacing was required."
      ],
      "explanation": "Liquid cargo requires specialist admission. The axle change invalidates the old certificate, so an on-site assessment was used, and with the second scale gone it needed one current scale and an independent check weight. Independence requires a different laboratory, and the resurfacing means the certification had to come afterwards.",
      "supersedes": "v17-02"
    },
    {
      "id": "v17-03-c",
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
      "passage": "In a fictional ethics office, an amendment changes a study's risk when it adds donor contact or discloses coded records to a new institution, even if a contractor does so. Such an amendment needs committee approval unless an existing approval expressly covers the same activity and institution; permission to analyse samples does not cover donor contact. Approval comes from an ordinary meeting or a delegated chair decision, but delegation excludes contact with minors. An ordinary meeting needs three eligible members, including an independent clinician. A study's employed investigator is ineligible, and an attending conflicted member cannot be replaced by an alternate. The clinician may attend remotely only through a verified live connection showing the whole meeting; watching a recording later is not attendance.\n\nAn amendment letting a contractor interview minor donors at a new institution was validly approved. The earlier approval covered sample analysis alone. Two eligible nonclinical members attended, with the investigator and the investigator's alternate. Nobody else was physically present, and no special route applied.",
      "stem": "Which of the following statements is supported by the passage?",
      "options": [
        "An independent clinician took part in the entire meeting by a verified live link.",
        "The investigator's alternate was the third eligible member, and the clinician watched later.",
        "The clinician joined remotely and personally approved the contractor's interview questions.",
        "The committee chair verified the clinician's live connection before the meeting started."
      ],
      "answer": 0,
      "hints": [
        "Decide whether interviewing minors changes the study's risk, and whether the old approval covers it.",
        "Then count who could fill the three eligible places at the meeting."
      ],
      "optionNotes": [
        "Correct. Minor contact rules out delegation, so a meeting with an independent clinician was needed; with nobody else 'physically present', the clinician must have attended through a verified live connection.",
        "False. An attending conflicted member 'cannot be replaced by an alternate', and 'watching a recording later is not attendance'.",
        "Not supported. The passage requires the clinician's attendance but says nothing about approving interview questions.",
        "Not supported. The passage does not say who verified the connection, or when."
      ],
      "explanation": "Interviewing donors adds contact, which the analysis-only approval does not cover, and contact with minors excludes delegation. A valid ordinary meeting needs three eligible members including a clinician; the investigator and alternate cannot count. Only two eligible members were present in person, so the clinician must have joined the whole meeting live.",
      "supersedes": "v17-03"
    },
    {
      "id": "v17-04-c",
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
      "passage": "A fictional council may adopt a routine decision at a short-notice meeting. A decision is nonroutine if it creates a new charge or extends a charge to previously exempt residents, whatever the charge is called. A nonroutine decision needs a full notice period unless every member signs a waiver, and a signature counts only if the member had the complete text before signing; a later vote in favour does not validate it. The notice period starts after effective delivery to every member. Electronic delivery is effective through a designated portal that acknowledges receipt; postal delivery needs an authorised recipient at the nominated address. A former secretary's authority ends when the member appoints a replacement, unless explicitly renewed afterwards.\n\nA renamed charge was validly adopted after being extended to an exempt group. One member signed the waiver before receiving its complete text and did not sign again. That member's portal gave no acknowledgment, and a former secretary signed the postal receipt after being replaced. No other route existed.",
      "stem": "Which of the following statements is supported by the passage?",
      "options": [
        "The later vote cured the defective waiver, so the old secretary's authority was irrelevant.",
        "The former secretary's authority was renewed, and the notice period followed delivery.",
        "The replacement secretary was barred from receiving notices once the renewal took effect.",
        "The notice period ran from electronic dispatch, though the portal gave no acknowledgment."
      ],
      "answer": 1,
      "hints": [
        "Classify the decision by who must pay, not by the charge's name.",
        "Then work out which delivery method could have reached the member who signed early."
      ],
      "optionNotes": [
        "False. A later vote in favour 'does not validate' a signature made without the complete text.",
        "Correct. Extension to exempt residents makes the decision nonroutine and the defective waiver forces full notice; with no portal acknowledgment, postal delivery needed the replaced secretary's renewed authority.",
        "Not supported. Renewing the former secretary's authority does not imply that the replacement lost authority.",
        "False. Electronic delivery is effective only 'through a designated portal that acknowledges receipt'."
      ],
      "explanation": "Extending a charge to exempt residents is nonroutine whatever it is called, and one signature was given without the complete text, so the waiver fails and full notice was needed. The portal never acknowledged receipt, leaving postal delivery, which counts only if the replaced secretary's authority was explicitly renewed. The notice period starts after that delivery.",
      "supersedes": "v17-04"
    },
    {
      "id": "v17-05-c",
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
      "passage": "A fictional seed library releases ordinary accessions on demand but quarantines any accession collected where a pathogen alert was current; the alert concerns the collection site, not the store. A quarantined accession leaves only through destruction or with a negative pathogen certificate, and moving it to another store does not lift quarantine. A certificate requires an approved laboratory to test a freshly drawn sample or a preserved reserve. A reserve qualifies only while its seal is intact and its storage temperature has never exceeded the specified maximum; if either condition fails, a fresh sample must be drawn after the failure. Library staff or an outside collector may take samples, using an instrument sterilised after its latest use on another accession.\n\nAn accession collected inside an active alert area was released alive for sowing. Its only reserve, though still sealed, had warmed above the maximum before certification. The sole sampling instrument had been used on another accession. No other reserve, instrument or exception existed.",
      "stem": "Which of the following statements is supported by the passage?",
      "options": [
        "The intact seal kept the reserve eligible, so no fresh sample or sterilisation was needed.",
        "An outside collector took the fresh sample with instruments sterilised after the reserve warmed.",
        "A new sample was drawn after the warming with an instrument sterilised since its last use.",
        "The instrument was sterilised before staff discovered that the reserve had warmed."
      ],
      "answer": 2,
      "hints": [
        "Check where the accession was collected before deciding whether the ordinary release route applies.",
        "Then ask whether the reserve still qualifies when only one of its two conditions holds."
      ],
      "optionNotes": [
        "False. A reserve qualifies only while both conditions hold, and 'if either condition fails, a fresh sample must be drawn'.",
        "Not supported. Either staff or an outside collector may sample, and sterilisation need only follow the instrument's last use, not the warming.",
        "Correct. Collection in the alert area forces quarantine and live release excludes destruction; the warmed reserve fails, so a fresh sample needed an instrument sterilised 'after its latest use on another accession'.",
        "Not supported. When the warming was discovered, and how that relates to sterilisation, is not stated."
      ],
      "explanation": "Collection in an alert area triggers quarantine, and release alive rules out destruction, so a negative certificate was needed. The reserve fails because it warmed, even though its seal held, so a fresh sample had to be drawn after the failure. The only instrument had been used on another accession and so needed sterilising before that sampling.",
      "supersedes": "v17-05"
    },
    {
      "id": "v17-06-c",
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
      "passage": "A fictional treasury pays a capital grant only to an eligible project with valid financial approval. A project is eligible through public ownership, meaning that public bodies wholly own the applicant, or through a community lease with a purchase restriction enforceable for the whole grant term. Approval comes from a full board decision or a delegated treasurer signature, but delegation excludes leases longer than twenty years. A board decision needs two finance members and an independent auditor, none involved in the application. An auditor's registration becomes inactive on leaving the audit firm unless the professional body reactivates it; the firm itself cannot. Reactivation follows an examination or supervised practice, and either requires a fresh independence declaration made after the auditor's latest consulting engagement.\n\nA grant was validly paid to a partly privately owned applicant with a thirty-year community lease. The board approval included auditor Pavo, who had left the firm and then completed a consulting engagement. Pavo's registration stayed inactive until it ended. No other auditor or route existed.",
      "stem": "Which of the following statements is supported by the passage?",
      "options": [
        "Delegation covered the thirty-year lease because public bodies held most of the shares.",
        "Pavo's former firm reactivated the registration, so no new declaration was required.",
        "The professional body made Pavo sit an examination instead of using supervised practice.",
        "Pavo's reactivation used a post-consulting declaration; the lease restricted purchases."
      ],
      "answer": 3,
      "hints": [
        "Check whether partial private ownership leaves the public-ownership route open.",
        "Then ask which approval route a thirty-year lease allows, and who must take part in it."
      ],
      "optionNotes": [
        "False. Public ownership needs public bodies to 'wholly own the applicant', and delegation 'excludes leases longer than twenty years'.",
        "False. Reactivation is by the professional body; 'the firm itself cannot' reactivate it.",
        "Not supported. Both an examination and supervised practice are permitted, and the passage does not say which was used.",
        "Correct. Private ownership leaves the lease route, which needs an enforceable purchase restriction; the long lease forces board approval, so Pavo needed reactivation with a declaration after consulting."
      ],
      "explanation": "A private minority shareholder rules out public ownership, so the lease must have carried an enforceable purchase restriction. A thirty-year lease excludes delegation, so a board decision with an independent auditor was required. Pavo's registration lapsed on leaving the firm, and either reactivation route needs a declaration made after the consulting engagement.",
      "supersedes": "v17-06"
    },
    {
      "id": "v17-07-c",
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
      "passage": "A fictional mapping authority exempts a flight from coordination only if it stays inside one district and below the published altitude ceiling. Touching a neighbouring district counts as crossing, even if no photograph is taken there. A coordinated flight needs direct air-traffic approval, which requires the control station to be within continuous radio range, or an approved automated corridor. A corridor remains approved only while the aircraft's telemetry device runs its certified firmware. A firmware change cancels certification until a fresh compatibility test, performed by the device maker or an independent laboratory. Either must use an encryption key generated after the most recent key revocation; restoring an earlier backup does not make a revoked key current.\n\nA flight was validly cleared along a route that touched a neighbouring district and went beyond radio range. Its telemetry firmware had changed, and its encryption key had been revoked before the compatibility test, although a backup of the old key remained. No other arrangement applied.",
      "stem": "Which of the following statements is supported by the passage?",
      "options": [
        "The test used a key generated after the revocation, not the restored backup of the old key.",
        "The flight needed no coordination because it photographed only its home district.",
        "An independent laboratory, not the maker, ran the test because the flight left radio range.",
        "The new key was generated after the new firmware was installed, not merely after revocation."
      ],
      "answer": 0,
      "hints": [
        "Compare the whole route with the territorial limits of the exemption.",
        "Then follow the corridor route through the firmware change to the test that restores it."
      ],
      "optionNotes": [
        "Correct. The route crossed a district and left radio range, so only a corridor remained; the firmware change required a new test, using a key 'generated after the most recent key revocation'.",
        "False. 'Touching a neighbouring district counts as crossing, even if no photograph is taken there'.",
        "Not supported. Either 'the device maker or an independent laboratory' may test, and radio range does not decide between them.",
        "Not supported. The key must postdate the revocation; nothing ties it to the firmware installation."
      ],
      "explanation": "Touching another district removes the exemption, and flying beyond radio range rules out direct approval, so the flight needed a certified corridor. The firmware change cancelled certification until a fresh test, and either tester had to use a key generated after the revocation; restoring the old backup could not satisfy that.",
      "supersedes": "v17-07"
    },
    {
      "id": "v17-08-c",
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
      "passage": "A fictional licensing council recognises a diploma through an automatic list or an individual equivalence decision. The list names institution, campus and teaching language, so a listed institution's branch is not covered if its campus or language differs. An individual decision needs a complete authenticated transcript unless a professional regulator has sent a recognised direct verification. A transcript in neither of the council's two working languages needs an authorised translation by a registered translator or under a registered supervisor. Registration ceases when its holder relocates to another jurisdiction unless the receiving jurisdiction confirms it, which requires an identity check made after the holder's latest legal name change. An earlier passport check does not establish the later identity.\n\nA diploma from an unlisted branch campus, with a transcript in a third language, was validly recognised without direct verification by a regulator. Translator Mira, working without a supervisor, had relocated and changed legal name since the published passport check; the name change preceded any confirmation. No other route applied.",
      "stem": "Which of the following statements is supported by the passage?",
      "options": [
        "The list covered the branch campus because its teaching language matched the institution's.",
        "Mira needed confirmation from the new jurisdiction, based on a check under the new name.",
        "The earlier passport check proved Mira's identity, so no check under the new name was needed.",
        "Mira's identity was checked after relocating, not between the name change and the move."
      ],
      "answer": 1,
      "hints": [
        "Check whether the specific campus is covered, rather than extending recognition from the institution's name.",
        "Then trace the transcript to the person who translated it and the status that person needed."
      ],
      "optionNotes": [
        "False. A branch is not covered 'if its campus or language differs', and this campus was unlisted.",
        "Correct. The unlisted campus and missing verification require a transcript, its language requires translation, and the unsupervised, relocated Mira needed confirmation with a check after the 'latest legal name change'.",
        "False. 'An earlier passport check does not establish the later identity'.",
        "Not supported. The check had to follow the name change; its timing relative to the relocation is not given."
      ],
      "explanation": "The unlisted campus rules out automatic recognition, and without a regulator's verification a transcript is needed, which in a third language must be translated. Mira worked without a supervisor, so Mira's own registration had to be current, and after relocation that requires confirmation based on an identity check made after the name change.",
      "supersedes": "v17-08"
    },
    {
      "id": "v17-09-c",
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
      "passage": "A fictional port releases a consignment through a domestic-owner channel or an international bonded channel. The domestic channel requires the ship's registered owner to be incorporated locally; a local charterer is not the registered owner. The bonded channel requires the owner, or an agent whose authority names the present owner, to provide a current cargo guarantee; a former owner's mandate does not transfer after a sale. A guarantee may be an insurer bond or a cash deposit. A bond qualifies only while the insurer's licence is current, and a licence suspended during a solvency investigation cannot support a newly issued guarantee. A cash deposit counts only once cleared into the port's protected account; a payment instruction or pending transfer is insufficient, whether funded by a bank or an owner loan.\n\nThe cargo of a foreign-owned ship was validly released after the ship changed registered owner. Its charterer was local. Only agent Osa acted, the proposed insurer's licence was suspended, and no other bond existed. No other route applied.",
      "stem": "Which of the following statements is supported by the passage?",
      "options": [
        "The local charterer gave domestic status, so Osa relied on the former owner's mandate.",
        "Osa funded the cash deposit through an owner loan rather than through a bank transfer.",
        "Osa's authority named the new owner, and a cash deposit had cleared before the release.",
        "The deposit cleared after the new owner issued Osa's mandate rather than before it."
      ],
      "answer": 2,
      "hints": [
        "Decide the ship's ownership status before following the bonded channel.",
        "Then ask which form of guarantee remains once the insurer is suspended."
      ],
      "optionNotes": [
        "False. 'A local charterer is not the registered owner', and 'a former owner's mandate does not transfer after a sale'.",
        "Not supported. Funding by 'a bank or an owner loan' is allowed, and the passage does not say which was used.",
        "Correct. Foreign ownership leaves the bonded channel, so Osa needed authority naming the present owner; the suspended licence rules out a bond, leaving a deposit 'cleared into the port's protected account'.",
        "Not supported. Both had to be effective at release, but their order relative to each other is not stated."
      ],
      "explanation": "Foreign registered ownership closes the domestic channel, whatever the charterer's status. Only Osa acted, so Osa's authority had to name the new owner. The suspended insurer could not provide a bond and no other bond existed, so the guarantee must have been a cash deposit that had actually cleared.",
      "supersedes": "v17-09"
    },
    {
      "id": "v17-10-c",
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
          "The outside processor's moved site needs renewed accreditation.",
          "Either audit route must examine the actual production system after the move."
        ]
      },
      "passage": "A fictional archive publishes a file openly if it contains neither living-person identifiers nor sealed donor restrictions. Removing names does not remove identifiers while stable personal numbers remain. A restricted file may instead be published under a donor waiver or through approved redaction. A waiver must name the actual recipient institution; one naming a predecessor does not transfer when the archive becomes a new legal entity. Approved redaction uses a certified local tool or an accredited outside processor. A tool's certification ends when its export function changes. A processor's accreditation covers a named site and is suspended when processing moves, until a fresh site audit. The audit may be in person or remote with live access, but must examine the production system after the move.\n\nAfter becoming a new legal entity, the archive validly published a file that kept stable personal numbers. Its only donor waiver named the predecessor. The local tool's export function had changed without recertification, and the processor had moved production sites. No other route existed.",
      "stem": "Which of the following statements is supported by the passage?",
      "options": [
        "The predecessor's waiver covered the new entity because the names had been removed.",
        "The processor's new site audit was probably carried out remotely with live access.",
        "The site audit followed publication and retrospectively validated the earlier redaction.",
        "A fresh audit had examined the processor's production system at its new site."
      ],
      "answer": 3,
      "hints": [
        "Check whether removing names is enough to make the file unrestricted.",
        "Then rule out the publication routes one by one."
      ],
      "optionNotes": [
        "False. A waiver for a predecessor 'does not transfer when the archive becomes a new legal entity', and removing names does not remove identifiers.",
        "Not supported. The audit 'may be in person or remote', and the passage does not say which.",
        "False. Accreditation is 'suspended when processing moves, until a fresh site audit', so a later audit cannot support earlier processing.",
        "Correct. Stable numbers keep the file restricted, the waiver and the local tool both fail, so the moved processor needed a fresh audit of its production system after the move."
      ],
      "explanation": "Stable personal numbers keep the file restricted, so open publication is impossible. The waiver names the predecessor and does not transfer, and the local tool lost certification, leaving the outside processor. Its accreditation was suspended by the move until a fresh audit examined the production system at the new site.",
      "supersedes": "v17-10"
    }
  ]
});
