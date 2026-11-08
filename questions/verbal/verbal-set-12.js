EPSO_BANK.registerSet({
  "id": "verbal-12",
  "section": "verbal",
  "title": "Verbal reasoning · Set 12 — Very hard",
  "description": "10 original challenging passages of exam length on fictional procedures and studies. Linked deductions, exceptions, scope and evidence limits. Timed practice: 17 min 30 sec. Editorial difficulty pending learner calibration.",
  "version": 2,
  "challenge": true,
  "questions": [
    {
      "id": "v12-01-c",
      "topic": "Translation-review authority",
      "difficulty": 3,
      "challenge": true,
      "keyType": "inference",
      "passage": "A fictional translation office marks a text as linguistically approved when both a translator and an independent reviser sign the final version. A subject expert's comments can inform either signatory but cannot replace either signature. Any change made after revision must be checked again by the reviser before the changed version is approved, however minor the correction. Approval is separate from authorisation to publish, which belongs to the commissioning body. That body may publish an unapproved version on its own responsibility, but this does not retrospectively supply the missing linguistic approval.\n\nThe translator and reviser signed version A on Monday. On Tuesday the translator changed a number, producing version B. On Wednesday the reviser checked and signed B, but the translator expressly withdrew their own signature pending another source check. The commissioning body then authorised publication of B. No further translator signature or waiver exists. Version A remains unchanged in the archive, and neither signatory has withdrawn a signature from it.",
      "stem": "Which of the following statements is correct?",
      "options": [
        "A's signatures carry over to B once the reviser has checked the changed number.",
        "A keeps both signatures; B is cleared to publish yet lacks linguistic approval.",
        "The translator withdrew on finding that the new number differed from the expert's source.",
        "The reviser's signature on B stands in for the signature the translator withdrew."
      ],
      "answer": 1,
      "hints": [
        "Track the two signatures separately for each version.",
        "Distinguish authorisation to publish from the signatures needed for linguistic approval."
      ],
      "optionNotes": [
        "False. Approval attaches to 'the final version', and the translator 'expressly withdrew their own signature' from B.",
        "Correct. A still has both signatures; B lacks the translator's, and publication 'does not retrospectively supply the missing linguistic approval'.",
        "Not supported. The text says only that the withdrawal was 'pending another source check'; no comparison with the expert's source is reported.",
        "False. Approval needs 'both a translator and an independent reviser'; one signature 'cannot replace' the other."
      ],
      "explanation": "Approval is tied to a specific version and needs both signatures. A separate decision to publish does not certify a prerequisite that is missing.",
      "reasoning": {
        "model": "Version inheritance and withdrawn prerequisites",
        "evidence": [
          "both a translator and an independent reviser sign the final version",
          "does not retrospectively supply the missing linguistic approval",
          "translator expressly withdrew their own signature"
        ]
      },
      "reviewedAs": "v11-07",
      "solution": [
        "Version A retains both required signatures.",
        "Version B has a reviser check and publication authorisation, but lacks the translator signature for the final version.",
        "The separate publication decision cannot replace the missing approval prerequisite."
      ],
      "supersedes": "v12-01"
    },
    {
      "id": "v12-02-c",
      "topic": "Historical-text edition chains",
      "difficulty": 3,
      "challenge": true,
      "keyType": "inference",
      "passage": "A fictional manuscript project distinguishes the wording of a text from the dates of the physical copies carrying it. Copies K and L both contain a corrected phrase that is absent from M. The catalogue notes that any copy carrying this correction must descend, directly or indirectly, from an amended exemplar. It does not say that every descendant reproduces every amendment, since scribes sometimes omitted passages. The team has ruled out independent invention of the phrase in K and L, although the exemplar itself has not been found.\n\nAn ownership note appears in K and M but not in L. Because ownership notes could be added independently after copying, the shared note does not establish a common textual ancestor more recent than the amended exemplar. Physical testing dates K later than M but supplies no relative date for L, and the dating concerns the surviving copies, not their source texts. The catalogue gives no complete copying tree.",
      "stem": "Which of the following statements is correct?",
      "options": [
        "K and M share a more recent textual source than K and L, as only they carry the note.",
        "L was produced after M, since it shares its correction with K, the later of those two.",
        "K and L descend from an amended exemplar, but the full copying order remains open.",
        "M cannot descend from the amended exemplar, because each descendant keeps the correction."
      ],
      "answer": 2,
      "hints": [
        "Check the direction of the link between carrying the correction and descending from the exemplar.",
        "Separate a copy's physical date and later ownership marks from the age of its wording."
      ],
      "optionNotes": [
        "Not supported. Ownership notes 'could be added independently', so the shared note 'does not establish' that closer ancestry.",
        "Not supported. Testing 'supplies no relative date for L', and descent of the wording does not date the physical copy.",
        "Correct. Any copy with the correction 'must descend' from the exemplar, while the notes and dates give 'no complete copying tree'.",
        "False. The catalogue does not say every descendant keeps every amendment, 'since scribes sometimes omitted passages'."
      ],
      "explanation": "Shared derived wording can establish ancestry without establishing a full genealogy. Do not reverse the implication or transfer a copy’s date to its source.",
      "reasoning": {
        "model": "Directional historical evidence and independent annotations",
        "evidence": [
          "any copy carrying this correction must descend",
          "scribes sometimes omitted passages",
          "ownership notes could be added independently",
          "supplies no relative date for L"
        ]
      },
      "reviewedAs": "v10-08",
      "supersedes": "v12-02"
    },
    {
      "id": "v12-03-c",
      "topic": "Scientific replication and shared measurement",
      "difficulty": 3,
      "challenge": true,
      "keyType": "inference",
      "passage": "A fictional report describes two laboratories that independently repeated a plant-growth experiment, using different plants in different buildings. Both found taller plants under treatment than under control. Each randomised treatment within its own trial, and its analyst worked from a coded file without knowing which code meant treatment until the calculations were complete.\n\nBoth laboratories, however, calibrated their height sensors with the same reference rod, supplied by the treatment manufacturer and later found to be longer than stated. The report does not give the resulting error or say whether it affected treatment and control readings differently. It also does not establish that the sensor calibration produced the observed treatment differences. A manual check found a treatment-control difference in one laboratory, but it covered only a subset of plants selected after the sensor results were known, and no selection rule was released. The manufacturer nevertheless called the findings three fully independent confirmations.",
      "stem": "Which of the following statements is correct?",
      "options": [
        "Both trials share a possible sensor bias; the manual check is no third independent trial.",
        "The rod error inflated treatment readings more than control readings in both laboratories.",
        "Coded analysis removed the shared calibration problem, since analysts could not spot treatment.",
        "The manufacturer chose the manual subset to hide a negative result in the other laboratory."
      ],
      "answer": 0,
      "hints": [
        "Separate independent allocation and analysis from independent measurement.",
        "Then ask how the manual subset was chosen and whether it amounts to a new trial."
      ],
      "optionNotes": [
        "Correct. Both used 'the same reference rod', and the manual check covered a 'subset of plants selected after the sensor results were known'.",
        "Not supported. The report does not say 'whether it affected treatment and control readings differently'.",
        "False. Coding hid group identity from analysts, but both laboratories 'however' calibrated with the same faulty rod.",
        "Not supported. 'No selection rule was released', and no motive or negative result is reported."
      ],
      "explanation": "Independence has several dimensions. A shared possible bias does not prove an artefact, and a selected remeasurement is not a new independent replication.",
      "reasoning": {
        "model": "Partial independence and selected corroboration",
        "evidence": [
          "independently repeated",
          "same reference rod",
          "does not establish that the sensor calibration produced",
          "subset of plants selected after the sensor results were known"
        ]
      },
      "reviewedAs": "v10-17",
      "supersedes": "v12-03"
    },
    {
      "id": "v12-04-c",
      "topic": "Supplier reports with copied assumptions",
      "difficulty": 3,
      "challenge": true,
      "keyType": "inference",
      "passage": "A fictional district compared a supplier's estimate of the fuel saved by a new scheduling system with an independent consultant's report. The supplier's estimate used a projected reduction in vehicle idling. The consultant independently checked the fuel-per-minute coefficient, but took the projected reduction in idling directly from the supplier; its contract covered coefficient validation, not identification of the causal change in idling.\n\nA fleet log recorded fewer total idling minutes after deployment, but over the same period the fleet operated fewer vehicles and completed fewer journeys. No per-journey or per-vehicle comparison was published, and no comparison group kept the old schedule. Both estimates concerned the change attributable to scheduling, not simply the observed fall in total minutes. The district nevertheless described the coefficient check and the fleet log as two independent confirmations of the system's full fuel-saving effect. No report claimed that the supplier's projection was wrong; the question was which parts had received independent support.",
      "stem": "Which of the following statements is correct?",
      "options": [
        "Validating the coefficient independently confirmed the complete fuel-saving estimate.",
        "The fleet log proves idling per journey fell, as both idling minutes and journeys fell.",
        "The coefficient was checked independently, but no source isolates the scheduling effect.",
        "The consultant reused the whole calculation and checked none of its components itself."
      ],
      "answer": 2,
      "hints": [
        "Trace each part of the estimate to its own source.",
        "Then separate a fall in a fleet total from the change attributable to scheduling."
      ],
      "optionNotes": [
        "Overstated. The consultant checked one coefficient but 'took the projected reduction in idling directly from the supplier'.",
        "False. Both totals fell, but 'no per-journey or per-vehicle comparison was published', so the rate is unknown.",
        "Correct. The idling figure came from the supplier, and the fleet log is a total that changed with fewer vehicles and journeys.",
        "False. The consultant 'independently checked the fuel-per-minute coefficient'."
      ],
      "explanation": "Checking one factor independently does not verify the causal inputs of the whole estimate. A falling total also does not fix a unit rate when activity changes.",
      "reasoning": {
        "model": "Component-specific independence and changing activity bases",
        "evidence": [
          "independently checked the fuel-per-minute coefficient",
          "took the projected reduction in idling directly from the supplier",
          "operated fewer vehicles and completed fewer journeys",
          "change attributable to scheduling"
        ]
      },
      "reviewedAs": "v10-20",
      "supersedes": "v12-04"
    },
    {
      "id": "v12-05-c",
      "topic": "Consortium voting scopes",
      "difficulty": 3,
      "challenge": true,
      "keyType": "inference",
      "passage": "A fictional research consortium has twelve member laboratories. Six hold permanent seats on its executive panel, and four of those six supported a proposed data platform. Under the rules, the panel vote is advice to the annual assembly, which takes the final decision and may amend a proposal before deciding it. Adoption requires support from at least seven laboratories at the assembly. A panel laboratory still casts just one assembly vote, and supporting a panel recommendation does not bind it to cast the same vote later.\n\nAt the assembly, all six laboratories without permanent panel seats voted against the unchanged platform proposal. The assembly ballots of the six panel laboratories have not been released. All twelve members were eligible to vote, the threshold remained seven and no abstention altered it. An amendment had been discussed informally, but it was not the text put to this vote, and the minutes recorded the non-panel votes separately from the earlier panel advice.",
      "stem": "Which of the following statements is correct?",
      "options": [
        "Only the unreleased panel ballots can show whether the proposal reached seven votes.",
        "The four panel supporters must have voted against the proposal at the assembly.",
        "The non-panel laboratories also rejected the informally discussed amendment.",
        "The unchanged proposal fails even if every panel laboratory voted in its favour."
      ],
      "answer": 3,
      "hints": [
        "Apply the assembly threshold to the unchanged proposal and count the possible supporters.",
        "Keep advisory votes and informal discussion apart from binding votes on the text itself."
      ],
      "optionNotes": [
        "False. Once six laboratories voted against, at most six can support it, so the result is known without the panel ballots.",
        "Not supported. Panel advice 'does not bind it to cast the same vote later', and the ballots are unreleased.",
        "Not supported. The amendment 'was not the text put to this vote'.",
        "Correct. 'All six laboratories without permanent panel seats voted against', leaving at most six of the seven votes required."
      ],
      "explanation": "An upper bound can rule out adoption without revealing every individual vote. The scope and legal effect of each vote matter as much as the headline majority.",
      "reasoning": {
        "model": "Voting threshold under subgroup bounds",
        "evidence": [
          "at least seven laboratories",
          "does not bind it to cast the same vote later",
          "all six laboratories without permanent panel seats voted against"
        ]
      },
      "reviewedAs": "v11-02",
      "solution": [
        "Seven assembly votes are required for adoption.",
        "Six non-panel laboratories oppose the unchanged proposal, leaving at most six supporters even if all panel laboratories vote for it.",
        "The earlier advisory majority cannot provide another binding vote, and informal discussion of an amendment establishes no votes on it."
      ],
      "supersedes": "v12-05"
    },
    {
      "id": "v12-06-c",
      "topic": "Jurisdiction through referral routes",
      "difficulty": 3,
      "challenge": true,
      "keyType": "inference",
      "passage": "A fictional complaints office receives cases either directly from a resident or through a professional association. A direct filing is admissible only after the resident has first used the service provider's internal complaint procedure. Association referrals instead require the association's certification that at least one affected resident has completed that procedure, and each certificate covers only the incident it names. The office investigates only services delivered inside the district; a provider's district address cannot bring an outside service within scope.\n\nThe office's bulletin lists an investigation of a ferry incident involving six residents. It confirms that the office accepted the case under the stated rules, but withholds its route and the provider's address. One of the six residents says she did not use the internal procedure, and the bulletin does not say whether the other five did. Its map shows the ferry crossing a district boundary but does not locate the incident.",
      "stem": "Which of the following statements is correct?",
      "options": [
        "The service lay within the district, and at least one resident used the procedure.",
        "Her account rules out an association referral, which needs all residents to qualify.",
        "The ferry provider must be based in the district, given that the office accepted the case.",
        "The case came in as a direct filing by one of the other five residents involved."
      ],
      "answer": 0,
      "hints": [
        "Find what both filing routes have in common.",
        "Keep the service's location, the provider's address and the number of residents who used the procedure apart."
      ],
      "optionNotes": [
        "Correct. The office 'investigates only services delivered inside the district', and each route needs at least one resident to have used the procedure.",
        "False. A referral needs certification that 'at least one affected resident' completed the procedure, not all of them.",
        "Not supported. The address is withheld, and 'a provider's district address cannot bring an outside service within scope'.",
        "Not supported. The bulletin 'withholds its route', so a referral remains possible."
      ],
      "explanation": "When an outcome can arise by alternative routes, infer what every route requires rather than guessing which route was used.",
      "reasoning": {
        "model": "Shared prerequisites across alternative jurisdictions",
        "evidence": [
          "direct filing is admissible only after",
          "at least one affected resident has completed",
          "investigates only services delivered inside the district",
          "accepted the case under the stated rules"
        ]
      },
      "reviewedAs": "v10-11",
      "supersedes": "v12-06"
    },
    {
      "id": "v12-07-c",
      "topic": "Employment-panel transition bounds",
      "difficulty": 3,
      "challenge": true,
      "keyType": "inference",
      "passage": "A fictional employment panel followed the same 80 workers over two annual surveys, with no replacement participants and an unchanged definition of employment. In the first year all 80 answered a binary employed-or-not question, and 50 were employed. In the second year 60 answered and 45 of those were employed. The other 20 remained on the panel but gave no second-year answer, and the agency does not classify a missing answer as unemployment.\n\nThe released tables contain totals rather than linked individual histories. They therefore do not show which first-year employees answered again, who moved into or out of work, or what the nonrespondents' current status is. A draft report nevertheless treated the five-person fall in recorded employment as five confirmed job losses. During the interval two local employers expanded and another reduced its workforce, but the panel has no employer identifiers and cannot attribute any change to these businesses.",
      "stem": "Which of the following statements is correct?",
      "options": [
        "Exactly five original employees lost work, as recorded employment fell from 50 to 45.",
        "The cohort may now have more workers, but the 45 cannot include all 50 first-year ones.",
        "All 45 employed respondents also had work in the first year, as nobody new joined.",
        "The employers' expansion explains the current employment status of every nonrespondent."
      ],
      "answer": 1,
      "hints": [
        "Separate the count of employed answers from the employed total in the whole cohort.",
        "Use the 20 unknown statuses and the number of places among the 45 employed answers."
      ],
      "optionNotes": [
        "Not supported. The fall is in recorded answers; 20 statuses are unknown and the tables are 'totals rather than linked individual histories'.",
        "Correct. Up to 20 unknown statuses could lift the total above 50, while 45 answers cannot include all 50 first-year employees.",
        "Not supported. An unchanged cohort does not mean unchanged individual employment; the tables do not show 'who moved into or out of work'.",
        "False. The panel 'cannot attribute any change to these businesses'."
      ],
      "explanation": "Partial follow-up can allow a higher true total even when a recorded total falls, while still fixing some facts about who can be in the observed group.",
      "reasoning": {
        "model": "Missing-data bounds and subgroup capacity",
        "evidence": [
          "50 were employed",
          "45 of those were employed",
          "other 20 remained on the panel but gave no second-year answer",
          "totals rather than linked individual histories"
        ]
      },
      "reviewedAs": "v10-10",
      "supersedes": "v12-07"
    },
    {
      "id": "v12-08-c",
      "topic": "Reminder allocation and actual exposure",
      "difficulty": 3,
      "challenge": true,
      "keyType": "inference",
      "passage": "A fictional clinic randomly assigned consenting patients to a text-reminder policy or an email-reminder policy. The study did not recruit patients who declined electronic reminders. The text group had fewer missed appointments. Each patient remained in the assigned group for analysis whether or not the message was delivered or read, nobody switched groups, and outcomes were recorded for every enrolled patient.\n\nSome emails failed, and some texts reached phones whose owners did not open them; reading could not be measured consistently for either medium. The policies also differed in whether the message contained a link to an appointment map: the text policy included that link, while the email policy did not. The clinic did not randomise medium and map link separately. The report compared the assigned groups, not people known to have read a reminder. A follow-up that would randomise map links independently and recruit more widely has been proposed, but has produced no findings.",
      "stem": "Which of the following statements is correct?",
      "options": [
        "With every outcome recorded, the trial isolates the effect of reading a text, not an email.",
        "Excluding failed deliveries from each group would isolate the effect of the map link.",
        "The text policy would also cut missed appointments among patients who refuse reminders.",
        "The result compares two bundled policies and isolates neither reading nor the map link."
      ],
      "answer": 3,
      "hints": [
        "List everything that differs between the assigned policies.",
        "Then distinguish complete outcome records from complete knowledge of what each patient received."
      ],
      "optionNotes": [
        "False. Patients were analysed 'whether or not the message was delivered or read', so the trial compares assigned policies, not reading.",
        "False. Dropping failures would not separate the link from the medium, which were not randomised separately, nor measure reading.",
        "Not supported. The study 'did not recruit patients who declined electronic reminders'.",
        "Correct. 'The text policy included that link, while the email policy did not', and reading was not the analysed exposure."
      ],
      "explanation": "Random assignment can compare two bundles without identifying each component or what each patient actually received. Complete outcomes do not remove those limits.",
      "reasoning": {
        "model": "Treatment bundles and assignment-versus-exposure inference",
        "evidence": [
          "remained in the assigned group for analysis whether or not the message was delivered or read",
          "text policy included that link, while the email policy did not",
          "did not recruit patients who declined electronic reminders"
        ]
      },
      "reviewedAs": "v10-12",
      "supersedes": "v12-08"
    },
    {
      "id": "v12-09-c",
      "topic": "Image permissions across revisions",
      "difficulty": 3,
      "challenge": true,
      "keyType": "inference",
      "passage": "A fictional gallery allows a catalogue image to appear online when the photographer has authorised digital reproduction and the depicted work has cleared the gallery's rights check. Printed catalogues instead require the photographer's print permission, in addition to the same artwork check. Permission for one medium does not include the other. A permission names a particular photograph: cropping it or changing its colour balance produces a revised image that requires fresh photographer permission for the chosen medium. The artwork check survives such revisions provided that the depicted work is unchanged.\n\nNera's original photograph of a sculpture has digital permission, and the sculpture has cleared the artwork check. A cropped version shows the same sculpture. The photographer has granted print permission for that crop but has said nothing about its digital use, and no further permission exists for the original. Staff are preparing a web page and a printed catalogue and will apply the rules without exception.",
      "stem": "Which of the following statements is correct?",
      "options": [
        "Each image can borrow the other's permission, so both may appear online and in print.",
        "Both images have print permission, as the unchanged sculpture passed the artwork check.",
        "The photographer would allow the crop online once shown that the sculpture is unchanged.",
        "The original can go online and the crop into print, but neither in the other medium."
      ],
      "answer": 3,
      "hints": [
        "Make separate entries for original and crop, and for digital and print.",
        "Ask which requirement survives a revision automatically and which does not."
      ],
      "optionNotes": [
        "False. A revision 'requires fresh photographer permission for the chosen medium', and 'Permission for one medium does not include the other'.",
        "False. Print also needs the photographer's print permission, which exists only for the crop.",
        "Not supported. The photographer 'has said nothing about its digital use'; a future answer is not reported.",
        "Correct. The original has digital permission and the crop print permission, while the artwork check covers both."
      ],
      "explanation": "Two dimensions of permission must be tracked together. A condition that carries across versions does not make a version-specific condition transferable.",
      "reasoning": {
        "model": "Two-dimensional permissions with partial inheritance",
        "evidence": [
          "Permission for one medium does not include the other",
          "requires fresh photographer permission for the chosen medium",
          "The artwork check survives such revisions",
          "granted print permission for that crop"
        ]
      },
      "reviewedAs": "v10-03",
      "supersedes": "v12-09"
    },
    {
      "id": "v12-10-c",
      "topic": "Reserve-stock reporting",
      "difficulty": 3,
      "challenge": true,
      "keyType": "inference",
      "passage": "A fictional health network defines usable reserve stock as material that is unexpired, has passed quality release and is not already committed to an appointment. Moving a package into the central warehouse changes its location but neither establishes quality release nor removes an existing commitment.\n\nThe warehouse received 800 packages at the end of March. Of these, 200 awaited quality release and 300 were committed to April appointments. Packages awaiting release cannot be used even when already booked; staff must substitute released stock or reschedule. Package-level checking established that exactly 100 packages were in both the pending-release and committed groups. All packages outside the pending-release group had passed quality release. Of the packages in neither excluded group, 150 were confirmed unexpired, while expiry for the rest of that remainder was unresolved. No package was distributed or newly committed before the reserve snapshot, and the controller has not inferred expiry from the absence of a flag.",
      "stem": "Which of the following statements is correct?",
      "options": [
        "Usable reserve lies between 150 and 400 packages, depending on unresolved expiry checks.",
        "The reserve holds exactly 300 packages once both excluded totals are subtracted from 800.",
        "All 400 packages outside the two excluded groups count as usable reserve stock.",
        "The 150 confirmed unexpired packages were mainly meant for emergency appointments."
      ],
      "answer": 0,
      "hints": [
        "List the three conditions for usable reserve and use the overlap between the excluded groups.",
        "Treat confirmed expiry findings as a lower bound, not missing information as clearance."
      ],
      "optionNotes": [
        "Correct. The excluded groups total 200 + 300 − 100 = 400, leaving 400; of these, '150 were confirmed unexpired' and the rest are unresolved.",
        "False. Allowing for the 100-package overlap leaves 400, and unresolved expiry prevents any exact figure.",
        "Overstated. These meet two conditions, but expiry 'for the rest of that remainder was unresolved'.",
        "Not supported. The text gives no intended use for the confirmed packages."
      ],
      "explanation": "Combine the overlap correctly, then keep confirmed and unresolved conditions apart when deriving bounds.",
      "reasoning": {
        "model": "Intersecting eligibility conditions and partial bounds",
        "evidence": [
          "unexpired, has passed quality release and is not already committed",
          "exactly 100 packages were in both",
          "150 were confirmed unexpired"
        ]
      },
      "reviewedAs": "v11-04",
      "solution": [
        "The excluded union is 200 + 300 − 100 = 400 packages, leaving 400 outside those two groups.",
        "Of that remainder, 150 are confirmed unexpired; the expiry status of the other 250 is unresolved.",
        "Usable reserve is therefore at least 150 and at most 400 packages, rather than an exact count inferred from missing flags."
      ],
      "supersedes": "v12-10"
    }
  ]
});
