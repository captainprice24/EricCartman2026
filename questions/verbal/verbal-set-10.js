/* Original hand-authored verbal challenge items; reordered for balanced set-level cues. */
EPSO_BANK.registerSet({
  id: "verbal-10",
  section: "verbal",
  title: "Verbal reasoning · Set 10 — Very hard",
  description: "10 original challenging passages on fictional procedures and studies. Linked deductions, exceptions, scope and evidence limits. Timed practice: 17 min 30 sec. Editorial difficulty pending learner calibration.",
  version: 1,
  challenge: true,
  questions: [
    {
      id: "v10-01",
      topic: "Open-call eligibility transitions",
      difficulty: 3,
      challenge: true,
      keyType: "inference",
      passage:
        "A fictional arts council offers a development call and a production call. The development call admits projects without a completed script. The production call requires a completed script and a confirmed venue. Receiving development support does not waive either production requirement. Applicants can seek both forms of support in different rounds, subject to the conditions of the round they enter.\n\nA venue confirmation must cover the proposed performance dates. An earlier confirmation for another season is not sufficient. The council can extend a submission deadline following a documented technical failure, but an extension does not move the planned performance dates or convert an expired venue confirmation into a current one. The latest production round attracted 48 applications, while 20 projects had received development support in an earlier round. No overlap was reported.\n\nThe group obtains a new venue letter covering autumn, but it names an indoor hall rather than the outdoor site specified in the production proposal. The council's rules require the confirmed venue to be the proposed venue. Changing the proposal's site counts as a substantive revision, permitted only before the submission deadline. The granted extension concerns uploading existing documents and expressly excludes substantive revisions. No separate revision permission has been issued. The script is complete, and the old spring letter still names the originally proposed outdoor site.",
      stem: "Which of the following statements is correct?",
      options: [
        "Neither letter supplies all required venue-and-date conditions, and the upload extension does not authorise changing the proposed site.",
        "Development support permits the indoor substitution even after the deadline because the completed script remains the same in both proposed venues.",
        "The two letters jointly confirm the proposed autumn event: one has the right site and the other the right dates.",
        "The council will issue substantive-revision permission because the indoor hall has lower production costs than the original outdoor site."
      ],
      answer: 0,
      hints: [
        "Identify the exact groups, conditions and dates in the passage.",
        "Derive what the stated facts force before adding a cause, outcome or converse that has not been established."
      ],
      optionNotes: [
        "Correct. The original letter has wrong dates and the new letter a different site; the procedural extension does not authorise the site revision.",
        "False. The earlier award waives no later requirements, including substantive revision limits.",
        "False. One document must confirm the proposed venue and dates together; the two mismatched letters do not supply that combination.",
        "Not supported. No cost comparison or future decision is reported."
      ],
      explanation: "Combine the case facts with the stated definitions and scope limits. A necessary consequence is different from a plausible explanation or an unreported outcome.",
      reasoning: {
        model: "Conjunctive document scope and limited procedural extension",
        evidence: [
          "must cover the proposed performance dates",
          "confirmed venue to be the proposed venue",
          "extension concerns uploading existing documents and expressly excludes substantive revisions"
        ]
      },
      reviewedAs: "v11-15"
    },
    {
      id: "v10-02",
      topic: "Community-energy benefit boundaries",
      difficulty: 3,
      challenge: true,
      keyType: "inference",
      passage:
        "A fictional energy cooperative offered members a reduced tariff for electricity bought from the cooperative. It also paid a year-end rebate when the annual accounts showed a surplus. The tariff reduction did not depend on a surplus, and the rebate was not guaranteed. Membership required a share contribution that could be returned on exit, subject to the cooperative's published repayment schedule.\n\nAn evaluation compared members' bills with a standard tariff for the same consumption. It found savings during the observed year. The comparison excluded share contributions, repayments, rebates and changes in household consumption after joining. It therefore measured a tariff difference on a fixed consumption basis, not a complete return on membership. The cooperative had 320 members, of whom 180 supplied usable bill information.\n\nA member's fixed-consumption tariff saving is EUR 90. The member paid a EUR 120 share contribution and received no rebate during the same year. The share remains eligible for repayment on exit under the schedule, but no exit or repayment occurred. The member's actual consumption changed after joining, and no bill comparison at that changed consumption has been published. The evaluation treats tariff comparisons, membership cash movements and potential future repayments as separate entries rather than netting them into one number.",
      stem: "Which of the following statements is correct?",
      options: [
        "The member's overall annual gain was EUR 90 because a repayable share contribution is not a cash payment in the year of joining.",
        "The member will recover the contribution before the next annual bill because eligibility for repayment fixes the timing of an exit.",
        "The member's actual annual electricity bill fell by EUR 90 after joining, because that was the measured saving under the fixed-consumption comparison.",
        "Fixed-use savings and membership cash flows do not determine the actual overall gain without a comparison at the changed consumption."
      ],
      answer: 3,
      hints: [
        "Identify the exact groups, conditions and dates in the passage.",
        "Derive what the stated facts force before adding a cause, outcome or converse that has not been established."
      ],
      optionNotes: [
        "False. The share was paid during the year; potential repayment does not erase that cash movement or establish the all-in gain.",
        "Not supported. No exit or future repayment date is established.",
        "Overstated. A fixed-consumption counterfactual does not establish the actual bill movement when consumption changed.",
        "Correct. The tariff measure freezes consumption while actual use changed; the contribution and no rebate are known, but a full observed bill counterfactual is not."
      ],
      explanation: "Combine the case facts with the stated definitions and scope limits. A necessary consequence is different from a plausible explanation or an unreported outcome.",
      reasoning: {
        model: "Fixed-consumption comparison versus actual cash-flow return",
        evidence: [
          "same consumption",
          "excluded share contributions, repayments, rebates",
          "actual consumption changed after joining"
        ]
      },
      reviewedAs: "v11-16"
    },
    {
      id: "v10-03",
      topic: "Citizen-panel replacement rules",
      difficulty: 3,
      challenge: true,
      keyType: "inference",
      passage:
        "A fictional citizen panel recruits by drawing invitations from a resident register. Invitees can decline. Seats vacated after the first meeting are filled from a reserve list containing people who accepted the original invitation but were not initially seated. The reserve list is not a fresh random sample of the whole register. The programme distinguishes random invitation from voluntary participation.\n\nThe first panel had 30 members, and six were replaced during the year. Replacements matched the departing members' age bands, but no matching was required for employment, education or political views. The published evaluation found the final panel's age distribution close to that of the district. It did not measure how those invited but declining differed in their views from those who participated.\n\nA follow-up summary confirms that all six replacements had different employment statuses from the members they replaced, although each matched the departing member's age band. It gives no direction for those changes or district-wide employment distribution. The invitation draw and voluntary acceptance rules remained unchanged. The evaluation again found close age balance. The council now has to distinguish what the replacement records establish about age continuity, what changed on another characteristic, and what remains unknown about representativeness of the whole panel.",
      stem: "Which of the following statements is correct?",
      options: [
        "The final panel had more employed members than the initial panel because all six replacements changed the employment status recorded for their seats.",
        "The final panel's close age distribution establishes that the six employment-status changes moved it closer to the district's employment distribution.",
        "Age bands were preserved and employment status changed in every replaced seat; population employment balance remains unresolved.",
        "All six replacements came from newly randomised district samples, because matching the age of departing members required refreshing the reserve list."
      ],
      answer: 2,
      hints: [
        "Identify the exact groups, conditions and dates in the passage.",
        "Derive what the stated facts force before adding a cause, outcome or converse that has not been established."
      ],
      optionNotes: [
        "Not supported. The directions of those employment changes are not supplied.",
        "Overstated. No district employment benchmark or direction of seat changes is given.",
        "Correct. Age matching and employment changes are recorded, but their direction, benchmark and selection implications remain unresolved.",
        "False. The reserve list is explicitly not a fresh random population sample."
      ],
      explanation: "Combine the case facts with the stated definitions and scope limits. A necessary consequence is different from a plausible explanation or an unreported outcome.",
      reasoning: {
        model: "Preserved margins versus changed unmeasured composition",
        evidence: [
          "matched the departing members' age bands",
          "reserve list is not a fresh random sample",
          "all six replacements had different employment statuses",
          "no direction for those changes or district-wide employment distribution"
        ]
      },
      reviewedAs: "v11-12"
    },
    {
      id: "v10-04",
      topic: "Paired survey classification changes",
      difficulty: 3,
      challenge: true,
      keyType: "inference",
      passage:
        "A fictional consumer agency classified the same set of 120 products under two labelling schemes. Under the old scheme, a product received a blue label if and only if it met the material-recovery threshold. Under the new scheme, a product receives blue if and only if it meets that same threshold and has a verified repair service. Product performance and service arrangements did not change between the two classifications; the agency applied both rules to one frozen dataset.\n\nThe old scheme produced 70 blue labels and the new scheme 44. The agency confirmed that all 120 records were complete for both criteria and that no discretionary exceptions or recording errors affected the results. The report supplied no company names and no distribution of repair services among products below the recovery threshold. It counted products, not manufacturers.\n\nThe exercise was designed to examine the consequences of combining two criteria. Separate policy discussions concerned whether the new label would influence future design or demand, but no later behaviour was observed in this dataset. Several manufacturers supplied multiple products. The published figures did not identify which manufacturers lost a label, whether any manufacturer lost every label or whether recovery performance differed between products retaining blue and products losing it beyond their common satisfaction of the old threshold.",
      stem: "Which of the following statements is correct?",
      options: [
        "The 26 lost blue labels establish a deterioration in the products' recovery performance between the two classifications.",
        "The products losing blue were concentrated among manufacturers without any other product retaining a label under the new scheme.",
        "Manufacturers whose products retained blue increased their prices after the new scheme introduced an additional service criterion.",
        "Some recovery-qualified products lacked repair verification, but product totals do not identify complete manufacturer-level label losses."
      ],
      answer: 3,
      hints: [
        "Use the frozen dataset to exclude changes in the products themselves.",
        "Then identify what the difference between the nested blue-label groups forces, and keep products distinct from manufacturers."
      ],
      optionNotes: [
        "False. The same frozen records were reclassified with no performance change.",
        "Not supported. The report supplies no manufacturer-level distribution and therefore does not establish this concentration.",
        "Not supported. No later pricing behaviour was observed.",
        "Correct. The 26 products passing old but not new must fail the additional criterion; product totals do not map complete label losses to companies."
      ],
      explanation: "Nested classifications over unchanged complete data can establish which added condition excluded a subgroup. They do not identify an unreported higher-level distribution or future effects.",
      reasoning: {
        model: "Nested sets on fixed data with unit-of-analysis limits",
        evidence: [
          "same set of 120 products",
          "if and only if it meets that same threshold and has a verified repair service",
          "old scheme produced 70 blue labels and the new scheme 44",
          "It counted products, not manufacturers"
        ]
      },
      reviewedAs: "v10-14"
    },
    {
      id: "v10-05",
      topic: "Embargo release through competing routes",
      difficulty: 3,
      challenge: true,
      keyType: "inference",
      passage:
        "A fictional laboratory embargoes a technical report until either twelve months have passed after deposit or the sponsor issues an early-release authorisation. Reports containing personal records additionally require a privacy clearance, whichever embargo route applies. A report's public abstract contains no personal records and can be posted independently; posting it does not establish that the full report is releasable.\n\nA sponsor authorisation names a specific report version. Changing an appendix creates a new version requiring a fresh early-release decision, but does not restart the ordinary twelve-month period when the main report is unchanged. Privacy clearance survives such an appendix change only if no additional personal fields are introduced. An internal review can confirm this fact, but an author cannot assume it from using the same participants.\n\nReport Pine was deposited fourteen months ago and its original version received privacy clearance. Its appendix has since been revised with no new personal fields, as confirmed by internal review. Report Cedar was deposited eight months ago. It received early-release authorisation for its original version and then gained an appendix containing additional personal fields. No new privacy clearance or version-specific sponsor authorisation has been issued for Cedar. Both main reports remain unchanged, and their public abstracts have already been posted.",
      stem: "Which of the following statements is correct?",
      options: [
        "Cedar's original early-release authorisation transfers to the new appendix because the report's participants and main text remain the same.",
        "Only Pine's revised full report meets the stated release conditions; Cedar's posted abstract does not replace either revised-version clearance.",
        "Every appendix change restarts the twelve-month embargo, so Pine requires a new sponsor decision despite its unchanged main report.",
        "Cedar's new personal fields were included at the sponsor's request, explaining why no separate privacy clearance was required for the original version."
      ],
      answer: 1,
      hints: [
        "Track elapsed-time and early-release routes separately for each version.",
        "Then apply the independent privacy-clearance survival condition."
      ],
      optionNotes: [
        "False. Early authorisation is version-specific, and additional fields also prevent privacy-clearance survival.",
        "Correct. Pine meets the elapsed-time route and carries forward privacy clearance under the confirmed no-new-fields condition. Cedar has neither a current version-specific early-release authorisation nor surviving privacy clearance.",
        "False. The charter explicitly states that an appendix change does not restart the clock when the main report is unchanged.",
        "Not supported. The new fields’ source and motive are unreported, and original privacy requirements do not follow from a sponsor request."
      ],
      explanation: "A revision can leave one time-based route intact while invalidating a version-specific permission or independent clearance. Public abstracts do not prove full-report release rights.",
      reasoning: {
        model: "Competing temporal routes with conditional clearance inheritance",
        evidence: [
          "either twelve months have passed after deposit or the sponsor issues an early-release authorisation",
          "whichever embargo route applies",
          "does not restart the ordinary twelve-month period",
          "only if no additional personal fields are introduced"
        ]
      },
      reviewedAs: "v11-20"
    },
    {
      id: "v10-06",
      topic: "Recycling denominator changes",
      difficulty: 3,
      challenge: true,
      keyType: "inference",
      passage:
        "A fictional town reported that its recycling rate rose from 40% to 48%. The rate was defined as recycled household waste divided by all household waste collected. Commercial waste was recorded separately. The town did not release the absolute household-waste totals alongside the two percentages. It also changed collection routes, but kept the stated rate definition unchanged.\n\nDuring the later year, residents were encouraged to avoid food waste and reuse packaging. These measures could reduce the denominator as well as the amount sent for disposal. A separate scheme collected more commercial cardboard, but those loads were excluded from both the numerator and denominator of the household rate. The council supplied no estimate of how much either household prevention measure had changed total collected waste.\n\nThe town later confirmed that collected household-waste tonnage in the second year was exactly half the first year's tonnage. It supplied no division of that reduction between prevention, changing household numbers or other causes. The two household recycling percentages remained 40% and 48%, and neither definition included commercial cardboard. No further correction to the tonnage or percentage figures was announced. The statistician is comparing the implied amounts rather than evaluating which policy produced the reduction in the household denominator.",
      stem: "Which of the following statements is correct?",
      options: [
        "Household recycled tonnage fell despite the higher share; neither that calculation nor excluded cardboard identifies its policy cause.",
        "The increased commercial cardboard explains the household recycling share once the household collection total is known to have halved.",
        "Every household recycled a smaller quantity, because the town's total collected waste halved while the reported recycling rate increased.",
        "The food-waste campaign generated more than half of the reduction in collected household waste, since it addressed one component of the denominator."
      ],
      answer: 0,
      hints: [
        "Identify the exact groups, conditions and dates in the passage.",
        "Derive what the stated facts force before adding a cause, outcome or converse that has not been established."
      ],
      optionNotes: [
        "Correct. The later amount is 48% of half the old denominator, below 40% of the old denominator; causes are not decomposed.",
        "False. Commercial material remains excluded from both terms of the household share.",
        "Overstated. An aggregate decline is extended to every household despite no household-level quantities.",
        "Not supported. No causal shares are given."
      ],
      explanation: "Combine the case facts with the stated definitions and scope limits. A necessary consequence is different from a plausible explanation or an unreported outcome.",
      reasoning: {
        model: "Share reversal with a known changing base",
        evidence: [
          "40% to 48%",
          "Commercial waste was recorded separately",
          "exactly half the first year's tonnage"
        ]
      },
      reviewedAs: "v11-08"
    },
    {
      id: "v10-07",
      topic: "Inspection waivers and certification classes",
      difficulty: 3,
      challenge: true,
      keyType: "inference",
      passage:
        "A fictional packaging standard recognises three certification classes. All class P products have passed a pressure test. A pressure-tested product receives a transport waiver only if its seal has also passed an independent check. Class Q registration, by contrast, concerns the maker's reporting system and says nothing about either test. Products can hold more than one class at once.\n\nNo product containing liquid can use the ordinary paperwork-only waiver route. Other products can obtain such a waiver without pressure testing if their paperwork is complete. The register records that a product has a waiver, but does not identify the route used. It records certification classes separately, and the absence of a class Q entry is not evidence that testing failed. The authority registered 90 products in the latest quarter, with overlapping categories.\n\nProduct Pine contains liquid and has an ordinary transport waiver valid for its present shipment. The authority confirms that the waiver was granted through one of the stated routes, with no special dispensation. Pine's class P and Q fields have not been published. Product Cedar is known to hold class P and class Q, but no seal-check finding or waiver decision for Cedar has been released. Both products have completed the maker's internal inspection, a procedure separate from the independent seal check.",
      stem: "Which of the following statements is correct?",
      options: [
        "Cedar's two published classes establish the independent seal check, so its waiver status can be inferred without a separate decision.",
        "Pine's waiver entails both tests; Cedar's two classes establish pressure testing and reporting, but do not establish its waiver.",
        "Every waived product is pressure-tested, since the paperwork-only route is unavailable for the liquid carried in Pine's shipment.",
        "Pine cannot hold class Q because its waiver depended on testing rather than the maker's reporting system."
      ],
      answer: 1,
      hints: [
        "Eliminate the waiver route that Pine's contents make unavailable.",
        "For Cedar, ask what each class establishes and what the waiver still needs."
      ],
      optionNotes: [
        "Overstated. Class P establishes pressure testing and Q reporting, not the seal result or a granted waiver.",
        "Correct. Liquid excludes the paperwork route, so Pine's waiver entails the tested route and its seal prerequisite. Cedar's classes establish no waiver decision.",
        "Overstated. The route exclusion for liquid is extended to all products.",
        "False. The rules expressly allow overlapping classes; test-based waiver status does not bar Q."
      ],
      explanation: "The same published status can have alternative routes, but case facts can eliminate one. Overlapping certification classes must not be treated as mutually exclusive.",
      reasoning: {
        model: "Route elimination and nonexclusive classifications",
        evidence: [
          "receives a transport waiver only if its seal has also passed an independent check",
          "No product containing liquid can use the ordinary paperwork-only waiver route",
          "Products can hold more than one class at once",
          "Pine contains liquid and has an ordinary transport waiver"
        ]
      },
      reviewedAs: "v10-07"
    },
    {
      id: "v10-08",
      topic: "Performance aggregates across case types",
      difficulty: 3,
      challenge: true,
      keyType: "inference",
      passage:
        "A fictional tribunal publishes average completion times for routine and complex cases. Team Birch averaged four weeks for routine cases and twelve for complex ones. Team Alder averaged five weeks and thirteen weeks respectively. Both teams used the same two exhaustive case categories, and every completed case belonged to exactly one category. No cases of other types entered the overall averages.\n\nThe published overall average was ten weeks for Birch and eight for Alder. Each overall average was calculated across individual completed cases, so a category containing more cases received more weight. The report did not disclose category counts. The category definitions and averages were checked, and the authority confirmed that there had been no calculation or transcription error.\n\nAn administrator proposed comparing the teams after assigning the same routine/complex weights to both. A staffing discussion also considered whether case allocation rather than within-category speed explained the observed overall ranking. No causal experiment changed staffing or allocated cases at random. The report did not establish why either team received its mix, whether cases within a category were equally difficult or what either team's times would be under a different workload. It did establish that the two stated category means and the two overall means all referred to the same completed-case period.",
      stem: "Which of the following statements is correct?",
      options: [
        "Birch handled more completed complex cases in absolute number than Alder, because its overall average gives greater weight to complex work.",
        "Alder's lower overall average means that it was faster within at least one category, despite the checked routine and complex figures.",
        "Birch had a larger complex-case share, and applying identical category weights to the stated means would rank Birch faster.",
        "Assigning both teams the same case mix would necessarily reproduce the stated category averages after any resulting change in workload."
      ],
      answer: 2,
      hints: [
        "Locate each overall mean between its team's two category means.",
        "Distinguish recalculating with common weights from predicting performance after a real allocation change."
      ],
      optionNotes: [
        "Overstated. A greater proportion does not establish an absolute count without team totals.",
        "False. Both stated category means are lower for Birch.",
        "Correct. Birch's overall mean implies a larger complex share, and it is one week faster in each category, so identical weights preserve its advantage.",
        "Not supported. A weighted recalculation of observed means is not a causal prediction under changed workload."
      ],
      explanation: "Aggregate reversals can reveal differences in composition. A controlled arithmetic comparison is not evidence for an intervention's causal effect.",
      reasoning: {
        model: "Composition inferred from aggregate reversal",
        evidence: [
          "four weeks for routine cases and twelve for complex ones",
          "overall average was ten weeks for Birch and eight for Alder",
          "category containing more cases received more weight",
          "No cases of other types entered the overall averages"
        ]
      },
      reviewedAs: "v10-09"
    },
    {
      id: "v10-09",
      topic: "Historic-building use exceptions",
      difficulty: 3,
      challenge: true,
      keyType: "inference",
      passage:
        "A fictional heritage charter normally prohibits attaching signs to a protected facade. A temporary event permit can authorise a removable sign when the heritage officer approves the attachment method. Permission for the event alone does not approve the sign. Signs fixed into original stone are outside this exception, even if they will later be removed.\n\nThe charter does not restrict free-standing signs placed inside the courtyard, provided that the public route remains unobstructed. A free-standing sign does not become a facade attachment because it advertises an event in the building. The charter's quarterly report counted 14 event permits and nine approved temporary attachments, but did not pair the decisions by event.\n\nThe officer approved unpierced clamps for the proposed banner. Before installation, the venue switched to bolts fixed into original stone and retained the same event permit. The courtyard sign remained free-standing, but chairs were placed across the public route beside it. The venue proposes removing the chairs while keeping the bolts. No new method approval or exception covers the bolts, and no other obstruction would remain if the chairs were removed. The charter's stated provisions remain the complete relevant rules for these placements.",
      stem: "Which of the following statements is correct?",
      options: [
        "The clamp approval transfers to the bolts because both attach the same banner for the same temporary event.",
        "Removing chairs fixes the courtyard condition, but the bolts remain outside the facade exception despite the clamp approval.",
        "Every placement becomes permissible once the venue has an event permit, since the method approval concerned the same banner before its attachments changed.",
        "The officer accepted the bolt substitution as a safer method than clamps after reviewing the risk of the sign falling into the courtyard."
      ],
      answer: 1,
      hints: [
        "Identify the exact groups, conditions and dates in the passage.",
        "Derive what the stated facts force before adding a cause, outcome or converse that has not been established."
      ],
      optionNotes: [
        "False. An approval for clamps does not authorise bolts, which the exception excludes.",
        "Correct. The independent route condition would be satisfied for the free-standing sign; original-stone fixings remain ineligible for the attachment exception.",
        "False. The passage expressly separates event permission from sign approval and prohibits the substituted bolts under the exception.",
        "Not supported. No such safety comparison or acceptance is reported."
      ],
      explanation: "Combine the case facts with the stated definitions and scope limits. A necessary consequence is different from a plausible explanation or an unreported outcome.",
      reasoning: {
        model: "Independent remedies and an ineligible revised method",
        evidence: [
          "Signs fixed into original stone are outside this exception",
          "provided that they do not block the public route",
          "switched to bolts fixed into original stone",
          "No new method approval or exception covers the bolts"
        ]
      },
      reviewedAs: "v11-13"
    },
    {
      id: "v10-10",
      topic: "Scholarship renewal and reassessment",
      difficulty: 3,
      challenge: true,
      keyType: "inference",
      passage:
        "A fictional scholarship normally continues into a second year when a recipient meets the academic threshold and submits a progress report by the deadline. Recipients taking an approved medical interruption can submit the report at a revised deadline, but the academic threshold still applies when their completed work is assessed. An interruption changes timing rather than lowering the standard.\n\nFinancial reassessment is a different process. It can increase or reduce the amount paid after renewal but does not determine whether the academic renewal conditions were met. A student whose household income has fallen can request reassessment even if the renewal decision is still pending. The fund received 75 reassessment requests and renewed 120 awards last year, without saying how many students appeared in both groups.\n\nSana received an approved medical interruption. Her progress report arrived after the ordinary deadline but before the revised deadline. The fund has now confirmed renewal under the published rules, although her assessment score is not public. Her financial reassessment request is still pending, and no revised payment amount has been announced. Another recipient, Tavi, has received a calculation of a higher potential payment, explicitly conditional on renewal but has no published renewal decision. Both cases use the ordinary rules, with no waived academic conditions.",
      stem: "Which of the following statements is correct?",
      options: [
        "Tavi met the academic threshold before Sana, since an increased payment requires a financial decision and Sana's financial request remains pending.",
        "Only Sana's lower household income could explain renewal after the ordinary deadline, because the assessment score was not released publicly.",
        "Sana's renewal entails the academic threshold; Tavi's conditional payment calculation does not establish the same academic finding.",
        "Tavi's academic assessment was completed earlier than Sana's because financial reassessment yielded a conditional payment calculation before Sana's request was resolved."
      ],
      answer: 2,
      hints: [
        "Identify the exact groups, conditions and dates in the passage.",
        "Derive what the stated facts force before adding a cause, outcome or converse that has not been established."
      ],
      optionNotes: [
        "Not supported. Neither comparative timing of academic assessment nor Tavi's finding is given.",
        "False. The approved interruption changes the deadline, while need does not replace academic conditions.",
        "Correct. Renewal entails academic qualification and timely reporting under the revised deadline; payment reassessment is a separate process not determining the academic condition.",
        "Not supported. The independent financial decision does not date or establish Tavi’s academic assessment."
      ],
      explanation: "Combine the case facts with the stated definitions and scope limits. A necessary consequence is different from a plausible explanation or an unreported outcome.",
      reasoning: {
        model: "Backward qualification inference across independent decisions",
        evidence: [
          "academic threshold still applies",
          "does not determine whether the academic renewal conditions were met",
          "confirmed renewal under the published rules"
        ]
      },
      reviewedAs: "v11-05"
    }
  ]
});
