const hereCredentials = {
  id: "b1UHj59KDodUVVfjckov",
  code: "OpNaGbdG-3Q5Pzud3dx69g"
};

const hereIsolineUrl = ({ mode, traffic, center, range, type }) =>
  `https://isoline.route.api.here.com/routing/7.2/calculateisoline.json
?app_id=${hereCredentials.id}
&app_code=${hereCredentials.code}
&mode=shortest;${mode};
traffic:${traffic ? "enabled" : "disabled"}
&start=geo!${center[0]},${center[1]}
&range=${range}
&rangetype=${type}`;

const hereTileUrl = style =>
  `https://2.base.maps.api.here.com/maptile/2.1/maptile/newest/${style}/{z}/{x}/{y}/512/png8?app_id=${hereCredentials.id}&app_code=${hereCredentials.code}&ppi=320`;

const maxIsolineRangeLookup = {
  time: 32400,
  distance: 800000
};

export { hereCredentials, hereIsolineUrl, hereTileUrl, maxIsolineRangeLookup };
