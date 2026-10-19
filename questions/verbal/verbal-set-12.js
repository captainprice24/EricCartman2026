/* Original hand-authored verbal challenge items; reordered for balanced set-level cues. */
EPSO_BANK.registerSet({
  id: "verbal-12",
  section: "verbal",
  title: "Verbal reasoning · Set 12 — Very hard",
  description: "10 original challenging passages on fictional procedures and studies. Linked deductions, exceptions, scope and evidence limits. Timed practice: 17 min 30 sec. Editorial difficulty pending learner calibration.",
  version: 1,
  challenge: true,
  questions: [
    {
      id: "v12-01",
      topic: "Translation-review authority",
      difficulty: 3,
      challenge: true,
      keyType: "inference",
      passage:
        "A fictional translation office marks a text as linguistically approved when both a translator and an independent reviser sign the final version. A subject expert's comments can inform either signatory but cannot replace either signature. Linguistic approval is separate from authorisation to publish, which belongs to the commissioning body.\n\nAny change after the independent revision must be checked again by the reviser before the changed version receives linguistic approval. A translator may correct an obvious typographical error immediately, but the ease of the correction does not waive that recheck. The commissioning body can publish an unapproved version if it accepts responsibility for doing so; this does not retrospectively supply the missing linguistic approval. Last month the office processed 80 revisions and 25 post-revision corrections, without reporting publication outcomes.\n\nThe translator and reviser signed version A on Monday. The translator changed a number on Tuesday to produce version B. On Wednesday the reviser checked and signed B, but the translator expressly withdrew their own signature pending another source check. The commissioning body then authorised publication of B. No additional translator signature or waiver exists. Version A remains unchanged in the archive, and neither signatory withdrew a signature from that archived version. The public notice identifies B as the published text.",
      stem: "Which of the following statements is correct?",
      options: [
        "Every signature on A automatically applies to B once the reviser has checked the changed number and the commissioning body authorises publication.",
        "A retains both signatures; B has a reviser check and publication authorisation but lacks the translator signature needed for approval.",
        "The translator withdrew the signature after finding that the revised number differed from the source used by the subject expert.",
        "B's new reviser signature replaces the translator's withdrawn signature because it concerns the latest version."
      ],
      answer: 1,
      hints: [
        "Identify the exact groups, conditions and dates in the passage.",
        "Derive what the stated facts force before adding a cause, outcome or converse that has not been established."
      ],
      optionNotes: [
        "False. Version-specific approval is expanded into automatic inheritance despite a changed text and express withdrawal.",
        "Correct. A's signatures remain; B lacks one required final-version signature, and publication is a distinct decision.",
        "Not supported. The reason for the pending source check and any comparison with the expert’s source are not reported.",
        "False. Both signatures are required; revision does not replace translation sign-off."
      ],
      explanation: "Combine the case facts with the stated definitions and scope limits. A necessary consequence is different from a plausible explanation or an unreported outcome.",
      reasoning: {
        model: "Version inheritance and withdrawn prerequisites",
        evidence: [
          "both a translator and an independent reviser sign the final version",
          "does not retrospectively supply the missing linguistic approval",
          "translator expressly withdrew their own signature"
        ]
      },
      reviewedAs: "v11-07"
    },
    {
      id: "v12-02",
      topic: "Historical-text edition chains",
      difficulty: 3,
      challenge: true,
      keyType: "inference",
      passage:
        "A fictional manuscript project distinguishes the wording of a text from the dates of the physical copies carrying it. Copies K and L both contain a corrected phrase that is absent from M. The catalogue notes that any copy carrying this correction must descend, directly or indirectly, from an amended exemplar. It does not say that every descendant reproduces every amendment, since scribes sometimes omitted passages.\n\nA separate ownership note appears in K and M but not L. Researchers established that ownership notes could be added independently after copying, so the shared note does not establish a common textual ancestor more recent than the amended exemplar. Physical testing dates K later than M, but supplies no relative date for L. The dating concerns the surviving copies, not necessarily their source texts.\n\nThe team has not found the amended exemplar itself. It has ruled out independent invention of the corrected phrase in K and L for the purpose of this study. The released catalogue gives neither the number of intermediate copies nor a complete copying tree. A printed facsimile of K circulated widely in a later century, but there is no evidence that L or M was copied from that facsimile. The report records the textual correction, ownership marks and physical dates in separate catalogue fields.",
      stem: "Which of the following statements is correct?",
      options: [
        "K and M derive from a later shared textual source than K and L, because only K and M contain the same ownership note.",
        "L was physically produced after M, since it carries the correction that appears in the later surviving copy K.",
        "K and L descend from an amended exemplar; the ownership note and physical dates do not establish a complete copying order.",
        "Every descendant of the amended exemplar must retain the corrected phrase, so M's omission rules out any descent from that textual line."
      ],
      answer: 2,
      hints: [
        "Track the direction of the correction-to-descent implication.",
        "Separate a physical copy's date and later ownership marks from the age of its underlying wording."
      ],
      optionNotes: [
        "Not supported. The ownership note can be added independently and explicitly does not establish that closer textual ancestry.",
        "Not supported. Source-text descent does not determine the physical date of L relative to M.",
        "Correct. Correction implies the shared source line under the exclusion of independent invention; the separate marks and dates do not supply a full tree.",
        "False. A necessary source of an observed correction is turned into mandatory retention by every descendant, despite possible omission."
      ],
      explanation: "Shared derived wording can establish ancestry without establishing a complete genealogy. Do not reverse an implication or transfer dates between an object and its source.",
      reasoning: {
        model: "Directional historical evidence and independent annotations",
        evidence: [
          "any copy carrying this correction must descend",
          "scribes sometimes omitted passages",
          "ownership notes could be added independently",
          "supplies no relative date for L"
        ]
      },
      reviewedAs: "v10-08"
    },
    {
      id: "v12-03",
      topic: "Scientific replication and shared measurement",
      difficulty: 3,
      challenge: true,
      keyType: "inference",
      passage:
        "A fictional research report describes two laboratories that independently repeated a plant-growth experiment. Both found taller plants under treatment than under control. Each laboratory randomised treatment within its own trial and used a coded outcome file, so the analyst did not know which code represented treatment until calculations were complete. The laboratories recruited different plants and worked in different buildings.\n\nBoth laboratories nevertheless calibrated their height sensors using the same reference rod supplied by the treatment manufacturer. The rod was later found to be longer than its stated length. The report does not give the resulting measurement error or say whether it affected treatment and control readings differently. It also does not establish that the sensor calibration produced the observed within-laboratory treatment differences.\n\nA separate manual check found a treatment-control difference in one laboratory, but it covered only a subset of plants selected after the sensor results were known. No selection rule or full-plant manual dataset was released. The manufacturer described the findings as three fully independent confirmations: two laboratory trials and the manual check. The study record establishes the separate trial settings and shared calibration source, but supplies neither a correction of both complete datasets nor a new independently calibrated replication.",
      stem: "Which of the following statements is correct?",
      options: [
        "The two trials have independent plant assignments but share a potential measurement source; the selected manual subset does not supply a fully independent third trial.",
        "The shared rod error affected the treatment measurements more than the control measurements in both laboratories, despite their independent allocation.",
        "Blinded analysis removes any calibration dependence because the analyst could not identify treatment before completing the outcome calculations.",
        "The manufacturer selected the manual subset specifically to conceal a negative treatment effect in the other laboratory's complete dataset."
      ],
      answer: 0,
      hints: [
        "Separate independent allocation and analysis from independent measurement.",
        "Then inspect how the manual subset was selected and whether it constitutes a new trial."
      ],
      optionNotes: [
        "Correct. Different plants/settings and independent assignment do not remove common calibration; the later selected subset is not a separately recruited randomised trial.",
        "Not supported. The direction and relative effects of the measurement error are explicitly not supplied.",
        "False. Masking code identity does not change sensor calibration or its shared origin.",
        "Not supported. No selection motive or negative full-dataset result is given."
      ],
      explanation: "Independence has several dimensions. A common potential bias does not prove an artefact, while a selected remeasurement is not automatically a new independent replication.",
      reasoning: {
        model: "Partial independence and selected corroboration",
        evidence: [
          "independently repeated",
          "same reference rod",
          "does not establish that the sensor calibration produced",
          "subset of plants selected after the sensor results were known"
        ]
      },
      reviewedAs: "v10-17"
    },
    {
      id: "v12-04",
      topic: "Supplier reports with copied assumptions",
      difficulty: 3,
      challenge: true,
      keyType: "inference",
      passage:
        "A fictional district compared a supplier's estimate of fuel savings with an independent consultant's report. The supplier's estimate used a projected reduction in vehicle idling after a new scheduling system. The consultant independently checked the fuel-per-minute coefficient, but took the projected reduction in idling directly from the supplier. Both reports therefore used the same assumed change in idling time.\n\nA fleet log separately recorded fewer total idling minutes after deployment. During the same period, the fleet operated fewer vehicles and completed fewer journeys. The log did not connect journeys before and after deployment, and no per-journey or per-vehicle idling comparison was published. The reports' fuel-saving estimates concerned the change attributable to scheduling, not simply the observed total change in minutes.\n\nThe district circulated a statement describing the consultant's coefficient check and the fleet log as two independent confirmations of the scheduling system's full fuel-saving effect. The consultant's contract covered coefficient validation, not identification of the causal change in idling. The released documents did not show that the projected scheduling reduction matched the observed reduction, nor did they provide a separate comparison group with unchanged scheduling. No report alleged that the supplier's projection was necessarily wrong; the issue was which parts had actually received independent support.",
      stem: "Which of the following statements is correct?",
      options: [
        "The consultant independently established the scheduling-induced change in idling, because a validated fuel coefficient confirms the complete fuel-saving estimate.",
        "The fleet log proves lower idling per journey, since both total idling minutes and the number of completed journeys fell after deployment.",
        "The coefficient has independent support, but neither the shared idling assumption nor the unadjusted fleet total independently identifies the scheduling effect.",
        "The consultant copied every part of the supplier's calculation, so the coefficient check supplied no independent information about any component."
      ],
      answer: 2,
      hints: [
        "Trace each component of the estimate to its own source.",
        "Then separate a change in an aggregate fleet total from the change attributable to scheduling."
      ],
      optionNotes: [
        "Overstated. Independent validation of one coefficient is expanded into validation of the entire causal estimate.",
        "Overstated. Two totals falling do not establish which fell proportionally more or the resulting per-journey ratio.",
        "Correct. Source independence is component-specific; the observed total also changes with fleet activity and is not a scheduling counterfactual.",
        "False. The consultant independently checked the coefficient, even while reusing the idling assumption."
      ],
      explanation: "Independent checking of one factor does not independently verify a product's causal inputs. A falling aggregate also does not determine a unit rate when activity changes.",
      reasoning: {
        model: "Component-specific independence and changing activity bases",
        evidence: [
          "independently checked the fuel-per-minute coefficient",
          "took the projected reduction in idling directly from the supplier",
          "operated fewer vehicles and completed fewer journeys",
          "change attributable to scheduling"
        ]
      },
      reviewedAs: "v10-20"
    },
    {
      id: "v12-05",
      topic: "Consortium voting scopes",
      difficulty: 3,
      challenge: true,
      keyType: "inference",
      passage:
        "A fictional research consortium has twelve member laboratories. Six hold permanent seats on its executive panel, and four of those six supported a proposed data platform. The other six laboratories participate through an annual assembly, whose vote had not yet occurred when the panel published its recommendation. The consortium's rules describe the panel vote as advice to the assembly, not as the consortium's final decision.\n\nThe proposal requires support from at least seven laboratories at the assembly. A laboratory with a permanent panel seat still casts just one assembly vote, and supporting a panel recommendation does not bind it to cast the same vote later. The assembly can amend a proposal before deciding it. Last year three panel recommendations were adopted and two were rejected, but the report supplies no member-by-member voting record for those proposals.\n\nAt the assembly, all six laboratories without permanent panel seats voted against the unchanged platform proposal. The six panel laboratories' assembly ballots have not been released. All twelve members were eligible to vote, the threshold remained seven supporting laboratories and no abstention altered that threshold. A separate amendment had been discussed informally but was not the text put to this assembly vote. The minutes reported the six non-panel votes separately from the earlier advisory panel recommendation.",
      stem: "Which of the following statements is correct?",
      options: [
        "Only the panel laboratories' unreleased ballots can determine whether this unchanged proposal reached seven votes at the assembly.",
        "The four panel supporters must have opposed at the assembly, since all six non-panel laboratories voted against.",
        "The six non-panel laboratories voted against the informal amendment as well as the unchanged proposal, because their assembly votes concerned the platform.",
        "The unchanged proposal cannot pass even if every panel laboratory supports it, regardless of the earlier advisory majority."
      ],
      answer: 3,
      hints: [
        "Identify the exact groups, conditions and dates in the passage.",
        "Derive what the stated facts force before adding a cause, outcome or converse that has not been established."
      ],
      optionNotes: [
        "False. At most six votes remain available from panel laboratories, below seven.",
        "Not supported. Their later individual votes are not disclosed or forced by the others' opposition.",
        "Not supported. Their votes were on the unchanged proposal, not the separately discussed amendment.",
        "Correct. Six opposing non-panel members leave only six potential supporters. Nonbinding earlier votes cannot create a seventh."
      ],
      explanation: "Combine the case facts with the stated definitions and scope limits. A necessary consequence is different from a plausible explanation or an unreported outcome.",
      reasoning: {
        model: "Voting threshold under subgroup bounds",
        evidence: [
          "at least seven laboratories",
          "does not bind it to cast the same vote later",
          "all six laboratories without permanent panel seats voted against"
        ]
      },
      reviewedAs: "v11-02"
    },
    {
      id: "v12-06",
      topic: "Jurisdiction through referral routes",
      difficulty: 3,
      challenge: true,
      keyType: "inference",
      passage:
        "A fictional complaints office receives cases either directly from a resident or through a professional association. A direct filing is admissible only after the resident has first used the service provider's internal complaint procedure. Association referrals instead require the association's certification that at least one affected resident has completed that procedure. Completing the internal procedure does not by itself establish that the office has accepted any filing.\n\nThe office investigates only services delivered inside the district, even when the provider is based elsewhere. A provider's district address cannot bring an outside service within scope. Every referral certificate names the particular service and residents it covers; a certificate concerning one incident does not cover a later incident automatically. The office's bulletin groups direct filings and referrals together as investigations, without identifying their routes.\n\nThe bulletin lists an investigation of a ferry incident involving six residents. It confirms that the office accepted the case under the stated rules, but withholds its route and the provider's address. One of the six residents says she did not use the internal procedure. The bulletin does not identify a lead filer or say whether the other five residents used that procedure. Its map shows the ferry crossing a district boundary, but does not locate the incident itself.",
      stem: "Which of the following statements is correct?",
      options: [
        "Every lawful investigation concerns an in-district service and completion of the relevant internal procedure by at least one affected resident.",
        "The resident's account rules out a lawful association referral, since every resident named in a referral must have completed the internal procedure.",
        "The ferry provider must be based inside the district, because the office accepted an investigation concerning the boundary-crossing service.",
        "The investigation entered through a direct filing by one of the other five residents rather than through an association certificate."
      ],
      answer: 0,
      hints: [
        "Find what both filing routes have in common.",
        "Keep service location, provider address and the number of residents completing a procedure distinct."
      ],
      optionNotes: [
        "Correct. Investigation entails scope; either admissible route needs at least one completed procedure. Association certification need not cover completion by everyone.",
        "False. The association route requires at least one, not every affected resident.",
        "Not supported. Provider address does not determine incident scope.",
        "Not supported. Both routes remain possible on the released facts."
      ],
      explanation: "When an outcome can arise through alternative routes, infer the prerequisites shared by every route rather than selecting an undisclosed route.",
      reasoning: {
        model: "Shared prerequisites across alternative jurisdictions",
        evidence: [
          "direct filing is admissible only after",
          "at least one affected resident has completed",
          "investigates only services delivered inside the district",
          "accepted the case under the stated rules"
        ]
      },
      reviewedAs: "v10-11"
    },
    {
      id: "v12-07",
      topic: "Employment-panel transition bounds",
      difficulty: 3,
      challenge: true,
      keyType: "inference",
      passage:
        "A fictional employment panel followed the same 80 workers over two annual surveys. All 80 answered a binary employed-or-not-employed question in the first year, when 50 were employed. In the second year, 60 answered and 45 of those were employed. The other 20 remained on the panel but gave no second-year answer. No replacement participants were included, and the employment definition was unchanged.\n\nThe released tables contain totals rather than linked individual histories. They therefore do not identify which first-year employees answered again, which workers moved into or out of employment or what the nonrespondents' current status was. The agency counts nonresponse separately; it does not classify a missing answer as unemployment. A proposed report nevertheless treated the five-person fall in recorded employment as five confirmed job losses.\n\nDuring the interval, two local employers expanded while another reduced its workforce. The panel has no employer identifiers and cannot attribute a transition to any of these businesses. The survey organisation retained the original register, so both the size of the full cohort and the fact that second-year respondents came from it are established. The publication supplies no separate evidence showing that all 50 first-year employees remained employed or that the 30 initially non-employed workers remained without work.",
      stem: "Which of the following statements is correct?",
      options: [
        "Exactly five originally employed workers lost employment, because the recorded employed total fell from 50 to 45 within an unchanged cohort.",
        "The full cohort could have more employees despite the recorded fall, but the 45 employed responses cannot include every original employee.",
        "The 45 second-year employed respondents must all have been employed in the first year, because nobody new joined the register.",
        "The employers' expansion explains the employment status of every nonrespondent, even though no employer identifiers were collected for the panel."
      ],
      answer: 1,
      hints: [
        "Separate an employed response count from the employed total in the entire cohort.",
        "Use the 20 unknown statuses and the maximum capacity of the 45 known employed slots."
      ],
      optionNotes: [
        "Overstated. A fall in recorded employees is expanded into exactly five actual losses despite missing answers and possible transitions.",
        "Correct. Up to 20 unknown statuses can add to 45, so more than 50 is possible. The second-year employed count contains 45 places and cannot include all 50 original employees.",
        "Not supported. An unchanged register does not imply unchanged individual employment.",
        "Not supported. The report supplies neither employer identifiers nor the missing employment states, so this complete causal attribution is not established."
      ],
      explanation: "Partial follow-up can permit a higher true total even when a recorded total falls. It can still force limited facts about membership of the observed subgroup.",
      reasoning: {
        model: "Missing-data bounds and subgroup capacity",
        evidence: [
          "50 were employed",
          "45 of those were employed",
          "other 20 remained on the panel but gave no second-year answer",
          "totals rather than linked individual histories"
        ]
      },
      reviewedAs: "v10-10"
    },
    {
      id: "v12-08",
      topic: "Reminder allocation and actual exposure",
      difficulty: 3,
      challenge: true,
      keyType: "inference",
      passage:
        "A fictional clinic randomly assigned consenting patients to a text-reminder policy or an email-reminder policy. The text group had fewer missed appointments. Assignment occurred after consent, and each patient remained in the assigned group for analysis whether or not the message was delivered or read. No patient switched assignment groups. The study did not recruit patients who declined electronic reminders.\n\nDelivery records showed that some emails failed and some texts reached phones whose owners did not open them. Reading could not be measured consistently for either medium. The policies differed in delivery method and in whether the message contained a link to an appointment map: the text policy included that link, while the email policy did not. The clinic did not randomise those two features separately.\n\nThe study retained the same missed-appointment definition for both assigned groups and obtained outcome records for every enrolled patient. The report gave an assignment-based comparison, not a comparison restricted to people known to have read a reminder. A proposed follow-up would randomise map links independently and recruit a broader group. No findings from that follow-up were available. The released records also did not separate the effects of message delivery, actual reading and access to the map within the observed policy difference.",
      stem: "Which of the following statements is correct?",
      options: [
        "The random comparison isolates the effect of reading a text rather than an email, since every enrolled patient's appointment outcome was recorded.",
        "The map link's contribution can be isolated by removing failed deliveries from each assigned group, even though reading was not consistently measured.",
        "The lower missed-appointment rate would persist among patients who declined electronic reminders if the text policy were applied to all of them.",
        "The assigned policies differ in medium and map link; complete outcomes do not isolate reading or either policy component."
      ],
      answer: 3,
      hints: [
        "List what differs between the assigned policies.",
        "Then distinguish complete outcome follow-up from complete knowledge of actual exposure."
      ],
      optionNotes: [
        "Overstated. Assignment-based bundle evidence is expanded into the separate effect of reading one medium.",
        "Overstated. Removing failures neither randomises the map feature independently nor measures reading.",
        "Not supported. The declining group was not studied; transfer of the effect is unestablished.",
        "Correct. The unit of assignment includes medium and map link; delivery and reading are not the analysed exposure groups, and recruitment was selective."
      ],
      explanation: "Random assignment can identify a comparison between bundles without identifying each component or each received exposure. Complete outcomes do not resolve those scope limits.",
      reasoning: {
        model: "Treatment bundles and assignment-versus-exposure inference",
        evidence: [
          "remained in the assigned group for analysis whether or not the message was delivered or read",
          "text policy included that link, while the email policy did not",
          "did not recruit patients who declined electronic reminders"
        ]
      },
      reviewedAs: "v10-12"
    },
    {
      id: "v12-09",
      topic: "Image permissions across revisions",
      difficulty: 3,
      challenge: true,
      keyType: "inference",
      passage:
        "A fictional gallery allows a catalogue image to appear online when the photographer has authorised digital reproduction and the depicted work has cleared the gallery's rights check. The rights check concerns the artwork, not the photograph. Printed catalogues instead require print permission from the photographer, in addition to the same artwork check. Permission for one medium does not include the other.\n\nA permission names a particular photograph. Cropping or changing its colour balance produces a revised image that requires fresh photographer permission for the chosen medium. The artwork check survives such revisions provided that the depicted work is unchanged. A photographer can authorise a revision for print without authorising it online. The gallery published 300 images last season; that total combines original and revised images and gives no permissions by medium.\n\nNera's original photograph of a sculpture has digital permission, and the sculpture has cleared the artwork check. A cropped version shows the same sculpture. The photographer has granted print permission for that crop but has said nothing about digital use of it. The gallery has received no additional permission for the original photograph. Staff are preparing both a web page and a printed catalogue and intend to apply the stated rules without an exception.",
      stem: "Which of the following statements is correct?",
      options: [
        "The cropped image can appear online under the original digital permission, while the original photograph can appear in print under the crop's print permission.",
        "Both images have print permission because the unchanged sculpture passed the artwork check before the photographer authorised the cropped catalogue image.",
        "The photographer would approve digital reproduction of the crop if the gallery submitted a request showing that the sculpture itself remained unchanged.",
        "The original image can go online and the crop can appear in print, while neither permission establishes the other image's authorisation in that medium."
      ],
      answer: 3,
      hints: [
        "Make separate entries for original/crop and digital/print.",
        "Only the artwork check survives the revision automatically."
      ],
      optionNotes: [
        "False. Photographer permissions are image-specific and do not transfer across revision or medium.",
        "False. Artwork clearance does not supply print permission for the original.",
        "Not supported. A future response is not established by the current permissions.",
        "Correct. The original retains digital permission; the crop has print permission; the artwork clearance survives, but the media/image permissions do not transfer."
      ],
      explanation: "Two dimensions of permission must be tracked together. A condition that transfers across image versions does not make a different, version-specific condition transferable.",
      reasoning: {
        model: "Two-dimensional permissions with partial inheritance",
        evidence: [
          "Permission for one medium does not include the other",
          "requires fresh photographer permission for the chosen medium",
          "The artwork check survives such revisions",
          "granted print permission for that crop"
        ]
      },
      reviewedAs: "v10-03"
    },
    {
      id: "v12-10",
      topic: "Reserve-stock reporting",
      difficulty: 3,
      challenge: true,
      keyType: "inference",
      passage:
        "A fictional health network defines usable reserve stock as material that is unexpired, has passed quality release and is not already committed to an appointment. The monthly dashboard reports physical stock separately from usable reserve. Moving a package into the central warehouse changes its location but does not establish quality release or remove an existing commitment.\n\nThe central warehouse received 800 packages at the end of March. Of these, 200 awaited quality release and 300 were committed to April appointments. The report does not state the overlap between those groups or the expiry status of the remaining packages. It states that packages awaiting release cannot be used for appointments, even when already booked. Staff must substitute released stock or reschedule the appointment.\n\nPackage-level checking established that exactly 100 packages were in both the pending-release and committed groups. Of the packages in neither excluded group, 150 were confirmed unexpired. Expiry for the others in that remainder was unresolved. These findings concern the same 800-package delivery, and no package was distributed or newly committed before the reserve snapshot. The controller has not inferred expiry from the absence of a flag and has reported each confirmed condition separately.",
      stem: "Which of the following statements is correct?",
      options: [
        "Usable reserve is bounded between 150 and 400 packages; the known overlap fixes the excluded union but not the remaining expiry status.",
        "The reserve contains exactly 300 packages, because subtracting both excluded totals avoids counting pending commitments as usable stock.",
        "Every one of the 400 packages outside both excluded groups is usable, since pending release and appointment commitments are the only recorded exclusions.",
        "The 150 confirmed unexpired packages were predominantly intended for emergency appointments rather than the already committed April appointments."
      ],
      answer: 0,
      hints: [
        "Identify the exact groups, conditions and dates in the passage.",
        "Derive what the stated facts force before adding a cause, outcome or converse that has not been established."
      ],
      optionNotes: [
        "Correct. The excluded union is 400, leaving 400 released/uncommitted; 150 of that remainder meet the expiry condition, and the rest may or may not.",
        "Overstated. Subtracting 200 and 300 double-counts the known overlap of 100.",
        "Overstated. Satisfaction of two conditions is extended to the third, unresolved expiry condition.",
        "Not supported. No intended emergency-use distribution is supplied."
      ],
      explanation: "Combine the case facts with the stated definitions and scope limits. A necessary consequence is different from a plausible explanation or an unreported outcome.",
      reasoning: {
        model: "Intersecting eligibility conditions and partial bounds",
        evidence: [
          "unexpired, has passed quality release and is not already committed",
          "exactly 100 packages were in both",
          "150 were confirmed unexpired"
        ]
      },
      reviewedAs: "v11-04"
    }
  ]
});
