var rules = [
{ target: 58, destination: 167, coef: 20.0/33, message: "60% from the social tax goes to pension fund," },
{ target: 58, destination: 150, coef: 13.0/33, message: "and 40% - to the health insurance fund." },
{ target: 167, destination: 58, coef: 1.0, message: "Pensions are financed from the social tax." },
{ target: 150, destination: 58, coef: 1.0, message: "Health insurance is financed from the social tax." },
{ target: 62, destination: 140, coef: 3.0/4, message: "75% of fuel excise pays for road construction" },
{ target: 60, destination: 153, coef: 35.0/1000, message: "3.5% of alcohol excise goes to culture support" },
{ target: 61, destination: 153, coef: 35.0/1000, message: "3.5% of tobacco excise goes to culture support" },
{ target: 65, destination: 152, coef: 83.0/100, message: "83% of gambling tax goes to support culture and sport" }
];

