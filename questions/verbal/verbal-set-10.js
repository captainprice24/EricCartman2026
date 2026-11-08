EPSO_BANK.registerSet({
  "id": "verbal-10",
  "section": "verbal",
  "title": "Verbal reasoning · Set 10 — Very hard",
  "description": "10 original challenging exam-length passages on fictional procedures and studies. Linked deductions, exceptions, scope and evidence limits. Timed practice: 17 min 30 sec. Editorial difficulty pending learner calibration.",
  "version": 2,
  "challenge": true,
  "questions": [
    {
      "id": "v10-01-c",
      "topic": "Open-call eligibility transitions",
      "difficulty": 3,
      "challenge": true,
      "keyType": "inference",
      "passage": "A fictional arts council's production call requires a completed script and a confirmed venue, and earlier development support waives neither requirement. A venue confirmation must cover the proposed performance dates; a confirmation for another season is not sufficient. The rules also require the confirmed venue to be the proposed venue. Changing the proposal's site counts as a substantive revision, permitted only before the submission deadline. The council can extend a deadline after a documented technical failure, but an extension does not move the planned performance dates or revive an expired venue confirmation.\n One group with a complete script proposes autumn performances at an outdoor site. Its old letter names that site but covers spring. Its new letter covers autumn but names an indoor hall. The group was granted an extension after a technical failure; the extension concerns uploading existing documents and expressly excludes substantive revisions. No separate revision permission has been issued.",
      "stem": "Which of the following statements is correct?",
      "options": [
        "Neither letter covers both site and dates, and the extension cannot authorise a new site.",
        "Development support allows the indoor hall after the deadline, as the script is unchanged.",
        "The two letters together confirm the event: one fits the site and the other the dates.",
        "The council will grant revision permission because the indoor hall costs less to use."
      ],
      "answer": 0,
      "hints": [
        "Match each venue letter against both the proposed site and the performance dates.",
        "Separate permission to upload documents from permission to revise the proposal."
      ],
      "optionNotes": [
        "Correct. The old letter 'covers spring', the new one 'names an indoor hall', and the extension 'expressly excludes substantive revisions'.",
        "False. Development support 'waives neither requirement', and a site change is 'permitted only before the submission deadline'.",
        "False. Each confirmation 'must cover the proposed performance dates' and name 'the proposed venue'; neither letter does both.",
        "Not supported. The passage gives no costs and reports no future decision on revision permission."
      ],
      "explanation": "A document must satisfy the relevant conditions together. A procedural extension does not automatically change substantive eligibility.",
      "reasoning": {
        "model": "Conjunctive document scope and limited procedural extension",
        "evidence": [
          "must cover the proposed performance dates",
          "confirmed venue to be the proposed venue",
          "extension concerns uploading existing documents and expressly excludes substantive revisions"
        ]
      },
      "reviewedAs": "v11-15",
      "solution": [
        "The old letter names the proposed outdoor site but covers spring rather than autumn.",
        "The new letter covers autumn but names a different venue. Conditions cannot be assembled from mismatched confirmations.",
        "Changing the proposed site is a substantive revision, which the upload extension expressly excludes."
      ],
      "supersedes": "v10-01"
    },
    {
      "id": "v10-02-c",
      "topic": "Community-energy benefit boundaries",
      "difficulty": 3,
      "challenge": true,
      "keyType": "inference",
      "passage": "A fictional energy cooperative offers members a reduced tariff and, when its annual accounts show a surplus, a year-end rebate. Membership requires a share contribution that can be returned on exit under a published repayment schedule. An evaluation compared members' bills with a standard tariff for the same consumption. It excluded share contributions, repayments, rebates and changes in household consumption after joining, so it measured a tariff difference on a fixed consumption basis, not a complete return on membership.\n For one member, the fixed-consumption saving is EUR 90. In the same year, the member paid a EUR 120 share contribution and received no rebate. The share remains eligible for repayment on exit, but no exit has occurred. The member's actual consumption changed after joining, and no bill comparison at the changed consumption has been published. The evaluation records tariff savings, membership payments and possible future repayments as separate entries rather than netting them into one figure.",
      "stem": "Which of the following statements is correct?",
      "options": [
        "The member gained EUR 90 overall, as a repayable share is not a payment in the year of joining.",
        "The member will recover the share before the next bill, as it is eligible for repayment.",
        "The member's actual electricity bill fell by EUR 90 after joining, as the evaluation showed.",
        "The known saving and payments cannot settle the member's actual overall gain for the year."
      ],
      "answer": 3,
      "hints": [
        "Identify what the evaluation holds constant and what it excludes.",
        "Separate a repayable asset, an actual cash payment and a saving measured at fixed consumption."
      ],
      "optionNotes": [
        "False. 'In the same year, the member paid a EUR 120 share contribution'; possible repayment does not erase that payment.",
        "Not supported. The share is eligible for repayment 'on exit', but 'no exit has occurred' and no date is given.",
        "False. The EUR 90 is a saving 'on a fixed consumption basis', while the member's 'actual consumption changed after joining'.",
        "Correct. The saving assumes fixed consumption, actual use changed, and 'no bill comparison at the changed consumption has been published'."
      ],
      "explanation": "A counterfactual tariff saving is not a complete observed return on membership. Check the scope of each financial measure before combining it.",
      "reasoning": {
        "model": "Fixed-consumption comparison versus actual cash-flow return",
        "evidence": [
          "same consumption",
          "excluded share contributions, repayments, rebates",
          "actual consumption changed after joining"
        ]
      },
      "reviewedAs": "v11-16",
      "solution": [
        "The EUR 90 saving compares tariffs at fixed consumption; actual consumption later changed.",
        "EUR 120 was paid for a share and no rebate was received. Possible future repayment does not erase the current cash payment.",
        "The actual overall gain needs a comparison at the changed consumption, which is unavailable."
      ],
      "supersedes": "v10-02"
    },
    {
      "id": "v10-03-c",
      "topic": "Citizen-panel replacement rules",
      "difficulty": 3,
      "challenge": true,
      "keyType": "inference",
      "passage": "A fictional citizen panel recruits by drawing invitations from a resident register, and invitees can decline. Seats vacated after the first meeting are filled from a reserve list of people who accepted the original invitation but were not initially seated. The reserve list is not a fresh random sample of the whole register.\n The first panel had 30 members, and six were replaced during the year. Replacements matched the departing members' age bands; no matching was required for employment, education or political views. The evaluation found the final panel's age distribution close to that of the district, but it did not measure how the views of those who declined differed from those of participants. A follow-up summary confirms that all six replacements had different employment statuses from the members they replaced. It gives no direction for those changes or district-wide employment distribution. The council must now separate what these records show about age, what changed on employment and what remains unknown.",
      "stem": "Which of the following statements is correct?",
      "options": [
        "The final panel had more employed members, as all six seats changed employment status.",
        "The close age balance shows that the employment changes brought the panel nearer the district.",
        "Replaced seats kept their age bands but changed employment; district balance remains unknown.",
        "The six replacements came from new random samples drawn to match the departing members' ages."
      ],
      "answer": 2,
      "hints": [
        "List which characteristics replacements had to match and which actually changed.",
        "A change in employment status needs a direction and a population benchmark before it can establish representativeness."
      ],
      "optionNotes": [
        "Not supported. The summary gives 'no direction for those changes', so a rise in employed members cannot be inferred.",
        "Not supported. The text supports close age balance only; it gives no 'district-wide employment distribution' to compare with.",
        "Correct. Replacements 'matched the departing members' age bands' and all had 'different employment statuses', with no direction or benchmark.",
        "False. Replacements come from a reserve list that 'is not a fresh random sample of the whole register'."
      ],
      "explanation": "Matching one demographic margin does not establish population representativeness on another characteristic.",
      "reasoning": {
        "model": "Preserved margins versus changed unmeasured composition",
        "evidence": [
          "matched the departing members' age bands",
          "reserve list is not a fresh random sample",
          "all six replacements had different employment statuses",
          "no direction for those changes or district-wide employment distribution"
        ]
      },
      "reviewedAs": "v11-12",
      "solution": [
        "Each replacement preserves the departing member's age band, while all six employment statuses change.",
        "The directions of the employment changes and the district employment distribution are not given.",
        "Age balance therefore cannot establish whether employment balance improved, and the reserve list remains selectively composed."
      ],
      "supersedes": "v10-03"
    },
    {
      "id": "v10-04-c",
      "topic": "Paired survey classification changes",
      "difficulty": 3,
      "challenge": true,
      "keyType": "inference",
      "passage": "A fictional consumer agency classified the same set of 120 products under two labelling schemes. Under the old scheme, a product received a blue label if and only if it met a material-recovery threshold. Under the new scheme, it receives blue if and only if it meets that same threshold and has a verified repair service. Both rules were applied to one frozen dataset, so product performance and service arrangements did not change between the classifications.\n The old scheme produced 70 blue labels and the new scheme 44. All records were complete for both criteria, and no exceptions or recording errors affected the results. The report gave no company names. It counted products, not manufacturers: several manufacturers supplied more than one product, and the report did not identify which manufacturers lost a label or whether any lost every label. No later behaviour by manufacturers or buyers was observed in this dataset.",
      "stem": "Which of the following statements is correct?",
      "options": [
        "The 26 lost labels show that those products' recovery performance worsened between schemes.",
        "Lost labels were concentrated among makers left without any blue-labelled product.",
        "Makers whose products kept blue raised their prices once the repair criterion was added.",
        "Some products meeting the recovery threshold lacked verified repair; makers' losses are unknown."
      ],
      "answer": 3,
      "hints": [
        "Use the frozen dataset to exclude changes in the products themselves.",
        "Then identify what the difference between the nested blue-label groups forces, and keep products distinct from manufacturers."
      ],
      "optionNotes": [
        "False. Both rules were applied to 'one frozen dataset', so product performance 'did not change'.",
        "Not supported. The report 'did not identify which manufacturers lost a label or whether any lost every label'.",
        "Not supported. 'No later behaviour by manufacturers or buyers was observed', so no price change is reported.",
        "Correct. The 26 products blue under the old rule but not the new one must lack verified repair; the report 'counted products, not manufacturers'."
      ],
      "explanation": "Nested classifications over unchanged complete data can establish which added condition excluded a subgroup. They do not identify an unreported higher-level distribution or future effects.",
      "reasoning": {
        "model": "Nested sets on fixed data with unit-of-analysis limits",
        "evidence": [
          "same set of 120 products",
          "if and only if it meets that same threshold and has a verified repair service",
          "old scheme produced 70 blue labels and the new scheme 44",
          "It counted products, not manufacturers"
        ]
      },
      "reviewedAs": "v10-14",
      "supersedes": "v10-04"
    },
    {
      "id": "v10-05-c",
      "topic": "Embargo release through competing routes",
      "difficulty": 3,
      "challenge": true,
      "keyType": "inference",
      "passage": "A fictional laboratory embargoes a technical report until either twelve months have passed after deposit or the sponsor issues an early-release authorisation. Reports containing personal records also need privacy clearance, whichever embargo route applies. Posting a public abstract, which contains no personal records, does not make the full report releasable. A sponsor authorisation names a specific report version. Changing an appendix creates a new version needing a fresh early-release decision, but it does not restart the ordinary twelve-month period when the main report is unchanged. Privacy clearance survives such a change only if no additional personal fields are introduced, which an internal review can confirm.\n Report Pine was deposited fourteen months ago and cleared for privacy; a review confirms that its revised appendix adds no personal fields. Report Cedar, deposited eight months ago, had early-release authorisation for its original version, then gained an appendix with additional personal fields. Cedar has no new clearance or authorisation. Both main reports are unchanged, and both abstracts are posted.",
      "stem": "Which of the following statements is correct?",
      "options": [
        "Cedar's authorisation carries over to its new appendix, as the main report is unchanged.",
        "Only Pine's revised report is releasable; Cedar's posted abstract does not cure its gaps.",
        "Any appendix change restarts the twelve-month period, so Pine needs a new sponsor decision.",
        "Cedar's new personal fields were added at the sponsor's request after early release was granted."
      ],
      "answer": 1,
      "hints": [
        "Track elapsed-time and early-release routes separately for each version.",
        "Then apply the independent privacy-clearance survival condition."
      ],
      "optionNotes": [
        "False. An authorisation 'names a specific report version', and an appendix change needs 'a fresh early-release decision'.",
        "Correct. Pine passed twelve months and kept its clearance with 'no personal fields' added; Cedar lacks both a fresh authorisation and surviving clearance.",
        "False. An appendix change 'does not restart the ordinary twelve-month period when the main report is unchanged'.",
        "Not supported. The passage does not say who asked for Cedar's new fields or why they were added."
      ],
      "explanation": "A revision can leave one time-based route intact while invalidating a version-specific permission or independent clearance. Public abstracts do not prove full-report release rights.",
      "reasoning": {
        "model": "Competing temporal routes with conditional clearance inheritance",
        "evidence": [
          "either twelve months have passed after deposit or the sponsor issues an early-release authorisation",
          "whichever embargo route applies",
          "does not restart the ordinary twelve-month period",
          "only if no additional personal fields are introduced"
        ]
      },
      "reviewedAs": "v11-20",
      "supersedes": "v10-05"
    },
    {
      "id": "v10-06-c",
      "topic": "Recycling denominator changes",
      "difficulty": 3,
      "challenge": true,
      "keyType": "inference",
      "passage": "A fictional town reported that its household recycling rate rose from 40% to 48%. The rate is recycled household waste divided by all household waste collected, and its definition did not change between the two years. Commercial waste was recorded separately: a new scheme collected more commercial cardboard, but those loads were excluded from both the numerator and the denominator.\n In the later year, residents were also encouraged to avoid food waste and reuse packaging, measures that could shrink the total collected as well as the amount sent for disposal. The council gave no estimate of how much either measure changed that total. It later confirmed that household tonnage collected in the second year was exactly half the first year's tonnage, without dividing the reduction between prevention, changing household numbers or other causes. A statistician is now comparing the amounts that the figures imply, not judging which policy produced the fall.",
      "stem": "Which of the following statements is correct?",
      "options": [
        "Household tonnage recycled fell despite the higher rate; the figures do not show why.",
        "The extra commercial cardboard explains the higher household rate once the total halved.",
        "Every household recycled less, since total collected waste halved while the rate rose.",
        "The food-waste campaign caused more than half of the fall in collected household waste."
      ],
      "answer": 0,
      "hints": [
        "Compare amounts using each percentage and its own collection total.",
        "Try a starting total of 100 units; apply the confirmed halving before the later percentage."
      ],
      "optionNotes": [
        "Correct. 48% of half the original tonnage is less than 40% of it, and the reduction is not divided 'between prevention, changing household numbers or other causes'.",
        "False. Commercial cardboard was 'excluded from both the numerator and the denominator' of the household rate.",
        "Overstated. The figures show a fall in the town's total; they give no amounts for individual households.",
        "Not supported. The council 'gave no estimate of how much either measure changed that total'."
      ],
      "explanation": "A rising share need not mean a rising amount. Calculating the change does not identify its cause.",
      "reasoning": {
        "model": "Share reversal with a known changing base",
        "evidence": [
          "40% to 48%",
          "Commercial waste was recorded separately",
          "exactly half the first year's tonnage"
        ]
      },
      "reviewedAs": "v11-08",
      "solution": [
        "With 100 initial units collected, 40 units were recycled.",
        "The later collection total is 50 units, of which 48% is 24 units. Recycled tonnage falls despite the higher rate.",
        "Commercial cardboard is excluded from both rates, and the causes of the household reduction are not separated."
      ],
      "supersedes": "v10-06"
    },
    {
      "id": "v10-07-c",
      "topic": "Inspection waivers and certification classes",
      "difficulty": 3,
      "challenge": true,
      "keyType": "inference",
      "passage": "A fictional packaging standard recognises three certification classes. All class P products have passed a pressure test. Class Q registration concerns the maker's reporting system and says nothing about testing. Products can hold more than one class at once. A transport waiver can be obtained by either of two routes. The test-based waiver route requires both pressure testing and an independent seal check. No product containing liquid can use the ordinary paperwork-only waiver route; other products can obtain a waiver through it without pressure testing if their paperwork is complete. The register records that a product has a waiver but not the route used.\n Product Pine contains liquid and has an ordinary transport waiver, granted through one of the stated routes with no special dispensation; its class entries are unpublished. Product Cedar holds class P and class Q, but no seal-check finding or waiver decision for it has been released. Both products have passed the maker's internal inspection, which is separate from the independent seal check.",
      "stem": "Which of the following statements is correct?",
      "options": [
        "Cedar's two classes establish its independent seal check, so its waiver can be inferred.",
        "Pine's waiver means it underwent both tests; Cedar's two classes do not establish a waiver.",
        "Every waived product is pressure-tested, since liquids cannot use the paperwork-only route.",
        "The standard forbids a product to hold class P and class Q at the same time."
      ],
      "answer": 1,
      "hints": [
        "Eliminate the waiver route that Pine's contents make unavailable.",
        "For Cedar, ask what each class establishes and what the waiver still needs."
      ],
      "optionNotes": [
        "Not supported. Class P concerns pressure testing and class Q 'says nothing about testing'; no seal-check finding is released.",
        "Correct. Liquid rules out the paperwork route, so Pine used the route needing 'both pressure testing and an independent seal check'; Cedar has no released waiver decision.",
        "False. Products without liquid can obtain a waiver through the paperwork route 'without pressure testing'.",
        "False. 'Products can hold more than one class at once.'"
      ],
      "explanation": "The same published status can have alternative routes, but case facts can eliminate one. Overlapping certification classes must not be treated as mutually exclusive.",
      "reasoning": {
        "model": "Route elimination and nonexclusive classifications",
        "evidence": [
          "The test-based waiver route requires both pressure testing and an independent seal check",
          "No product containing liquid can use the ordinary paperwork-only waiver route",
          "Products can hold more than one class at once",
          "Pine contains liquid and has an ordinary transport waiver"
        ]
      },
      "reviewedAs": "v10-07",
      "supersedes": "v10-07"
    },
    {
      "id": "v10-08-c",
      "topic": "Performance aggregates across case types",
      "difficulty": 3,
      "challenge": true,
      "keyType": "inference",
      "passage": "A fictional tribunal publishes average completion times for routine and complex cases. Team Birch averaged four weeks for routine cases and twelve for complex ones, while Team Alder averaged five and thirteen weeks. Each completed case belonged to exactly one of the two categories. No cases of other types entered the overall averages, which were calculated across individual cases, so a category containing more cases received more weight. The published overall average was ten weeks for Birch and eight for Alder. Category counts were not disclosed, but the authority confirmed that there was no calculation or transcription error.\n An administrator proposed comparing the teams by applying the same routine and complex weights to both. No experiment changed staffing or allocated cases at random, and the report did not establish why each team received its mix, whether cases within a category were equally difficult, or how either team would perform under a different workload.",
      "stem": "Which of the following statements is correct?",
      "options": [
        "Birch completed more complex cases in absolute terms than Alder, given its higher average.",
        "Alder's lower overall average shows that it was faster than Birch in at least one category.",
        "Birch handled a larger share of complex cases, yet equal weights would rank it faster.",
        "Giving both teams the same real case mix would leave their category averages unchanged."
      ],
      "answer": 2,
      "hints": [
        "Locate each overall mean between its team's two category means.",
        "Distinguish recalculating with common weights from predicting performance after a real allocation change."
      ],
      "optionNotes": [
        "Not supported. Birch's higher average implies a larger share of complex cases, but 'category counts were not disclosed', so absolute numbers are unknown.",
        "False. Birch's averages of 'four weeks' and 'twelve' are below Alder's five and thirteen in both categories.",
        "Correct. Birch's ten weeks lies close to its complex mean, so its complex share is larger; being a week faster in each category, it stays ahead under common weights.",
        "Not supported. The report did not establish 'how either team would perform under a different workload'."
      ],
      "explanation": "Aggregate reversals can reveal differences in composition. A controlled arithmetic comparison is not evidence for an intervention's causal effect.",
      "reasoning": {
        "model": "Composition inferred from aggregate reversal",
        "evidence": [
          "four weeks for routine cases and twelve for complex ones",
          "overall average was ten weeks for Birch and eight for Alder",
          "category containing more cases received more weight",
          "No cases of other types entered the overall averages"
        ]
      },
      "reviewedAs": "v10-09",
      "supersedes": "v10-08"
    },
    {
      "id": "v10-09-c",
      "topic": "Historic-building use exceptions",
      "difficulty": 3,
      "challenge": true,
      "keyType": "inference",
      "passage": "A fictional heritage charter normally prohibits attaching signs to a protected facade. A temporary event permit can authorise a removable sign if the heritage officer approves the attachment method; the event permit alone does not approve the sign. Signs fixed into original stone are outside this exception, even if they will later be removed. The charter does not restrict free-standing signs in the courtyard, provided that the public route remains unobstructed.\n For one event, the officer approved unpierced clamps for a facade banner. Before installation, the venue switched to bolts fixed into original stone, keeping the same event permit. Its courtyard sign is free-standing, but chairs have been placed across the public route beside it. The venue now proposes removing the chairs while keeping the bolts. No new method approval or exception covers the bolts, and nothing else would obstruct the route once the chairs are gone. These provisions are the complete relevant rules.",
      "stem": "Which of the following statements is correct?",
      "options": [
        "The clamp approval also covers the bolts, since both fix the same banner for the same event.",
        "Clearing the chairs cures the courtyard problem, but the bolts stay outside the exception.",
        "Once the venue holds an event permit, all of its sign placements become permissible.",
        "The venue changed its fixing after trial clamps had slipped in strong wind."
      ],
      "answer": 1,
      "hints": [
        "Treat the facade attachment and courtyard route as separate conditions.",
        "Check whether the later fixing method still qualifies for the exception that covered the original clamps."
      ],
      "optionNotes": [
        "False. The officer approved 'unpierced clamps', and signs 'fixed into original stone are outside this exception'.",
        "Correct. With the chairs gone the free-standing sign meets its only condition, while the bolts remain 'fixed into original stone'.",
        "False. 'The event permit alone does not approve the sign', and the bolts fall outside the exception.",
        "Not supported. The passage gives no reason for the switch and reports no problem with the clamps."
      ],
      "explanation": "A remedy for one condition does not cure an independent failure elsewhere, and approval for one method does not transfer automatically to a substituted method.",
      "reasoning": {
        "model": "Independent remedies and an ineligible revised method",
        "evidence": [
          "Signs fixed into original stone are outside this exception",
          "provided that the public route remains unobstructed",
          "switched to bolts fixed into original stone",
          "No new method approval or exception covers the bolts"
        ]
      },
      "reviewedAs": "v11-13",
      "solution": [
        "Clamps were approved, but the venue switched to bolts in original stone; those fixings are outside the stated exception.",
        "The courtyard sign is free-standing, but its public route is obstructed by chairs.",
        "Removing chairs clears the courtyard condition while leaving the prohibited facade fixings unchanged."
      ],
      "supersedes": "v10-09"
    },
    {
      "id": "v10-10-c",
      "topic": "Scholarship renewal and reassessment",
      "difficulty": 3,
      "challenge": true,
      "keyType": "inference",
      "passage": "A fictional scholarship is renewed when a recipient meets the academic threshold and submits a progress report by the deadline. A recipient with an approved medical interruption may submit by a revised deadline, but the academic threshold still applies when the work is assessed: an interruption changes timing, not the standard. Financial reassessment is a separate process. It can raise or lower the amount paid after renewal, but it does not determine whether the academic renewal conditions were met, and a student whose household income has fallen can request it even while renewal is pending.\n Sana had an approved medical interruption, and her report arrived after the ordinary deadline but before the revised one. The fund has confirmed renewal under the published rules, although her score is not public, and her reassessment request is still pending. Another recipient, Tavi, has a calculation of a higher potential payment, explicitly conditional on renewal; no renewal decision for Tavi has been published. No academic condition was waived in either case.",
      "stem": "Which of the following statements is correct?",
      "options": [
        "Tavi met the academic threshold before Sana did, since Tavi's payment was calculated first.",
        "Only a fall in Sana's income can explain her renewal after the ordinary deadline.",
        "Sana's renewal shows she met the academic threshold; Tavi's payment calculation does not.",
        "Tavi's academic assessment was completed before Sana's reassessment request was decided."
      ],
      "answer": 2,
      "hints": [
        "Separate academic renewal from financial reassessment, including conditional payment calculations.",
        "Reason backwards from a confirmed renewal; do not infer the same finding from a payment that remains conditional."
      ],
      "optionNotes": [
        "Not supported. The passage gives no academic finding for Tavi and no order of assessments.",
        "False. Her approved interruption allowed a 'revised deadline', and reassessment 'does not determine whether the academic renewal conditions were met'.",
        "Correct. Renewal 'under the published rules' entails the threshold, while Tavi's calculation is 'explicitly conditional on renewal'.",
        "Not supported. The text does not date Tavi's academic assessment, or say that one has taken place."
      ],
      "explanation": "A confirmed decision can entail its necessary prerequisites. A separate conditional calculation does not establish that decision.",
      "reasoning": {
        "model": "Backward qualification inference across independent decisions",
        "evidence": [
          "academic threshold still applies",
          "does not determine whether the academic renewal conditions were met",
          "confirmed renewal under the published rules"
        ]
      },
      "reviewedAs": "v11-05",
      "solution": [
        "Sana meets the revised reporting deadline under an approved interruption.",
        "Confirmed renewal under the ordinary rules entails that the academic threshold was met, even though her score is private.",
        "Tavi's higher potential payment is conditional on renewal, so it does not establish an academic decision or its timing."
      ],
      "supersedes": "v10-10"
    }
  ]
});
