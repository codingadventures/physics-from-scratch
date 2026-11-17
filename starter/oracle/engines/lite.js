// Box2D Lite, ported to TypeScript for this course's oracle and minified. Do not edit.
// Original: https://github.com/erincatto/box2d-lite
// Copyright (c) 2006-2009 Erin Catto http://www.gphysics.com
// MIT License, Copyright (c) 2019 Erin Catto (see the LICENSE in that repository).
// Port notes: doubles instead of float32, joints removed, bodies ordered by creation index,
// plus a "course" step order. Checked against the C++ original; see oracle/README.md.
//#region oracle/engines/lite/lite.ts
var e = (e, t) => ({
	x: e.x + t.x,
	y: e.y + t.y
}), t = (e, t) => ({
	x: e.x - t.x,
	y: e.y - t.y
}), n = (e, t) => ({
	x: e * t.x,
	y: e * t.y
}), r = (e) => ({
	x: -e.x,
	y: -e.y
}), i = (e, t) => e.x * t.x + e.y * t.y, a = (e, t) => e.x * t.y - e.y * t.x, o = (e, t) => ({
	x: t * e.y,
	y: -t * e.x
}), s = (e, t) => ({
	x: -e * t.y,
	y: e * t.x
}), c = (e, t, n) => Math.max(t, Math.min(e, n)), l = (e) => e < 0 ? -1 : 1, u = (e) => {
	let t = Math.cos(e), n = Math.sin(e);
	return {
		c1: {
			x: t,
			y: n
		},
		c2: {
			x: -n,
			y: t
		}
	};
}, d = (e) => ({
	c1: {
		x: e.c1.x,
		y: e.c2.x
	},
	c2: {
		x: e.c1.y,
		y: e.c2.y
	}
}), f = (e, t) => ({
	x: e.c1.x * t.x + e.c2.x * t.y,
	y: e.c1.y * t.x + e.c2.y * t.y
}), p = (e, t) => ({
	c1: f(e, t.c1),
	c2: f(e, t.c2)
}), m = (e) => ({
	c1: {
		x: Math.abs(e.c1.x),
		y: Math.abs(e.c1.y)
	},
	c2: {
		x: Math.abs(e.c2.x),
		y: Math.abs(e.c2.y)
	}
}), h = class {
	position = {
		x: 0,
		y: 0
	};
	rotation = 0;
	velocity = {
		x: 0,
		y: 0
	};
	angularVelocity = 0;
	force = {
		x: 0,
		y: 0
	};
	torque = 0;
	width = {
		x: 1,
		y: 1
	};
	friction = .2;
	mass = Infinity;
	invMass = 0;
	I = Infinity;
	invI = 0;
	index = -1;
	constructor(e, t) {
		this.width = { ...e }, t > 0 && Number.isFinite(t) && (this.mass = t, this.invMass = 1 / t, this.I = t * (e.x * e.x + e.y * e.y) / 12, this.invI = 1 / this.I);
	}
}, g = () => ({
	position: {
		x: 0,
		y: 0
	},
	normal: {
		x: 0,
		y: 0
	},
	r1: {
		x: 0,
		y: 0
	},
	r2: {
		x: 0,
		y: 0
	},
	separation: 0,
	Pn: 0,
	Pt: 0,
	Pnb: 0,
	massNormal: 0,
	massTangent: 0,
	bias: 0,
	feature: [
		0,
		0,
		0,
		0
	]
}), _ = 0, v = 1, y = 2, b = 3, x = 4, S = () => ({
	v: {
		x: 0,
		y: 0
	},
	fp: [
		0,
		0,
		0,
		0
	]
});
function C(e) {
	[e[0], e[2]] = [e[2], e[0]], [e[1], e[3]] = [e[3], e[1]];
}
function w(r, a, o, s) {
	let c = [], l = i(a, r[0].v) - o, u = i(a, r[1].v) - o;
	if (l <= 0 && c.push(r[0]), u <= 0 && c.push(r[1]), l * u < 0) {
		let i = l / (l - u), a = S();
		a.v = e(r[0].v, n(i, t(r[1].v, r[0].v))), l > 0 ? (a.fp = [...r[0].fp], a.fp[0] = s, a.fp[2] = _) : (a.fp = [...r[1].fp], a.fp[1] = s, a.fp[3] = _), c.push(a);
	}
	return c;
}
function T(t, n, i, a) {
	let o = r(f(d(i), a)), s = {
		x: Math.abs(o.x),
		y: Math.abs(o.y)
	}, c = [S(), S()];
	return s.x > s.y ? l(o.x) > 0 ? (c[0].v = {
		x: t.x,
		y: -t.y
	}, c[0].fp[2] = b, c[0].fp[3] = x, c[1].v = {
		x: t.x,
		y: t.y
	}, c[1].fp[2] = x, c[1].fp[3] = v) : (c[0].v = {
		x: -t.x,
		y: t.y
	}, c[0].fp[2] = v, c[0].fp[3] = y, c[1].v = {
		x: -t.x,
		y: -t.y
	}, c[1].fp[2] = y, c[1].fp[3] = b) : l(o.y) > 0 ? (c[0].v = {
		x: t.x,
		y: t.y
	}, c[0].fp[2] = x, c[0].fp[3] = v, c[1].v = {
		x: -t.x,
		y: t.y
	}, c[1].fp[2] = v, c[1].fp[3] = y) : (c[0].v = {
		x: -t.x,
		y: -t.y
	}, c[0].fp[2] = y, c[0].fp[3] = b, c[1].v = {
		x: t.x,
		y: -t.y
	}, c[1].fp[2] = b, c[1].fp[3] = x), c[0].v = e(n, f(i, c[0].v)), c[1].v = e(n, f(i, c[1].v)), c;
}
function E(e, a) {
	let o = n(.5, e.width), s = n(.5, a.width), c = e.position, l = a.position, h = u(e.rotation), _ = u(a.rotation), S = d(h), E = d(_), D = t(l, c), O = f(S, D), k = f(E, D), A = m(p(S, _)), j = d(A), M = {
		x: Math.abs(O.x),
		y: Math.abs(O.y)
	}, N = {
		x: Math.abs(k.x),
		y: Math.abs(k.y)
	}, P = f(A, s), F = {
		x: M.x - o.x - P.x,
		y: M.y - o.y - P.y
	};
	if (F.x > 0 || F.y > 0) return [];
	let I = f(j, o), L = {
		x: N.x - I.x - s.x,
		y: N.y - I.y - s.y
	};
	if (L.x > 0 || L.y > 0) return [];
	let R = "FACE_A_X", z = F.x, B = O.x > 0 ? h.c1 : r(h.c1), V = .95, H = .01;
	F.y > V * z + H * o.y && (R = "FACE_A_Y", z = F.y, B = O.y > 0 ? h.c2 : r(h.c2)), L.x > V * z + H * s.x && (R = "FACE_B_X", z = L.x, B = k.x > 0 ? _.c1 : r(_.c1)), L.y > V * z + H * s.y && (R = "FACE_B_Y", z = L.y, B = k.y > 0 ? _.c2 : r(_.c2));
	let U, W, G, K, q, J, Y, X;
	switch (R) {
		case "FACE_A_X": {
			U = B, K = i(c, U) + o.x, W = h.c2;
			let e = i(c, W);
			q = -e + o.y, J = e + o.y, Y = b, X = v, G = T(s, l, _, U);
			break;
		}
		case "FACE_A_Y": {
			U = B, K = i(c, U) + o.y, W = h.c1;
			let e = i(c, W);
			q = -e + o.x, J = e + o.x, Y = y, X = x, G = T(s, l, _, U);
			break;
		}
		case "FACE_B_X": {
			U = r(B), K = i(l, U) + s.x, W = _.c2;
			let e = i(l, W);
			q = -e + s.y, J = e + s.y, Y = b, X = v, G = T(o, c, h, U);
			break;
		}
		case "FACE_B_Y": {
			U = r(B), K = i(l, U) + s.y, W = _.c1;
			let e = i(l, W);
			q = -e + s.x, J = e + s.x, Y = y, X = x, G = T(o, c, h, U);
			break;
		}
	}
	let Z = w(G, r(W), q, Y);
	if (Z.length < 2) return [];
	let Q = w(Z, W, J, X);
	if (Q.length < 2) return [];
	let $ = [];
	for (let e = 0; e < 2; e++) {
		let r = i(U, Q[e].v) - K;
		if (r <= 0) {
			let i = g();
			i.separation = r, i.normal = { ...B }, i.position = t(Q[e].v, n(r, U)), i.feature = [...Q[e].fp], (R === "FACE_B_X" || R === "FACE_B_Y") && C(i.feature), $.push(i);
		}
	}
	return $;
}
var D = (e, t) => e[0] === t[0] && e[1] === t[1] && e[2] === t[2] && e[3] === t[3], O = class {
	contacts;
	body1;
	body2;
	friction;
	constructor(e, t) {
		e.index < t.index ? (this.body1 = e, this.body2 = t) : (this.body1 = t, this.body2 = e), this.contacts = E(this.body1, this.body2), this.friction = Math.sqrt(this.body1.friction * this.body2.friction);
	}
	update(e, t) {
		let n = [];
		for (let r = 0; r < e.length; r++) {
			let i = e[r], a = -1;
			for (let e = 0; e < this.contacts.length; e++) if (D(i.feature, this.contacts[e].feature)) {
				a = e;
				break;
			}
			if (a > -1) {
				let e = this.contacts[a], o = { ...i };
				t ? (o.Pn = e.Pn, o.Pt = e.Pt, o.Pnb = e.Pnb) : (o.Pn = 0, o.Pt = 0, o.Pnb = 0), n[r] = o;
			} else n[r] = e[r];
		}
		this.contacts = n;
	}
	preStep(r, s) {
		let c = s.positionCorrection ? .2 : 0, l = this.body1, u = this.body2;
		for (let d of this.contacts) {
			let f = t(d.position, l.position), p = t(d.position, u.position), m = i(f, d.normal), h = i(p, d.normal), g = l.invMass + u.invMass;
			g += l.invI * (i(f, f) - m * m) + u.invI * (i(p, p) - h * h), d.massNormal = 1 / g;
			let _ = o(d.normal, 1), v = i(f, _), y = i(p, _), b = l.invMass + u.invMass;
			if (b += l.invI * (i(f, f) - v * v) + u.invI * (i(p, p) - y * y), d.massTangent = 1 / b, d.bias = -c * r * Math.min(0, d.separation + .01), s.accumulateImpulses) {
				let r = e(n(d.Pn, d.normal), n(d.Pt, _));
				l.velocity = t(l.velocity, n(l.invMass, r)), l.angularVelocity -= l.invI * a(f, r), u.velocity = e(u.velocity, n(u.invMass, r)), u.angularVelocity += u.invI * a(p, r);
			}
		}
	}
	applyImpulse(r) {
		let l = this.body1, u = this.body2, d = (n) => t(t(e(u.velocity, s(u.angularVelocity, n.r2)), l.velocity), s(l.angularVelocity, n.r1));
		for (let s of this.contacts) {
			s.r1 = t(s.position, l.position), s.r2 = t(s.position, u.position);
			let f = d(s), p = i(f, s.normal), m = s.massNormal * (-p + s.bias);
			if (r.accumulateImpulses) {
				let e = s.Pn;
				s.Pn = Math.max(e + m, 0), m = s.Pn - e;
			} else m = Math.max(m, 0);
			let h = n(m, s.normal);
			l.velocity = t(l.velocity, n(l.invMass, h)), l.angularVelocity -= l.invI * a(s.r1, h), u.velocity = e(u.velocity, n(u.invMass, h)), u.angularVelocity += u.invI * a(s.r2, h), f = d(s);
			let g = o(s.normal, 1), _ = i(f, g), v = s.massTangent * -_;
			if (r.accumulateImpulses) {
				let e = this.friction * s.Pn, t = s.Pt;
				s.Pt = c(t + v, -e, e), v = s.Pt - t;
			} else {
				let e = this.friction * m;
				v = c(v, -e, e);
			}
			let y = n(v, g);
			l.velocity = t(l.velocity, n(l.invMass, y)), l.angularVelocity -= l.invI * a(s.r1, y), u.velocity = e(u.velocity, n(u.invMass, y)), u.angularVelocity += u.invI * a(s.r2, y);
		}
	}
}, k = class {
	bodies = [];
	gravity;
	options;
	arbiters = /* @__PURE__ */ new Map();
	constructor(e, t = {}) {
		this.gravity = e, this.options = {
			iterations: t.iterations ?? 10,
			accumulateImpulses: t.accumulateImpulses ?? !0,
			warmStarting: t.warmStarting ?? !0,
			positionCorrection: t.positionCorrection ?? !0,
			stepOrder: t.stepOrder ?? "lite"
		};
	}
	add(e) {
		return e.index = this.bodies.length, this.bodies.push(e), e;
	}
	sortedArbiters() {
		return [...this.arbiters.entries()].map(([e, t]) => ({
			key: e,
			arb: t
		})).sort((e, t) => e.arb.body1.index - t.arb.body1.index || e.arb.body2.index - t.arb.body2.index).map((e) => e.arb);
	}
	contacts() {
		return this.sortedArbiters().map((e) => ({
			a: e.body1,
			b: e.body2,
			contacts: e.contacts
		}));
	}
	broadPhase() {
		for (let e = 0; e < this.bodies.length; e++) {
			let t = this.bodies[e];
			for (let n = e + 1; n < this.bodies.length; n++) {
				let e = this.bodies[n];
				if (t.invMass === 0 && e.invMass === 0) continue;
				let r = new O(t, e), i = `${t.index},${e.index}`;
				if (r.contacts.length > 0) {
					let e = this.arbiters.get(i);
					e === void 0 ? this.arbiters.set(i, r) : e.update(r.contacts, this.options.warmStarting);
				} else this.arbiters.delete(i);
			}
		}
	}
	integrateForces(t) {
		for (let r of this.bodies) r.invMass !== 0 && (r.velocity = e(r.velocity, n(t, e(this.gravity, n(r.invMass, r.force)))), r.angularVelocity += t * r.invI * r.torque);
	}
	integratePositions(t) {
		for (let r of this.bodies) r.position = e(r.position, n(t, r.velocity)), r.rotation += t * r.angularVelocity, r.force = {
			x: 0,
			y: 0
		}, r.torque = 0;
	}
	solve(e) {
		let t = e > 0 ? 1 / e : 0, n = this.sortedArbiters();
		for (let e of n) e.preStep(t, this.options);
		for (let e = 0; e < this.options.iterations; e++) for (let e of n) e.applyImpulse(this.options);
	}
	step(e) {
		this.options.stepOrder === "lite" ? (this.broadPhase(), this.integrateForces(e), this.solve(e), this.integratePositions(e)) : (this.integrateForces(e), this.integratePositions(e), this.broadPhase(), this.solve(e));
	}
};
//#endregion
export { h as LiteBody, k as LiteWorld, E as collideBoxes };
