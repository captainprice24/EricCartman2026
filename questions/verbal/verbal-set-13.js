/* Original hand-authored verbal challenge items; reordered for balanced set-level cues. */
EPSO_BANK.registerSet({
  id: "verbal-13",
  section: "verbal",
  title: "Verbal reasoning · Set 13 — Very hard",
  description: "10 original challenging passages on fictional procedures and studies. Linked deductions, exceptions, scope and evidence limits. Timed practice: 17 min 30 sec. Editorial difficulty pending learner calibration.",
  version: 1,
  challenge: true,
  questions: [
    {
      id: "v13-01",
      topic: "Delegated funding and revocation timing",
      difficulty: 3,
      challenge: true,
      keyType: "inference",
      passage:
        "A fictional regional fund allows its executive to sign small grants without a full board vote. Larger grants require a board resolution. A grant for emergency repairs can use the small-grant route regardless of amount, but only while the board's emergency declaration remains in force. The declaration does not exempt the executive from verifying that the work is repair rather than new construction.\n\nA resolution signed while the emergency declaration is valid does not extend that declaration. A grant is committed when its contract is signed, not when the application is submitted or approved in principle. Contracts already committed remain valid after an emergency declaration ends. Uncommitted proposals must satisfy the rules applying on their eventual signature date. The fund's public log records approval in principle and contract signature as separate events.\n\nA large repair proposal received executive approval in principle on Monday while the emergency declaration was in force. The declaration ended on Wednesday. The executive signed the contract on Friday without a board resolution. All documents identify the work as repair, and no new declaration or other delegated power was issued. A separate small new-construction proposal was also signed on Friday, after its ordinary requirements had been met. The log contains no missing or disputed dates for either proposal.",
      stem: "Which of the following statements is correct?",
      options: [
        "The large repair signature lacked a valid route on Friday; the ordinary small-grant route remained available for construction.",
        "Both Friday contracts used the emergency-repair exception, because their common signature date made the executive’s delegated route identical for each proposal.",
        "The large repair contract remained valid as a pre-existing commitment because approval in principle had been recorded before the declaration ended.",
        "The board would have granted a resolution for the large repair proposal if the executive had requested one after Wednesday."
      ],
      answer: 0,
      hints: [
        "Identify the event that fixes commitment.",
        "Apply the declaration's expiry to the exceptional route without erasing the ordinary small-grant power."
      ],
      optionNotes: [
        "Correct. Large amount requires a board resolution unless the emergency route is live at commitment, which occurs on signature; ordinary small grants have a different route.",
        "False. The construction proposal is not emergency repair and used ordinary small-grant requirements; the repair exception had expired.",
        "False. Commitment occurs on signature, not approval in principle.",
        "Not supported. A hypothetical board decision is unreported."
      ],
      explanation: "An exception's expiry changes later decisions without invalidating earlier commitments or extinguishing independent ordinary powers.",
      reasoning: {
        model: "Temporal exception and surviving ordinary authority",
        evidence: [
          "only while the board's emergency declaration remains in force",
          "committed when its contract is signed",
          "Uncommitted proposals must satisfy the rules applying on their eventual signature date",
          "small grants without a full board vote"
        ]
      },
      reviewedAs: "v10-13"
    },
    {
      id: "v13-02",
      topic: "Panel opinion changes with attrition",
      difficulty: 3,
      challenge: true,
      keyType: "inference",
      passage:
        "A fictional transport panel asked the same 100 registered members a binary support-or-oppose question about a tram proposal in March and September. In March every member answered: 40 supported and 60 opposed. In September 80 members answered: 54 supported and 26 opposed. The September respondents were drawn entirely from the original 100, and nobody joined the register between the surveys. The wording and classification of support were unchanged.\n\nA nonresponse was not counted as either support or opposition. The published tables contain no names and do not connect an individual's March and September answers. They also give no September opinions for the 20 nonrespondents. Between surveys, the route was amended and the council ran an information campaign. Neither change was evaluated separately, and the panel's answers were advisory rather than binding on the council.\n\nOrganisers retained the anonymised totals so they could compare expressed opinion without publishing individual positions. A proposed commentary stated that the second survey merely contained a different mix of the original supporters, with no member needing to change sides. Another commentary attributed any switches to the information campaign. No linked interviews, participant histories or separate evaluation of the route amendment accompanied either commentary in the released material.",
      stem: "Which of the following statements is correct?",
      options: [
        "More than half of the original opponents expressed support in September, because support formed a majority of the responding group.",
        "Some original opponents expressed support in September, and the known responses alone establish majority support within the full registered panel.",
        "The changed respondent mix could account for all 54 supporters without anyone switching sides if the 20 missing replies came from original opponents.",
        "Exactly 14 original opponents switched to support, since subtracting the first support total from the second isolates every change of position."
      ],
      answer: 1,
      hints: [
        "Compare the largest possible pool of unchanged supporters with the later supporter count.",
        "Separate the necessary existence of switching from exact flows and their causes."
      ],
      optionNotes: [
        "Overstated. The inference that some opponents switched is expanded to a majority of the 60 original opponents; that need not follow.",
        "Correct. 54 exceeds the original 40 supporters and also exceeds half of all 100 members, regardless of 20 unknown replies.",
        "False. At most 40 unchanged supporters were available, so attrition cannot supply 54 without switching.",
        "Overstated. Fourteen is a lower bound; simultaneous switches and missing supporters can yield a larger gross flow."
      ],
      explanation: "Aggregate counts can force a limited individual-level inference when the cohort and categories are fixed. They do not determine every transition or its cause.",
      reasoning: {
        model: "Bounded cohort inference under attrition",
        evidence: [
          "40 supported and 60 opposed",
          "54 supported and 26 opposed",
          "drawn entirely from the original 100",
          "do not connect an individual's March and September answers"
        ]
      },
      reviewedAs: "v10-04"
    },
    {
      id: "v13-03",
      topic: "Night-freight inspection inference",
      difficulty: 3,
      challenge: true,
      keyType: "inference",
      passage:
        "In a fictional harbour, freight vessels entering during the night window require an active emissions sensor and a paid security deposit, unless they hold a current local waiver. Passenger ferries follow a separate procedure. Fuel carriers count as freight vessels, and local waivers are never issued for fuel carriage. A priority certificate affects the order in which eligible vessels enter; it does not waive entry requirements.\n\nA sensor is recorded as active only after it has passed an inspection by an authorised technician. Installing a sensor or booking an inspection does not establish active status. The harbour's public arrivals log records successful admissions but does not list deposits, inspections or priority certificates. On one recorded night it listed 18 arrivals, six of them freight vessels. A vessel can appear in that log more than once during a month.\n\nThe Silver arrived carrying fuel during that night's freight window. The harbour confirms that it admitted the vessel in accordance with the stated entry rules, with no emergency deviation. Its publicly available file contains no priority certificate and no technician's report. The file is a selection of documents released for public inspection rather than a complete record of documents held by the harbour. No rule makes public release of an inspection report a condition of entry.",
      stem: "Which of the following statements is correct?",
      options: [
        "Silver could lawfully have entered without inspection if its priority certificate was held in the harbour's unreleased records.",
        "Every freight arrival in the night log required an active sensor, since waivers were unavailable for the Silver's particular cargo.",
        "Silver's admission entails a passed inspection, but the night log does not establish that every other freight arrival was inspected.",
        "The inspected freight vessels admitted that night were all fuel carriers, since that cargo category could not receive a local waiver."
      ],
      answer: 2,
      hints: [
        "Trace Silver's cargo through the waiver rule before using its lawful admission.",
        "An active sensor implies an inspection; a selective public file is not the harbour's complete record."
      ],
      optionNotes: [
        "False. A priority certificate cannot waive conditions, and fuel cannot receive the local waiver.",
        "Overstated. The exclusion for fuel is extended to every freight vessel.",
        "Correct. Fuel excludes Silver from the waiver, lawful admission requires an active sensor, and activity implies inspection. Other freight could have waivers.",
        "Not supported. This reverses the chain: fuel requires inspection, but inspection need not imply fuel."
      ],
      explanation: "Work backwards from an outcome through a rule after eliminating its exception. Keep the resulting necessary condition separate from facts missing from a selective record.",
      reasoning: {
        model: "Eliminated exception and backward implication",
        evidence: [
          "Fuel carriers count as freight vessels",
          "local waivers are never issued for fuel carriage",
          "active only after it has passed an inspection",
          "admitted the vessel in accordance with the stated entry rules"
        ]
      },
      reviewedAs: "v10-01"
    },
    {
      id: "v13-04",
      topic: "Recommendation strength and follow-up",
      difficulty: 3,
      challenge: true,
      keyType: "inference",
      passage:
        "A fictional education review found that schools using a new attendance dashboard had fewer recorded absences after its introduction. The schools volunteered and received training at the same time as the software. The study did not separate the effects of training, dashboard use and pre-existing differences between participating and other schools. The review covered one school year rather than long-term outcomes.\n\nThe reviewers recommended offering the dashboard to another group of schools under a design that could compare outcomes more reliably. They did not recommend compulsory district-wide adoption. Their proposal included common recording definitions, baseline measurements and a record of whether teachers actually used the system. The original report had counted software activation, which did not establish regular classroom use.\n\nThe follow-up gave every enrolled school the same training and randomly assigned access to the dashboard. All schools used common recording definitions and supplied complete outcomes. Analysts retained schools in their assigned access groups whether or not teachers used the dashboard regularly. The schools again volunteered rather than being sampled from the whole district. The study has not yet reported outcomes. The design separates access from training in a way the original combined introduction did not, but includes no separate random assignment to actual classroom use.",
      stem: "Which of the following statements is correct?",
      options: [
        "The follow-up separates access assignment from common training, while actual uptake effects and transfer beyond volunteers remain unresolved.",
        "The follow-up identifies the effect of regular classroom use in every district school because access is random and training is held constant.",
        "Only the schools regularly using the dashboard remain in the analysis, since random access removes the need to retain nonusers within their assigned groups.",
        "The district purchased the dashboard after the follow-up found a favourable access effect relative to the original study's combined introduction."
      ],
      answer: 0,
      hints: [
        "Identify the exact groups, conditions and dates in the passage.",
        "Derive what the stated facts force before adding a cause, outcome or converse that has not been established."
      ],
      optionNotes: [
        "Correct. Training is no longer confounded with access assignment, but actual uptake is not separately randomised and recruitment remains selective.",
        "Overstated. An access design for volunteers is expanded into an actual-use effect for every school.",
        "False. The analysis explicitly retains schools in assignment groups regardless of use.",
        "Not supported. No follow-up outcome or purchase decision has been reported."
      ],
      explanation: "Combine the case facts with the stated definitions and scope limits. A necessary consequence is different from a plausible explanation or an unreported outcome.",
      reasoning: {
        model: "Design improvements with remaining exposure and sampling limits",
        evidence: [
          "schools volunteered",
          "same training and randomly assigned access",
          "retained schools in their assigned access groups"
        ]
      },
      reviewedAs: "v11-19"
    },
    {
      id: "v13-05",
      topic: "Forecast revision interpretation",
      difficulty: 3,
      challenge: true,
      keyType: "inference",
      passage:
        "A fictional water authority issued an early forecast of summer demand based on normal rainfall and the previous year's population estimate. A revised forecast was lower. Between the two releases, the authority updated both the rainfall assumption and the population estimate. It did not publish a decomposition attributing the change to either input.\n\nThe revised forecast also incorporated a planned conservation campaign. Its estimated effect came from a model, not from measured responses to that summer's campaign, which had not yet started. The authority warned that a lower forecast was a conditional expectation of demand, not a record of water already saved. The first forecast projected 40 million cubic metres and the revision projected 36 million, using the same demand definition.\n\nFor a supplementary model check, analysts ran the revised population and rainfall assumptions twice: once with the campaign effect set to zero and once with the planned campaign effect included. The projected demands differed by one million cubic metres. All other inputs were identical in these two runs. The original forecast revision remained four million. Actual summer demand was not yet observed, and no new evidence measured the campaign response. The analysts retained the distinction between changing an assumption in a model and observing its realised effect.",
      stem: "Which of the following statements is correct?",
      options: [
        "The remaining three million cubic metres were saved by population decline alone, because the campaign accounts for one million in the paired runs.",
        "The one-million difference proves the campaign had saved a quarter of the full revision before it began.",
        "The paired runs isolate one campaign assumption within the revised model, without measuring savings or explaining the full revision.",
        "Every household reduced use in response to the campaign, since a model with common inputs projected lower demand when its effect was included."
      ],
      answer: 2,
      hints: [
        "Identify the exact groups, conditions and dates in the passage.",
        "Derive what the stated facts force before adding a cause, outcome or converse that has not been established."
      ],
      optionNotes: [
        "Not supported. The remainder also involves rainfall and is not an observed saving or population-only decomposition.",
        "False. The campaign had not begun and the numbers are prospective model outputs.",
        "Correct. Only the campaign assumption varies within the paired runs, but the overall revision varied other inputs and actual effects remain unobserved.",
        "Overstated. An aggregate conditional estimate is expanded to an observed universal household response."
      ],
      explanation: "Combine the case facts with the stated definitions and scope limits. A necessary consequence is different from a plausible explanation or an unreported outcome.",
      reasoning: {
        model: "Isolated model sensitivity versus realised causal contribution",
        evidence: [
          "campaign, which had not yet started",
          "updated both the rainfall assumption and the population estimate",
          "All other inputs were identical in these two runs"
        ]
      },
      reviewedAs: "v11-14"
    },
    {
      id: "v13-06",
      topic: "Refuge-room capacity records",
      difficulty: 3,
      challenge: true,
      keyType: "inference",
      passage:
        "A fictional fire-safety register records a room as available for refuge when its fire door is operational and its accessible route is unobstructed. The register also lists a design capacity, which is not a count of people currently sheltering there. A room can retain its design capacity in the database while being marked temporarily unavailable.\n\nFacilities staff inspect doors each Monday. Accessibility staff review routes separately after maintenance work. Completing the door inspection does not certify the route, and reopening a route does not establish that a defective door has been repaired. The building has six refuge rooms with a combined design capacity of 48 people. Two rooms are undergoing work, but their individual capacities and the condition of the other rooms are not given in the report.\n\nThe officer later verified that four rooms met both availability conditions and together provided 34 design places. The remaining rooms were Elm, with eight places, and Willow, with six. Elm's door worked but its route was obstructed. Willow's route was clear but its door was defective. No other condition or capacity changed. A contractor can clear Elm's route or repair Willow's door independently; either action leaves the other room's condition unchanged. Neither action has yet occurred.",
      stem: "Which of the following statements is correct?",
      options: [
        "Repairing Willow's door would add eight available places, since Elm's larger capacity is already shown in the combined design total.",
        "Clearing Elm's route alone would yield 42 available places; repairing Willow alone would yield 40, and both actions would restore all 48.",
        "Either single repair would make all 48 design places available, because every room would then have passed at least one of the two checks.",
        "The contractor will clear Elm's route first because its work is quicker and adds more places than the repair to Willow's defective door."
      ],
      answer: 1,
      hints: [
        "Identify the exact groups, conditions and dates in the passage.",
        "Derive what the stated facts force before adding a cause, outcome or converse that has not been established."
      ],
      optionNotes: [
        "False. Willow has six places; Elm remains blocked if only Willow is repaired.",
        "Correct. The four available rooms supply 34; the actions separately complete the remaining condition for eight-place Elm or six-place Willow.",
        "False. The proposed at-least-one rule contradicts the explicit requirement for both conditions in each available room.",
        "Not supported. No sequence or work-time comparison is reported."
      ],
      explanation: "Combine the case facts with the stated definitions and scope limits. A necessary consequence is different from a plausible explanation or an unreported outcome.",
      reasoning: {
        model: "Conjunctive operational capacity across separate repairs",
        evidence: [
          "fire door is operational and its accessible route is unobstructed",
          "four rooms met both availability conditions",
          "Elm's door worked but its route was obstructed",
          "Willow's route was clear but its door was defective"
        ]
      },
      reviewedAs: "v11-11"
    },
    {
      id: "v13-07",
      topic: "Credit recognition across course routes",
      difficulty: 3,
      challenge: true,
      keyType: "inference",
      passage:
        "A fictional institute awards a fieldwork credit to students completing either a supervised placement or an approved community project. Every approved community project includes a written evaluation, while placements require an oral evaluation. A student can complete both routes. The credit certificate records that a route was completed but does not name the route or reproduce its evaluation.\n\nResearch scholarships are restricted to students holding a fieldwork credit and a research-methods pass. A scholarship offer therefore establishes those two qualifications, but a methods pass alone does not establish fieldwork credit. An ordinary bursary has different conditions and is not treated as a research scholarship. Evaluations cannot be waived on either fieldwork route, though the two evaluation formats are different.\n\nNeri received a research scholarship under these rules. The institute confirms that Neri never completed an oral evaluation for any placement. No community-project evaluation or methods transcript has been publicly released. Another student, Vale, has a published methods pass and an ordinary bursary, but no released fieldwork or scholarship decision. Both students attended a preparatory fieldwork briefing, which the institute does not count as a placement, project or evaluation. Public absence of a record is not being treated as evidence of actual absence except for Neri's expressly confirmed oral-evaluation history.",
      stem: "Which of the following statements is correct?",
      options: [
        "Vale completed the community-project route rather than a placement because the ordinary bursary was published without an oral-evaluation record.",
        "Neri's missing public evaluation record permits a placement route with no oral evaluation, since a scholarship certificate does not specify the route.",
        "All methods-pass holders qualify for research scholarships, as both fieldwork routes include an evaluation and the certificate can omit its format.",
        "Neri's award entails methods and community-project qualifications; Vale's ordinary bursary establishes no corresponding fieldwork route."
      ],
      answer: 3,
      hints: [
        "Work backwards from Neri's type of award.",
        "Eliminate the fieldwork route incompatible with the confirmed evaluation history, but do not treat Vale's public omissions as equivalent evidence."
      ],
      optionNotes: [
        "Not supported. An ordinary bursary and a selective public record do not identify Vale's fieldwork route.",
        "False. Placement always requires an oral evaluation, and its actual absence for Neri is confirmed.",
        "Overstated. A necessary methods condition is strengthened into sufficient eligibility without fieldwork credit.",
        "Correct. Scholarship implies credit and methods pass; no oral evaluation excludes placement, so the unwaivable remaining project route must hold. Vale's different award supplies no credit fact."
      ],
      explanation: "An outcome can entail an unreported qualification when alternatives are exhausted. This requires confirmed absence of a prerequisite, not merely a missing public document.",
      reasoning: {
        model: "Backward inference through award and route constraints",
        evidence: [
          "either a supervised placement or an approved community project",
          "restricted to students holding a fieldwork credit and a research-methods pass",
          "Evaluations cannot be waived",
          "never completed an oral evaluation"
        ]
      },
      reviewedAs: "v10-19"
    },
    {
      id: "v13-08",
      topic: "Source independence in reporting",
      difficulty: 3,
      challenge: true,
      keyType: "inference",
      passage:
        "A fictional policy observatory reviewed claims that a new freight terminal had reduced road congestion. Three newspapers carried the same estimate of time saved. One cited a press briefing, another cited the first newspaper, and the third used a statement from the terminal operator. The briefing and operator statement both drew on the same consultancy model.\n\nThe model compared observed travel times after opening with a simulated no-terminal scenario. The consultancy had not observed that counterfactual directly. A separate traffic monitor recorded shorter journeys on one route, but did not measure displaced congestion elsewhere or control for an unrelated road closure ending during the period. The observatory did not say the estimate was false; it examined how much independent support the reports provided.\n\nThe supplier later issued a second estimate using a new assumption about displaced congestion. All three newspapers updated their total-saving figure from that release without commissioning another model. The independent monitor continued measuring only its original route. Its latest observation still showed a shorter journey there, but no record linked that local change to the supplier's revised displaced-congestion assumption. The public record therefore contains two versions of one model lineage and a narrower observation series, rather than a new independent network-wide counterfactual comparison.",
      stem: "Which of the following statements is correct?",
      options: [
        "The three updated articles provide independent evidence for the revised displacement assumption because they were published separately from the original model report.",
        "The monitor independently verified the new network-wide saving, since it continued to observe shorter journeys after the newspapers revised their figures.",
        "The updated total is necessarily false because no independent source established the model's revised assumption about displaced congestion.",
        "Updated articles still repeat one model lineage; the route monitor does not independently verify network-wide displaced congestion."
      ],
      answer: 3,
      hints: [
        "Identify the exact groups, conditions and dates in the passage.",
        "Derive what the stated facts force before adding a cause, outcome or converse that has not been established."
      ],
      optionNotes: [
        "Overstated. Separate publication is expanded into independent evidence despite the shared updated input.",
        "Overstated. The monitor measured only one route, not network displacement or the new total.",
        "Not supported. Absence of independent validation is not proof of falsehood; the passage expressly distinguishes these.",
        "Correct. The shared revised assumption and narrow route observation concern different inferential claims."
      ],
      explanation: "Combine the case facts with the stated definitions and scope limits. A necessary consequence is different from a plausible explanation or an unreported outcome.",
      reasoning: {
        model: "Versioned source dependence versus narrower independent evidence",
        evidence: [
          "both drew on the same consultancy model",
          "did not measure displaced congestion elsewhere",
          "without commissioning another model"
        ]
      },
      reviewedAs: "v11-17"
    },
    {
      id: "v13-09",
      topic: "Diagnostic threshold comparisons",
      difficulty: 3,
      challenge: true,
      keyType: "inference",
      passage:
        "A fictional occupational clinic reported that the proportion of workers flagged by its hearing screen fell from 18% to 11% over two years. During that interval, the clinic changed the threshold for a flag: the second year's rule required a larger measured loss. The instruments and test-room conditions remained the same. Workers whose results lay between the old and new thresholds would therefore have been flagged under the first rule but not the second.\n\nThe clinic also introduced quieter machinery in several workshops. Managers considered the new equipment a plausible explanation for better hearing outcomes. However, the published figures were based on each year's applicable threshold, and the report did not provide raw hearing measurements or results recalculated under a common rule. The workforce changed through recruitment and retirement, with no analysis identifying people screened in both years.\n\nA separate check reapplied both thresholds to the unchanged raw results of 100 continuing workers. Eighteen received a flag under the old rule and eleven under the new rule. The check used the same measured loss for each worker in both classifications. The seven workers no longer flagged had not been retested between classifications. This check was separate from the published year-to-year workforce comparison, and no common-rule year-to-year result for the full workforce was released.",
      stem: "Which of the following statements is correct?",
      options: [
        "The seven lost flags in the fixed-data check establish better hearing in those workers, since the stricter rule used the same instruments.",
        "All seven lost flags in the fixed-data check arise from reclassification; that result does not allocate the workforce-wide annual change.",
        "Every worker newly unflagged in the fixed-data check had also improved between the two annual screens, because the same people were reclassified.",
        "The full workforce's lower annual flag rate resulted entirely from the threshold change rather than any change in hearing or membership."
      ],
      answer: 1,
      hints: [
        "Identify the exact groups, conditions and dates in the passage.",
        "Derive what the stated facts force before adding a cause, outcome or converse that has not been established."
      ],
      optionNotes: [
        "False. The raw measurements were unchanged and no retest occurred between these classifications.",
        "Correct. With identical measurements and nested thresholds, fewer flags arise from the classification change. The annual workforce data also changed membership and possibly hearing.",
        "Not supported. The fixed-data reclassification does not disclose each person's year-to-year hearing history.",
        "Overstated. A demonstrated effect in the fixed-data exercise is extended into a complete attribution of a different annual comparison."
      ],
      explanation: "Combine the case facts with the stated definitions and scope limits. A necessary consequence is different from a plausible explanation or an unreported outcome.",
      reasoning: {
        model: "Nested reclassification versus longitudinal change",
        evidence: [
          "required a larger measured loss",
          "no analysis identifying people screened in both years",
          "unchanged raw results of 100 continuing workers"
        ]
      },
      reviewedAs: "v11-01"
    },
    {
      id: "v13-10",
      topic: "Long-term maintenance estimates",
      difficulty: 3,
      challenge: true,
      keyType: "inference",
      passage:
        "A fictional infrastructure committee compared two resurfacing options over ten years. Option Red cost less to install, while Option Blue was expected to need fewer repairs. The initial report estimated total expenditure under a scenario in which traffic grew at a specified rate. It did not claim that the traffic forecast was certain. Under that scenario, Blue had the lower estimated total cost despite its higher initial price.\n\nThe committee then requested a sensitivity analysis. In the low-growth scenario, Red had the lower total estimate. In the high-growth scenario, Blue retained its advantage. Neither analysis valued disruption to road users or environmental effects. The finance office stressed that changing a scenario changed the projection, not the historical installation quotes.\n\nThe council is considering two claims for a public leaflet. One calls Blue preferable under the central expenditure model; the other calls Blue cheaper in every possible future once disruption and environmental effects are included. The council retains the central traffic assumption and the model's cost categories, but has obtained no new valuation of omitted effects. Its selected contract also allows later maintenance decisions to change, and no report estimates the consequences of exercising that option.",
      stem: "Which of the following statements is correct?",
      options: [
        "The low-growth scenario is the more likely one, since the council retained flexibility to revise maintenance.",
        "Adding the unpriced disruption effects would reverse the central expenditure ranking and make Red cheaper than Blue over the same ten-year period.",
        "Only Blue's maintenance option removes uncertainty over future costs, so choosing that contract converts the central expenditure ranking into an all-futures ranking.",
        "The central cost model supports Blue conditionally; contract flexibility supplies no value for omitted disruption or environmental effects."
      ],
      answer: 3,
      hints: [
        "Identify the exact groups, conditions and dates in the passage.",
        "Derive what the stated facts force before adding a cause, outcome or converse that has not been established."
      ],
      optionNotes: [
        "Not supported. No probabilities for the scenarios are supplied.",
        "Not supported. No disruption valuation is given, so neither the direction nor size of a ranking change is established.",
        "Overstated. Flexibility does not eliminate uncertainty or supply the omitted valuations.",
        "Correct. The central model gives Blue a conditional included-cost advantage; neither omitted valuations nor the option's effects are quantified."
      ],
      explanation: "Combine the case facts with the stated definitions and scope limits. A necessary consequence is different from a plausible explanation or an unreported outcome.",
      reasoning: {
        model: "Conditional dominance versus unpriced decision dimensions",
        evidence: [
          "Under that scenario, Blue had the lower estimated total cost",
          "In the low-growth scenario, Red had the lower total estimate",
          "Neither analysis valued disruption",
          "no new valuation of omitted effects"
        ]
      },
      reviewedAs: "v11-10"
    }
  ]
});
