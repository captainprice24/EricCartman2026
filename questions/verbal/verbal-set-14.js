EPSO_BANK.registerSet({
  "id": "verbal-14",
  "section": "verbal",
  "title": "Verbal reasoning · Set 14 — Very hard",
  "description": "Ten original, demanding inference problems in exam-length passages. Combine dispersed evidence, scope restrictions and alternative explanations. Editorial difficulty; first-attempt calibration pending.",
  "version": 2,
  "challenge": true,
  "questions": [
    {
      "id": "v14-01-c",
      "topic": "Accommodation accreditation",
      "difficulty": 3,
      "challenge": true,
      "keyType": "inference",
      "reasoning": {
        "model": "revoked-route-and-independent-evidence",
        "stages": 5,
        "evidence": [
          "Nine weeks exceeds the six-week limit, so the waiver is unavailable and a current agreement is needed.",
          "The agreement needs valid accommodation clearance.",
          "The unlicensed parent cannot use its subsidiary's licence, so clearance must rest on an approved property.",
          "Conversion cancelled the earlier approval, so a fresh approval was required.",
          "A remote review needs an in-person inspection with no conversion since, so either route required an independent visit after conversion."
        ]
      },
      "passage": "A fictional network issues a badge for an ordinary placement or under a returning-trainee waiver, which requires the previous placement to have ended within six weeks; otherwise a current agreement is needed. An agreement takes effect only while its accommodation clearance is valid. Clearance requires a directly licensed sponsor or an approved property; a parent cannot use its subsidiary's licence. Property approval normally requires an independent verifier's personal inspection. A remote review can replace that visit only if an independent verifier inspected the same building in person within the preceding year and it has not been converted since. Conversion cancels earlier approval and any clearance based on it. The trainee's mentor never counts as independent.\n\nNoor's badge was validly issued nine weeks after her previous placement ended. Her sponsor was an unlicensed parent with a licensed subsidiary. The property was inspected eight months earlier, then converted before her agreement took effect. The public register, which may omit documents, shows no approval or inspection after conversion. No other route exists.",
      "stem": "Which of the following statements is supported by the passage?",
      "options": [
        "Someone other than Noor's mentor inspected the converted property in person.",
        "Noor's sponsor relied on its subsidiary's licence to obtain accommodation clearance.",
        "The verifier who approved the converted property had also made the earlier inspection.",
        "The property's earlier approval had already expired before the building was converted."
      ],
      "answer": 0,
      "hints": [
        "Work out which badge route the nine-week gap leaves, and what that route needs to remain in effect.",
        "Ask which clearance route the sponsor's position excludes, then what the conversion does to the earlier inspection."
      ],
      "optionNotes": [
        "Correct. Nine weeks rules out the waiver, the parent 'cannot use its subsidiary's licence', and conversion 'cancels earlier approval'; a remote review needs an in-person inspection with no conversion since, so both routes required an independent visit after the conversion, and 'the trainee's mentor never counts as independent'.",
        "False. The passage states that 'a parent cannot use its subsidiary's licence'.",
        "Not supported. The passage does not identify who made the earlier inspection or who approved the property afterwards.",
        "Not supported. No expiry of the earlier approval is mentioned; the passage says only that conversion 'cancels earlier approval'."
      ],
      "explanation": "Each route is closed in turn: the gap excludes the waiver, the parent cannot borrow a licence, and conversion cancels the old approval. Because even a remote review depends on an in-person inspection with no conversion since, the valid badge implies an independent visit after the conversion, whatever the public register shows.",
      "supersedes": "v14-01"
    },
    {
      "id": "v14-02-c",
      "topic": "Restoration funding succession",
      "difficulty": 3,
      "challenge": true,
      "keyType": "inference",
      "reasoning": {
        "model": "nested-exceptions-and-consent",
        "stages": 5,
        "evidence": [
          "The change of use ends the inherited eligibility decision.",
          "The partnership had not been formed, so eligibility rests on the listed building.",
          "Roof replacement is not confined to removable furniture, so conservation consent is needed.",
          "The change of use cancelled earlier consent and its supporting report.",
          "Both consent routes require a report from an independent architect."
        ]
      },
      "passage": "A fictional heritage fund pays a restoration grant only to a current custodian with an eligible project. Eligibility comes from a listed building or a research partnership; the partnership route needs a university guarantee, and announcing an intended partnership does not create one. A project on a listed building needs conservation consent unless it is confined to removable furniture. A custodian who inherits a grant may keep the predecessor's eligibility decision only while the project and the building's use are unchanged; converting storage to public exhibition is a change of use even without structural work. A change of use also cancels earlier consent and any supporting report. Consent may follow a site hearing or written consultation; both require a report from an architect independent of the custodian.\n\nThe fund validly paid Elin after she inherited a warehouse grant. Before payment she converted the listed warehouse to public exhibition, and her project replaced its roof. Her proposed university partnership had not been formed. The payment summary lists no report or consent.",
      "stem": "Which of the following statements is supported by the passage?",
      "options": [
        "The proposed university partnership made conservation consent unnecessary for the roof.",
        "Elin's payment depended on a newly written report by an architect independent of her.",
        "The architect who reported on the roof had also advised the warehouse's previous custodian.",
        "Every custodian who inherits a grant must obtain fresh conservation consent for the work."
      ],
      "answer": 1,
      "hints": [
        "Check whether the inherited eligibility decision survives what Elin did to the warehouse.",
        "Then ask whether the roof work falls under the consent requirement, and what the conversion did to any earlier consent."
      ],
      "optionNotes": [
        "False. The partnership 'had not been formed', and 'announcing an intended partnership does not create one'.",
        "Correct. Conversion to exhibition is a change of use, ending the inherited decision and cancelling earlier consent; with no partnership, the listed-building route requires consent for the roof, and both consent routes need an independent architect's report.",
        "Not supported. The passage says nothing about any earlier work by the architect.",
        "Overstated. Elin needed fresh consent because of a change of use; a custodian may keep the predecessor's decision 'while the project and the building's use are unchanged'."
      ],
      "explanation": "The inherited exception is conditional, and Elin's conversion breaks the condition. With the partnership never formed, eligibility rests on the listed building, so the roof needs consent anew, and every consent route depends on an independent architect's report.",
      "supersedes": "v14-02"
    },
    {
      "id": "v14-03-c",
      "topic": "Cross-border archive access",
      "difficulty": 3,
      "challenge": true,
      "keyType": "inference",
      "reasoning": {
        "model": "delegation-revocation-and-alternative-proof",
        "stages": 5,
        "evidence": [
          "The partner archive had not signed the reciprocity schedule, so its clearance could not be accepted.",
          "In liquidation only the liquidator can give permission, so the former director's offer is ineffective.",
          "No permission had been given before liquidation.",
          "Catalogue descriptions are not publication, so the public-interest route needs two external assessors.",
          "Both assessors must have access to the unredacted material."
        ]
      },
      "passage": "A fictional archive permits a restricted-file export when the recipient holds a current research clearance and the export has either the depositor's permission or a public-interest authorisation. A partner archive's clearance is accepted only if that archive has signed the current reciprocity schedule; membership of the wider archive association is no substitute. Once a depositing company is in liquidation, only its appointed liquidator can give fresh permission, and a former director cannot. The public-interest route requires two external assessors, except for files already published in full; publishing a catalogue description is not publication of a file. Both assessors must have access to the unredacted material, and a confidentiality declaration cannot replace that access.\n\nA restricted export to Mara was validly completed after the depositing company entered liquidation. Mara's partner archive had not signed the reciprocity schedule. The former director was the only person offering depositor permission, and none had been given before liquidation. The files had appeared only as catalogue descriptions. No special exemption or other source of permission existed.",
      "stem": "Which of the following statements is supported by the passage?",
      "options": [
        "The former director was able to give valid depositor permission after liquidation had begun.",
        "The two external assessors agreed about the historical value of the unredacted files.",
        "Mara relied on another clearance, and both assessors saw the files without redactions.",
        "Membership of the wider association was enough for Mara's partner clearance to be accepted."
      ],
      "answer": 2,
      "hints": [
        "Treat research clearance and export permission as separate conditions.",
        "Ask which source of permission remains once the company is in liquidation, and whether the files count as published."
      ],
      "optionNotes": [
        "False. In liquidation 'only its appointed liquidator can give fresh permission, and a former director cannot'.",
        "Not supported. The passage requires the assessors' access but says nothing about their views on historical value.",
        "Correct. The unsigned partner's clearance could not be accepted, so Mara's valid clearance came from elsewhere; with no effective permission and only catalogue descriptions published, the export needed two assessors with unredacted access.",
        "False. Association membership 'is no substitute' for signing the reciprocity schedule."
      ],
      "explanation": "The valid export forces both conditions to be met by the routes that remain. The unsigned partner cannot supply the clearance, liquidation silences the former director, and catalogue descriptions do not count as publication, which leaves the two-assessor route with its access requirement.",
      "supersedes": "v14-03"
    },
    {
      "id": "v14-04-c",
      "topic": "Water permit renewal",
      "difficulty": 3,
      "challenge": true,
      "keyType": "inference",
      "reasoning": {
        "model": "continuing-validity-and-two-route-intersection",
        "stages": 5,
        "evidence": [
          "Supplying the nursery excludes the exclusively domestic exemption.",
          "The intake move requires a fresh gauge study.",
          "The broken seal excludes certified-meter assurance.",
          "The manual log needs a second instrument calibrated after the intake move.",
          "That calibration must be independent of the permit holder."
        ]
      },
      "passage": "A fictional basin authority renews an abstraction permit only when flow compliance and meter assurance are both current. Flow compliance follows a recent gauge study or an ecological exemption, which is available only to sites supplying households exclusively; also supplying a commercial nursery disqualifies a site. Gauge studies remain usable for five years, but moving the intake requires a fresh study. Meter assurance requires a certified sealed meter or a verified manual log. A broken seal cancels certification until an independent technician reseals the meter. Manual logs qualify only when checked against a second instrument calibrated after the most recent intake move. Technicians and calibrators must be independent of the permit holder; an employee's technically accurate work does not suffice.\n\nA valid renewal was issued to a site serving homes and a nursery. Its intake had moved two months earlier, after the last study and calibration shown in the online summary, which omits some supporting evidence. The meter seal was still broken at renewal. No exemption or other route applied.",
      "stem": "Which of the following statements is supported by the passage?",
      "options": [
        "Its household customers let the site rely on the ecological exemption despite the nursery.",
        "An employee of the permit holder validly calibrated the second instrument for the log.",
        "The manual log was probably more accurate than the certified sealed meter would have been.",
        "A new gauge study and an independent calibration, both later than the move, were required."
      ],
      "answer": 3,
      "hints": [
        "Check flow compliance and meter assurance separately.",
        "For each, ask what the intake move and the unrepaired seal leave available."
      ],
      "optionNotes": [
        "False. The exemption is 'available only to sites supplying households exclusively', and this site also supplies a nursery.",
        "False. Calibrators 'must be independent of the permit holder', and 'an employee's technically accurate work does not suffice'.",
        "Not supported. The passage makes no comparison of accuracy between logs and meters.",
        "Correct. The nursery excludes the exemption and the move requires 'a fresh study'; the broken seal leaves the manual log, which needs an independent calibration after the 'most recent intake move'."
      ],
      "explanation": "Two conditions must both be current. The nursery closes the exemption, so the intake move forces a fresh study; the broken seal closes the certified meter, so the log needs an independently calibrated instrument dated after the move. The online summary does not show everything, so its silence does not contradict this.",
      "supersedes": "v14-04"
    },
    {
      "id": "v14-05-c",
      "topic": "Competitive award appeals",
      "difficulty": 3,
      "challenge": true,
      "keyType": "inference",
      "reasoning": {
        "model": "inverse-procedure-and-standing",
        "stages": 5,
        "evidence": [
          "The lead body's withdrawal ends consortium recognition, so direct registration is needed.",
          "Delivery to the nominated address counts as service, so a timely objection is needed.",
          "Leto lodged nothing personally.",
          "Bid authority is not enough; the consultant needed explicit appeal authority.",
          "Charity status changes neither the deadline nor the representation rules."
        ]
      },
      "passage": "A fictional awards board hears an appeal only from an eligible applicant with standing. Eligibility comes from direct registration or membership of a recognised consortium. Recognition ends when the consortium's lead body withdraws; former members cannot rely on its old certificate. Standing requires a timely objection unless the applicant was never served the provisional decision. A notice is served when delivered to the nominated address, even if nobody opens it. A timely objection arrives within ten days of service. It may be lodged by the applicant personally or by a representative whose authority covers appeals explicitly; authority to submit the original bid is insufficient. Registered charities may use a simplified form, but this changes neither the deadline nor the representation rules.\n\nThe board accepted Leto's appeal, so these conditions were met. The consortium's lead body had already withdrawn. Notice reached Leto's nominated address fourteen days before acceptance. A consultant acted throughout; Leto lodged nothing personally. Leto is a charity, and the consultant's bid authority is recorded. No exception applied.",
      "stem": "Which of the following statements is supported by the passage?",
      "options": [
        "Leto was registered directly, and an explicitly authorised consultant objected in time.",
        "Leto's charitable status let its consultant object late using the original bid authority.",
        "The consultant objected on the same day that Leto's staff first opened the notice.",
        "The board's acceptance of the appeal meant that the original award was overturned."
      ],
      "answer": 0,
      "hints": [
        "Separate eligibility from standing.",
        "Ask whether the notice was served, and what kind of authority a representative needs."
      ],
      "optionNotes": [
        "Correct. The withdrawal ends consortium recognition, leaving direct registration; delivery means Leto was served, so a timely objection was needed, and the consultant needed authority that 'covers appeals explicitly'.",
        "False. The simplified form 'changes neither the deadline nor the representation rules', and bid authority 'is insufficient'.",
        "Not supported. The passage gives neither the date the notice was opened nor the date of the objection.",
        "Not supported. The passage concerns acceptance of the appeal for hearing, not its outcome."
      ],
      "explanation": "Acceptance under ordinary procedure means every condition was met, so the question is which route remains for each. The withdrawn lead leaves direct registration, delivery removes the unserved-notice exception, and since Leto did nothing personally the consultant must have objected in time with explicit appeal authority.",
      "supersedes": "v14-05"
    },
    {
      "id": "v14-06-c",
      "topic": "Safety recall traceability",
      "difficulty": 3,
      "challenge": true,
      "keyType": "inference",
      "reasoning": {
        "model": "serial-identity-and-exhaustive-alternatives",
        "stages": 5,
        "evidence": [
          "No individual recovery scan existed, so a verified repair was required.",
          "The franchise member lacked accreditation, so a witnessed mobile visit was needed.",
          "A load-test-only video cannot replace attendance.",
          "An independent witness must therefore have attended both the replacement and the load test.",
          "The serial number changed, so the repair record had to match the new number."
        ]
      },
      "passage": "A fictional manufacturer closes a recall case only when every affected device has been recovered or has received a verified repair. Recovery is proved only by a scan of the device's own serial number, not a crate identifier. Repairs qualify through an accredited workshop or an independently witnessed mobile visit. Accreditation belongs to the named workshop, not to every member of its franchise. A mobile witness must see both the component replacement and the final load test. A video can replace attendance only if it shows both stages continuously with a verified timestamp; a clip of the load test alone does not qualify. A controller replacement that changes a device's serial number requires a fresh repair record matching the new number.\n\nOne device's recall case was validly closed after its controller and serial number changed. It stayed at the customer's site, and no individual recovery scan existed. Its repairer was an unaccredited franchise member, and the only video showed the load test. No other route was available.",
      "stem": "Which of the following statements is supported by the passage?",
      "options": [
        "The repairer validly relied on another franchise workshop's accreditation.",
        "An independent witness attended both stages, recorded under the new serial number.",
        "The witness at the repair had also installed the controller that changed the serial.",
        "Every device in the customer's crate had to be repaired before this case was closed."
      ],
      "answer": 1,
      "hints": [
        "Decide first whether the device counts as recovered.",
        "Then ask which repair route the repairer's status and the video leave available."
      ],
      "optionNotes": [
        "False. 'Accreditation belongs to the named workshop, not to every member of its franchise.'",
        "Correct. With no individual scan and no accreditation, the repair had to be an independently witnessed visit; the load-test clip cannot replace attendance, and the changed serial required 'a fresh repair record matching the new number'.",
        "False. The witness had to be independent, so the person who installed the controller could not also act as the witness.",
        "Not supported. Closure requires every 'affected device' to be dealt with; the passage does not extend this to every device sharing a crate."
      ],
      "explanation": "Each alternative is closed by a stated fact: no individual scan, no accreditation, an incomplete video. What remains is an independent witness present at both stages, and the serial change means the record must carry the new number.",
      "supersedes": "v14-06"
    },
    {
      "id": "v14-07-c",
      "topic": "Protected collection loans",
      "difficulty": 3,
      "challenge": true,
      "keyType": "inference",
      "reasoning": {
        "model": "ownership-scope-and-expiring-waiver",
        "stages": 5,
        "evidence": [
          "Joint ownership excludes the state guarantee.",
          "The earlier policy excluded the destination, so other adequate borrower insurance was needed.",
          "The lapsed storage licence suspended carrier accreditation.",
          "Travel across two cities excludes the one-city exception, so two escorts were needed.",
          "Both escorts had to train after the latest packing standard."
        ]
      },
      "passage": "A fictional collection lends a protected object only when insurance and transport approval are current. Insurance may come from the borrower or a state guarantee, which covers only objects wholly owned by the collection; a majority share in a jointly owned object is not enough. An earlier borrower policy remains acceptable only if its territory and value limits cover the journey. Transport approval requires an accredited carrier or an approved escort plan. Carrier accreditation is suspended whenever the carrier's controlled-storage licence lapses. An escort plan needs two trained escorts unless the object travels entirely within one city, and both must have trained after the latest packing standard was introduced. The collection's newsletter does not publish every authorisation or insurance document.\n\nA jointly owned object was validly lent across two cities. The carrier's storage licence had lapsed and was still lapsed at departure. The borrower's earlier policy excluded the destination territory. The newsletter names one trained staff member but mentions no policy or second escort. No special route applied.",
      "stem": "Which of the following statements is supported by the passage?",
      "options": [
        "The collection's larger ownership share brought the object within the state guarantee.",
        "The second escort was more experienced than the trained staff member named in the newsletter.",
        "Adequate borrower cover and two escorts trained since the latest standard were required.",
        "The new borrower policy cost more because the intercity journey required two escorts."
      ],
      "answer": 2,
      "hints": [
        "Treat insurance and transport approval as separate conditions.",
        "For each exception, check the ownership or journey scope it is limited to."
      ],
      "optionNotes": [
        "False. The guarantee covers 'only objects wholly owned by the collection', and 'a majority share in a jointly owned object is not enough'.",
        "Not supported. The passage gives no comparison of the escorts' experience.",
        "Correct. Joint ownership excludes the guarantee and the old policy fails on territory; the suspended carrier and intercity route leave an escort plan with two escorts trained 'after the latest packing standard'.",
        "Not supported. The passage gives no premium or reason for one."
      ],
      "explanation": "Each exception is limited in scope: the guarantee to wholly owned objects, the old policy to its territory, the single-escort plan to one city. The lapsed licence removes the carrier, so the valid loan implies other borrower cover and two escorts trained after the latest standard, even though the newsletter does not mention them.",
      "supersedes": "v14-07"
    },
    {
      "id": "v14-08-c",
      "topic": "Laboratory release authority",
      "difficulty": 3,
      "challenge": true,
      "keyType": "inference",
      "reasoning": {
        "model": "validity-at-event-and-converging-paths",
        "stages": 5,
        "evidence": [
          "The seal broken on arrival excludes the external certificate.",
          "No validated manual method exists, so a calibrated instrument was needed.",
          "The detector replacement cancelled the earlier calibration.",
          "Either fresh-calibration route needs a reference certified after installation.",
          "The deputy needs a separate current release authorisation."
        ]
      },
      "passage": "A fictional laboratory releases a batch only with valid analytical evidence and an authorised signatory. Evidence may be a local assay or a recognised external certificate. An external certificate loses recognition if the sample's seal is broken before receipt, even if a photograph shows the parcel sealed at dispatch. A local assay must use a calibrated instrument unless a validated manual method exists for the substance. A detector replacement cancels calibration. Fresh calibration, in-house or external, requires a reference sample certified after the detector's installation. A deputy may sign while the usual signatory is absent, but only if the deputy's own release authorisation is current; seniority or a general laboratory-access pass cannot substitute.\n\nA batch was assayed and validly released after its detector was replaced. The external sample arrived with a broken seal, and no validated manual method existed. The usual signatory was absent, and deputy Anik signed. The public record, which need not show supporting documents, gives only the batch number, result and Anik's name.",
      "stem": "Which of the following statements is supported by the passage?",
      "options": [
        "Anik's general laboratory-access pass stood in for a release authorisation.",
        "A photograph of the sealed parcel at dispatch kept the external certificate recognised.",
        "The new detector gave more precise assay results than the instrument it replaced.",
        "Anik held current authority, and the new calibration used a post-installation reference."
      ],
      "answer": 3,
      "hints": [
        "Check analytical evidence and signing authority separately.",
        "Ask what the broken seal and the detector replacement each rule out."
      ],
      "optionNotes": [
        "False. 'Seniority or a general laboratory-access pass cannot substitute' for the deputy's own authorisation.",
        "False. Recognition is lost if the seal is broken before receipt, 'even if a photograph shows the parcel sealed at dispatch'.",
        "Not supported. The passage gives no comparison of precision.",
        "Correct. The broken seal and the absence of a manual method leave a calibrated local assay; the replacement cancels the old calibration, so a reference certified 'after the detector's installation' was needed, and Anik needed a current authorisation."
      ],
      "explanation": "The valid release forces both conditions. The external and manual routes fail, so the assay used a freshly calibrated instrument, which requires a post-installation reference; the deputy's signature is valid only with a current authorisation of the deputy's own. The sparse public record does not contradict either inference.",
      "supersedes": "v14-08"
    },
    {
      "id": "v14-09-c",
      "topic": "Procurement standstill exceptions",
      "difficulty": 3,
      "challenge": true,
      "keyType": "inference",
      "reasoning": {
        "model": "quantifier-scope-and-authorisation-chain",
        "stages": 5,
        "evidence": [
          "Financial loss cannot support the urgency exception, so the standstill applied.",
          "Every unsuccessful bidder needed an effective individual notice.",
          "The portal gave no acknowledgment, so electronic delivery failed.",
          "The former director could sign for post only if the administrator had reappointed them.",
          "The standstill begins after the last effective individual delivery."
        ]
      },
      "passage": "A fictional procurement unit signs a contract only after a standstill period, unless an independent reviewer certifies that delay creates immediate physical danger; financial loss alone cannot qualify. Signature then requires proof that every unsuccessful bidder received an individual notice; a notice on the unit's website does not count. Notices may be delivered electronically or by registered post. Electronic delivery is effective only once the bidder's designated portal acknowledges receipt; an outgoing-message log is insufficient. Registered delivery requires a receipt signed by the bidder or its authorised mail agent. Former directors of a bidder in administration stop being authorised mail agents unless the administrator appoints them again. The standstill begins after the last effective individual delivery, not the first dispatch.\n\nA contract was validly signed. Delay threatened financial loss but no physical danger, and no reviewer certified any. One unsuccessful bidder was in administration; its portal issued no acknowledgment, and a former director signed its postal receipt. The public summary records no reappointment. No other route existed.",
      "stem": "Which of the following statements is supported by the passage?",
      "options": [
        "The former director was reappointed, and the standstill started after that delivery.",
        "The standstill period began when the unit posted its notice on its own website.",
        "The administrator probably reappointed the director on the day the notice was posted.",
        "An independent reviewer certified that the financial losses posed a physical danger."
      ],
      "answer": 0,
      "hints": [
        "Start by deciding whether the standstill could be waived.",
        "Then follow the notice to the bidder in administration through each delivery method."
      ],
      "optionNotes": [
        "Correct. Financial loss cannot waive the standstill and the portal never acknowledged receipt, so delivery was by post, valid only if the administrator appointed the director again; the standstill 'begins after the last effective individual delivery'.",
        "False. A website notice 'does not count', and the standstill begins after the last effective individual delivery.",
        "Not supported. The passage gives no date for any reappointment.",
        "False. The passage states that 'no reviewer certified any' physical danger."
      ],
      "explanation": "With urgency excluded, every bidder needed an effective individual notice. The silent portal leaves registered post, and a former director can sign only after reappointment, so the valid signature implies that reappointment, missing from the public summary, and a standstill running from that delivery.",
      "supersedes": "v14-09"
    },
    {
      "id": "v14-10-c",
      "topic": "Source-code escrow access",
      "difficulty": 3,
      "challenge": true,
      "keyType": "inference",
      "reasoning": {
        "model": "exhaustive-defaults-and-condition-renewal",
        "stages": 5,
        "evidence": [
          "A six-day outage cannot meet the more-than-seven-day trigger.",
          "Verified insolvency must therefore supply the trigger.",
          "The pending payment means the subscription was not renewed.",
          "The surviving clause needs the final contract deposited before termination.",
          "The change of legal form requires the new board to ratify Veda's delegation."
        ]
      },
      "passage": "A fictional software escrow agent releases source code only after a verified trigger and a valid beneficiary request. A trigger is either verified supplier insolvency or a service outage of more than seven consecutive days; planned maintenance does not count towards the duration. A request requires a current subscription or a surviving perpetual-access clause. The clause survives termination only if the beneficiary deposited the final contract version, not a draft, before termination. Renewal takes effect only once payment clears; a pending transfer is not payment. Requests may be signed by a director or a delegated officer, but a delegation expires when the company changes legal form unless the new board ratifies it afterwards.\n\nThe agent validly released code to a company that had changed legal form. Its subscription had expired, and the renewal payment was still pending. Officer Veda signed under a delegation given before the change. The only outage lasted six days excluding maintenance. The public release record lists no deposit or ratification. No other route applied.",
      "stem": "Which of the following statements is supported by the passage?",
      "options": [
        "The outage met the trigger once the planned maintenance time was added to its length.",
        "Release required insolvency, a timely final-contract deposit and a ratified delegation.",
        "The new board ratified Veda's delegation before the supplier's insolvency was confirmed.",
        "The supplier became insolvent because of the six-day outage that affected the service."
      ],
      "answer": 1,
      "hints": [
        "Separate the trigger, the beneficiary's entitlement and the signing authority.",
        "For each, ask which route the stated facts leave open."
      ],
      "optionNotes": [
        "False. 'Planned maintenance does not count towards the duration.'",
        "Correct. Six days cannot meet the outage trigger, a pending transfer 'is not payment', and the change of legal form ends the delegation unless the new board ratifies it; so release required insolvency, the final-version deposit and ratification.",
        "Not supported. The passage gives no order for the ratification and the insolvency confirmation.",
        "Not supported. No cause of the insolvency is stated."
      ],
      "explanation": "Three separate conditions each have one route left. The short outage leaves insolvency, the unpaid renewal leaves the perpetual-access clause with its deposit condition, and the change of legal form leaves only a ratified delegation. The public record's silence does not contradict these necessary conditions.",
      "supersedes": "v14-10"
    }
  ]
});
