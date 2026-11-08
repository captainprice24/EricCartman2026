EPSO_BANK.registerSet({
  "id": "verbal-13",
  "section": "verbal",
  "title": "Verbal reasoning · Set 13 — Very hard",
  "description": "10 original challenging passages of exam length on fictional procedures and studies. Linked deductions, exceptions, scope and evidence limits. Timed practice: 17 min 30 sec. Editorial difficulty pending learner calibration.",
  "version": 2,
  "challenge": true,
  "questions": [
    {
      "id": "v13-01-c",
      "topic": "Delegated funding and revocation timing",
      "difficulty": 3,
      "challenge": true,
      "keyType": "inference",
      "passage": "A fictional regional fund allows its executive to sign small grants without a full board vote, while larger grants require a board resolution. A grant for emergency repairs can use the small-grant route regardless of amount, but only while the board's emergency declaration remains in force. A grant is committed when its contract is signed, not when it is submitted or approved in principle. Contracts already committed remain valid after a declaration ends. Uncommitted proposals must satisfy the rules applying on their eventual signature date.\n\nA large repair proposal received executive approval in principle on Monday, while the emergency declaration was in force. The declaration ended on Wednesday. On Friday the executive signed the repair contract without a board resolution; no new declaration or other delegated power had been issued. A separate small new-construction proposal was also signed on Friday, after its ordinary requirements had been met. The fund's log records the approval and signature dates of both proposals, and none is disputed.",
      "stem": "Which of the following statements is correct?",
      "options": [
        "The repair contract lacked a valid route on Friday, but the construction grant had one.",
        "Both Friday contracts relied on the emergency-repair route, as they were signed together.",
        "The repair contract was committed, because approval in principle came before Wednesday.",
        "The board would have passed a resolution for the repair had the executive asked for one."
      ],
      "answer": 0,
      "hints": [
        "Identify the event that fixes commitment.",
        "Apply the declaration's expiry to the exceptional route without erasing the ordinary small-grant power."
      ],
      "optionNotes": [
        "Correct. The repair was uncommitted until Friday, after the declaration ended, so it needed a resolution; small grants can be signed 'without a full board vote'.",
        "False. The construction grant followed its 'ordinary requirements', and the repair route applies 'only while the board's emergency declaration remains in force'.",
        "False. A grant is 'committed when its contract is signed', not when 'approved in principle'.",
        "Not supported. No request was made, and the text reports no view of the board."
      ],
      "explanation": "An exception’s expiry changes later decisions without invalidating earlier commitments or removing independent ordinary powers.",
      "reasoning": {
        "model": "Temporal exception and surviving ordinary authority",
        "evidence": [
          "only while the board's emergency declaration remains in force",
          "committed when its contract is signed",
          "Uncommitted proposals must satisfy the rules applying on their eventual signature date",
          "small grants without a full board vote"
        ]
      },
      "reviewedAs": "v10-13",
      "supersedes": "v13-01"
    },
    {
      "id": "v13-02-c",
      "topic": "Panel opinion changes with attrition",
      "difficulty": 3,
      "challenge": true,
      "keyType": "inference",
      "passage": "A fictional transport panel asked the same 100 registered members a binary support-or-oppose question about a tram proposal in March and September, with unchanged wording. In March every member answered: 40 supported and 60 opposed. In September 80 members answered: 54 supported and 26 opposed. The September respondents were drawn entirely from the original 100, nobody joined the register, and a nonresponse counted as neither support nor opposition.\n\nThe published tables contain no names, do not connect an individual's March and September answers and give no September opinions for the 20 nonrespondents. Between the surveys the route was amended and the council ran an information campaign, but neither change was evaluated separately. One commentary claimed that the second survey merely contained a different mix of the original supporters, with nobody changing sides; another attributed any switches to the campaign. Neither commentary was backed by linked interviews or participant histories.",
      "stem": "Which of the following statements is correct?",
      "options": [
        "Most of the original opponents switched to support, as supporters were a majority of replies.",
        "Some original opponents switched, and supporters are now a majority of the full panel.",
        "Attrition alone could explain the 54 supporters if the 20 missing replies were opponents.",
        "Exactly 14 original opponents switched, the difference between the two support totals."
      ],
      "answer": 1,
      "hints": [
        "Compare the largest possible pool of unchanged supporters with the September supporter count.",
        "Separate the fact that some switching occurred from exact flows and their causes."
      ],
      "optionNotes": [
        "Overstated. At least 14 of the 60 opponents must have switched, but nothing shows that more than half did.",
        "Correct. Only 40 members supported in March, so 54 supporters require switching, and 54 exceeds half of all 100 members.",
        "False. Respondents came 'entirely from the original 100', of whom only 40 supported in March, so 54 supporters cannot arise without switching.",
        "Not supported. Fourteen is a minimum; the tables 'do not connect an individual's March and September answers', so further switches in both directions are possible."
      ],
      "explanation": "Aggregate counts can force a limited individual-level inference when the cohort and categories are fixed. They do not determine every transition or its cause.",
      "reasoning": {
        "model": "Bounded cohort inference under attrition",
        "evidence": [
          "40 supported and 60 opposed",
          "54 supported and 26 opposed",
          "drawn entirely from the original 100",
          "do not connect an individual's March and September answers"
        ]
      },
      "reviewedAs": "v10-04",
      "supersedes": "v13-02"
    },
    {
      "id": "v13-03-c",
      "topic": "Night-freight inspection inference",
      "difficulty": 3,
      "challenge": true,
      "keyType": "inference",
      "passage": "In a fictional harbour, freight vessels entering during the night window require an active emissions sensor and a paid security deposit, unless they hold a current local waiver. Fuel carriers count as freight vessels, and local waivers are never issued for fuel carriage. A priority certificate affects the order in which eligible vessels enter; it does not waive entry requirements. A sensor is recorded as active only after it has passed an inspection by an authorised technician; installing a sensor or booking an inspection is not enough.\n\nThe public arrivals log lists successful admissions but not deposits, inspections or certificates. On one night it listed 18 arrivals, six of them freight vessels. The Silver arrived carrying fuel in that night's freight window, and the harbour confirms that it admitted the vessel in accordance with the stated entry rules, with no emergency deviation. The Silver's public file contains no technician's report, but it is a selection of released documents rather than the harbour's complete record.",
      "stem": "Which of the following statements is correct?",
      "options": [
        "The Silver could have entered uninspected if an unreleased priority certificate existed.",
        "Every freight arrival that night needed an active sensor, as fuel cargo rules out waivers.",
        "The Silver's sensor must have passed inspection; the log is silent on the other freight.",
        "All of the inspected freight vessels admitted that night were fuel carriers."
      ],
      "answer": 2,
      "hints": [
        "Trace the Silver's cargo through the waiver rule before using its lawful admission.",
        "An active sensor implies an inspection; a selective public file is not the complete record."
      ],
      "optionNotes": [
        "False. A priority certificate 'does not waive entry requirements', and fuel carriers cannot hold a waiver.",
        "Overstated. Only fuel carriage is barred from waivers; other freight vessels could have entered under a waiver.",
        "Correct. No waiver was possible for fuel, so lawful entry needed an active sensor, which is 'active only after it has passed an inspection'.",
        "Not supported. Fuel cargo requires inspection, but nothing shows that inspection implies fuel cargo."
      ],
      "explanation": "Work backwards from an outcome through a rule once its exception is eliminated. Keep that necessary condition separate from facts missing from a selective record.",
      "reasoning": {
        "model": "Eliminated exception and backward implication",
        "evidence": [
          "Fuel carriers count as freight vessels",
          "local waivers are never issued for fuel carriage",
          "active only after it has passed an inspection",
          "admitted the vessel in accordance with the stated entry rules"
        ]
      },
      "reviewedAs": "v10-01",
      "supersedes": "v13-03"
    },
    {
      "id": "v13-04-c",
      "topic": "Recommendation strength and follow-up",
      "difficulty": 3,
      "challenge": true,
      "keyType": "inference",
      "passage": "A fictional education review found that schools using a new attendance dashboard had fewer recorded absences after its introduction. The schools volunteered and received training at the same time as the software, so the study could not separate the effects of training, dashboard use and pre-existing differences. It also counted software activation, which did not establish regular classroom use. The reviewers recommended a more reliable comparison in another group of schools, not compulsory district-wide adoption.\n\nThe follow-up gave every enrolled school the same training and randomly assigned access to the dashboard. All schools used common recording definitions and supplied complete outcomes. Analysts retained schools in their assigned access groups whether or not teachers used the dashboard regularly. The schools again volunteered rather than being sampled from the whole district, and no outcomes have yet been reported. The design separates access from training in a way the original study did not, but includes no separate random assignment to actual classroom use.",
      "stem": "Which of the following statements is correct?",
      "options": [
        "Access is separated from training, but use is not randomised and only volunteers took part.",
        "The follow-up identifies the effect of regular classroom use in every district school.",
        "Only schools that use the dashboard regularly stay in the follow-up analysis.",
        "The district bought the dashboard after the follow-up found a favourable effect of access."
      ],
      "answer": 0,
      "hints": [
        "Separate random assignment of access from actual use of the software and from how schools joined the study.",
        "Which factor is held common in the follow-up, and what has not yet been measured?"
      ],
      "optionNotes": [
        "Correct. All schools got 'the same training and randomly assigned access', but use was not randomised and the schools volunteered.",
        "False. The design randomises access among volunteers; it includes 'no separate random assignment to actual classroom use'.",
        "False. Schools stay in their groups 'whether or not teachers used the dashboard regularly'.",
        "Not supported. 'No outcomes have yet been reported', and no purchase is mentioned."
      ],
      "explanation": "A stronger design can remove one confound without proving a result, a usage effect or district-wide applicability.",
      "reasoning": {
        "model": "Design improvements with remaining exposure and sampling limits",
        "evidence": [
          "schools volunteered",
          "same training and randomly assigned access",
          "retained schools in their assigned access groups"
        ]
      },
      "reviewedAs": "v11-19",
      "solution": [
        "All enrolled schools receive the same training, so training no longer varies with assigned dashboard access.",
        "Schools remain in their assigned groups regardless of actual use; regular-use effects are not separately randomised.",
        "Schools volunteer, and no outcomes are yet reported. The design alone establishes neither a favourable result nor transfer to every district school."
      ],
      "supersedes": "v13-04"
    },
    {
      "id": "v13-05-c",
      "topic": "Forecast revision interpretation",
      "difficulty": 3,
      "challenge": true,
      "keyType": "inference",
      "passage": "A fictional water authority's early forecast of summer demand, based on normal rainfall and the previous year's population estimate, projected 40 million cubic metres. A revised forecast, using the same demand definition, projected 36 million. Between the releases the authority updated both the rainfall assumption and the population estimate, but published no decomposition attributing the change to either input. The revision also incorporated a planned conservation campaign. Its effect came from a model, not from measured responses to that summer's campaign, which had not yet started.\n\nAs a supplementary check, analysts ran the revised model twice: once with the campaign effect set to zero and once with it included. All other inputs were identical in these two runs, and the projected demands differed by one million cubic metres. Actual summer demand has not yet been observed. The authority stressed that a lower forecast is a conditional expectation of demand, not a record of water already saved.",
      "stem": "Which of the following statements is correct?",
      "options": [
        "Population decline alone saved the other three million cubic metres of the revision.",
        "The one-million gap shows the campaign saved a quarter of the revision before it began.",
        "The paired runs isolate a modelled campaign effect, not savings or the whole revision.",
        "Every household cut its use because of the campaign, as the run including it was lower."
      ],
      "answer": 2,
      "hints": [
        "Separate the original forecast revision from the later pair of model runs.",
        "Which input alone changes between the paired runs, and is either run's figure an observed saving?"
      ],
      "optionNotes": [
        "Not supported. The authority 'updated both the rainfall assumption and the population estimate' and gave no decomposition; nor is a forecast a saving.",
        "False. The campaign 'had not yet started', and the figures are model projections, not savings.",
        "Correct. 'All other inputs were identical in these two runs', but demand is unobserved and the revision also changed other inputs.",
        "Overstated. A modelled aggregate difference is turned into an observed response by every household."
      ],
      "explanation": "Changing one model input isolates a conditional model effect. It does not measure a realised effect or explain every difference between separate forecasts.",
      "reasoning": {
        "model": "Isolated model sensitivity versus realised causal contribution",
        "evidence": [
          "campaign, which had not yet started",
          "updated both the rainfall assumption and the population estimate",
          "All other inputs were identical in these two runs"
        ]
      },
      "reviewedAs": "v11-14",
      "solution": [
        "The forecast falls from 40 to 36 million cubic metres while several assumptions change.",
        "The paired runs of the revised model differ only in the campaign assumption, producing a one-million difference within that model.",
        "Actual demand and campaign responses are unobserved; the paired difference neither measures realised savings nor explains the full four-million revision."
      ],
      "supersedes": "v13-05"
    },
    {
      "id": "v13-06-c",
      "topic": "Refuge-room capacity records",
      "difficulty": 3,
      "challenge": true,
      "keyType": "inference",
      "passage": "A fictional fire-safety register records a room as available for refuge when its fire door is operational and its accessible route is unobstructed. It also lists each room's design capacity, which is not a count of people sheltering there; a room keeps its design capacity while temporarily unavailable. A door inspection does not certify the route, and reopening a route does not establish that a defective door has been repaired.\n\nA building has six refuge rooms with a combined design capacity of 48 people. The officer verified that four rooms met both availability conditions and together provided 34 design places. The remaining rooms were Elm, with eight places, and Willow, with six. Elm's door worked but its route was obstructed. Willow's route was clear but its door was defective. A contractor can clear Elm's route or repair Willow's door independently; either action leaves the other room's condition unchanged. Neither action has yet occurred, and no other condition or capacity has changed.",
      "stem": "Which of the following statements is correct?",
      "options": [
        "Repairing Willow's door would add eight places, bringing availability to 42 places.",
        "Clearing only Elm's route gives 42 places, repairing only Willow 40, and both gives 48.",
        "Either single repair would make all 48 places available, as each room passes one check.",
        "The contractor will clear Elm's route first, since that work is quicker and adds more."
      ],
      "answer": 1,
      "hints": [
        "List what each of Elm and Willow lacks to meet both availability conditions.",
        "Add a room's capacity only when an action completes its remaining condition."
      ],
      "optionNotes": [
        "False. Willow has 'six' places; repairing its door adds six, giving 40, while Elm stays obstructed.",
        "Correct. The four available rooms give 34; clearing Elm adds eight, repairing Willow adds six, and both together reach 48.",
        "False. A room is available only if its door 'is operational and its accessible route is unobstructed'; one repair leaves the other room unavailable.",
        "Not supported. The text reports no order of work or comparison of how long each job takes."
      ],
      "explanation": "Count capacity only after every condition for availability is met; stored design capacity is not automatically usable capacity.",
      "reasoning": {
        "model": "Conjunctive operational capacity across separate repairs",
        "evidence": [
          "fire door is operational and its accessible route is unobstructed",
          "four rooms met both availability conditions",
          "Elm's door worked but its route was obstructed",
          "Willow's route was clear but its door was defective"
        ]
      },
      "reviewedAs": "v11-11",
      "solution": [
        "Four available rooms already supply 34 places.",
        "Clearing Elm's route completes its conditions and adds eight places: 34 + 8 = 42. Repairing only Willow adds six: 34 + 6 = 40.",
        "Both independent repairs add 14 places, restoring all 48. Neither single repair fixes the other room."
      ],
      "supersedes": "v13-06"
    },
    {
      "id": "v13-07-c",
      "topic": "Credit recognition across course routes",
      "difficulty": 3,
      "challenge": true,
      "keyType": "inference",
      "passage": "A fictional institute awards a fieldwork credit to students completing either a supervised placement or an approved community project. Placements require an oral evaluation, while every approved project includes a written one. Evaluations cannot be waived on either route, and the credit certificate does not name the route. Research scholarships are restricted to students holding a fieldwork credit and a research-methods pass, so an offer establishes both, but a methods pass alone does not establish fieldwork credit. An ordinary bursary has different conditions.\n\nNeri received a research scholarship under these rules, and the institute confirms that Neri never completed an oral evaluation for any placement. No project evaluation or methods transcript has been released. Another student, Vale, has a published methods pass and an ordinary bursary, but no released fieldwork or scholarship decision. A missing public record is not treated as evidence that a document does not exist, except for Neri's confirmed oral-evaluation history.",
      "stem": "Which of the following statements is correct?",
      "options": [
        "Vale took the community-project route, as the bursary record shows no oral evaluation.",
        "Neri may have done a placement without an oral evaluation, as the certificate is silent.",
        "A methods pass is enough to qualify for a research scholarship at the institute.",
        "Neri passed methods and did a project; Vale's bursary shows no fieldwork route."
      ],
      "answer": 3,
      "hints": [
        "Work backwards from Neri's type of award.",
        "Rule out the route that conflicts with Neri's confirmed evaluation history, but do not treat Vale's missing records as equivalent evidence."
      ],
      "optionNotes": [
        "Not supported. An ordinary bursary 'has different conditions', and Vale has 'no released fieldwork' decision.",
        "False. 'Placements require an oral evaluation', 'Evaluations cannot be waived', and Neri 'never completed an oral evaluation'.",
        "False. Scholarships also require fieldwork credit, and 'a methods pass alone does not establish fieldwork credit'.",
        "Correct. The scholarship requires credit and a methods pass; with no oral evaluation, the credit must come from the project route."
      ],
      "explanation": "An outcome can entail an unreported qualification once the alternatives are exhausted. That requires confirmed absence of a prerequisite, not merely a missing public document.",
      "reasoning": {
        "model": "Backward inference through award and route constraints",
        "evidence": [
          "either a supervised placement or an approved community project",
          "restricted to students holding a fieldwork credit and a research-methods pass",
          "Evaluations cannot be waived",
          "never completed an oral evaluation"
        ]
      },
      "reviewedAs": "v10-19",
      "supersedes": "v13-07"
    },
    {
      "id": "v13-08-c",
      "topic": "Source independence in reporting",
      "difficulty": 3,
      "challenge": true,
      "keyType": "inference",
      "passage": "A fictional policy observatory reviewed claims that a new freight terminal had reduced road congestion. Three newspapers carried the same estimate of time saved: one cited a press briefing, another cited the first newspaper, and the third used a statement from the terminal operator. The briefing and operator statement both drew on the same consultancy model, which compared observed travel times with a simulated no-terminal scenario. A separate traffic monitor recorded shorter journeys on one route, but did not measure displaced congestion elsewhere.\n\nThe supplier later issued a second estimate using a new assumption about displaced congestion, and all three newspapers updated their figure from that release without commissioning another model. The monitor still measures only its original route, where journeys remain shorter, and no record links that local change to the revised assumption. The observatory did not say the estimate was false; it examined how much independent support the reports provided.",
      "stem": "Which of the following statements is correct?",
      "options": [
        "The three updated articles independently support the revised displacement assumption.",
        "The monitor has independently confirmed the new network-wide saving in journey times.",
        "The updated total must be false, as no independent source checked its new assumption.",
        "The updated articles rest on one model; the monitor does not measure displacement."
      ],
      "answer": 3,
      "hints": [
        "Trace the updated newspaper figures back to the evidence that produced them.",
        "Compare the geographic scope of the model with the scope of the independent monitor."
      ],
      "optionNotes": [
        "False. Three publications exist, but all updated from one release 'without commissioning another model'.",
        "False. The monitor gives independent evidence for 'one route' only, not for displaced congestion or the network total.",
        "Not supported. Lack of independent checking is not proof of error; the observatory 'did not say the estimate was false'.",
        "Correct. Both sources 'drew on the same consultancy model', and the monitor 'did not measure displaced congestion elsewhere'."
      ],
      "explanation": "Count independent sources of evidence, not publications, and match the scope of each observation to the claim being assessed.",
      "reasoning": {
        "model": "Versioned source dependence versus narrower independent evidence",
        "evidence": [
          "both drew on the same consultancy model",
          "did not measure displaced congestion elsewhere",
          "without commissioning another model"
        ]
      },
      "reviewedAs": "v11-17",
      "solution": [
        "All three updated newspaper totals derive from the same revised model assumption.",
        "The monitor independently observes shorter journeys on one route, not displaced congestion throughout the network.",
        "Repeated publication and a narrower observation do not independently validate the model's network-wide counterfactual. Lack of validation also does not prove it false."
      ],
      "supersedes": "v13-08"
    },
    {
      "id": "v13-09-c",
      "topic": "Diagnostic threshold comparisons",
      "difficulty": 3,
      "challenge": true,
      "keyType": "inference",
      "passage": "A fictional occupational clinic reported that the share of workers flagged by its hearing screen fell from 18% to 11% over two years. Meanwhile the clinic changed the flag threshold: the second year's rule required a larger measured loss, while instruments and test conditions stayed the same. It also introduced quieter machinery, which managers considered a plausible explanation. The published figures used each year's applicable threshold, without raw measurements or results recalculated under a common rule. The workforce changed through recruitment and retirement, with no analysis identifying people screened in both years.\n\nA separate check reapplied both thresholds to the unchanged raw results of 100 continuing workers, using the same measured loss for each worker in both classifications. Eighteen received a flag under the old rule and eleven under the new one. The seven no longer flagged had not been retested in between. No common-rule comparison for the full workforce was released.",
      "stem": "Which of the following statements is correct?",
      "options": [
        "The seven lost flags in the check show that those workers' hearing had genuinely improved.",
        "The check's seven lost flags all come from the new rule; the annual fall is not apportioned.",
        "Every worker unflagged in the check had also improved between the two annual screens.",
        "The workforce's lower annual flag rate stems entirely from the change in threshold."
      ],
      "answer": 1,
      "hints": [
        "Keep the reclassification of unchanged data separate from the annual workforce comparison.",
        "Did any measurement change between applying the two thresholds to the fixed data?"
      ],
      "optionNotes": [
        "False. The check used 'unchanged raw results', and the seven 'had not been retested in between'.",
        "Correct. With identical measurements, the lost flags come from the stricter rule; the workforce data also changed in membership, with no common-rule comparison.",
        "Not supported. The check reclassifies one set of results and reveals nothing about each worker's hearing between the annual screens.",
        "Overstated. The check shows a threshold effect on fixed data, but the annual comparison also involved a changed workforce and new machinery."
      ],
      "explanation": "A classification change on fixed evidence can be isolated without explaining a separate comparison whose population and measurements may differ.",
      "reasoning": {
        "model": "Nested reclassification versus longitudinal change",
        "evidence": [
          "required a larger measured loss",
          "no analysis identifying people screened in both years",
          "unchanged raw results of 100 continuing workers"
        ]
      },
      "reviewedAs": "v11-01",
      "solution": [
        "The check applies two thresholds to exactly the same measurements for 100 continuing workers.",
        "Flags fall from 18 to 11, so seven flags disappear through reclassification rather than a measured hearing improvement in that check.",
        "The annual workforce comparison also involves changed membership and possibly changed hearing, so the check cannot apportion that annual change."
      ],
      "supersedes": "v13-09"
    },
    {
      "id": "v13-10-c",
      "topic": "Long-term maintenance estimates",
      "difficulty": 3,
      "challenge": true,
      "keyType": "inference",
      "passage": "A fictional infrastructure committee compared two resurfacing options over ten years. Option Red cost less to install, while Option Blue was expected to need fewer repairs. The initial report estimated total expenditure under a scenario of specified traffic growth, without claiming that the forecast was certain. Under that scenario, Blue had the lower estimated total cost despite its higher initial price. In a later sensitivity analysis, Blue kept its advantage in the high-growth scenario. In the low-growth scenario, Red had the lower total estimate. Neither analysis valued disruption to road users or environmental effects.\n\nThe council is considering two claims for a public leaflet: that Blue is preferable under the central expenditure model, and that Blue is cheaper in every possible future once disruption and environmental effects are included. The council keeps the central traffic assumption but has obtained no new valuation of omitted effects. Its chosen contract lets later maintenance decisions change, but no report estimates the consequences of using that flexibility.",
      "stem": "Which of the following statements is correct?",
      "options": [
        "The low-growth scenario is the more likely, as the council kept maintenance flexibility.",
        "Pricing disruption would reverse the central ranking and make Red cheaper over ten years.",
        "Blue's contract flexibility makes it the cheaper option in any possible traffic future.",
        "The central model favours Blue conditionally; flexibility does not price omitted effects."
      ],
      "answer": 3,
      "hints": [
        "List which costs and traffic assumptions each estimate includes.",
        "Separate a conditional ranking from a claim about every future or about unvalued effects."
      ],
      "optionNotes": [
        "Not supported. The text gives no probabilities for the scenarios.",
        "Not supported. 'Neither analysis valued disruption', so neither the direction nor the size of any change is known.",
        "False. 'In the low-growth scenario, Red had the lower total estimate', and no report estimates the effect of the flexibility.",
        "Correct. Blue is cheaper 'under that scenario', and there is 'no new valuation of omitted effects' or of the flexibility."
      ],
      "explanation": "A conditional cost advantage cannot be turned into an unconditional recommendation by adding unmeasured effects or contractual flexibility.",
      "reasoning": {
        "model": "Conditional dominance versus unpriced decision dimensions",
        "evidence": [
          "Under that scenario, Blue had the lower estimated total cost",
          "In the low-growth scenario, Red had the lower total estimate",
          "Neither analysis valued disruption",
          "no new valuation of omitted effects"
        ]
      },
      "reviewedAs": "v11-10",
      "solution": [
        "Blue is cheaper under the central model's traffic assumption and included expenditure categories.",
        "Red is cheaper in the low-growth scenario, so the supplied results already show scenario dependence.",
        "Disruption, environmental effects and the maintenance option's consequences remain unvalued; flexibility supplies neither a new valuation nor certainty about all futures."
      ],
      "supersedes": "v13-10"
    }
  ]
});
