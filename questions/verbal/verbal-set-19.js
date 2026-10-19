EPSO_BANK.registerSet({
  "id": "verbal-19",
  "section": "verbal",
  "title": "Verbal reasoning · Set 19 — Very hard",
  "description": "Ten original, demanding inference problems. Combine dispersed evidence, scope restrictions and alternative explanations. Editorial difficulty; first-attempt calibration pending.",
  "version": 1,
  "challenge": true,
  "questions": [
    {
      "id": "v19-01",
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
      "passage": "A fictional institute releases a sensitive analysis only through a currently licensed laboratory or under an authorised external supervisor. Laboratory licensing ends when the laboratory changes legal owner. Reissue is possible, but requires its designated quality officer to pass a practical assessment after that ownership change. The quality officer cannot be one of the researchers whose analysis is being released. The public licensing list can lag behind valid reissues.\n\nExternal supervisors qualify through a current advanced credential or a converted older credential. Advanced credentials issued before a method revision cease to be current. Conversion of an older credential requires a practical assessment after the revision. A supervisor with a newly issued advanced credential must also have passed a practical assessment after that revision. Supervisors, like quality officers, must be independent of the researchers. Neither a briefing attendance record nor an old credential establishes when such an assessment was passed.\n\nThe analysis was validly released after the laboratory changed owner. The method revision occurred before that ownership change. The public list still showed the former licence, and the only possible external supervisor held an older credential. The record does not establish whether the laboratory obtained reissue or used supervision. No other release or competence route existed.",
      "stem": "Which of the following statements is supported by the passage?",
      "options": [
        "The laboratory had received a reissued licence, so its designated quality officer rather than an external supervisor supplied the required current competence.",
        "The older external credential had been converted, so the public list’s former licence entry correctly showed that the laboratory could not release independently.",
        "An independent quality officer or external supervisor passed a practical assessment after the method revision; the permitted release route remains unspecified.",
        "A briefing record or an assessment predating the method revision was sufficient for whichever competence route supported this particular sensitive release."
      ],
      "answer": 2,
      "hints": [
        "Trace the conditions in both directions; distinguish requirements from sufficient evidence.",
        "Release can use reissue or external supervision."
      ],
      "optionNotes": [
        "Overstated. Reissue is possible but supervision remains possible.",
        "Overstated. Conversion is possible but reissue remains possible.",
        "Correct. Reissue needs an assessment after the later ownership change; supervision needs post-revision assessment. Either route entails independent post-revision competence.",
        "False. Both feasible routes require a later practical assessment; a briefing is insufficient."
      ],
      "explanation": "Release can use reissue or external supervision. Reissue forces the independent quality officer’s assessment after ownership change. Ownership change followed the method revision. Supervision with the older credential forces conversion and post-revision assessment. Both histories therefore entail an independent person’s post-revision practical assessment, without identifying the person."
    },
    {
      "id": "v19-02",
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
      "passage": "A fictional planning office approves work in a protected zone through either owner consent or an overriding public-need decision. Consent must come from the current legal owner. When an owner company merges into a new entity, earlier consent ends; the successor can issue new consent only after an independent structural inspection performed after the merger. The inspector must not be employed by the proposed contractor. Public records need not display the successor's fresh consent.\n\nAn overriding decision needs either a current hazard certificate or an independent tribunal hearing. Hazard certificates are cancelled when the supporting survey is older than the most recent structural alteration. A new hazard certificate requires an independent structural inspection after that alteration. A tribunal hearing instead requires its own structural inspection after the hearing request. In both public-need procedures the inspector must also be outside the proposed contractor's employment. The inspection can precede the decision without appearing in its published summary.\n\nWork was validly approved after the owner merger. The structural alteration happened before the merger, and the hearing request, if that route was used, was lodged after the merger. The surviving hazard certificate relied on a survey before the alteration, but a replacement is possible. The office has not disclosed which approval route it used. No other route or exception existed.",
      "stem": "Which of the following statements is supported by the passage?",
      "options": [
        "The successor owner necessarily issued fresh consent, because cancellation of the older hazard certificate prevented every possible public-need decision for the work.",
        "The tribunal used the hearing route, rather than fresh successor consent or a replacement hazard certificate, to approve the work.",
        "The qualifying inspection occurred after the merger in every permitted history, including replacement of the hazard certificate after the earlier structural alteration.",
        "Each approval route requires an independent structural inspection after the structural alteration, whether owner consent, a new hazard certificate or a tribunal hearing supported it."
      ],
      "answer": 3,
      "hints": [
        "Trace the conditions in both directions; distinguish requirements from sufficient evidence.",
        "Old consent and the old hazard certificate cannot supply current approval."
      ],
      "optionNotes": [
        "False. New hazard certification or hearing can support public need.",
        "Not supported. A hearing is possible, but neither it nor its probability is established over the other qualifying routes.",
        "Overstated. Replacement hazard inspection may occur after alteration but before merger.",
        "Correct. Consent requires post-merger inspection, the hearing requires post-request inspection, and replacement hazard certification requires post-alteration inspection; all imply the common lower bound."
      ],
      "explanation": "Old consent and the old hazard certificate cannot supply current approval. Fresh consent requires an inspection after merger, hence after alteration. Fresh hazard certification requires inspection after alteration. A hearing requires inspection after its post-merger request. All routes entail a contractor-independent post-alteration inspection, but not all force post-merger timing."
    },
    {
      "id": "v19-03",
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
      "passage": "A fictional clinic grants record access through a current direct mandate or a guardianship order. Direct mandates end when a patient revokes them, though a new mandate may be granted later. A new mandate requires identity verification after the revocation by an officer independent of the person requesting access. The verifier can work inside or outside the clinic; location does not determine independence.\n\nA guardianship order qualifies while the guardian's identity record remains current. A legal name change cancels that record until a new court check. The court may check a new identity document or accept a certified continuity declaration. A continuity declaration requires an independent officer's identity verification after the name change. A new-document check requires the same kind of independent verification after that document's issue. The requesting guardian cannot perform the verification personally. Order and mandate documents are not necessarily reproduced in the clinic's public access log.\n\nAccess was validly granted after a direct mandate had been revoked. The sole possible guardian changed legal name after the revocation; any new identity document was issued after that change. The clinic has not disclosed whether a fresh direct mandate or a renewed guardianship identity record supported access. No other requestor, guardianship or access route existed.",
      "stem": "Which of the following statements is supported by the passage?",
      "options": [
        "Access can be inferred to have involved independent identity checking after revocation; the facts leave open whether a guardian or mandate supplied authority.",
        "The clinic relied on a new direct mandate because a legal name change prevents a guardianship order from ever regaining a current identity record.",
        "The independent identity verification concerned the guardian’s new document, rather than the patient’s fresh mandate or a certified continuity declaration.",
        "If a fresh direct mandate supplied access, the officer verifying the patient’s identity had also checked the guardian’s earlier court identity record."
      ],
      "answer": 0,
      "hints": [
        "Trace the conditions in both directions; distinguish requirements from sufficient evidence.",
        "The revoked mandate cannot itself support access."
      ],
      "optionNotes": [
        "Correct. A fresh mandate requires post-revocation verification; either guardianship renewal route requires later verification after name change or document issue.",
        "False. A new court check can restore the identity record.",
        "Not supported. The route and verified identity are not identified.",
        "Not supported. The access rules do not link the identity officers working on different possible authorisation routes."
      ],
      "explanation": "The revoked mandate cannot itself support access. Fresh mandate implies independent verification after revocation. The guardian’s later name change requires a new court check. Continuity requires verification after that change; new-document checking requires verification after later issue. All qualifying histories therefore imply post-revocation verification, without forcing post-name-change timing in the mandate route."
    },
    {
      "id": "v19-04",
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
      "passage": "A fictional training body opens daytime rooms under ordinary building approval. Rooms used for overnight sleeping instead need residential clearance, even when described as temporary classrooms. Residential clearance uses either current venue accreditation or an approved accommodation plan. Accreditation applies to the named wing and ends when its evacuation system changes. A shared street address does not extend an annex's accreditation to the main building.\n\nAn accommodation plan requires a current fire-pressure test or a certified separate escape route. A corridor counts as separate only when it reaches an independent exit without rejoining the ordinary escape corridor. Rejoining it on a different floor does not qualify. A fire-pressure test requires a calibrated meter at the time of testing. Meter calibration ends after its sensing element changes. Renewal can be a workshop or field procedure, but both must compare the meter with a reference independently calibrated after that reference's latest repair. An old sticker does not survive a later repair without recertification.\n\nThe main building validly hosted trainees sleeping overnight. Only the annex held accreditation. The proposed additional corridor rejoined the ordinary corridor downstairs. The reference was repaired before the meter’s sensing element was replaced, and the pressure test followed both events. No other room, corridor, meter or clearance route existed.",
      "stem": "Which of the following statements is supported by the passage?",
      "options": [
        "The annex accreditation covered the sleeping rooms because the main building shared its address and called the overnight rooms temporary classrooms.",
        "Only a reference independently recertified after repair could support the meter renewal needed for the sleeping rooms’ required fire-pressure test.",
        "The reference calibration was performed in a workshop rather than in the field because the additional corridor rejoined the ordinary escape corridor downstairs.",
        "The reference received calibration after the meter’s sensing element changed, rather than before that change but still after its own repair."
      ],
      "answer": 1,
      "hints": [
        "Trace the conditions in both directions; distinguish requirements from sufficient evidence.",
        "Old accreditation cannot be used after the fire-system change."
      ],
      "optionNotes": [
        "False. Neither shared address nor classroom naming supplies residential accreditation for the main building.",
        "Correct. Sleeping forces residential clearance; annex-only accreditation and the rejoining corridor fail, leaving a pressure test requiring renewed meter calibration with a post-repair independent reference.",
        "Not supported. Either calibration procedure remains available.",
        "Overstated. The reference must be calibrated after its own repair; no order relative to the meter’s change is given."
      ],
      "explanation": "Overnight sleeping makes the rooms residential. Annex accreditation cannot cover the main building. The accommodation plan is necessary. The rejoining corridor is not a separate escape route. The changed sensing element requires calibration before the fire-pressure test. Either renewal method needs an independently calibrated post-repair reference."
    },
    {
      "id": "v19-05",
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
      "passage": "A fictional sanctuary relocates protected animals through a veterinary clearance or an emergency conservation order. Veterinary clearances end when an animal changes species classification, until a species-specific examination is completed. Either a sanctuary veterinarian or an outside clinic may examine it, but both must consult a current disease review published after the latest regional outbreak. A general health note is insufficient.\n\nEmergency conservation orders require either an active outbreak assessment or a habitat-loss assessment. An outbreak assessment needs a new regional laboratory report after the latest outbreak. That report must cite a disease review published after the outbreak. A habitat-loss assessment instead requires an independent relocation veterinarian, whose competence endorsement must cite a current disease review published after the most recent species reclassification. Reviews can concern a group of species if they expressly include the reclassified animal. Public relocation summaries omit clinical and competence documents.\n\nAn animal was validly relocated after reclassification. The latest regional outbreak preceded the reclassification. Its older veterinary clearance predated both events. The record permits a fresh clearance or either kind of emergency order but identifies none. No other relocation or medical exception existed.",
      "stem": "Which of the following statements is supported by the passage?",
      "options": [
        "The disease review necessarily appeared after reclassification, even if a fresh veterinary clearance relied on a review issued between the outbreak and reclassification.",
        "The relocation necessarily used an emergency order, because an animal’s change of species classification prevents a later species-specific veterinary examination.",
        "A disease review published after the outbreak informed the approval, although the facts do not show whether it was used clinically or in an emergency assessment.",
        "A regional laboratory report was indispensable under every permitted relocation route, including renewed veterinary clearance and habitat-loss emergency assessment."
      ],
      "answer": 2,
      "hints": [
        "Trace the conditions in both directions; distinguish requirements from sufficient evidence.",
        "The older veterinary clearance is unusable."
      ],
      "optionNotes": [
        "Overstated. Fresh clearance permits a post-outbreak review predating the later reclassification.",
        "False. A species-specific examination can restore clearance.",
        "Correct. Fresh clearance and outbreak assessment need post-outbreak review; habitat endorsement needs post-reclassification review, which is later still.",
        "Overstated. A laboratory report is required for outbreak assessment alone."
      ],
      "explanation": "The older veterinary clearance is unusable. Fresh clearance consults a post-outbreak review. Outbreak emergency assessment cites such a review through a later report. Habitat assessment requires a post-reclassification review. Reclassification followed the outbreak, so all histories imply a post-outbreak review while only one forces the later bound."
    },
    {
      "id": "v19-06",
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
      "passage": "A fictional university signs a sensitive research contract through the rector or an authorised project delegate. A rector's signing authority is suspended during a declared conflict of interest. It may be restored for that contract after an independent ethics finding. The finding requires a declaration of interests signed after the conflict arose. A general annual declaration from before the conflict cannot substitute.\n\nProject delegates qualify through an individual mandate or a standing faculty mandate. An individual mandate requires a declaration of interests after the project team is formed. A standing faculty mandate ceases on a faculty merger unless the successor dean ratifies it. Ratification requires a declaration after that merger. All declarations must concern the person who ultimately signs, and that person cannot be the independent officer validating the declaration. Validation can occur internally or externally. The public contract list records signatures without reproducing authority papers.\n\nThe contract was validly signed after a faculty merger. The rector's conflict arose before the project team formed, and the merger happened after that formation. Earlier standing mandates and the rector's pre-conflict declaration are the only authority papers published. The actual signatory and any later documents are not disclosed. No other signature or restoration route existed.",
      "stem": "Which of the following statements is supported by the passage?",
      "options": [
        "The eventual signatory necessarily declared interests after the faculty merger because all valid signature routes depended on the successor dean’s ratification.",
        "The rector could never regain authority for this contract after the conflict arose, making a project delegate the necessary signatory for valid completion.",
        "The validating officer probably worked outside the university because the public contract list omitted the independent ethics finding and any later authority documents.",
        "A disclosure of interests by the person who ultimately signed was made after the rector’s conflict began and was validated by a different person."
      ],
      "answer": 3,
      "hints": [
        "Trace the conditions in both directions; distinguish requirements from sufficient evidence.",
        "Old rector authority is suspended and needs an independent finding plus post-conflict declaration."
      ],
      "optionNotes": [
        "Overstated. Rector or individual delegation can meet earlier bounds without post-merger ratification.",
        "False. An independent ethics finding can restore rector authority.",
        "Not supported. Either validation location is allowed; publication omission identifies neither.",
        "Correct. Rector restoration requires post-conflict declaration; individual delegation requires later post-team declaration; standing delegation requires still-later post-merger declaration."
      ],
      "explanation": "Old rector authority is suspended and needs an independent finding plus post-conflict declaration. Individual delegation needs a post-team declaration. Standing delegation needs post-merger ratification and declaration. Conflict preceded team formation, which preceded merger. All routes force a post-conflict declaration validated by someone other than the signatory."
    },
    {
      "id": "v19-07",
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
      "passage": "A fictional fund approves a heritage purchase through either a listed dealer or a provenance committee. Dealer listing ends on a change of controlling shareholder unless a new financial integrity review is passed. That review must examine beneficial ownership records updated after the control change. A dealer's unchanged trading name does not preserve listing. Public lists sometimes display an old entry while a new review is already effective.\n\nA provenance committee may rely on an owner-chain report or an independent sale-history audit. The report must use beneficial ownership records updated after the most recent transfer of the object. The sale-history audit must use such records updated after the proposed seller acquired the object. An intermediary's earlier records cannot substitute in either route. A committee can commission both forms of evidence, but neither is universally necessary when the other qualifies. Purchase notices need not identify which evidential route supported approval.\n\nThe purchase was validly approved after the dealer's control changed. The seller acquired the object before that change, and the object's most recent transfer occurred on that acquisition. An old dealer-list entry remains visible. The fund has not disclosed any later integrity review or committee evidence. No other purchase or provenance route existed.",
      "stem": "Which of the following statements is supported by the passage?",
      "options": [
        "Updated beneficial ownership records, prepared after the seller acquired the object, supported a new dealer review or the provenance committee’s approval.",
        "The fund necessarily used a new dealer integrity review because the unchanged old list entry excluded both owner-chain reports and independent sale-history audits.",
        "The records necessarily postdated the dealer’s control change even if a provenance committee used qualifying records updated after the earlier acquisition.",
        "The purchase committee used both an owner-chain report and a sale-history audit because neither form of evidence alone could support valid provenance approval."
      ],
      "answer": 0,
      "hints": [
        "Trace the conditions in both directions; distinguish requirements from sufficient evidence.",
        "Old dealer listing cannot suffice after control change."
      ],
      "optionNotes": [
        "Correct. Dealer review requires post-control-change records, which are also post-acquisition; both committee alternatives require post-acquisition records directly.",
        "Overstated. Either committee evidence route remains available.",
        "Overstated. Committee records could fall between acquisition and the later control change.",
        "False. Either committee alternative can qualify alone."
      ],
      "explanation": "Old dealer listing cannot suffice after control change. New dealer review requires later ownership records. That change followed the seller’s acquisition. Both committee alternatives require post-acquisition records directly. All histories share the acquisition lower bound, without identifying the branch or requiring the later control-change bound."
    },
    {
      "id": "v19-08",
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
      "passage": "A fictional broadcaster uses routine clearance for programmes distributed only within its own region. A simultaneous foreign-language feed sent beyond that region makes distribution cross-border even when its intended audience consists of home-region residents abroad. Cross-border release requires either a current reciprocal-service agreement or a technical conformity certificate. Reciprocal agreements name the transmitting legal entity and do not transfer through a merger into a new company.\n\nA conformity certificate covers the encoder configuration tested. Changing the compression module cancels it until a fresh compatibility assessment. An assessment can use a current accredited laboratory or a supervised in-house test. Laboratory accreditation ends on relocation unless restored after a site inspection. The only available laboratory had relocated and had no restoration. In-house supervision requires a supervisor with a current protocol credential. A protocol change invalidates earlier credentials until a practical supplement is passed. Both online and in-person supplement assessments require independent identity verification after the supervisor's latest legal name change.\n\nA programme was validly released with a feed beyond the region after a company merger. Only the predecessor had a reciprocal agreement. The compression module and supervision protocol had changed. The sole supervisor held only a pre-change credential and changed legal name before any supplement assessment. No other agreement, laboratory, supervisor or release route existed.",
      "stem": "Which of the following statements is supported by the passage?",
      "options": [
        "The intended audience’s home-region residence preserved routine clearance even though the simultaneous foreign-language feed was distributed beyond the broadcaster’s region.",
        "The in-house compatibility assessment could qualify only if its supervisor passed a protocol supplement with independently verified identity following the legal name change.",
        "The protocol supplement was assessed online rather than in person because the only available laboratory had relocated without restoration of its accreditation.",
        "The supervisor’s identity was verified after the company merger, rather than earlier but still after the later protocol’s supervising person changed legal name."
      ],
      "answer": 1,
      "hints": [
        "Trace the conditions in both directions; distinguish requirements from sufficient evidence.",
        "Changed engine prevents reliance on old accreditation."
      ],
      "optionNotes": [
        "False. Distribution beyond the region determines cross-border classification, not the audience’s original residence.",
        "Correct. Beyond-region distribution forces cross-border clearance; the predecessor agreement fails, changed encoder needs compatibility assessment, unaccredited laboratory forces supervised testing, and old protocol needs a supplement with post-name-change identity.",
        "Not supported. Either supplement assessment format is allowed.",
        "Overstated. Name change fixes the verification lower bound; its order relative to the merger is not specified."
      ],
      "explanation": "Beyond-region distribution is cross-border despite audience identity. The new company cannot use the predecessor’s reciprocal agreement. A conformity certificate is necessary. The changed compression module requires a fresh compatibility assessment. Unrestored laboratory relocation forces supervised in-house testing. Changed protocol requires a supplement using post-name-change independent identity verification."
    },
    {
      "id": "v19-09",
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
      "passage": "A fictional harbour opens a reconstructed pier through engineering certification or an emergency operating order. Engineering certification requires either an intact design approval or a new load assessment. Design approval ends when the support pattern changes. The new assessment must use a foundation survey performed after that change. A surface photograph does not replace the foundation survey.\n\nAn emergency order requires a safety officer's approval based on a survey after the latest storm or on a new underwater inspection after the order request. Both the storm survey and underwater inspection must examine foundations. Either can be carried out by public staff or an independent contractor, but an inspection of a model alone does not qualify. The emergency order does not require an engineering load assessment if its own evidence conditions are met. Opening notices may omit all underlying survey and inspection records.\n\nThe pier was validly opened after its support pattern changed. The latest storm followed that change, and the emergency request, if used, followed the storm. Its only intact-design approval predated the changed support pattern. The notice does not identify whether engineering certification or an emergency order was used. No other operating or assessment route existed.",
      "stem": "Which of the following statements is supported by the passage?",
      "options": [
        "The foundation examination necessarily followed the storm because both engineering certification and emergency approval depended on the latest storm survey.",
        "The opening required a new engineering load assessment even if a safety officer used an independently qualifying underwater inspection for an emergency order.",
        "Every qualifying engineering or emergency route involved a foundation survey or underwater inspection after the support change; a post-storm examination is not established.",
        "A contractor rather than public staff examined the foundations because the original design approval could not cover the changed support pattern."
      ],
      "answer": 2,
      "hints": [
        "Trace the conditions in both directions; distinguish requirements from sufficient evidence.",
        "Changed supports invalidate the design shortcut."
      ],
      "optionNotes": [
        "Overstated. Engineering survey could precede the later storm.",
        "Overstated. The emergency route need not include a load assessment.",
        "Correct. Engineering evidence follows support change; emergency evidence follows the later storm or still-later request. All histories examine actual foundations after change.",
        "Not supported. Either public or contracted examiners may qualify."
      ],
      "explanation": "Changed supports invalidate the design shortcut. Engineering certification therefore needs a post-change foundation survey. Emergency storm evidence is later than that change. Emergency underwater evidence follows the still-later request. All possible histories examine actual post-change foundations, without universally requiring post-storm timing or a load assessment."
    },
    {
      "id": "v19-10",
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
      "passage": "A fictional patent archive grants restricted access through a current inventor mandate or a recognised estate representative. Inventor mandates end when the patent is assigned to a new legal holder. The new holder can issue a fresh mandate only after its signing officer's identity is independently verified. The verification must occur after the assignment, and the requesting researcher cannot perform it.\n\nAn estate representative qualifies through a current court certificate or a notarial continuity declaration. Both court certificates and continuity declarations become noncurrent after the representative’s legal name changes. A fresh certificate requires independent identity verification after that change. A notarial declaration instead needs independent verification after the notarial request. Both kinds of verifier must be different from the requesting researcher, even if the researcher is legally trained. Public access logs list admitted researchers without reproducing identity records or private mandates.\n\nAccess was validly granted after a patent assignment. The sole possible estate representative changed legal name after the assignment; any notarial request used to support this access followed that change. Earlier inventor mandates and an old court certificate are the only documents publicly visible. The archive does not identify whether a fresh holder mandate or an estate route supported access. No other access route existed.",
      "stem": "Which of the following statements is supported by the passage?",
      "options": [
        "The estate representative necessarily obtained a fresh court certificate because a notarial declaration cannot replace a certificate after a legal name change.",
        "The verified identity probably belonged to the estate representative, even if the new patent holder supplied a fresh mandate through its own signing officer.",
        "The required verification necessarily occurred after the representative’s name change, including a fresh-holder mandate issued between assignment and that later change.",
        "Independent identity verification after assignment was required for the fresh holder mandate or estate representative, by someone other than the requesting researcher."
      ],
      "answer": 3,
      "hints": [
        "Trace the conditions in both directions; distinguish requirements from sufficient evidence.",
        "Assignment invalidates old inventor mandates."
      ],
      "optionNotes": [
        "False. A notarial continuity declaration is an alternative.",
        "Not supported. The mandate route verifies the holder’s officer instead.",
        "Overstated. The mandate route may verify identity before the later name change.",
        "Correct. Fresh-holder mandates require post-assignment verification; estate certificate and notarial histories require still-later verification after name change or request."
      ],
      "explanation": "Assignment invalidates old inventor mandates. A fresh holder mandate needs post-assignment independent identity. The estate’s changed name invalidates the old court certificate. New certificate identity follows the name change; notarial identity follows a later request. All routes imply an independent nonresearcher verification after assignment without identifying whose identity was verified."
    }
  ]
});
