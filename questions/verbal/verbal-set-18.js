EPSO_BANK.registerSet({
  "id": "verbal-18",
  "section": "verbal",
  "title": "Verbal reasoning · Set 18 — Very hard",
  "description": "Ten original, demanding inference problems in exam-length passages. Combine dispersed evidence, scope restrictions and alternative explanations. Editorial difficulty; first-attempt calibration pending.",
  "version": 2,
  "challenge": true,
  "questions": [
    {
      "id": "v18-01-c",
      "topic": "Forest plot licence",
      "difficulty": 3,
      "challenge": true,
      "keyType": "inference",
      "reasoning": {
        "model": "inferred-land-class-to-independent-instrument",
        "stages": 6,
        "evidence": [
          "Private protected status requires a licence.",
          "Withheld permission leaves the compulsory order.",
          "The moved unrecertified marker cannot assess boundaries.",
          "An independent survey is necessary.",
          "The replaced lens requires a new-configuration calibration test.",
          "Either test route requires an independently established reference distance."
        ]
      },
      "passage": "A fictional forest agency allows ordinary sampling on municipal land but requires a research licence on protected or privately owned land; a municipal maintenance contract does not transfer ownership. A licence needs the owner's permission or a compulsory research order. An order requires a boundary assessment based on an official cadastral marker or an independent survey. A marker that has been moved loses official recognition unless it is recertified. An independent survey requires a calibrated distance instrument, and replacing the instrument's lens cancels calibration unless a test under the new lens configuration is passed. Laboratory and field tests both qualify, but either must use a reference distance measured by someone independent of the surveyor.\n\nSampling was validly licensed on a privately owned protected parcel maintained by the municipality. The owner had withheld permission. The sole cadastral marker had been moved without recertification, and the survey instrument's lens had been replaced; every assessment used for the licence came after both events. No other marker, permission, order basis or assessment method existed.",
      "stem": "Which of the following statements is supported by the passage?",
      "options": [
        "The new lens passed a test using a surveyor-independent reference distance.",
        "Municipal maintenance of the parcel amounted to recertification of the moved marker.",
        "The lens test used a laboratory reference because the owner had withheld permission.",
        "The independent reference distance was measured after the lens had been replaced."
      ],
      "answer": 0,
      "hints": [
        "Classify the parcel first: does municipal maintenance change who owns it?",
        "Follow the licence route that remains once permission is withheld, then ask what the moved marker and the new lens each leave you needing."
      ],
      "optionNotes": [
        "Correct. Private protected land needs a licence; with permission withheld only an order remains. The moved marker 'loses official recognition', so a survey is needed, and the new lens requires a test using 'a reference distance measured by someone independent of the surveyor'.",
        "False. The marker 'had been moved without recertification', and a maintenance contract 'does not transfer ownership'.",
        "Not supported. 'Laboratory and field tests both qualify'; the text gives no reason for choosing either.",
        "Not supported. The test must be under 'the new lens configuration', but nothing says when the reference distance itself was measured."
      ],
      "explanation": "Each fact closes one route: private protected land requires a licence, withheld permission leaves the order, the unrecertified marker leaves the survey, and the new lens leaves a fresh test. The only condition common to both test locations is an independently measured reference. Details the rules leave open, such as the test location or when the reference was measured, cannot be inferred.",
      "supersedes": "v18-01"
    },
    {
      "id": "v18-02-c",
      "topic": "Maritime training endorsement",
      "difficulty": 3,
      "challenge": true,
      "keyType": "inference",
      "reasoning": {
        "model": "new-activity-to-medical-date-bound",
        "stages": 6,
        "evidence": [
          "Leaving the basin makes the instruction operational.",
          "The national class mismatch prevents recognition.",
          "School competence assessment is therefore necessary.",
          "That assessment requires current medical clearance.",
          "Balance-affecting surgery ends the old clearance.",
          "Either new-examination route requires a post-surgery specialist balance report."
        ]
      },
      "passage": "A fictional maritime school lets an existing endorsement cover classroom refresher study, but practical instruction on open water requires a current operational endorsement. A vessel moving outside its sheltered basin counts as open water even when trainees remain seated. An operational endorsement requires either recognised national certification, which covers only the vessel class printed on the certificate, or a school competence assessment. The assessment requires an observed manoeuvre and current medical clearance. Clearance expires after surgery affecting balance unless a new examination is completed, by the school doctor or an approved external clinic. Either examiner must review a specialist balance report issued after the surgery; a surgeon's discharge note is not such a report.\n\nAn endorsement validly covered a lesson on a vessel leaving the sheltered basin. The instructor's national certificate named a different vessel class, and the instructor had undergone balance-affecting surgery since the last clearance. The assessment and endorsement both followed the surgery. No other certification, assessment, clearance or medical exception applied.",
      "stem": "Which of the following statements is supported by the passage?",
      "options": [
        "An external clinic accepted the discharge note in place of a specialist balance report.",
        "A fresh medical examination reviewed a specialist report written after the surgery.",
        "The instructor's certificate was recognised because the trainees stayed seated throughout.",
        "The balance report was written by the surgeon who had issued the discharge note."
      ],
      "answer": 1,
      "hints": [
        "Decide first whether a lesson on a vessel leaving the basin is classroom study or open-water instruction.",
        "Then check whether the national certificate can be recognised, and what the surgery does to the old clearance."
      ],
      "optionNotes": [
        "False. Either examiner 'must review a specialist balance report', and 'a surgeon's discharge note is not such a report'.",
        "Correct. Leaving the basin is open water, the different-class certificate cannot be recognised, so the school assessment was needed; its clearance required a new examination reviewing a report 'issued after the surgery'.",
        "False. Leaving the basin is open water 'even when trainees remain seated', and recognition covers 'only the vessel class printed on the certificate'.",
        "Not supported. The text does not say who wrote the specialist report."
      ],
      "explanation": "The chain runs from the voyage's location to the operational endorsement, from the class mismatch to the school assessment, and from the surgery to a new examination. Both examination routes share one requirement: a post-surgery specialist report. Who wrote that report is never stated.",
      "supersedes": "v18-02"
    },
    {
      "id": "v18-03-c",
      "topic": "Library digitisation authority",
      "difficulty": 3,
      "challenge": true,
      "keyType": "inference",
      "reasoning": {
        "model": "collection-status-to-machine-validation",
        "stages": 6,
        "evidence": [
          "Copyrighted new chapters exclude direct public-domain use.",
          "No current-edition rights licence exists.",
          "Missing pages prevent intact-original preservation.",
          "No verified duplicate leaves the imaging model.",
          "Changed restoration invalidates its old validation.",
          "Renewed validation must test a separately held reference excluded from training."
        ]
      },
      "passage": "A fictional library digitises public-domain works directly. A copyrighted work needs a rights licence or an archival-preservation authorisation. Donating a physical copy transfers no copyright unless the donation agreement expressly says so, and permission for an earlier edition does not cover newly added copyrighted chapters. Preservation authorisation requires an intact original or an authenticated reconstruction; a volume missing pages is not intact, even if its binding survives. A reconstruction can use a verified duplicate or an imaging model validated against a separately held reference. An unverified internet scan is not a verified duplicate. Changing the model's restoration algorithm invalidates its validation, and a renewed validation, internal or external, must test against a reference not used to train the changed algorithm.\n\nA donated volume with new copyrighted chapters, missing pages and no copyright assignment or current-edition licence was validly digitised. Only an unverified scan and a model whose restoration algorithm had recently changed were available. No other copy, permission or preservation route existed.",
      "stem": "Which of the following statements is supported by the passage?",
      "options": [
        "The donation transferred copyright in the new chapters without an express assignment.",
        "The renewed validation was external because the only scan had not been verified.",
        "The updated algorithm was retested on a separate reference left out of its training.",
        "The validation reference was produced after the restoration algorithm changed."
      ],
      "answer": 2,
      "hints": [
        "The new chapters are not in the public domain. Which permission routes are still open for them?",
        "Missing pages rule out one preservation basis; work out which reconstruction method is left and what it now needs."
      ],
      "optionNotes": [
        "False. A donation 'transfers no copyright unless the donation agreement expressly says so', and there was 'no copyright assignment'.",
        "Not supported. A renewed validation may be 'internal or external'; nothing indicates which was used.",
        "Correct. No rights route remains, missing pages force a reconstruction, the scan is not a verified duplicate, and the changed model must be tested against 'a reference not used to train the changed algorithm'.",
        "Not supported. The reference must not have been used in training; the text sets no date for when it was produced."
      ],
      "explanation": "The new chapters need permission, no licence or assignment exists, so preservation authorisation is the only route. The missing pages require a reconstruction, the unverified scan fails, and the changed model needs renewed validation on a reference outside its training. The rule concerns independence from training, not when the reference was made.",
      "supersedes": "v18-03"
    },
    {
      "id": "v18-04-c",
      "topic": "Municipal bond approval",
      "difficulty": 3,
      "challenge": true,
      "keyType": "inference",
      "reasoning": {
        "model": "issuer-identity-to-specialist-mandate",
        "stages": 6,
        "evidence": [
          "Indexed interest makes the issue structured despite its fixed minimum.",
          "The new legal issuer cannot use the municipality’s exemption.",
          "An independent suitability opinion is necessary.",
          "The sole specialist changed employer.",
          "Fresh employer endorsement is required.",
          "Either endorsement route needs independence concerning the identified lender."
        ]
      },
      "passage": "A fictional municipality issues debt through a standard route only when principal and interest are fixed. Linking either payment to a price index makes the instrument structured, even if a minimum payment is guaranteed. Structured issuance requires a treasury exemption or an independent suitability opinion. An exemption applies only to the issuing body it names and does not pass to a newly incorporated utility owned by that body. A suitability opinion requires a specialist authorised for structured instruments. It lapses if the specialist changes employer, until the new employer grants a fresh endorsement after reviewing prior work or after a new assessment. Both routes require an independence declaration concerning the proposed lender; one made before the lender was identified does not count.\n\nA newly incorporated utility validly issued debt with indexed interest and a fixed minimum. The exemption named the municipality alone. The sole specialist, authorised for structured instruments, changed employer before giving the opinion, and the published declaration predated identification of the lender. No other route existed.",
      "stem": "Which of the following statements is supported by the passage?",
      "options": [
        "The fixed minimum kept the debt standard, so the utility could use the municipal exemption.",
        "The endorsement could rely on the declaration made before the lender was known.",
        "The new employer chose a fresh assessment over a review of the specialist's prior work.",
        "A declaration naming the lender was made after the lender was identified."
      ],
      "answer": 3,
      "hints": [
        "Classify the debt as a whole: does a guaranteed minimum make indexed interest fixed?",
        "Then ask whose exemption it is, and what the specialist's change of employer requires before the opinion can be given."
      ],
      "optionNotes": [
        "False. Indexing either payment makes the debt structured 'even if a minimum payment is guaranteed', and an exemption 'does not pass to a newly incorporated utility'.",
        "False. A declaration 'made before the lender was identified does not count'.",
        "Not supported. Endorsement may follow 'reviewing prior work or after a new assessment'; the text does not say which was used.",
        "Correct. The debt is structured, the utility cannot use the exemption, so an opinion was needed; the specialist's move required a fresh endorsement, and the opinion route also needs a declaration concerning the lender that does not predate its identification, so a later declaration must have been made."
      ],
      "explanation": "Indexed interest makes the issue structured, the exemption stays with the municipality, and the opinion route needs a currently authorised specialist. Because the specialist moved, a fresh endorsement was needed, and either endorsement route needs a declaration made once the lender was known. Since the published declaration was too early, a later one must exist.",
      "supersedes": "v18-04"
    },
    {
      "id": "v18-05-c",
      "topic": "Secure data transport",
      "difficulty": 3,
      "challenge": true,
      "keyType": "inference",
      "reasoning": {
        "model": "derived-risk-to-access-cleared-staff",
        "stages": 6,
        "evidence": [
          "Key-restored data excludes ordinary posting.",
          "Wrong data class excludes the courier.",
          "The archive vehicle therefore needs current approval.",
          "Changed lockbox design requires a renewed security inspection.",
          "Either renewal route requires an officer-witnessed lock test.",
          "The moved officer's data clearance needs receiving-institution ratification."
        ]
      },
      "passage": "A fictional archive posts wiped drives normally, but a drive whose data can still be read needs secure transport. Encryption does not make a drive wiped if its key restores the data. Secure transport uses a licensed courier, whose licence covers only the data class printed on it, or the archive's approved vehicle. The vehicle needs a current security inspection, which lapses when the design of its lockbox changes. Renewal can be on site or by remote live inspection, but both require a lock test witnessed by a security officer holding clearance for the data class. Clearance issued under a former employer ends on a transfer of employment unless the receiving institution ratifies it; general induction is not ratification.\n\nA drive whose data its key later restored was validly transported. The only outside courier was licensed for another class. The vehicle's lockbox had changed, and its sole security officer had transferred from another employer after receiving clearance; the lock test followed the transfer. No fresh clearance or other route existed.",
      "stem": "Which of the following statements is supported by the passage?",
      "options": [
        "The receiving institution had ratified the clearance of the officer who witnessed the test.",
        "Encryption made secure transport unnecessary, as the drive was unreadable in transit.",
        "The officer's clearance was ratified before the design of the lockbox was changed.",
        "The lock test was witnessed remotely because the officer came from another employer."
      ],
      "answer": 0,
      "hints": [
        "Judge the drive by what its key can restore, not by its encrypted state in transit.",
        "Once the courier is ruled out, trace what the changed lockbox requires and who must take part."
      ],
      "optionNotes": [
        "Correct. Data restored with its key requires secure transport; the courier covers another class, so the vehicle needed a renewed inspection with a witnessed lock test, and the transferred officer's clearance needed ratification by 'the receiving institution'.",
        "False. 'Encryption does not make a drive wiped if its key restores the data.'",
        "Not supported. Ratification had to come before the officer witnessed the test; its timing relative to the lockbox change is not given.",
        "Not supported. Renewal 'can be on site or by remote live inspection'; nothing links the choice to the officer's former employer."
      ],
      "explanation": "The drive needs secure transport, the wrong-class courier leaves the vehicle, and the changed lockbox requires a renewed inspection. Both inspection forms need a lock test witnessed by a cleared officer, and the officer's transfer means only ratification could keep that clearance valid. The inspection form and the exact timing of ratification remain open.",
      "supersedes": "v18-05"
    },
    {
      "id": "v18-06-c",
      "topic": "District ballot delivery",
      "difficulty": 3,
      "challenge": true,
      "keyType": "inference",
      "reasoning": {
        "model": "derived-electorate-to-substitute-recipient",
        "stages": 6,
        "evidence": [
          "Kira remains an eligible ordinary resident.",
          "Every eligible elector needs effective notice.",
          "Withdrawn digital consent removes that route.",
          "The moved recipient cannot act merely as a household member.",
          "A separate appointment after the move is necessary.",
          "Either appointment format requires current identity verification."
        ]
      },
      "passage": "In a fictional district, a binding ballot requires effective notice to every eligible elector. Eligibility covers ordinary residents and temporarily absent students; a student who sets up a permanent home elsewhere loses that exception, even if still using a district address. Notice is effective through an acknowledged digital account or a valid postal recipient. A digital account stops being a nominated route once the elector explicitly withdraws consent to electronic service. An adult household member may receive postal notice unless that person moved out before delivery. A former household member may still receive it as a separately appointed mail agent, under an appointment made after the move; online and paper appointments both require verification of the agent's current identity.\n\nA binding ballot validly included resident Kira, who withdrew electronic-service consent before any notice was delivered. A former household member signed for Kira's postal notice after moving out. No other recipient or route existed. A permanently relocated student still used Kira's address but was not counted.",
      "stem": "Which of the following statements is supported by the passage?",
      "options": [
        "The student's use of the address let the former member sign without any appointment.",
        "Kira's recipient was appointed after moving out and had their identity verified.",
        "Kira's digital account still provided effective notice after consent was withdrawn.",
        "The agent's appointment was verified online, as the recipient had already moved away."
      ],
      "answer": 1,
      "hints": [
        "Check who counts as an eligible elector before looking at how notice was delivered.",
        "With the digital route closed, ask in what capacity someone who has moved out can still sign for post."
      ],
      "optionNotes": [
        "False. A former household member may receive notice 'as a separately appointed mail agent', which requires an appointment; the student, who lost eligibility, changes nothing.",
        "Correct. Kira is eligible and needed effective notice; withdrawn consent closes the digital route, and a recipient who had moved out could act only under an appointment 'made after the move' with verification of 'current identity'.",
        "False. The account 'stops being a nominated route once the elector explicitly withdraws consent'.",
        "Not supported. 'Online and paper appointments both' qualify; nothing shows which form was used."
      ],
      "explanation": "Kira's inclusion in a valid binding ballot means she received effective notice. Withdrawn consent removes the digital account, and a recipient who had moved out could not act as a household member, so a post-move agent appointment with identity verification must exist. The student's address use is a distraction: the student was not eligible.",
      "supersedes": "v18-06"
    },
    {
      "id": "v18-07-c",
      "topic": "Ocean sensor deployment",
      "difficulty": 3,
      "challenge": true,
      "keyType": "inference",
      "reasoning": {
        "model": "inferred-location-to-reference-invariance",
        "stages": 6,
        "evidence": [
          "The anchor lies in the protected polygon.",
          "Chemical release exceeds the passive concession.",
          "Intentional tracer release cannot use zero-release certification.",
          "The dispersion model therefore needs current current-meter calibration.",
          "Rotor replacement requires an independent comparison.",
          "Direct and intermediate calibration dependence on the meter are excluded."
        ]
      },
      "passage": "A fictional ocean institute deploys ordinary sensors freely but needs a permit inside a protected survey polygon. Position is set by the mooring anchor, not by where the vessel lowering the sensor is. A permit rests on the site's research concession or a new environmental assessment. A passive-observation concession does not cover a chemical-release experiment. An assessment needs a dispersion model or a certified zero-release design, and a device that deliberately releases a tracer is not zero-release merely because the tracer is harmless. A dispersion model qualifies only with current calibration of the current meter. Replacing the meter's rotor voids calibration until the meter is compared with an independent reference: one whose calibration did not use that meter, directly or through an intermediate instrument. A shared manufacturer alone does not destroy independence.\n\nA tracer-releasing sensor was validly permitted at an anchor inside the polygon, deployed from a vessel outside it. The concession covered passive observation alone, and the rotor had been replaced before the assessment. No other route existed.",
      "stem": "Which of the following statements is supported by the passage?",
      "options": [
        "Deploying the sensor from a vessel outside the polygon meant no assessment was needed.",
        "The reference came from another manufacturer, which guaranteed its independence from the meter.",
        "After its rotor change, the meter was compared with a reference whose calibration excluded it.",
        "The reference was itself calibrated afresh after the rotor of the meter had been replaced."
      ],
      "answer": 2,
      "hints": [
        "Locate the deployment by the rule's own test, not by where the vessel was.",
        "Then check which permit and assessment routes a deliberate tracer release leaves open."
      ],
      "optionNotes": [
        "False. 'Position is set by the mooring anchor', which lay inside the polygon, and a harmless tracer does not make the device zero-release.",
        "Not supported. The text says only that 'a shared manufacturer alone does not destroy independence'; it neither requires a different manufacturer nor treats one as sufficient.",
        "Correct. The anchor requires a permit, the passive concession and the zero-release route fail, so the dispersion model needed calibration; the new rotor required comparison with a reference that did not use the meter 'directly or through an intermediate instrument'.",
        "Not supported. The reference had to be independent of the meter; no date is set for its own calibration."
      ],
      "explanation": "The anchor puts the sensor inside the polygon, the passive concession cannot cover a release, and a tracer device is not zero-release, so only the dispersion model remains. Its meter needed recalibration after the rotor change against a reference independent of that meter at every step. Manufacturer and calibration date are not what the rule tests.",
      "supersedes": "v18-07"
    },
    {
      "id": "v18-08-c",
      "topic": "School meal allergen approval",
      "difficulty": 3,
      "challenge": true,
      "keyType": "inference",
      "reasoning": {
        "model": "recipe-classification-to-training-revalidation",
        "stages": 6,
        "evidence": [
          "A changed ingredient source makes the meal changed.",
          "The named-lot declaration cannot cover it.",
          "An on-site review is necessary.",
          "The sole lead’s old-protocol training is not current.",
          "A supplement must be assessed independently, excluding the kitchen supervisor.",
          "Either observation method must verify the actual post-change line."
        ]
      },
      "passage": "A fictional school serves unchanged standard meals under a standing approval. A meal counts as changed when its ingredient source changes or its preparation introduces a new cross-contact route, whatever its recipe name. A changed meal needs a supplier declaration, which covers only the factory and lot named on it, or an on-site allergen review. A trained allergen lead conducts the review by direct observation or continuous live video and must verify the actual preparation line after the change. Training lapses under a new national allergen protocol unless the lead passes a protocol supplement. An external trainer or a school consortium may assess it, but the assessor must be independent of the lead's meal-preparation work, so the lead's kitchen supervisor cannot assess it.\n\nA meal with an unchanged recipe name was validly served after both its ingredient source and lot changed to ones outside the supplier declaration. The sole lead trained before the new protocol, which preceded the review. The kitchen supervisor offered an endorsement. No other route existed.",
      "stem": "Which of the following statements is supported by the passage?",
      "options": [
        "The unchanged recipe name kept the meal within the standing approval despite the new lot.",
        "The kitchen supervisor's endorsement counted as the independent assessment of the supplement.",
        "The lead used live video rather than direct observation, since a consortium assessed.",
        "The lead passed an independently assessed supplement and checked the new preparation line."
      ],
      "answer": 3,
      "hints": [
        "Decide whether the meal is changed by applying the stated triggers, not by its name.",
        "Then check the supplier declaration's coverage and whether the lead's training is still current."
      ],
      "optionNotes": [
        "False. A meal is changed when its ingredient source changes, 'whatever its recipe name'.",
        "False. The assessor must be independent of the lead's work, 'so the lead's kitchen supervisor cannot assess it'.",
        "Not supported. Observation may be direct or by 'continuous live video'; the assessor's identity does not determine which.",
        "Correct. The source change makes the meal changed and the new lot is outside the declaration, so an on-site review was needed; the lead's pre-protocol training required an independently assessed supplement, and the review required verifying the actual line."
      ],
      "explanation": "The changed ingredient source triggers the changed-meal rule, and the declaration covers only its named lot, so the on-site review is the only route. That review needs a current lead, which after the new protocol means a supplement assessed by someone independent, and either observation method requires the actual post-change line to be verified.",
      "supersedes": "v18-08"
    },
    {
      "id": "v18-09-c",
      "topic": "Museum restitution chain",
      "difficulty": 3,
      "challenge": true,
      "keyType": "inference",
      "reasoning": {
        "model": "object-identity-to-post-treatment-testing",
        "stages": 6,
        "evidence": [
          "One claimant withholds agreement, excluding undisputed return.",
          "Collection substitution ends the inventory exception.",
          "The copied mark cannot authenticate identity.",
          "Material testing is necessary.",
          "Introduced material requires sampling after treatment.",
          "Either collector must document the object location before removing the sample."
        ]
      },
      "passage": "A fictional museum returns an object if its ownership is undisputed or a claims panel so decides. Ownership is undisputed only if every recorded claimant agrees. A panel decision requires an authenticated object identity, unless the return concerns a complete sealed collection whose inventory has never changed; replacing an item ends that exception even if the total stays the same. Identity can be authenticated by an intact maker's mark or by material testing, and a mark copied during restoration is not intact. Testing requires a sample from the returned object taken after any treatment that introduced material from another object. A museum conservator or an outside analyst may take it, but must record the sampled location before removal; a photograph of the detached sample does not suffice.\n\nAn object was validly returned although one claimant withheld agreement. An item in its collection had once been replaced, its only maker's mark had been copied during restoration, and treatment had added material from another object. No other evidence, exception or route existed.",
      "stem": "Which of the following statements is supported by the passage?",
      "options": [
        "A post-treatment sample was tested, its location recorded before it was removed.",
        "As the collection's size was unchanged, its inventory exception still applied.",
        "An outside analyst, not a museum conservator, recorded where the sample was taken.",
        "The sample came from original material rather than from the area added in treatment."
      ],
      "answer": 0,
      "hints": [
        "Ask whether one claimant's refusal leaves the undisputed-ownership route open.",
        "Then check which shortcuts to the identity requirement the collection's history and the restored mark remove."
      ],
      "optionNotes": [
        "Correct. Withheld agreement forces a panel decision, the replaced item ends the exception, and the copied mark is not intact, so testing was needed on a sample taken after the treatment, with its location recorded 'before removal'.",
        "False. 'Replacing an item ends that exception even if the total stays the same.'",
        "Not supported. 'A museum conservator or an outside analyst may take it'; the text does not say who did.",
        "Not supported. The rules fix the timing and location record of the sample, not which part of the object it must come from."
      ],
      "explanation": "One refusal rules out undisputed ownership, so a panel decision needed authenticated identity. The replaced item removes the inventory exception and the copied mark fails, leaving material testing on a post-treatment sample whose location was recorded first. Who took the sample, and from which area, stays open.",
      "supersedes": "v18-09"
    },
    {
      "id": "v18-10-c",
      "topic": "Digital court filing authorisation",
      "difficulty": 3,
      "challenge": true,
      "keyType": "inference",
      "reasoning": {
        "model": "route-restriction-to-specific-delegation",
        "stages": 6,
        "evidence": [
          "Classified annexes exclude ordinary delivery.",
          "The new entity lacks a valid portal account.",
          "The sole clerk must therefore deliver sealed material validly.",
          "Classified filing needs explicit authority.",
          "Office transfer requires the new director’s renewal.",
          "The authority must name the current, renumbered case."
        ]
      },
      "passage": "A fictional tribunal accepts ordinary electronic filing unless a case contains classified annexes; leaving an annex out of the public copy does not remove it from the case. Classified cases must be filed through a secure portal or by sealed personal delivery. A portal account is valid only for the legal entity named on it and does not survive a merger into a new entity. Sealed delivery may be made by the applicant's director or a clerk whose authority expressly covers classified filings; a general litigation mandate is not enough. A clerk's authority lapses on transfer to another office unless the new office's director renews it, electronically or on paper. The renewal must cite the case's current reference number; renumbering cancels authority bearing only the former number.\n\nA classified case was validly filed after the applicant merged into a new entity. Only the predecessor held a portal account. Clerk Eno delivered the sealed file after changing office and after the renumbering. No director delivered it, and no other route existed.",
      "stem": "Which of the following statements is supported by the passage?",
      "options": [
        "The predecessor's account stayed usable as the annex was absent from the public copy.",
        "The new office's director renewed Eno's classified authority under the new case number.",
        "Eno's general mandate sufficed after the transfer, citing the former case number.",
        "Eno's authority was renewed electronically because the case had meanwhile been renumbered."
      ],
      "answer": 1,
      "hints": [
        "Decide first whether an annex withheld from the public copy still makes the case classified.",
        "Then check which filing routes the merger and the clerk's move leave available, and what each requires."
      ],
      "optionNotes": [
        "False. The account 'does not survive a merger into a new entity', and omitting an annex from the public copy 'does not remove it from the case'.",
        "Correct. The classified case excludes ordinary filing and the predecessor's account fails, so Eno's sealed delivery needed express classified authority, renewed by the new office's director and citing the current number.",
        "False. 'A general litigation mandate is not enough', and renumbering 'cancels authority bearing only the former number'.",
        "Not supported. Renewal may be 'electronically or on paper'; renumbering does not dictate the form."
      ],
      "explanation": "The classified annex rules out ordinary filing and the merger voids the portal account, so only Eno's sealed delivery remains. Eno needed express classified authority, renewed after the office transfer by the new director, and naming the case's current number. The form of renewal is not determined.",
      "supersedes": "v18-10"
    }
  ]
});
