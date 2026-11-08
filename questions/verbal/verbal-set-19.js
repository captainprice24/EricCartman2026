EPSO_BANK.registerSet({
  "id": "verbal-19",
  "section": "verbal",
  "title": "Verbal reasoning · Set 19 — Very hard",
  "description": "Ten original, demanding inference problems in exam-length passages. Combine dispersed evidence, scope restrictions and alternative explanations. Editorial difficulty; first-attempt calibration pending.",
  "version": 2,
  "challenge": true,
  "questions": [
    {
      "id": "v19-01-c",
      "topic": "Analytical licence alternatives",
      "difficulty": 3,
      "challenge": true,
      "keyType": "inference",
      "reasoning": {
        "model": "forked-history-with-common-lower-bound",
        "stages": 5,
        "evidence": [
          "Release can use reissue or external supervision.",
          "Reissue forces the independent quality officer’s assessment after ownership change.",
          "Ownership change followed the method revision.",
          "Supervision with the older credential forces conversion and post-revision assessment.",
          "Both histories therefore entail an independent person’s post-revision practical assessment, without identifying the person."
        ]
      },
      "passage": "A fictional institute releases a sensitive analysis only through a currently licensed laboratory or under an authorised external supervisor. A laboratory's licence ends when it changes legal owner. It can be reissued, but only after the laboratory's quality officer passes a practical assessment held after the ownership change. Public licensing lists may lag behind valid reissues. An external supervisor needs a current advanced credential or a converted older one. Advanced credentials issued before a method revision cease to be current, and both conversion and a newly issued credential require a practical assessment passed after the revision. Quality officers and supervisors must be independent of the researchers. Neither a briefing attendance record nor an old credential shows when an assessment was passed.\n\nThe analysis was validly released after the laboratory changed owner, which happened after the method revision. The public list still showed the former licence, and the only possible supervisor held an older credential. The record does not show whether reissue or supervision was used. No other route existed.",
      "stem": "Which of the following statements is supported by the passage?",
      "options": [
        "The licence was reissued, so the quality officer supplied the required competence.",
        "The older credential was converted, so the laboratory was unable to release on its own.",
        "Someone independent of the researchers passed a practical test after the method revision.",
        "A briefing record or a pre-revision assessment sufficed for the route actually used."
      ],
      "answer": 2,
      "hints": [
        "List the two release routes still open after the change of owner, without assuming which one was used.",
        "For each route, find the date after which the required practical assessment must fall, and compare those dates."
      ],
      "optionNotes": [
        "Not supported. Reissue is possible, but the record 'does not show whether reissue or supervision was used'.",
        "Not supported. Conversion is possible, but reissue remains equally possible, and the public list 'may lag behind valid reissues'.",
        "Correct. Reissue needs an assessment after the ownership change, which followed the revision; supervision with an older credential needs conversion, with an assessment 'passed after the revision'. Both people must be independent of the researchers.",
        "False. Both routes require a practical assessment after the revision, and a briefing record does not show 'when an assessment was passed'."
      ],
      "explanation": "Neither route can be identified, but both lead to the same conclusion. Reissue requires an assessment after the ownership change, which came after the revision; supervision requires one after the revision. Either way an independent person passed a post-revision practical assessment. Claims about which route was used go beyond the text.",
      "supersedes": "v19-01"
    },
    {
      "id": "v19-02-c",
      "topic": "Protected site planning fork",
      "difficulty": 3,
      "challenge": true,
      "keyType": "inference",
      "reasoning": {
        "model": "alternative-proofs-and-overlapping-dates",
        "stages": 5,
        "evidence": [
          "Old consent and the old hazard certificate cannot supply current approval.",
          "Fresh consent requires an inspection after merger, hence after alteration.",
          "Fresh hazard certification requires inspection after alteration.",
          "A hearing requires inspection after its post-merger request.",
          "All routes entail a contractor-independent post-alteration inspection, but not all force post-merger timing."
        ]
      },
      "passage": "A fictional planning office approves work in a protected zone through owner consent or an overriding public-need decision. Consent must come from the current legal owner. When an owner company merges into a new entity, earlier consent ends, and the successor may consent only after an independent structural inspection carried out after the merger. A public-need decision needs a current hazard certificate or a tribunal hearing. A certificate is cancelled when its supporting survey predates the latest structural alteration, and a new certificate requires an independent inspection after that alteration. A hearing instead requires its own inspection after the hearing request. On every route, the inspector must not be employed by the proposed contractor.\n\nWork was validly approved after the owner merged. The structural alteration came before the merger, and any hearing request was lodged after it. The existing hazard certificate relied on a survey older than the alteration, though a replacement was possible. The office has not said which route it used, and no other route existed.",
      "stem": "Which of the following statements is supported by the passage?",
      "options": [
        "The successor must have consented, as the old certificate ruled out any public-need decision.",
        "The office approved the work after a tribunal hearing rather than by owner consent.",
        "On every possible route, the qualifying inspection took place after the merger.",
        "Whatever the route, a contractor-independent inspection followed the structural alteration."
      ],
      "answer": 3,
      "hints": [
        "Decide first which existing documents, the old consent and the old certificate, can still be used.",
        "Place the alteration, the merger and any hearing request in order, then date the inspection each new route needs."
      ],
      "optionNotes": [
        "False. A public-need decision remains possible through a new certificate or 'a tribunal hearing'.",
        "Not supported. A hearing is possible, but 'the office has not said which route it used'.",
        "Overstated. A replacement certificate needs an inspection after the alteration only, which may have preceded the merger.",
        "Correct. Fresh consent needs an inspection after the merger, a hearing one after its later request, and a new certificate one after the alteration; all come after the alteration, by an inspector not employed by the contractor."
      ],
      "explanation": "The old consent and certificate are both void, leaving three possible routes. Each sets a different lower bound for its inspection: merger, hearing request or alteration. The alteration is the earliest of these, so it is the only bound common to every route. Post-merger timing is forced only on some routes.",
      "supersedes": "v19-02"
    },
    {
      "id": "v19-03-c",
      "topic": "Clinical access instrument fork",
      "difficulty": 3,
      "challenge": true,
      "keyType": "inference",
      "reasoning": {
        "model": "route-neutral-identity-bound",
        "stages": 5,
        "evidence": [
          "The revoked mandate cannot itself support access.",
          "Fresh mandate implies independent verification after revocation.",
          "The guardian’s later name change requires a new court check.",
          "Continuity requires verification after that change; new-document checking requires verification after later issue.",
          "All qualifying histories therefore imply post-revocation verification, without forcing post-name-change timing in the mandate route."
        ]
      },
      "passage": "A fictional clinic grants record access under a current direct mandate or a guardianship order. A mandate ends when the patient revokes it, but a new one may be granted after identity verification carried out after the revocation by an officer independent of the person requesting access. A guardianship order qualifies while the guardian's identity record is current. A legal name change cancels the record until a new court check, which may rely on a new identity document or a certified continuity declaration. A declaration needs independent verification of identity after the name change; a new document needs the same verification after its issue. The guardian cannot verify personally. Verifiers may work inside or outside the clinic.\n\nAccess was validly granted after a mandate had been revoked. The only possible guardian changed legal name after the revocation, and any new identity document was issued after that change. The clinic has not disclosed whether a fresh mandate or a renewed guardianship record supported access. No other route existed.",
      "stem": "Which of the following statements is supported by the passage?",
      "options": [
        "Whatever the route, an identity was independently verified after the revocation.",
        "A fresh mandate was used, since a name change ends guardianship identity records for good.",
        "The verification concerned the guardian's new identity document, not a fresh mandate.",
        "Under a fresh mandate, the verifier also checked the guardian's earlier court record."
      ],
      "answer": 0,
      "hints": [
        "The revoked mandate cannot itself support access. What could replace it?",
        "Order the revocation, the name change and any new document, then date the verification each route needs."
      ],
      "optionNotes": [
        "Correct. A fresh mandate needs verification 'after the revocation'; a renewed guardianship record needs verification after the name change or the new document's issue, both of which came later still.",
        "False. The record is cancelled only 'until a new court check', so guardianship can be restored.",
        "Not supported. The clinic 'has not disclosed' which route was used or whose identity was verified.",
        "Not supported. Nothing links the verification for a mandate to the guardian's records."
      ],
      "explanation": "Access needed either a fresh mandate or a renewed guardianship record. The mandate route requires verification after the revocation; both guardianship routes require verification after the name change or a later document, which followed the revocation. So independent post-revocation verification is certain, while the route and the person verified are not.",
      "supersedes": "v19-03"
    },
    {
      "id": "v19-04-c",
      "topic": "Residential equipment clearance",
      "difficulty": 3,
      "challenge": true,
      "keyType": "inference",
      "reasoning": {
        "model": "derived-use-and-inspection-instrument-chain",
        "stages": 6,
        "evidence": [
          "Overnight sleeping makes the rooms residential.",
          "Annex accreditation cannot cover the main building.",
          "The accommodation plan is necessary.",
          "The rejoining corridor is not a separate escape route.",
          "The changed sensing element requires calibration before the fire-pressure test.",
          "Either renewal method needs an independently calibrated post-repair reference."
        ]
      },
      "passage": "A fictional training body uses ordinary building approval for daytime rooms, but rooms used for overnight sleeping need residential clearance, even if described as temporary classrooms. Clearance rests on current venue accreditation or an approved accommodation plan. Sharing a street address does not extend an annex's accreditation to the main building. A plan needs a current fire-pressure test or a certified separate escape route. A corridor is separate only if it reaches an independent exit without rejoining the ordinary escape corridor on any floor. The test requires a meter calibrated at the time, and calibration ends when the meter's sensing element changes. Renewal, in a workshop or in the field, must compare the meter with a reference independently calibrated after the reference's latest repair.\n\nTrainees validly slept overnight in the main building. Only the annex was accredited, and the proposed extra corridor rejoined the ordinary corridor downstairs. The reference was repaired before the meter's sensing element was replaced, and the test followed both events. No other route existed.",
      "stem": "Which of the following statements is supported by the passage?",
      "options": [
        "The annex accreditation covered the main building, which shared its street address.",
        "Only a reference recalibrated independently since its repair let the meter be renewed.",
        "The meter was renewed in a workshop because the extra corridor rejoined downstairs.",
        "The reference was recalibrated after the meter's element change, not merely after repair."
      ],
      "answer": 1,
      "hints": [
        "Classify the rooms by how they were used, whatever they were called.",
        "Then eliminate the accreditation and corridor routes and trace what the remaining test needs."
      ],
      "optionNotes": [
        "False. 'Sharing a street address does not extend an annex's accreditation to the main building.'",
        "Correct. Sleeping requires residential clearance; annex-only accreditation and the rejoining corridor fail, so the plan needed a pressure test, and the changed element required renewal against a reference 'independently calibrated after the reference's latest repair'.",
        "Not supported. Renewal may take place 'in a workshop or in the field'; the corridor has nothing to do with the choice.",
        "Not supported. The reference must be calibrated after its own repair; the text sets no order relative to the meter's element change."
      ],
      "explanation": "Overnight use makes the rooms residential. The annex's accreditation and the rejoining corridor both fail, so the accommodation plan needed a fire-pressure test. The new sensing element ended the meter's calibration, and renewal by either method needs a reference calibrated independently since its latest repair. Nothing further is fixed about that calibration's date.",
      "supersedes": "v19-04"
    },
    {
      "id": "v19-05-c",
      "topic": "Wildlife relocation permit fork",
      "difficulty": 3,
      "challenge": true,
      "keyType": "inference",
      "reasoning": {
        "model": "shared-time-bound-with-different-subjects",
        "stages": 5,
        "evidence": [
          "The older veterinary clearance is unusable.",
          "Fresh clearance consults a post-outbreak review.",
          "Outbreak emergency assessment cites such a review through a later report.",
          "Habitat assessment requires a post-reclassification review.",
          "Reclassification followed the outbreak, so all histories imply a post-outbreak review while only one forces the later bound."
        ]
      },
      "passage": "A fictional sanctuary relocates protected animals under a veterinary clearance or an emergency conservation order. A clearance ends when the animal's species classification changes, until a species-specific examination is completed by a sanctuary vet or an outside clinic. Either examiner must consult a disease review published after the latest regional outbreak; a general health note is not enough. An emergency order needs an outbreak assessment or a habitat-loss assessment. An outbreak assessment needs a new regional laboratory report, issued after the latest outbreak, citing a disease review published after that outbreak. A habitat-loss assessment instead needs an independent relocation vet whose competence endorsement cites a disease review published after the most recent reclassification. Public summaries omit these documents.\n\nAn animal was validly relocated after being reclassified. The latest regional outbreak came before the reclassification, and the animal's older clearance predated both. The record allows a fresh clearance or either emergency order but does not say which was used. No other route existed.",
      "stem": "Which of the following statements is supported by the passage?",
      "options": [
        "The disease review used must have been published after the reclassification.",
        "An emergency order was needed, since reclassification rules out a new examination.",
        "A disease review from after the outbreak supported the relocation, by an unknown route.",
        "A regional laboratory report was required whichever relocation route was actually used."
      ],
      "answer": 2,
      "hints": [
        "The older clearance predates both events. Can it still be used?",
        "List what each of the three remaining routes requires, and order the outbreak and the reclassification."
      ],
      "optionNotes": [
        "Overstated. Only the habitat-loss route needs a review after the reclassification; a fresh clearance or outbreak assessment could rely on one published between the two events.",
        "False. A clearance ends only 'until a species-specific examination is completed'.",
        "Correct. A fresh clearance and an outbreak assessment both need a review published after the outbreak; the habitat-loss route needs one after the reclassification, which came later still.",
        "Overstated. A laboratory report is required for the outbreak assessment alone."
      ],
      "explanation": "The old clearance is void, so a fresh clearance or an emergency order was used. Every route depends on a disease review: two need one published after the outbreak, and the third needs one after the later reclassification. A post-outbreak review is therefore certain; a post-reclassification review and a laboratory report are not.",
      "supersedes": "v19-05"
    },
    {
      "id": "v19-06-c",
      "topic": "Research contract signature fork",
      "difficulty": 3,
      "challenge": true,
      "keyType": "inference",
      "reasoning": {
        "model": "common-authority-after-earliest-event",
        "stages": 5,
        "evidence": [
          "Old rector authority is suspended and needs an independent finding plus post-conflict declaration.",
          "Individual delegation needs a post-team declaration.",
          "Standing delegation needs post-merger ratification and declaration.",
          "Conflict preceded team formation, which preceded merger.",
          "All routes force a post-conflict declaration validated by someone other than the signatory."
        ]
      },
      "passage": "A fictional university signs a sensitive research contract through its rector or an authorised project delegate. A declared conflict of interest suspends the rector's authority, which may be restored for that contract by an independent ethics finding based on a declaration of interests signed after the conflict arose; an earlier annual declaration cannot substitute. A delegate needs an individual mandate, which requires a declaration made after the project team is formed, or a standing faculty mandate. A standing mandate ends on a faculty merger unless the successor dean ratifies it, and ratification requires a declaration made after the merger. Every declaration must concern the person who finally signs and be validated, internally or externally, by an independent officer other than that person.\n\nThe contract was validly signed after a faculty merger. The rector's conflict arose before the project team was formed, and the merger followed the team's formation. Only earlier standing mandates and the rector's pre-conflict declaration have been published; the signatory is not disclosed. No other route existed.",
      "stem": "Which of the following statements is supported by the passage?",
      "options": [
        "The signatory declared interests after the merger, as every route required ratification.",
        "The rector was unable to regain authority for this contract once the conflict had arisen.",
        "The declaration was probably validated externally, as no ethics finding was published.",
        "The signatory's declaration postdated the conflict and was validated by another person."
      ],
      "answer": 3,
      "hints": [
        "Check whether the rector's suspended authority can be restored, and what each delegate route needs.",
        "Put the conflict, the team's formation and the merger in order, then compare the declaration dates each route requires."
      ],
      "optionNotes": [
        "False. Only a standing mandate needs ratification; the rector and individual-mandate routes need declarations after earlier events.",
        "False. Authority 'may be restored for that contract by an independent ethics finding'.",
        "Not supported. Validation may be 'internally or externally'; unpublished documents identify neither.",
        "Correct. Restoring the rector needs a declaration after the conflict; an individual mandate needs one after the team's formation, and a standing mandate one after the merger, both later. Each is validated by someone other than the signatory."
      ],
      "explanation": "Three routes remain: restored rector authority, an individual mandate or a ratified standing mandate. Their declarations must postdate the conflict, the team's formation and the merger respectively, and these events occurred in that order. So every route yields a post-conflict declaration validated by another person, but not necessarily a post-merger one.",
      "supersedes": "v19-06"
    },
    {
      "id": "v19-07-c",
      "topic": "Heritage funding audit fork",
      "difficulty": 3,
      "challenge": true,
      "keyType": "inference",
      "reasoning": {
        "model": "necessary-common-record-not-selected-branch",
        "stages": 5,
        "evidence": [
          "Old dealer listing cannot suffice after control change.",
          "New dealer review requires later ownership records.",
          "That change followed the seller’s acquisition.",
          "Both committee alternatives require post-acquisition records directly.",
          "All histories share the acquisition lower bound, without identifying the branch or requiring the later control-change bound."
        ]
      },
      "passage": "A fictional fund approves a heritage purchase through a listed dealer or a provenance committee. A dealer's listing ends when its controlling shareholder changes, unless it passes a new integrity review examining beneficial ownership records updated after that change. Public lists sometimes still show an old entry after a new review has taken effect. A committee may rely on an owner-chain report, using ownership records updated after the object's most recent transfer, or on an independent sale-history audit, using records updated after the seller acquired the object. It may commission both, but either suffices on its own if it qualifies. Purchase notices need not say which route was used.\n\nThe purchase was validly approved after the dealer's control changed. The seller had acquired the object before that change, and that acquisition was the object's most recent transfer. An old dealer entry is still visible. The fund has disclosed no later review or committee evidence. No other route existed.",
      "stem": "Which of the following statements is supported by the passage?",
      "options": [
        "The approval rested on ownership records refreshed since the seller acquired it.",
        "A dealer review must have been used, since the old list entry ruled out the committee.",
        "The records relied on must have been updated after the dealer's control changed.",
        "The committee needed both a report and an audit, as neither would suffice alone."
      ],
      "answer": 0,
      "hints": [
        "Put the seller's acquisition and the dealer's change of control in order.",
        "Then apply the record-date requirement of each route, including both committee options."
      ],
      "optionNotes": [
        "Correct. A dealer review needs records updated after the control change, which followed the acquisition; both committee options need records updated after the acquisition, which was also the most recent transfer.",
        "False. Nothing in the rules makes an old list entry bar committee approval, and lists 'sometimes still show an old entry'.",
        "Overstated. Only the dealer route needs records updated after the control change; committee records could date from between the acquisition and that change.",
        "False. 'Either suffices on its own if it qualifies.'"
      ],
      "explanation": "The route is unknown, but each route has a record-date requirement. The dealer route's records must postdate the control change; both committee options need records after the acquisition, which came earlier. So records updated after the acquisition are certain, while post-control-change records are certain only on the dealer route.",
      "supersedes": "v19-07"
    },
    {
      "id": "v19-08-c",
      "topic": "Broadcast transmission release",
      "difficulty": 3,
      "challenge": true,
      "keyType": "inference",
      "reasoning": {
        "model": "classification-to-current-certificate-authority",
        "stages": 6,
        "evidence": [
          "Beyond-region distribution is cross-border despite audience identity.",
          "The new company cannot use the predecessor’s reciprocal agreement.",
          "A conformity certificate is necessary.",
          "The changed compression module requires a fresh compatibility assessment.",
          "Unrestored laboratory relocation forces supervised in-house testing.",
          "Changed protocol requires a supplement using post-name-change independent identity verification."
        ]
      },
      "passage": "A fictional broadcaster uses routine clearance for programmes distributed only within its region. A simultaneous foreign-language feed sent beyond the region makes distribution cross-border, even when aimed at home-region residents abroad. Cross-border release needs a reciprocal agreement, which names the transmitting entity and does not survive a merger, or a conformity certificate. Changing the compression module cancels a certificate until a fresh compatibility assessment by an accredited laboratory or a supervised in-house test. Accreditation ends on relocation unless restored after inspection. The supervisor needs a current protocol credential, and a protocol change voids earlier credentials until a practical supplement is passed. Online and in-person supplements both require independent identity verification after the supervisor's latest legal name change.\n\nAfter a merger, a programme was validly released with a feed beyond the region. Only the predecessor had an agreement. The compression module and protocol had changed, and the only laboratory had relocated without restoration. The sole supervisor held a pre-change credential and changed name before any supplement. No other route existed.",
      "stem": "Which of the following statements is supported by the passage?",
      "options": [
        "Aiming the feed at home-region residents abroad kept the programme under routine clearance.",
        "The supervisor passed a supplement, with identity checked independently after the name change.",
        "The supplement was taken online because the laboratory had relocated without restoration.",
        "The supervisor's identity was verified after the merger, not merely after the name change."
      ],
      "answer": 1,
      "hints": [
        "Classify the feed by where it is sent, not by who it is meant for.",
        "Then trace which release route survives the merger, and what the changed module and protocol each require."
      ],
      "optionNotes": [
        "False. A feed sent beyond the region is cross-border 'even when aimed at home-region residents abroad'.",
        "Correct. The feed is cross-border, the predecessor's agreement fails and the changed module needs an assessment; with the laboratory unrestored, the in-house test needs a current supervisor, so a supplement with identity verified 'after the supervisor's latest legal name change'.",
        "Not supported. 'Online and in-person supplements both' qualify; the laboratory's status does not decide the form.",
        "Not supported. The name change sets the lower bound for verification; its timing relative to the merger is not given."
      ],
      "explanation": "The beyond-region feed is cross-border, and the merger voids the agreement, so a conformity certificate was needed. The new module requires an assessment, the relocated laboratory fails, and the in-house test needs a supervisor whose old credential the protocol change voided. Either supplement format needs identity verification after the name change.",
      "supersedes": "v19-08"
    },
    {
      "id": "v19-09-c",
      "topic": "Harbour infrastructure inspection fork",
      "difficulty": 3,
      "challenge": true,
      "keyType": "inference",
      "reasoning": {
        "model": "shared-interval-with-unordered-branches",
        "stages": 5,
        "evidence": [
          "Changed supports invalidate the design shortcut.",
          "Engineering certification therefore needs a post-change foundation survey.",
          "Emergency storm evidence is later than that change.",
          "Emergency underwater evidence follows the still-later request.",
          "All possible histories examine actual post-change foundations, without universally requiring post-storm timing or a load assessment."
        ]
      },
      "passage": "A fictional harbour opens a reconstructed pier through engineering certification or an emergency operating order. Certification needs an intact design approval or a new load assessment. A design approval ends when the pier's support pattern changes, and a new assessment must use a foundation survey carried out after that change; a surface photograph will not do. An emergency order needs a safety officer's approval based on a foundation survey made after the latest storm or on an underwater foundation inspection made after the order was requested. Public staff or an independent contractor may do either, but inspecting a model does not qualify. An emergency order needs no load assessment if its own evidence conditions are met.\n\nThe pier was validly opened after its support pattern changed. The latest storm came after that change, and any emergency request came after the storm. The only design approval predated the change. The opening notice does not say which route was used. No other route existed.",
      "stem": "Which of the following statements is supported by the passage?",
      "options": [
        "The foundations must have been examined after the storm, whichever route was used.",
        "The opening required a new load assessment, even under an emergency order.",
        "Whatever the route, the foundations were examined after the support pattern changed.",
        "A contractor rather than public staff examined the foundations, given the new supports."
      ],
      "answer": 2,
      "hints": [
        "Decide first whether the old design approval survives the change in supports.",
        "Order the support change, the storm and any emergency request, then date the evidence each route needs."
      ],
      "optionNotes": [
        "Overstated. The emergency route's evidence follows the storm, but a certification survey need only follow the support change, which came before the storm.",
        "False. A load assessment is needed for certification, but 'an emergency order needs no load assessment if its own evidence conditions are met'.",
        "Correct. Certification needs a foundation survey after the change; the emergency order needs a survey after the later storm or an inspection after the still-later request. Every route examines the actual foundations after the change.",
        "Not supported. 'Public staff or an independent contractor may do either'; the text does not say who did."
      ],
      "explanation": "The design approval is void, leaving a load assessment or an emergency order. Each route needs a foundation examination dated after a different event, and the support change is the earliest of them. Only post-change foundation evidence is common to all routes; post-storm timing and a load assessment are each required on one route only.",
      "supersedes": "v19-09"
    },
    {
      "id": "v19-10-c",
      "topic": "Patent archive access fork",
      "difficulty": 3,
      "challenge": true,
      "keyType": "inference",
      "reasoning": {
        "model": "identity-continuity-across-alternative-agents",
        "stages": 5,
        "evidence": [
          "Assignment invalidates old inventor mandates.",
          "A fresh holder mandate needs post-assignment independent identity.",
          "The estate’s changed name invalidates the old court certificate.",
          "New certificate identity follows the name change; notarial identity follows a later request.",
          "All routes imply an independent nonresearcher verification after assignment without identifying whose identity was verified."
        ]
      },
      "passage": "A fictional patent archive grants restricted access under a current inventor mandate or to a recognised estate representative. Inventor mandates end when the patent is assigned to a new holder. The holder may issue a fresh mandate only after its signing officer's identity has been verified after the assignment. A representative qualifies through a current court certificate or a notarial continuity declaration, but both lapse when the representative's legal name changes. A fresh certificate requires identity verification after the name change; a notarial declaration requires it after the notarial request. Every verification must be independent and cannot be performed by the requesting researcher, even one with legal training. Public access logs omit identity records and mandates.\n\nAccess was validly granted after a patent assignment. The only possible representative changed legal name after the assignment, and any notarial request followed that change. Only the earlier inventor mandates and an old court certificate are publicly visible. The archive does not say which route supported access. No other route existed.",
      "stem": "Which of the following statements is supported by the passage?",
      "options": [
        "A fresh court certificate was needed, as a notarial declaration cannot follow a name change.",
        "The identity verified was probably the representative's, even under a fresh holder mandate.",
        "Verification must have followed the name change, even for a fresh holder mandate.",
        "Someone other than the researcher verified an identity independently after the assignment."
      ],
      "answer": 3,
      "hints": [
        "What does the assignment do to the old inventor mandates, and what can replace them?",
        "Order the assignment, the name change and any notarial request, then date the verification each route needs."
      ],
      "optionNotes": [
        "False. A representative may qualify through 'a notarial continuity declaration' as an alternative to a certificate.",
        "Not supported. Under a fresh mandate, it is the holder's 'signing officer's identity' that is verified.",
        "Overstated. A fresh mandate needs verification only after the assignment, which may have preceded the name change.",
        "Correct. A fresh mandate needs verification after the assignment; a new certificate or notarial declaration needs it after the name change or the request, both later. Every verifier is independent and is not the researcher."
      ],
      "explanation": "The assignment voids the old mandates and the name change voids the old certificate, leaving three routes. Their verifications must follow the assignment, the name change or the notarial request, in that order of events. So an independent verification after the assignment is certain; whose identity, and whether it followed the name change, are not.",
      "supersedes": "v19-10"
    }
  ]
});
