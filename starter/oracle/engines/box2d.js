/*
 * box2d.ts (https://github.com/flyover/box2d.ts, commit 7b387c3, 2023-06-29), a TypeScript port
 * of Box2D 2.4, bundled and minified for this course's oracle. Do not edit.
 * Copyright (c) 2006-2011 Erin Catto http://www.box2d.org
 *
 * This software is provided 'as-is', without any express or implied
 * warranty.  In no event will the authors be held liable for any damages
 * arising from the use of this software.
 * Permission is granted to anyone to use this software for any purpose,
 * including commercial applications, and to alter it and redistribute it
 * freely, subject to the following restrictions:
 * 1. The origin of this software must not be misrepresented; you must not
 * claim that you wrote the original software. If you use this software
 * in a product, an acknowledgment in the product documentation would be
 * appreciated but is not required.
 * 2. Altered source versions must be plainly marked as such, and must not be
 * misrepresented as being the original software.
 * 3. This notice may not be removed or altered from any source distribution.
 *
 * This file is an altered source version: it is a bundle of the TypeScript port's compiled
 * output, tree-shaken to the classes the oracle uses.
 */
//#region ../../../../tmp/claude-0/-home-user/98102b14-929e-54a0-bb74-ef07c2e34668/scratchpad/b2/esm/common/b2_draw.js
var e = class e {
	r;
	g;
	b;
	a;
	static ZERO = new e(0, 0, 0, 0);
	static RED = new e(1, 0, 0);
	static GREEN = new e(0, 1, 0);
	static BLUE = new e(0, 0, 1);
	constructor(e = .5, t = .5, n = .5, r = 1) {
		this.r = e, this.g = t, this.b = n, this.a = r;
	}
	Clone() {
		return new e().Copy(this);
	}
	Copy(e) {
		return this.r = e.r, this.g = e.g, this.b = e.b, this.a = e.a, this;
	}
	IsEqual(e) {
		return this.r === e.r && this.g === e.g && this.b === e.b && this.a === e.a;
	}
	IsZero() {
		return this.r === 0 && this.g === 0 && this.b === 0 && this.a === 0;
	}
	Set(e, t, n, r = this.a) {
		this.SetRGBA(e, t, n, r);
	}
	SetByteRGB(e, t, n) {
		return this.r = e / 255, this.g = t / 255, this.b = n / 255, this;
	}
	SetByteRGBA(e, t, n, r) {
		return this.r = e / 255, this.g = t / 255, this.b = n / 255, this.a = r / 255, this;
	}
	SetRGB(e, t, n) {
		return this.r = e, this.g = t, this.b = n, this;
	}
	SetRGBA(e, t, n, r) {
		return this.r = e, this.g = t, this.b = n, this.a = r, this;
	}
	SelfAdd(e) {
		return this.r += e.r, this.g += e.g, this.b += e.b, this.a += e.a, this;
	}
	Add(e, t) {
		return t.r = this.r + e.r, t.g = this.g + e.g, t.b = this.b + e.b, t.a = this.a + e.a, t;
	}
	SelfSub(e) {
		return this.r -= e.r, this.g -= e.g, this.b -= e.b, this.a -= e.a, this;
	}
	Sub(e, t) {
		return t.r = this.r - e.r, t.g = this.g - e.g, t.b = this.b - e.b, t.a = this.a - e.a, t;
	}
	SelfMul(e) {
		return this.r *= e, this.g *= e, this.b *= e, this.a *= e, this;
	}
	Mul(e, t) {
		return t.r = this.r * e, t.g = this.g * e, t.b = this.b * e, t.a = this.a * e, t;
	}
	Mix(t, n) {
		e.MixColors(this, t, n);
	}
	static MixColors(e, t, n) {
		let r = n * (t.r - e.r), i = n * (t.g - e.g), a = n * (t.b - e.b), o = n * (t.a - e.a);
		e.r += r, e.g += i, e.b += a, e.a += o, t.r -= r, t.g -= i, t.b -= a, t.a -= o;
	}
	MakeStyleString(t = this.a) {
		return e.MakeStyleString(this.r, this.g, this.b, t);
	}
	static MakeStyleString(e, t, n, r = 1) {
		return e *= 255, t *= 255, n *= 255, r < 1 ? `rgba(${e},${t},${n},${r})` : `rgb(${e},${t},${n})`;
	}
}, t = class t {
	data;
	get r() {
		return this.data[0];
	}
	set r(e) {
		this.data[0] = e;
	}
	get g() {
		return this.data[1];
	}
	set g(e) {
		this.data[1] = e;
	}
	get b() {
		return this.data[2];
	}
	set b(e) {
		this.data[2] = e;
	}
	get a() {
		return this.data[3];
	}
	set a(e) {
		this.data[3] = e;
	}
	constructor(...e) {
		if (e[0] instanceof Float32Array) {
			if (e[0].length !== 4) throw Error();
			this.data = e[0];
		} else {
			let t = typeof e[0] == "number" ? e[0] : .5, n = typeof e[1] == "number" ? e[1] : .5, r = typeof e[2] == "number" ? e[2] : .5, i = typeof e[3] == "number" ? e[3] : 1;
			this.data = new Float32Array([
				t,
				n,
				r,
				i
			]);
		}
	}
	Clone() {
		return new t(new Float32Array(this.data));
	}
	Copy(e) {
		return e instanceof t ? this.data.set(e.data) : (this.r = e.r, this.g = e.g, this.b = e.b, this.a = e.a), this;
	}
	IsEqual(e) {
		return this.r === e.r && this.g === e.g && this.b === e.b && this.a === e.a;
	}
	IsZero() {
		return this.r === 0 && this.g === 0 && this.b === 0 && this.a === 0;
	}
	Set(e, t, n, r = this.a) {
		this.SetRGBA(e, t, n, r);
	}
	SetByteRGB(e, t, n) {
		return this.r = e / 255, this.g = t / 255, this.b = n / 255, this;
	}
	SetByteRGBA(e, t, n, r) {
		return this.r = e / 255, this.g = t / 255, this.b = n / 255, this.a = r / 255, this;
	}
	SetRGB(e, t, n) {
		return this.r = e, this.g = t, this.b = n, this;
	}
	SetRGBA(e, t, n, r) {
		return this.r = e, this.g = t, this.b = n, this.a = r, this;
	}
	SelfAdd(e) {
		return this.r += e.r, this.g += e.g, this.b += e.b, this.a += e.a, this;
	}
	Add(e, t) {
		return t.r = this.r + e.r, t.g = this.g + e.g, t.b = this.b + e.b, t.a = this.a + e.a, t;
	}
	SelfSub(e) {
		return this.r -= e.r, this.g -= e.g, this.b -= e.b, this.a -= e.a, this;
	}
	Sub(e, t) {
		return t.r = this.r - e.r, t.g = this.g - e.g, t.b = this.b - e.b, t.a = this.a - e.a, t;
	}
	SelfMul(e) {
		return this.r *= e, this.g *= e, this.b *= e, this.a *= e, this;
	}
	Mul(e, t) {
		return t.r = this.r * e, t.g = this.g * e, t.b = this.b * e, t.a = this.a * e, t;
	}
	Mix(t, n) {
		e.MixColors(this, t, n);
	}
	MakeStyleString(t = this.a) {
		return e.MakeStyleString(this.r, this.g, this.b, t);
	}
}, n;
(function(e) {
	e[e.e_none = 0] = "e_none", e[e.e_shapeBit = 1] = "e_shapeBit", e[e.e_jointBit = 2] = "e_jointBit", e[e.e_aabbBit = 4] = "e_aabbBit", e[e.e_pairBit = 8] = "e_pairBit", e[e.e_centerOfMassBit = 16] = "e_centerOfMassBit", e[e.e_particleBit = 32] = "e_particleBit", e[e.e_controllerBit = 64] = "e_controllerBit", e[e.e_all = 63] = "e_all";
})(n ||= {});
//#endregion
//#region ../../../../tmp/claude-0/-home-user/98102b14-929e-54a0-bb74-ef07c2e34668/scratchpad/b2/esm/common/b2_common.js
function r(e, t) {
	return e === void 0 ? t : e;
}
var i = 1e37, a = 1e-5;
a * a;
var o = 3.14159265359, s = .1, c = .005, l = 2 / 180 * o, u = 2 * c, d = .2, f = 8 / 180 * o, p = .5 * o;
p * p;
var m = .2, h = .75, g = .75, _ = .25, v = .5, y = 2.5, b = .01, x = 2 / 180 * o;
new class {
	major = 0;
	minor = 0;
	revision = 0;
	constructor(e = 0, t = 0, n = 0) {
		this.major = e, this.minor = t, this.revision = n;
	}
	toString() {
		return this.major + "." + this.minor + "." + this.revision;
	}
}(2, 4, 1);
function S(e, t) {
	let n = Array(e);
	for (let r = 0; r < e; ++r) n[r] = t(r);
	return n;
}
function C(e, t = 0) {
	let n = Array(e);
	for (let r = 0; r < e; ++r) n[r] = t;
	return n;
}
//#endregion
//#region ../../../../tmp/claude-0/-home-user/98102b14-929e-54a0-bb74-ef07c2e34668/scratchpad/b2/esm/common/b2_growable_stack.js
var w = class {
	m_stack = [];
	m_count = 0;
	constructor(e) {
		this.m_stack = S(e, (e) => null), this.m_count = 0;
	}
	Reset() {
		return this.m_count = 0, this;
	}
	Push(e) {
		this.m_stack[this.m_count] = e, this.m_count++;
	}
	Pop() {
		this.m_count--;
		let e = this.m_stack[this.m_count];
		return this.m_stack[this.m_count] = null, e;
	}
	GetCount() {
		return this.m_count;
	}
};
o / 180, 180 / o;
var T = 2 * o, E = Math.abs;
function D(e, t) {
	return e < t ? e : t;
}
function O(e, t) {
	return e > t ? e : t;
}
function k(e, t, n) {
	return e < t ? t : e > n ? n : e;
}
function A(e) {
	return e * e;
}
function ee(e) {
	return 1 / Math.sqrt(e);
}
var j = Math.sqrt, te = Math.pow, ne = Math.asin, M = class e {
	x;
	y;
	static ZERO = new e(0, 0);
	static UNITX = new e(1, 0);
	static UNITY = new e(0, 1);
	static s_t0 = new e();
	static s_t1 = new e();
	static s_t2 = new e();
	static s_t3 = new e();
	constructor(e = 0, t = 0) {
		this.x = e, this.y = t;
	}
	Clone() {
		return new e(this.x, this.y);
	}
	SetZero() {
		return this.x = 0, this.y = 0, this;
	}
	Set(e, t) {
		return this.x = e, this.y = t, this;
	}
	Copy(e) {
		return this.x = e.x, this.y = e.y, this;
	}
	SelfAdd(e) {
		return this.x += e.x, this.y += e.y, this;
	}
	SelfAddXY(e, t) {
		return this.x += e, this.y += t, this;
	}
	SelfSub(e) {
		return this.x -= e.x, this.y -= e.y, this;
	}
	SelfSubXY(e, t) {
		return this.x -= e, this.y -= t, this;
	}
	SelfMul(e) {
		return this.x *= e, this.y *= e, this;
	}
	SelfMulAdd(e, t) {
		return this.x += e * t.x, this.y += e * t.y, this;
	}
	SelfMulSub(e, t) {
		return this.x -= e * t.x, this.y -= e * t.y, this;
	}
	Dot(e) {
		return this.x * e.x + this.y * e.y;
	}
	Cross(e) {
		return this.x * e.y - this.y * e.x;
	}
	Length() {
		let e = this.x, t = this.y;
		return Math.sqrt(e * e + t * t);
	}
	LengthSquared() {
		let e = this.x, t = this.y;
		return e * e + t * t;
	}
	Normalize() {
		let e = this.Length();
		if (e >= 1e-5) {
			let t = 1 / e;
			this.x *= t, this.y *= t;
		}
		return e;
	}
	SelfNormalize() {
		let e = this.Length();
		if (e >= 1e-5) {
			let t = 1 / e;
			this.x *= t, this.y *= t;
		}
		return this;
	}
	SelfRotate(e) {
		let t = Math.cos(e), n = Math.sin(e), r = this.x;
		return this.x = t * r - n * this.y, this.y = n * r + t * this.y, this;
	}
	SelfRotateCosSin(e, t) {
		let n = this.x;
		return this.x = e * n - t * this.y, this.y = t * n + e * this.y, this;
	}
	IsValid() {
		return isFinite(this.x) && isFinite(this.y);
	}
	SelfCrossVS(e) {
		let t = this.x;
		return this.x = e * this.y, this.y = -e * t, this;
	}
	SelfCrossSV(e) {
		let t = this.x;
		return this.x = -e * this.y, this.y = e * t, this;
	}
	SelfMinV(e) {
		return this.x = D(this.x, e.x), this.y = D(this.y, e.y), this;
	}
	SelfMaxV(e) {
		return this.x = O(this.x, e.x), this.y = O(this.y, e.y), this;
	}
	SelfAbs() {
		return this.x = E(this.x), this.y = E(this.y), this;
	}
	SelfNeg() {
		return this.x = -this.x, this.y = -this.y, this;
	}
	SelfSkew() {
		let e = this.x;
		return this.x = -this.y, this.y = e, this;
	}
	static MakeArray(t) {
		return S(t, (t) => new e());
	}
	static AbsV(e, t) {
		return t.x = E(e.x), t.y = E(e.y), t;
	}
	static MinV(e, t, n) {
		return n.x = D(e.x, t.x), n.y = D(e.y, t.y), n;
	}
	static MaxV(e, t, n) {
		return n.x = O(e.x, t.x), n.y = O(e.y, t.y), n;
	}
	static ClampV(e, t, n, r) {
		return r.x = k(e.x, t.x, n.x), r.y = k(e.y, t.y, n.y), r;
	}
	static RotateV(e, t, n) {
		let r = e.x, i = e.y, a = Math.cos(t), o = Math.sin(t);
		return n.x = a * r - o * i, n.y = o * r + a * i, n;
	}
	static DotVV(e, t) {
		return e.x * t.x + e.y * t.y;
	}
	static CrossVV(e, t) {
		return e.x * t.y - e.y * t.x;
	}
	static CrossVS(e, t, n) {
		let r = e.x;
		return n.x = t * e.y, n.y = -t * r, n;
	}
	static CrossVOne(e, t) {
		let n = e.x;
		return t.x = e.y, t.y = -n, t;
	}
	static CrossSV(e, t, n) {
		let r = t.x;
		return n.x = -e * t.y, n.y = e * r, n;
	}
	static CrossOneV(e, t) {
		let n = e.x;
		return t.x = -e.y, t.y = n, t;
	}
	static AddVV(e, t, n) {
		return n.x = e.x + t.x, n.y = e.y + t.y, n;
	}
	static SubVV(e, t, n) {
		return n.x = e.x - t.x, n.y = e.y - t.y, n;
	}
	static MulSV(e, t, n) {
		return n.x = t.x * e, n.y = t.y * e, n;
	}
	static MulVS(e, t, n) {
		return n.x = e.x * t, n.y = e.y * t, n;
	}
	static AddVMulSV(e, t, n, r) {
		return r.x = e.x + t * n.x, r.y = e.y + t * n.y, r;
	}
	static SubVMulSV(e, t, n, r) {
		return r.x = e.x - t * n.x, r.y = e.y - t * n.y, r;
	}
	static AddVCrossSV(e, t, n, r) {
		let i = n.x;
		return r.x = e.x - t * n.y, r.y = e.y + t * i, r;
	}
	static MidVV(e, t, n) {
		return n.x = (e.x + t.x) * .5, n.y = (e.y + t.y) * .5, n;
	}
	static ExtVV(e, t, n) {
		return n.x = (t.x - e.x) * .5, n.y = (t.y - e.y) * .5, n;
	}
	static IsEqualToV(e, t) {
		return e.x === t.x && e.y === t.y;
	}
	static DistanceVV(e, t) {
		let n = e.x - t.x, r = e.y - t.y;
		return Math.sqrt(n * n + r * r);
	}
	static DistanceSquaredVV(e, t) {
		let n = e.x - t.x, r = e.y - t.y;
		return n * n + r * r;
	}
	static NegV(e, t) {
		return t.x = -e.x, t.y = -e.y, t;
	}
};
new M(0, 0);
var re = class e {
	data;
	get x() {
		return this.data[0];
	}
	set x(e) {
		this.data[0] = e;
	}
	get y() {
		return this.data[1];
	}
	set y(e) {
		this.data[1] = e;
	}
	constructor(...e) {
		if (e[0] instanceof Float32Array) {
			if (e[0].length !== 2) throw Error();
			this.data = e[0];
		} else {
			let t = typeof e[0] == "number" ? e[0] : 0, n = typeof e[1] == "number" ? e[1] : 0;
			this.data = new Float32Array([t, n]);
		}
	}
	Clone() {
		return new e(new Float32Array(this.data));
	}
	SetZero() {
		return this.x = 0, this.y = 0, this;
	}
	Set(e, t) {
		return this.x = e, this.y = t, this;
	}
	Copy(t) {
		return t instanceof e ? this.data.set(t.data) : (this.x = t.x, this.y = t.y), this;
	}
	SelfAdd(e) {
		return this.x += e.x, this.y += e.y, this;
	}
	SelfAddXY(e, t) {
		return this.x += e, this.y += t, this;
	}
	SelfSub(e) {
		return this.x -= e.x, this.y -= e.y, this;
	}
	SelfSubXY(e, t) {
		return this.x -= e, this.y -= t, this;
	}
	SelfMul(e) {
		return this.x *= e, this.y *= e, this;
	}
	SelfMulAdd(e, t) {
		return this.x += e * t.x, this.y += e * t.y, this;
	}
	SelfMulSub(e, t) {
		return this.x -= e * t.x, this.y -= e * t.y, this;
	}
	Dot(e) {
		return this.x * e.x + this.y * e.y;
	}
	Cross(e) {
		return this.x * e.y - this.y * e.x;
	}
	Length() {
		let e = this.x, t = this.y;
		return Math.sqrt(e * e + t * t);
	}
	LengthSquared() {
		let e = this.x, t = this.y;
		return e * e + t * t;
	}
	Normalize() {
		let e = this.Length();
		if (e >= 1e-5) {
			let t = 1 / e;
			this.x *= t, this.y *= t;
		}
		return e;
	}
	SelfNormalize() {
		let e = this.Length();
		if (e >= 1e-5) {
			let t = 1 / e;
			this.x *= t, this.y *= t;
		}
		return this;
	}
	SelfRotate(e) {
		let t = Math.cos(e), n = Math.sin(e), r = this.x;
		return this.x = t * r - n * this.y, this.y = n * r + t * this.y, this;
	}
	SelfRotateCosSin(e, t) {
		let n = this.x;
		return this.x = e * n - t * this.y, this.y = t * n + e * this.y, this;
	}
	IsValid() {
		return isFinite(this.x) && isFinite(this.y);
	}
	SelfCrossVS(e) {
		let t = this.x;
		return this.x = e * this.y, this.y = -e * t, this;
	}
	SelfCrossSV(e) {
		let t = this.x;
		return this.x = -e * this.y, this.y = e * t, this;
	}
	SelfMinV(e) {
		return this.x = D(this.x, e.x), this.y = D(this.y, e.y), this;
	}
	SelfMaxV(e) {
		return this.x = O(this.x, e.x), this.y = O(this.y, e.y), this;
	}
	SelfAbs() {
		return this.x = E(this.x), this.y = E(this.y), this;
	}
	SelfNeg() {
		return this.x = -this.x, this.y = -this.y, this;
	}
	SelfSkew() {
		let e = this.x;
		return this.x = -this.y, this.y = e, this;
	}
}, N = class e {
	static ZERO = new e(0, 0, 0);
	static s_t0 = new e();
	data;
	get x() {
		return this.data[0];
	}
	set x(e) {
		this.data[0] = e;
	}
	get y() {
		return this.data[1];
	}
	set y(e) {
		this.data[1] = e;
	}
	get z() {
		return this.data[2];
	}
	set z(e) {
		this.data[2] = e;
	}
	constructor(...e) {
		if (e[0] instanceof Float32Array) {
			if (e[0].length !== 3) throw Error();
			this.data = e[0];
		} else {
			let t = typeof e[0] == "number" ? e[0] : 0, n = typeof e[1] == "number" ? e[1] : 0, r = typeof e[2] == "number" ? e[2] : 0;
			this.data = new Float32Array([
				t,
				n,
				r
			]);
		}
	}
	Clone() {
		return new e(this.x, this.y, this.z);
	}
	SetZero() {
		return this.x = 0, this.y = 0, this.z = 0, this;
	}
	SetXYZ(e, t, n) {
		return this.x = e, this.y = t, this.z = n, this;
	}
	Copy(e) {
		return this.x = e.x, this.y = e.y, this.z = e.z, this;
	}
	SelfNeg() {
		return this.x = -this.x, this.y = -this.y, this.z = -this.z, this;
	}
	SelfAdd(e) {
		return this.x += e.x, this.y += e.y, this.z += e.z, this;
	}
	SelfAddXYZ(e, t, n) {
		return this.x += e, this.y += t, this.z += n, this;
	}
	SelfSub(e) {
		return this.x -= e.x, this.y -= e.y, this.z -= e.z, this;
	}
	SelfSubXYZ(e, t, n) {
		return this.x -= e, this.y -= t, this.z -= n, this;
	}
	SelfMul(e) {
		return this.x *= e, this.y *= e, this.z *= e, this;
	}
	static DotV3V3(e, t) {
		return e.x * t.x + e.y * t.y + e.z * t.z;
	}
	static CrossV3V3(e, t, n) {
		let r = e.x, i = e.y, a = e.z, o = t.x, s = t.y, c = t.z;
		return n.x = i * c - a * s, n.y = a * o - r * c, n.z = r * s - i * o, n;
	}
}, P = class e {
	static IDENTITY = new e();
	ex = new M(1, 0);
	ey = new M(0, 1);
	Clone() {
		return new e().Copy(this);
	}
	static FromVV(t, n) {
		return new e().SetVV(t, n);
	}
	static FromSSSS(t, n, r, i) {
		return new e().SetSSSS(t, n, r, i);
	}
	static FromAngle(t) {
		return new e().SetAngle(t);
	}
	SetSSSS(e, t, n, r) {
		return this.ex.Set(e, n), this.ey.Set(t, r), this;
	}
	SetVV(e, t) {
		return this.ex.Copy(e), this.ey.Copy(t), this;
	}
	SetAngle(e) {
		let t = Math.cos(e), n = Math.sin(e);
		return this.ex.Set(t, n), this.ey.Set(-n, t), this;
	}
	Copy(e) {
		return this.ex.Copy(e.ex), this.ey.Copy(e.ey), this;
	}
	SetIdentity() {
		return this.ex.Set(1, 0), this.ey.Set(0, 1), this;
	}
	SetZero() {
		return this.ex.SetZero(), this.ey.SetZero(), this;
	}
	GetAngle() {
		return Math.atan2(this.ex.y, this.ex.x);
	}
	GetInverse(e) {
		let t = this.ex.x, n = this.ey.x, r = this.ex.y, i = this.ey.y, a = t * i - n * r;
		return a !== 0 && (a = 1 / a), e.ex.x = a * i, e.ey.x = -a * n, e.ex.y = -a * r, e.ey.y = a * t, e;
	}
	Solve(e, t, n) {
		let r = this.ex.x, i = this.ey.x, a = this.ex.y, o = this.ey.y, s = r * o - i * a;
		return s !== 0 && (s = 1 / s), n.x = s * (o * e - i * t), n.y = s * (r * t - a * e), n;
	}
	SelfAbs() {
		return this.ex.SelfAbs(), this.ey.SelfAbs(), this;
	}
	SelfInv() {
		return this.GetInverse(this), this;
	}
	SelfAddM(e) {
		return this.ex.SelfAdd(e.ex), this.ey.SelfAdd(e.ey), this;
	}
	SelfSubM(e) {
		return this.ex.SelfSub(e.ex), this.ey.SelfSub(e.ey), this;
	}
	static AbsM(e, t) {
		let n = e.ex, r = e.ey;
		return t.ex.x = E(n.x), t.ex.y = E(n.y), t.ey.x = E(r.x), t.ey.y = E(r.y), t;
	}
	static MulMV(e, t, n) {
		let r = e.ex, i = e.ey, a = t.x, o = t.y;
		return n.x = r.x * a + i.x * o, n.y = r.y * a + i.y * o, n;
	}
	static MulTMV(e, t, n) {
		let r = e.ex, i = e.ey, a = t.x, o = t.y;
		return n.x = r.x * a + r.y * o, n.y = i.x * a + i.y * o, n;
	}
	static AddMM(e, t, n) {
		let r = e.ex, i = e.ey, a = t.ex, o = t.ey;
		return n.ex.x = r.x + a.x, n.ex.y = r.y + a.y, n.ey.x = i.x + o.x, n.ey.y = i.y + o.y, n;
	}
	static MulMM(e, t, n) {
		let r = e.ex.x, i = e.ex.y, a = e.ey.x, o = e.ey.y, s = t.ex.x, c = t.ex.y, l = t.ey.x, u = t.ey.y;
		return n.ex.x = r * s + a * c, n.ex.y = i * s + o * c, n.ey.x = r * l + a * u, n.ey.y = i * l + o * u, n;
	}
	static MulTMM(e, t, n) {
		let r = e.ex.x, i = e.ex.y, a = e.ey.x, o = e.ey.y, s = t.ex.x, c = t.ex.y, l = t.ey.x, u = t.ey.y;
		return n.ex.x = r * s + i * c, n.ex.y = a * s + o * c, n.ey.x = r * l + i * u, n.ey.y = a * l + o * u, n;
	}
}, ie = class e {
	static IDENTITY = new e();
	data = new Float32Array([
		1,
		0,
		0,
		0,
		1,
		0,
		0,
		0,
		1
	]);
	ex = new N(this.data.subarray(0, 3));
	ey = new N(this.data.subarray(3, 6));
	ez = new N(this.data.subarray(6, 9));
	Clone() {
		return new e().Copy(this);
	}
	SetVVV(e, t, n) {
		return this.ex.Copy(e), this.ey.Copy(t), this.ez.Copy(n), this;
	}
	Copy(e) {
		return this.ex.Copy(e.ex), this.ey.Copy(e.ey), this.ez.Copy(e.ez), this;
	}
	SetIdentity() {
		return this.ex.SetXYZ(1, 0, 0), this.ey.SetXYZ(0, 1, 0), this.ez.SetXYZ(0, 0, 1), this;
	}
	SetZero() {
		return this.ex.SetZero(), this.ey.SetZero(), this.ez.SetZero(), this;
	}
	SelfAddM(e) {
		return this.ex.SelfAdd(e.ex), this.ey.SelfAdd(e.ey), this.ez.SelfAdd(e.ez), this;
	}
	Solve33(e, t, n, r) {
		let i = this.ex.x, a = this.ex.y, o = this.ex.z, s = this.ey.x, c = this.ey.y, l = this.ey.z, u = this.ez.x, d = this.ez.y, f = this.ez.z, p = i * (c * f - l * d) + a * (l * u - s * f) + o * (s * d - c * u);
		return p !== 0 && (p = 1 / p), r.x = p * (e * (c * f - l * d) + t * (l * u - s * f) + n * (s * d - c * u)), r.y = p * (i * (t * f - n * d) + a * (n * u - e * f) + o * (e * d - t * u)), r.z = p * (i * (c * n - l * t) + a * (l * e - s * n) + o * (s * t - c * e)), r;
	}
	Solve22(e, t, n) {
		let r = this.ex.x, i = this.ey.x, a = this.ex.y, o = this.ey.y, s = r * o - i * a;
		return s !== 0 && (s = 1 / s), n.x = s * (o * e - i * t), n.y = s * (r * t - a * e), n;
	}
	GetInverse22(e) {
		let t = this.ex.x, n = this.ey.x, r = this.ex.y, i = this.ey.y, a = t * i - n * r;
		a !== 0 && (a = 1 / a), e.ex.x = a * i, e.ey.x = -a * n, e.ex.z = 0, e.ex.y = -a * r, e.ey.y = a * t, e.ey.z = 0, e.ez.x = 0, e.ez.y = 0, e.ez.z = 0;
	}
	GetSymInverse33(e) {
		let t = N.DotV3V3(this.ex, N.CrossV3V3(this.ey, this.ez, N.s_t0));
		t !== 0 && (t = 1 / t);
		let n = this.ex.x, r = this.ey.x, i = this.ez.x, a = this.ey.y, o = this.ez.y, s = this.ez.z;
		e.ex.x = t * (a * s - o * o), e.ex.y = t * (i * o - r * s), e.ex.z = t * (r * o - i * a), e.ey.x = e.ex.y, e.ey.y = t * (n * s - i * i), e.ey.z = t * (i * r - n * o), e.ez.x = e.ex.z, e.ez.y = e.ey.z, e.ez.z = t * (n * a - r * r);
	}
	static MulM33V3(e, t, n) {
		let r = t.x, i = t.y, a = t.z;
		return n.x = e.ex.x * r + e.ey.x * i + e.ez.x * a, n.y = e.ex.y * r + e.ey.y * i + e.ez.y * a, n.z = e.ex.z * r + e.ey.z * i + e.ez.z * a, n;
	}
	static MulM33XYZ(e, t, n, r, i) {
		return i.x = e.ex.x * t + e.ey.x * n + e.ez.x * r, i.y = e.ex.y * t + e.ey.y * n + e.ez.y * r, i.z = e.ex.z * t + e.ey.z * n + e.ez.z * r, i;
	}
	static MulM33V2(e, t, n) {
		let r = t.x, i = t.y;
		return n.x = e.ex.x * r + e.ey.x * i, n.y = e.ex.y * r + e.ey.y * i, n;
	}
	static MulM33XY(e, t, n, r) {
		return r.x = e.ex.x * t + e.ey.x * n, r.y = e.ex.y * t + e.ey.y * n, r;
	}
}, F = class e {
	static IDENTITY = new e();
	s = 0;
	c = 1;
	constructor(e = 0) {
		e && (this.s = Math.sin(e), this.c = Math.cos(e));
	}
	Clone() {
		return new e().Copy(this);
	}
	Copy(e) {
		return this.s = e.s, this.c = e.c, this;
	}
	SetAngle(e) {
		return this.s = Math.sin(e), this.c = Math.cos(e), this;
	}
	SetIdentity() {
		return this.s = 0, this.c = 1, this;
	}
	GetAngle() {
		return Math.atan2(this.s, this.c);
	}
	GetXAxis(e) {
		return e.x = this.c, e.y = this.s, e;
	}
	GetYAxis(e) {
		return e.x = -this.s, e.y = this.c, e;
	}
	static MulRR(e, t, n) {
		let r = e.c, i = e.s, a = t.c, o = t.s;
		return n.s = i * a + r * o, n.c = r * a - i * o, n;
	}
	static MulTRR(e, t, n) {
		let r = e.c, i = e.s, a = t.c, o = t.s;
		return n.s = r * o - i * a, n.c = r * a + i * o, n;
	}
	static MulRV(e, t, n) {
		let r = e.c, i = e.s, a = t.x, o = t.y;
		return n.x = r * a - i * o, n.y = i * a + r * o, n;
	}
	static MulTRV(e, t, n) {
		let r = e.c, i = e.s, a = t.x, o = t.y;
		return n.x = r * a + i * o, n.y = -i * a + r * o, n;
	}
}, I = class e {
	static IDENTITY = new e();
	p = new M();
	q = new F();
	Clone() {
		return new e().Copy(this);
	}
	Copy(e) {
		return this.p.Copy(e.p), this.q.Copy(e.q), this;
	}
	SetIdentity() {
		return this.p.SetZero(), this.q.SetIdentity(), this;
	}
	SetPositionRotation(e, t) {
		return this.p.Copy(e), this.q.Copy(t), this;
	}
	SetPositionAngle(e, t) {
		return this.p.Copy(e), this.q.SetAngle(t), this;
	}
	SetPosition(e) {
		return this.p.Copy(e), this;
	}
	SetPositionXY(e, t) {
		return this.p.Set(e, t), this;
	}
	SetRotation(e) {
		return this.q.Copy(e), this;
	}
	SetRotationAngle(e) {
		return this.q.SetAngle(e), this;
	}
	GetPosition() {
		return this.p;
	}
	GetRotation() {
		return this.q;
	}
	GetRotationAngle() {
		return this.q.GetAngle();
	}
	GetAngle() {
		return this.q.GetAngle();
	}
	static MulXV(e, t, n) {
		let r = e.q.c, i = e.q.s, a = t.x, o = t.y;
		return n.x = r * a - i * o + e.p.x, n.y = i * a + r * o + e.p.y, n;
	}
	static MulTXV(e, t, n) {
		let r = e.q.c, i = e.q.s, a = t.x - e.p.x, o = t.y - e.p.y;
		return n.x = r * a + i * o, n.y = -i * a + r * o, n;
	}
	static MulXX(e, t, n) {
		return F.MulRR(e.q, t.q, n.q), M.AddVV(F.MulRV(e.q, t.p, n.p), e.p, n.p), n;
	}
	static MulTXX(e, t, n) {
		return F.MulTRR(e.q, t.q, n.q), F.MulTRV(e.q, M.SubVV(t.p, e.p, n.p), n.p), n;
	}
}, L = class e {
	localCenter = new M();
	c0 = new M();
	c = new M();
	a0 = 0;
	a = 0;
	alpha0 = 0;
	Clone() {
		return new e().Copy(this);
	}
	Copy(e) {
		return this.localCenter.Copy(e.localCenter), this.c0.Copy(e.c0), this.c.Copy(e.c), this.a0 = e.a0, this.a = e.a, this.alpha0 = e.alpha0, this;
	}
	GetTransform(e, t) {
		e.p.x = (1 - t) * this.c0.x + t * this.c.x, e.p.y = (1 - t) * this.c0.y + t * this.c.y;
		let n = (1 - t) * this.a0 + t * this.a;
		return e.q.SetAngle(n), e.p.SelfSub(F.MulRV(e.q, this.localCenter, M.s_t0)), e;
	}
	Advance(e) {
		let t = (e - this.alpha0) / (1 - this.alpha0), n = 1 - t;
		this.c0.x = n * this.c0.x + t * this.c.x, this.c0.y = n * this.c0.y + t * this.c.y, this.a0 = n * this.a0 + t * this.a, this.alpha0 = e;
	}
	Normalize() {
		let e = T * Math.floor(this.a0 / T);
		this.a0 -= e, this.a -= e;
	}
}, ae = class {
	m_start = Date.now();
	Reset() {
		return this.m_start = Date.now(), this;
	}
	GetMilliseconds() {
		return Date.now() - this.m_start;
	}
}, oe = class {
	m_buffer = M.MakeArray(2);
	m_vertices = this.m_buffer;
	m_count = 0;
	m_radius = 0;
	Copy(e) {
		return e.m_vertices === e.m_buffer ? (this.m_vertices = this.m_buffer, this.m_buffer[0].Copy(e.m_buffer[0]), this.m_buffer[1].Copy(e.m_buffer[1])) : this.m_vertices = e.m_vertices, this.m_count = e.m_count, this.m_radius = e.m_radius, this;
	}
	Reset() {
		return this.m_vertices = this.m_buffer, this.m_count = 0, this.m_radius = 0, this;
	}
	SetShape(e, t) {
		e.SetupDistanceProxy(this, t);
	}
	SetVerticesRadius(e, t, n) {
		this.m_vertices = e, this.m_count = t, this.m_radius = n;
	}
	GetSupport(e) {
		let t = 0, n = M.DotVV(this.m_vertices[0], e);
		for (let r = 1; r < this.m_count; ++r) {
			let i = M.DotVV(this.m_vertices[r], e);
			i > n && (t = r, n = i);
		}
		return t;
	}
	GetSupportVertex(e) {
		let t = 0, n = M.DotVV(this.m_vertices[0], e);
		for (let r = 1; r < this.m_count; ++r) {
			let i = M.DotVV(this.m_vertices[r], e);
			i > n && (t = r, n = i);
		}
		return this.m_vertices[t];
	}
	GetVertexCount() {
		return this.m_count;
	}
	GetVertex(e) {
		return this.m_vertices[e];
	}
}, se = class {
	metric = 0;
	count = 0;
	indexA = [
		0,
		0,
		0
	];
	indexB = [
		0,
		0,
		0
	];
	Reset() {
		return this.metric = 0, this.count = 0, this;
	}
}, ce = class {
	proxyA = new oe();
	proxyB = new oe();
	transformA = new I();
	transformB = new I();
	useRadii = !1;
	Reset() {
		return this.proxyA.Reset(), this.proxyB.Reset(), this.transformA.SetIdentity(), this.transformB.SetIdentity(), this.useRadii = !1, this;
	}
}, le = class {
	pointA = new M();
	pointB = new M();
	distance = 0;
	iterations = 0;
	Reset() {
		return this.pointA.SetZero(), this.pointB.SetZero(), this.distance = 0, this.iterations = 0, this;
	}
}, ue = 0, de = 0, fe = 0, pe = class {
	wA = new M();
	wB = new M();
	w = new M();
	a = 0;
	indexA = 0;
	indexB = 0;
	Copy(e) {
		return this.wA.Copy(e.wA), this.wB.Copy(e.wB), this.w.Copy(e.w), this.a = e.a, this.indexA = e.indexA, this.indexB = e.indexB, this;
	}
}, me = class e {
	m_v1 = new pe();
	m_v2 = new pe();
	m_v3 = new pe();
	m_vertices = [];
	m_count = 0;
	constructor() {
		this.m_vertices[0] = this.m_v1, this.m_vertices[1] = this.m_v2, this.m_vertices[2] = this.m_v3;
	}
	ReadCache(e, t, n, r, i) {
		this.m_count = e.count;
		let a = this.m_vertices;
		for (let o = 0; o < this.m_count; ++o) {
			let s = a[o];
			s.indexA = e.indexA[o], s.indexB = e.indexB[o];
			let c = t.GetVertex(s.indexA), l = r.GetVertex(s.indexB);
			I.MulXV(n, c, s.wA), I.MulXV(i, l, s.wB), M.SubVV(s.wB, s.wA, s.w), s.a = 0;
		}
		if (this.m_count > 1) {
			let t = e.metric, n = this.GetMetric();
			(n < .5 * t || 2 * t < n || n < 1e-5) && (this.m_count = 0);
		}
		if (this.m_count === 0) {
			let e = a[0];
			e.indexA = 0, e.indexB = 0;
			let o = t.GetVertex(0), s = r.GetVertex(0);
			I.MulXV(n, o, e.wA), I.MulXV(i, s, e.wB), M.SubVV(e.wB, e.wA, e.w), e.a = 1, this.m_count = 1;
		}
	}
	WriteCache(e) {
		e.metric = this.GetMetric(), e.count = this.m_count;
		let t = this.m_vertices;
		for (let n = 0; n < this.m_count; ++n) e.indexA[n] = t[n].indexA, e.indexB[n] = t[n].indexB;
	}
	GetSearchDirection(e) {
		switch (this.m_count) {
			case 1: return M.NegV(this.m_v1.w, e);
			case 2: {
				let t = M.SubVV(this.m_v2.w, this.m_v1.w, e);
				return M.CrossVV(t, M.NegV(this.m_v1.w, M.s_t0)) > 0 ? M.CrossOneV(t, e) : M.CrossVOne(t, e);
			}
			default: return e.SetZero();
		}
	}
	GetClosestPoint(e) {
		switch (this.m_count) {
			case 0: return e.SetZero();
			case 1: return e.Copy(this.m_v1.w);
			case 2: return e.Set(this.m_v1.a * this.m_v1.w.x + this.m_v2.a * this.m_v2.w.x, this.m_v1.a * this.m_v1.w.y + this.m_v2.a * this.m_v2.w.y);
			case 3: return e.SetZero();
			default: return e.SetZero();
		}
	}
	GetWitnessPoints(e, t) {
		switch (this.m_count) {
			case 0: break;
			case 1:
				e.Copy(this.m_v1.wA), t.Copy(this.m_v1.wB);
				break;
			case 2:
				e.x = this.m_v1.a * this.m_v1.wA.x + this.m_v2.a * this.m_v2.wA.x, e.y = this.m_v1.a * this.m_v1.wA.y + this.m_v2.a * this.m_v2.wA.y, t.x = this.m_v1.a * this.m_v1.wB.x + this.m_v2.a * this.m_v2.wB.x, t.y = this.m_v1.a * this.m_v1.wB.y + this.m_v2.a * this.m_v2.wB.y;
				break;
			case 3: t.x = e.x = this.m_v1.a * this.m_v1.wA.x + this.m_v2.a * this.m_v2.wA.x + this.m_v3.a * this.m_v3.wA.x, t.y = e.y = this.m_v1.a * this.m_v1.wA.y + this.m_v2.a * this.m_v2.wA.y + this.m_v3.a * this.m_v3.wA.y;
		}
	}
	GetMetric() {
		switch (this.m_count) {
			case 0: return 0;
			case 1: return 0;
			case 2: return M.DistanceVV(this.m_v1.w, this.m_v2.w);
			case 3: return M.CrossVV(M.SubVV(this.m_v2.w, this.m_v1.w, M.s_t0), M.SubVV(this.m_v3.w, this.m_v1.w, M.s_t1));
			default: return 0;
		}
	}
	Solve2() {
		let t = this.m_v1.w, n = this.m_v2.w, r = M.SubVV(n, t, e.s_e12), i = -M.DotVV(t, r);
		if (i <= 0) {
			this.m_v1.a = 1, this.m_count = 1;
			return;
		}
		let a = M.DotVV(n, r);
		if (a <= 0) {
			this.m_v2.a = 1, this.m_count = 1, this.m_v1.Copy(this.m_v2);
			return;
		}
		let o = 1 / (a + i);
		this.m_v1.a = a * o, this.m_v2.a = i * o, this.m_count = 2;
	}
	Solve3() {
		let t = this.m_v1.w, n = this.m_v2.w, r = this.m_v3.w, i = M.SubVV(n, t, e.s_e12), a = M.DotVV(t, i), o = M.DotVV(n, i), s = -a, c = M.SubVV(r, t, e.s_e13), l = M.DotVV(t, c), u = M.DotVV(r, c), d = -l, f = M.SubVV(r, n, e.s_e23), p = M.DotVV(n, f), m = M.DotVV(r, f), h = -p, g = M.CrossVV(i, c), _ = g * M.CrossVV(n, r), v = g * M.CrossVV(r, t), y = g * M.CrossVV(t, n);
		if (s <= 0 && d <= 0) {
			this.m_v1.a = 1, this.m_count = 1;
			return;
		}
		if (o > 0 && s > 0 && y <= 0) {
			let e = 1 / (o + s);
			this.m_v1.a = o * e, this.m_v2.a = s * e, this.m_count = 2;
			return;
		}
		if (u > 0 && d > 0 && v <= 0) {
			let e = 1 / (u + d);
			this.m_v1.a = u * e, this.m_v3.a = d * e, this.m_count = 2, this.m_v2.Copy(this.m_v3);
			return;
		}
		if (o <= 0 && h <= 0) {
			this.m_v2.a = 1, this.m_count = 1, this.m_v1.Copy(this.m_v2);
			return;
		}
		if (u <= 0 && m <= 0) {
			this.m_v3.a = 1, this.m_count = 1, this.m_v1.Copy(this.m_v3);
			return;
		}
		if (m > 0 && h > 0 && _ <= 0) {
			let e = 1 / (m + h);
			this.m_v2.a = m * e, this.m_v3.a = h * e, this.m_count = 2, this.m_v1.Copy(this.m_v3);
			return;
		}
		let b = 1 / (_ + v + y);
		this.m_v1.a = _ * b, this.m_v2.a = v * b, this.m_v3.a = y * b, this.m_count = 3;
	}
	static s_e12 = new M();
	static s_e13 = new M();
	static s_e23 = new M();
}, he = new me(), ge = [
	0,
	0,
	0
], _e = [
	0,
	0,
	0
], ve = new M(), ye = new M(), be = new M(), xe = new M(), Se = new M();
function Ce(e, t, n) {
	++ue;
	let r = n.proxyA, i = n.proxyB, a = n.transformA, o = n.transformB, s = he;
	s.ReadCache(t, r, a, i, o);
	let c = s.m_vertices, l = ge, u = _e, d = 0, f = 0;
	for (; f < 20;) {
		d = s.m_count;
		for (let e = 0; e < d; ++e) l[e] = c[e].indexA, u[e] = c[e].indexB;
		switch (s.m_count) {
			case 1: break;
			case 2:
				s.Solve2();
				break;
			case 3: s.Solve3();
		}
		if (s.m_count === 3) break;
		let e = s.GetSearchDirection(ye);
		if (e.LengthSquared() < 10000000000000002e-26) break;
		let t = c[s.m_count];
		t.indexA = r.GetSupport(F.MulTRV(a.q, M.NegV(e, M.s_t0), xe)), I.MulXV(a, r.GetVertex(t.indexA), t.wA), t.indexB = i.GetSupport(F.MulTRV(o.q, e, Se)), I.MulXV(o, i.GetVertex(t.indexB), t.wB), M.SubVV(t.wB, t.wA, t.w), ++f, ++de;
		let n = !1;
		for (let e = 0; e < d; ++e) if (t.indexA === l[e] && t.indexB === u[e]) {
			n = !0;
			break;
		}
		if (n) break;
		++s.m_count;
	}
	if (fe = O(fe, f), s.GetWitnessPoints(e.pointA, e.pointB), e.distance = M.DistanceVV(e.pointA, e.pointB), e.iterations = f, s.WriteCache(t), n.useRadii) {
		let t = r.m_radius, n = i.m_radius;
		if (e.distance > t + n && e.distance > 1e-5) {
			e.distance -= t + n;
			let r = M.SubVV(e.pointB, e.pointA, be);
			r.Normalize(), e.pointA.SelfMulAdd(t, r), e.pointB.SelfMulSub(n, r);
		} else {
			let t = M.MidVV(e.pointA, e.pointB, ve);
			e.pointA.Copy(t), e.pointB.Copy(t), e.distance = 0;
		}
	}
}
new M(), new me(), new M(), new M(), new M(), new M(), new M(), new M();
//#endregion
//#region ../../../../tmp/claude-0/-home-user/98102b14-929e-54a0-bb74-ef07c2e34668/scratchpad/b2/esm/collision/b2_collision.js
var R;
(function(e) {
	e[e.e_vertex = 0] = "e_vertex", e[e.e_face = 1] = "e_face";
})(R ||= {});
var we = class {
	_key = 0;
	_key_invalid = !1;
	_indexA = 0;
	_indexB = 0;
	_typeA = 0;
	_typeB = 0;
	get key() {
		return this._key_invalid && (this._key_invalid = !1, this._key = this._indexA | this._indexB << 8 | this._typeA << 16 | this._typeB << 24), this._key;
	}
	set key(e) {
		this._key = e, this._key_invalid = !1, this._indexA = this._key & 255, this._indexB = this._key >> 8 & 255, this._typeA = this._key >> 16 & 255, this._typeB = this._key >> 24 & 255;
	}
	get indexA() {
		return this._indexA;
	}
	set indexA(e) {
		this._indexA = e, this._key_invalid = !0;
	}
	get indexB() {
		return this._indexB;
	}
	set indexB(e) {
		this._indexB = e, this._key_invalid = !0;
	}
	get typeA() {
		return this._typeA;
	}
	set typeA(e) {
		this._typeA = e, this._key_invalid = !0;
	}
	get typeB() {
		return this._typeB;
	}
	set typeB(e) {
		this._typeB = e, this._key_invalid = !0;
	}
}, Te = class e {
	cf = new we();
	Copy(e) {
		return this.key = e.key, this;
	}
	Clone() {
		return new e().Copy(this);
	}
	get key() {
		return this.cf.key;
	}
	set key(e) {
		this.cf.key = e;
	}
}, Ee = class e {
	localPoint = new M();
	normalImpulse = 0;
	tangentImpulse = 0;
	id = new Te();
	static MakeArray(t) {
		return S(t, (t) => new e());
	}
	Reset() {
		this.localPoint.SetZero(), this.normalImpulse = 0, this.tangentImpulse = 0, this.id.key = 0;
	}
	Copy(e) {
		return this.localPoint.Copy(e.localPoint), this.normalImpulse = e.normalImpulse, this.tangentImpulse = e.tangentImpulse, this.id.Copy(e.id), this;
	}
}, z;
(function(e) {
	e[e.e_unknown = -1] = "e_unknown", e[e.e_circles = 0] = "e_circles", e[e.e_faceA = 1] = "e_faceA", e[e.e_faceB = 2] = "e_faceB";
})(z ||= {});
var De = class e {
	points = Ee.MakeArray(2);
	localNormal = new M();
	localPoint = new M();
	type = z.e_unknown;
	pointCount = 0;
	Reset() {
		for (let e = 0; e < 2; ++e) this.points[e].Reset();
		this.localNormal.SetZero(), this.localPoint.SetZero(), this.type = z.e_unknown, this.pointCount = 0;
	}
	Copy(e) {
		this.pointCount = e.pointCount;
		for (let t = 0; t < 2; ++t) this.points[t].Copy(e.points[t]);
		return this.localNormal.Copy(e.localNormal), this.localPoint.Copy(e.localPoint), this.type = e.type, this;
	}
	Clone() {
		return new e().Copy(this);
	}
}, Oe = class e {
	normal = new M();
	points = M.MakeArray(2);
	separations = C(2);
	static Initialize_s_pointA = new M();
	static Initialize_s_pointB = new M();
	static Initialize_s_cA = new M();
	static Initialize_s_cB = new M();
	static Initialize_s_planePoint = new M();
	static Initialize_s_clipPoint = new M();
	Initialize(t, n, r, i, a) {
		if (t.pointCount !== 0) switch (t.type) {
			case z.e_circles: {
				this.normal.Set(1, 0);
				let o = I.MulXV(n, t.localPoint, e.Initialize_s_pointA), s = I.MulXV(i, t.points[0].localPoint, e.Initialize_s_pointB);
				M.DistanceSquaredVV(o, s) > 10000000000000002e-26 && M.SubVV(s, o, this.normal).SelfNormalize();
				let c = M.AddVMulSV(o, r, this.normal, e.Initialize_s_cA), l = M.SubVMulSV(s, a, this.normal, e.Initialize_s_cB);
				M.MidVV(c, l, this.points[0]), this.separations[0] = M.DotVV(M.SubVV(l, c, M.s_t0), this.normal);
				break;
			}
			case z.e_faceA: {
				F.MulRV(n.q, t.localNormal, this.normal);
				let o = I.MulXV(n, t.localPoint, e.Initialize_s_planePoint);
				for (let n = 0; n < t.pointCount; ++n) {
					let s = I.MulXV(i, t.points[n].localPoint, e.Initialize_s_clipPoint), c = r - M.DotVV(M.SubVV(s, o, M.s_t0), this.normal), l = M.AddVMulSV(s, c, this.normal, e.Initialize_s_cA), u = M.SubVMulSV(s, a, this.normal, e.Initialize_s_cB);
					M.MidVV(l, u, this.points[n]), this.separations[n] = M.DotVV(M.SubVV(u, l, M.s_t0), this.normal);
				}
				break;
			}
			case z.e_faceB: {
				F.MulRV(i.q, t.localNormal, this.normal);
				let o = I.MulXV(i, t.localPoint, e.Initialize_s_planePoint);
				for (let i = 0; i < t.pointCount; ++i) {
					let s = I.MulXV(n, t.points[i].localPoint, e.Initialize_s_clipPoint), c = a - M.DotVV(M.SubVV(s, o, M.s_t0), this.normal), l = M.AddVMulSV(s, c, this.normal, e.Initialize_s_cB), u = M.SubVMulSV(s, r, this.normal, e.Initialize_s_cA);
					M.MidVV(u, l, this.points[i]), this.separations[i] = M.DotVV(M.SubVV(u, l, M.s_t0), this.normal);
				}
				this.normal.SelfNeg();
				break;
			}
		}
	}
}, ke;
(function(e) {
	e[e.b2_nullState = 0] = "b2_nullState", e[e.b2_addState = 1] = "b2_addState", e[e.b2_persistState = 2] = "b2_persistState", e[e.b2_removeState = 3] = "b2_removeState";
})(ke ||= {});
var B = class e {
	v = new M();
	id = new Te();
	static MakeArray(t) {
		return S(t, (t) => new e());
	}
	Copy(e) {
		return this.v.Copy(e.v), this.id.Copy(e.id), this;
	}
}, Ae = class {
	p1 = new M();
	p2 = new M();
	maxFraction = 1;
	Copy(e) {
		return this.p1.Copy(e.p1), this.p2.Copy(e.p2), this.maxFraction = e.maxFraction, this;
	}
}, je = class {
	normal = new M();
	fraction = 0;
	Copy(e) {
		return this.normal.Copy(e.normal), this.fraction = e.fraction, this;
	}
}, V = class {
	lowerBound = new M();
	upperBound = new M();
	m_cache_center = new M();
	m_cache_extent = new M();
	Copy(e) {
		return this.lowerBound.Copy(e.lowerBound), this.upperBound.Copy(e.upperBound), this;
	}
	IsValid() {
		return !(!this.lowerBound.IsValid() || !this.upperBound.IsValid() || this.upperBound.x < this.lowerBound.x || this.upperBound.y < this.lowerBound.y);
	}
	GetCenter() {
		return M.MidVV(this.lowerBound, this.upperBound, this.m_cache_center);
	}
	GetExtents() {
		return M.ExtVV(this.lowerBound, this.upperBound, this.m_cache_extent);
	}
	GetPerimeter() {
		return 2 * (this.upperBound.x - this.lowerBound.x + (this.upperBound.y - this.lowerBound.y));
	}
	Combine1(e) {
		return this.lowerBound.x = D(this.lowerBound.x, e.lowerBound.x), this.lowerBound.y = D(this.lowerBound.y, e.lowerBound.y), this.upperBound.x = O(this.upperBound.x, e.upperBound.x), this.upperBound.y = O(this.upperBound.y, e.upperBound.y), this;
	}
	Combine2(e, t) {
		return this.lowerBound.x = D(e.lowerBound.x, t.lowerBound.x), this.lowerBound.y = D(e.lowerBound.y, t.lowerBound.y), this.upperBound.x = O(e.upperBound.x, t.upperBound.x), this.upperBound.y = O(e.upperBound.y, t.upperBound.y), this;
	}
	static Combine(e, t, n) {
		return n.Combine2(e, t), n;
	}
	Contains(e) {
		let t = !0;
		return t &&= this.lowerBound.x <= e.lowerBound.x, t &&= this.lowerBound.y <= e.lowerBound.y, t &&= e.upperBound.x <= this.upperBound.x, t &&= e.upperBound.y <= this.upperBound.y, t;
	}
	RayCast(e, t) {
		let n = -i, r = i, a = t.p1.x, o = t.p1.y, s = t.p2.x - t.p1.x, c = t.p2.y - t.p1.y, l = E(s), u = E(c), d = e.normal;
		if (l < 1e-5) {
			if (a < this.lowerBound.x || this.upperBound.x < a) return !1;
		} else {
			let e = 1 / s, t = (this.lowerBound.x - a) * e, i = (this.upperBound.x - a) * e, o = -1;
			if (t > i) {
				let e = t;
				t = i, i = e, o = 1;
			}
			if (t > n && (d.x = o, d.y = 0, n = t), r = D(r, i), n > r) return !1;
		}
		if (u < 1e-5) {
			if (o < this.lowerBound.y || this.upperBound.y < o) return !1;
		} else {
			let e = 1 / c, t = (this.lowerBound.y - o) * e, i = (this.upperBound.y - o) * e, a = -1;
			if (t > i) {
				let e = t;
				t = i, i = e, a = 1;
			}
			if (t > n && (d.x = 0, d.y = a, n = t), r = D(r, i), n > r) return !1;
		}
		return n < 0 || t.maxFraction < n ? !1 : (e.fraction = n, !0);
	}
	TestContain(e) {
		return !(e.x < this.lowerBound.x || this.upperBound.x < e.x || e.y < this.lowerBound.y || this.upperBound.y < e.y);
	}
	TestOverlap(e) {
		return !(this.upperBound.x < e.lowerBound.x || this.upperBound.y < e.lowerBound.y || e.upperBound.x < this.lowerBound.x || e.upperBound.y < this.lowerBound.y);
	}
};
function Me(e, t) {
	return !(e.upperBound.x < t.lowerBound.x || e.upperBound.y < t.lowerBound.y || t.upperBound.x < e.lowerBound.x || t.upperBound.y < e.lowerBound.y);
}
function Ne(e, t, n, r, i) {
	let a = 0, o = t[0], s = t[1], c = M.DotVV(n, o.v) - r, l = M.DotVV(n, s.v) - r;
	if (c <= 0 && e[a++].Copy(o), l <= 0 && e[a++].Copy(s), c * l < 0) {
		let t = c / (c - l), n = e[a].v;
		n.x = o.v.x + t * (s.v.x - o.v.x), n.y = o.v.y + t * (s.v.y - o.v.y);
		let r = e[a].id;
		r.cf.indexA = i, r.cf.indexB = o.id.cf.indexB, r.cf.typeA = R.e_vertex, r.cf.typeB = R.e_face, ++a;
	}
	return a;
}
var Pe = new ce(), Fe = new se(), Ie = new le();
function Le(e, t, n, r, i, o) {
	let s = Pe.Reset();
	s.proxyA.SetShape(e, t), s.proxyB.SetShape(n, r), s.transformA.Copy(i), s.transformB.Copy(o), s.useRadii = !0;
	let c = Fe.Reset();
	c.count = 0;
	let l = Ie.Reset();
	return Ce(l, c, s), l.distance < 10 * a;
}
//#endregion
//#region ../../../../tmp/claude-0/-home-user/98102b14-929e-54a0-bb74-ef07c2e34668/scratchpad/b2/esm/collision/b2_dynamic_tree.js
function H(e) {
	if (e === null) throw Error();
	return e;
}
var Re = class {
	m_id = 0;
	aabb = new V();
	_userData = null;
	get userData() {
		if (this._userData === null) throw Error();
		return this._userData;
	}
	set userData(e) {
		if (this._userData !== null) throw Error();
		this._userData = e;
	}
	parent = null;
	child1 = null;
	child2 = null;
	height = 0;
	moved = !1;
	constructor(e = 0) {
		this.m_id = e;
	}
	Reset() {
		this._userData = null;
	}
	IsLeaf() {
		return this.child1 === null;
	}
}, ze = class e {
	m_root = null;
	m_freeList = null;
	m_insertionCount = 0;
	m_stack = new w(256);
	static s_r = new M();
	static s_v = new M();
	static s_abs_v = new M();
	static s_segmentAABB = new V();
	static s_subInput = new Ae();
	static s_combinedAABB = new V();
	static s_aabb = new V();
	Query(e, t) {
		let n = this.m_stack.Reset();
		for (n.Push(this.m_root); n.GetCount() > 0;) {
			let r = n.Pop();
			if (r !== null && r.aabb.TestOverlap(e)) {
				if (r.IsLeaf()) {
					if (!t(r)) return;
				} else n.Push(r.child1), n.Push(r.child2);
			}
		}
	}
	QueryPoint(e, t) {
		let n = this.m_stack.Reset();
		for (n.Push(this.m_root); n.GetCount() > 0;) {
			let r = n.Pop();
			if (r !== null && r.aabb.TestContain(e)) {
				if (r.IsLeaf()) {
					if (!t(r)) return;
				} else n.Push(r.child1), n.Push(r.child2);
			}
		}
	}
	RayCast(t, n) {
		let r = t.p1, i = t.p2, a = M.SubVV(i, r, e.s_r);
		a.Normalize();
		let o = M.CrossOneV(a, e.s_v), s = M.AbsV(o, e.s_abs_v), c = t.maxFraction, l = e.s_segmentAABB, u = r.x + c * (i.x - r.x), d = r.y + c * (i.y - r.y);
		l.lowerBound.x = D(r.x, u), l.lowerBound.y = D(r.y, d), l.upperBound.x = O(r.x, u), l.upperBound.y = O(r.y, d);
		let f = this.m_stack.Reset();
		for (f.Push(this.m_root); f.GetCount() > 0;) {
			let a = f.Pop();
			if (a === null || !Me(a.aabb, l)) continue;
			let p = a.aabb.GetCenter(), m = a.aabb.GetExtents();
			if (!(E(M.DotVV(o, M.SubVV(r, p, M.s_t0))) - M.DotVV(s, m) > 0)) {
				if (a.IsLeaf()) {
					let o = e.s_subInput;
					o.p1.Copy(t.p1), o.p2.Copy(t.p2), o.maxFraction = c;
					let s = n(o, a);
					if (s === 0) return;
					s > 0 && (c = s, u = r.x + c * (i.x - r.x), d = r.y + c * (i.y - r.y), l.lowerBound.x = D(r.x, u), l.lowerBound.y = D(r.y, d), l.upperBound.x = O(r.x, u), l.upperBound.y = O(r.y, d));
				} else f.Push(a.child1), f.Push(a.child2);
			}
		}
	}
	static s_node_id = 0;
	AllocateNode() {
		if (this.m_freeList !== null) {
			let e = this.m_freeList;
			return this.m_freeList = e.parent, e.parent = null, e.child1 = null, e.child2 = null, e.height = 0, e.moved = !1, e;
		}
		return new Re(e.s_node_id++);
	}
	FreeNode(e) {
		e.parent = this.m_freeList, e.child1 = null, e.child2 = null, e.height = -1, e.Reset(), this.m_freeList = e;
	}
	CreateProxy(e, t) {
		let n = this.AllocateNode(), r = s, i = s;
		return n.aabb.lowerBound.x = e.lowerBound.x - r, n.aabb.lowerBound.y = e.lowerBound.y - i, n.aabb.upperBound.x = e.upperBound.x + r, n.aabb.upperBound.y = e.upperBound.y + i, n.userData = t, n.height = 0, n.moved = !0, this.InsertLeaf(n), n;
	}
	DestroyProxy(e) {
		this.RemoveLeaf(e), this.FreeNode(e);
	}
	static MoveProxy_s_fatAABB = new V();
	static MoveProxy_s_hugeAABB = new V();
	MoveProxy(t, n, r) {
		let i = e.MoveProxy_s_fatAABB, a = s, o = s;
		i.lowerBound.x = n.lowerBound.x - a, i.lowerBound.y = n.lowerBound.y - o, i.upperBound.x = n.upperBound.x + a, i.upperBound.y = n.upperBound.y + o;
		let c = 4 * r.x, l = 4 * r.y;
		c < 0 ? i.lowerBound.x += c : i.upperBound.x += c, l < 0 ? i.lowerBound.y += l : i.upperBound.y += l;
		let u = t.aabb;
		if (u.Contains(n)) {
			let t = e.MoveProxy_s_hugeAABB;
			if (t.lowerBound.x = i.lowerBound.x - 4 * a, t.lowerBound.y = i.lowerBound.y - 4 * o, t.upperBound.x = i.upperBound.x + 4 * a, t.upperBound.y = i.upperBound.y + 4 * o, t.Contains(u)) return !1;
		}
		return this.RemoveLeaf(t), t.aabb.Copy(i), this.InsertLeaf(t), t.moved = !0, !0;
	}
	InsertLeaf(t) {
		if (++this.m_insertionCount, this.m_root === null) {
			this.m_root = t, this.m_root.parent = null;
			return;
		}
		let n = t.aabb, r = this.m_root;
		for (; !r.IsLeaf();) {
			let t = H(r.child1), i = H(r.child2), a = r.aabb.GetPerimeter(), o = e.s_combinedAABB;
			o.Combine2(r.aabb, n);
			let s = o.GetPerimeter(), c = 2 * s, l = 2 * (s - a), u, d = e.s_aabb, f, p;
			t.IsLeaf() ? (d.Combine2(n, t.aabb), u = d.GetPerimeter() + l) : (d.Combine2(n, t.aabb), f = t.aabb.GetPerimeter(), p = d.GetPerimeter(), u = p - f + l);
			let m;
			if (i.IsLeaf() ? (d.Combine2(n, i.aabb), m = d.GetPerimeter() + l) : (d.Combine2(n, i.aabb), f = i.aabb.GetPerimeter(), p = d.GetPerimeter(), m = p - f + l), c < u && c < m) break;
			r = u < m ? t : i;
		}
		let i = r.parent, a = this.AllocateNode();
		a.parent = i, a.aabb.Combine2(n, r.aabb), a.height = r.height + 1, i === null ? (a.child1 = r, a.child2 = t, r.parent = a, t.parent = a, this.m_root = a) : (i.child1 === r ? i.child1 = a : i.child2 = a, a.child1 = r, a.child2 = t, r.parent = a, t.parent = a);
		let o = t.parent;
		for (; o !== null;) {
			o = this.Balance(o);
			let e = H(o.child1), t = H(o.child2);
			o.height = 1 + O(e.height, t.height), o.aabb.Combine2(e.aabb, t.aabb), o = o.parent;
		}
	}
	RemoveLeaf(e) {
		if (e === this.m_root) {
			this.m_root = null;
			return;
		}
		let t = H(e.parent), n = t && t.parent, r = H(t.child1 === e ? t.child2 : t.child1);
		if (n !== null) {
			n.child1 === t ? n.child1 = r : n.child2 = r, r.parent = n, this.FreeNode(t);
			let e = n;
			for (; e !== null;) {
				e = this.Balance(e);
				let t = H(e.child1), n = H(e.child2);
				e.aabb.Combine2(t.aabb, n.aabb), e.height = 1 + O(t.height, n.height), e = e.parent;
			}
		} else this.m_root = r, r.parent = null, this.FreeNode(t);
	}
	Balance(e) {
		if (e.IsLeaf() || e.height < 2) return e;
		let t = H(e.child1), n = H(e.child2), r = n.height - t.height;
		if (r > 1) {
			let r = H(n.child1), i = H(n.child2);
			return n.child1 = e, n.parent = e.parent, e.parent = n, n.parent === null ? this.m_root = n : n.parent.child1 === e ? n.parent.child1 = n : n.parent.child2 = n, r.height > i.height ? (n.child2 = r, e.child2 = i, i.parent = e, e.aabb.Combine2(t.aabb, i.aabb), n.aabb.Combine2(e.aabb, r.aabb), e.height = 1 + O(t.height, i.height), n.height = 1 + O(e.height, r.height)) : (n.child2 = i, e.child2 = r, r.parent = e, e.aabb.Combine2(t.aabb, r.aabb), n.aabb.Combine2(e.aabb, i.aabb), e.height = 1 + O(t.height, r.height), n.height = 1 + O(e.height, i.height)), n;
		}
		if (r < -1) {
			let r = H(t.child1), i = H(t.child2);
			return t.child1 = e, t.parent = e.parent, e.parent = t, t.parent === null ? this.m_root = t : t.parent.child1 === e ? t.parent.child1 = t : t.parent.child2 = t, r.height > i.height ? (t.child2 = r, e.child1 = i, i.parent = e, e.aabb.Combine2(n.aabb, i.aabb), t.aabb.Combine2(e.aabb, r.aabb), e.height = 1 + O(n.height, i.height), t.height = 1 + O(e.height, r.height)) : (t.child2 = i, e.child1 = r, r.parent = e, e.aabb.Combine2(n.aabb, r.aabb), t.aabb.Combine2(e.aabb, i.aabb), e.height = 1 + O(n.height, r.height), t.height = 1 + O(e.height, i.height)), t;
		}
		return e;
	}
	GetHeight() {
		return this.m_root === null ? 0 : this.m_root.height;
	}
	static GetAreaNode(t) {
		if (t === null || t.IsLeaf()) return 0;
		let n = t.aabb.GetPerimeter();
		return n += e.GetAreaNode(t.child1), n += e.GetAreaNode(t.child2), n;
	}
	GetAreaRatio() {
		if (this.m_root === null) return 0;
		let t = this.m_root.aabb.GetPerimeter();
		return e.GetAreaNode(this.m_root) / t;
	}
	static ComputeHeightNode(t) {
		return t === null || t.IsLeaf() ? 0 : 1 + O(e.ComputeHeightNode(t.child1), e.ComputeHeightNode(t.child2));
	}
	ComputeHeight() {
		return e.ComputeHeightNode(this.m_root);
	}
	ValidateStructure(e) {
		if (e === null || (this.m_root, e.IsLeaf())) return;
		let t = H(e.child1), n = H(e.child2);
		this.ValidateStructure(t), this.ValidateStructure(n);
	}
	ValidateMetrics(t) {
		if (t === null || t.IsLeaf()) return;
		let n = H(t.child1), r = H(t.child2);
		e.s_aabb.Combine2(n.aabb, r.aabb), this.ValidateMetrics(n), this.ValidateMetrics(r);
	}
	Validate() {}
	static GetMaxBalanceNode(e, t) {
		if (e === null || e.height <= 1) return t;
		let n = H(e.child1);
		return O(t, E(H(e.child2).height - n.height));
	}
	GetMaxBalance() {
		return e.GetMaxBalanceNode(this.m_root, 0);
	}
	RebuildBottomUp() {
		this.Validate();
	}
	static ShiftOriginNode(t, n) {
		if (t === null || t.height <= 1) return;
		let r = t.child1, i = t.child2;
		e.ShiftOriginNode(r, n), e.ShiftOriginNode(i, n), t.aabb.lowerBound.SelfSub(n), t.aabb.upperBound.SelfSub(n);
	}
	ShiftOrigin(t) {
		e.ShiftOriginNode(this.m_root, t);
	}
}, Be = class {
	proxyA;
	proxyB;
	constructor(e, t) {
		this.proxyA = e, this.proxyB = t;
	}
}, Ve = class {
	m_tree = new ze();
	m_proxyCount = 0;
	m_moveCount = 0;
	m_moveBuffer = [];
	m_pairCount = 0;
	m_pairBuffer = [];
	CreateProxy(e, t) {
		let n = this.m_tree.CreateProxy(e, t);
		return ++this.m_proxyCount, this.BufferMove(n), n;
	}
	DestroyProxy(e) {
		this.UnBufferMove(e), --this.m_proxyCount, this.m_tree.DestroyProxy(e);
	}
	MoveProxy(e, t, n) {
		this.m_tree.MoveProxy(e, t, n) && this.BufferMove(e);
	}
	TouchProxy(e) {
		this.BufferMove(e);
	}
	GetProxyCount() {
		return this.m_proxyCount;
	}
	UpdatePairs(e) {
		this.m_pairCount = 0;
		for (let e = 0; e < this.m_moveCount; ++e) {
			let t = this.m_moveBuffer[e];
			if (t === null) continue;
			let n = t.aabb;
			this.m_tree.Query(n, (e) => {
				if (e.m_id === t.m_id || e.moved && e.m_id > t.m_id) return !0;
				let n, r;
				if (e.m_id < t.m_id ? (n = e, r = t) : (n = t, r = e), this.m_pairCount === this.m_pairBuffer.length) this.m_pairBuffer[this.m_pairCount] = new Be(n, r);
				else {
					let e = this.m_pairBuffer[this.m_pairCount];
					e.proxyA = n, e.proxyB = r;
				}
				return ++this.m_pairCount, !0;
			});
		}
		for (let t = 0; t < this.m_pairCount; ++t) {
			let n = this.m_pairBuffer[t], r = n.proxyA.userData, i = n.proxyB.userData;
			e(r, i);
		}
		for (let e = 0; e < this.m_moveCount; ++e) {
			let t = this.m_moveBuffer[e];
			t !== null && (t.moved = !1);
		}
		this.m_moveCount = 0;
	}
	Query(e, t) {
		this.m_tree.Query(e, t);
	}
	QueryPoint(e, t) {
		this.m_tree.QueryPoint(e, t);
	}
	RayCast(e, t) {
		this.m_tree.RayCast(e, t);
	}
	GetTreeHeight() {
		return this.m_tree.GetHeight();
	}
	GetTreeBalance() {
		return this.m_tree.GetMaxBalance();
	}
	GetTreeQuality() {
		return this.m_tree.GetAreaRatio();
	}
	ShiftOrigin(e) {
		this.m_tree.ShiftOrigin(e);
	}
	BufferMove(e) {
		this.m_moveBuffer[this.m_moveCount] = e, ++this.m_moveCount;
	}
	UnBufferMove(e) {
		for (let t = 0; t < this.m_moveCount; ++t) this.m_moveBuffer[t] === e && (this.m_moveBuffer[t] = null);
	}
}, He = class {
	mass = 0;
	center = new M(0, 0);
	I = 0;
}, U;
(function(e) {
	e[e.e_unknown = -1] = "e_unknown", e[e.e_circleShape = 0] = "e_circleShape", e[e.e_edgeShape = 1] = "e_edgeShape", e[e.e_polygonShape = 2] = "e_polygonShape", e[e.e_chainShape = 3] = "e_chainShape", e[e.e_shapeTypeCount = 4] = "e_shapeTypeCount";
})(U ||= {});
var Ue = class {
	m_type = U.e_unknown;
	m_radius = 0;
	constructor(e, t) {
		this.m_type = e, this.m_radius = t;
	}
	Copy(e) {
		return this.m_radius = e.m_radius, this;
	}
	GetType() {
		return this.m_type;
	}
}, We = class e extends Ue {
	m_vertex1 = new M();
	m_vertex2 = new M();
	m_vertex0 = new M();
	m_vertex3 = new M();
	m_oneSided = !1;
	constructor() {
		super(U.e_edgeShape, u);
	}
	SetOneSided(e, t, n, r) {
		return this.m_vertex0.Copy(e), this.m_vertex1.Copy(t), this.m_vertex2.Copy(n), this.m_vertex3.Copy(r), this.m_oneSided = !0, this;
	}
	SetTwoSided(e, t) {
		return this.m_vertex1.Copy(e), this.m_vertex2.Copy(t), this.m_oneSided = !1, this;
	}
	Clone() {
		return new e().Copy(this);
	}
	Copy(e) {
		return super.Copy(e), this.m_vertex1.Copy(e.m_vertex1), this.m_vertex2.Copy(e.m_vertex2), this.m_vertex0.Copy(e.m_vertex0), this.m_vertex3.Copy(e.m_vertex3), this.m_oneSided = e.m_oneSided, this;
	}
	GetChildCount() {
		return 1;
	}
	TestPoint(e, t) {
		return !1;
	}
	static ComputeDistance_s_v1 = new M();
	static ComputeDistance_s_v2 = new M();
	static ComputeDistance_s_d = new M();
	static ComputeDistance_s_s = new M();
	ComputeDistance(t, n, r, i) {
		let a = I.MulXV(t, this.m_vertex1, e.ComputeDistance_s_v1), o = I.MulXV(t, this.m_vertex2, e.ComputeDistance_s_v2), s = M.SubVV(n, a, e.ComputeDistance_s_d), c = M.SubVV(o, a, e.ComputeDistance_s_s), l = M.DotVV(s, c);
		if (l > 0) {
			let e = M.DotVV(c, c);
			l > e ? M.SubVV(n, o, s) : s.SelfMulSub(l / e, c);
		}
		return r.Copy(s), r.Normalize();
	}
	static RayCast_s_p1 = new M();
	static RayCast_s_p2 = new M();
	static RayCast_s_d = new M();
	static RayCast_s_e = new M();
	static RayCast_s_q = new M();
	static RayCast_s_r = new M();
	RayCast(t, n, r, i) {
		let a = I.MulTXV(r, n.p1, e.RayCast_s_p1), o = I.MulTXV(r, n.p2, e.RayCast_s_p2), s = M.SubVV(o, a, e.RayCast_s_d), c = this.m_vertex1, l = this.m_vertex2, u = M.SubVV(l, c, e.RayCast_s_e), d = t.normal.Set(u.y, -u.x).SelfNormalize(), f = M.DotVV(d, M.SubVV(c, a, M.s_t0));
		if (this.m_oneSided && f > 0) return !1;
		let p = M.DotVV(d, s);
		if (p === 0) return !1;
		let m = f / p;
		if (m < 0 || n.maxFraction < m) return !1;
		let h = M.AddVMulSV(a, m, s, e.RayCast_s_q), g = M.SubVV(l, c, e.RayCast_s_r), _ = M.DotVV(g, g);
		if (_ === 0) return !1;
		let v = M.DotVV(M.SubVV(h, c, M.s_t0), g) / _;
		return v < 0 || 1 < v ? !1 : (t.fraction = m, F.MulRV(r.q, t.normal, t.normal), f > 0 && t.normal.SelfNeg(), !0);
	}
	static ComputeAABB_s_v1 = new M();
	static ComputeAABB_s_v2 = new M();
	ComputeAABB(t, n, r) {
		let i = I.MulXV(n, this.m_vertex1, e.ComputeAABB_s_v1), a = I.MulXV(n, this.m_vertex2, e.ComputeAABB_s_v2);
		M.MinV(i, a, t.lowerBound), M.MaxV(i, a, t.upperBound);
		let o = this.m_radius;
		t.lowerBound.SelfSubXY(o, o), t.upperBound.SelfAddXY(o, o);
	}
	ComputeMass(e, t) {
		e.mass = 0, M.MidVV(this.m_vertex1, this.m_vertex2, e.center), e.I = 0;
	}
	SetupDistanceProxy(e, t) {
		e.m_vertices = e.m_buffer, e.m_vertices[0].Copy(this.m_vertex1), e.m_vertices[1].Copy(this.m_vertex2), e.m_count = 2, e.m_radius = this.m_radius;
	}
	ComputeSubmergedArea(e, t, n, r) {
		return r.SetZero(), 0;
	}
	Dump(e) {
		e("    const shape: b2EdgeShape = new b2EdgeShape();\n"), e("    shape.m_radius = %.15f;\n", this.m_radius), e("    shape.m_vertex0.Set(%.15f, %.15f);\n", this.m_vertex0.x, this.m_vertex0.y), e("    shape.m_vertex1.Set(%.15f, %.15f);\n", this.m_vertex1.x, this.m_vertex1.y), e("    shape.m_vertex2.Set(%.15f, %.15f);\n", this.m_vertex2.x, this.m_vertex2.y), e("    shape.m_vertex3.Set(%.15f, %.15f);\n", this.m_vertex3.x, this.m_vertex3.y), e("    shape.m_oneSided = %s;\n", this.m_oneSided);
	}
};
(class e extends Ue {
	m_vertices = [];
	m_count = 0;
	m_prevVertex = new M();
	m_nextVertex = new M();
	constructor() {
		super(U.e_chainShape, u);
	}
	CreateLoop(...e) {
		if (typeof e[0][0] == "number") {
			let t = e[0];
			if (t.length % 2 != 0) throw Error();
			return this._CreateLoop((e) => ({
				x: t[e * 2],
				y: t[e * 2 + 1]
			}), t.length / 2);
		}
		{
			let t = e[0];
			return this._CreateLoop((e) => t[e], t.length);
		}
	}
	_CreateLoop(e, t) {
		if (t < 3) return this;
		this.m_count = t + 1, this.m_vertices = M.MakeArray(this.m_count);
		for (let n = 0; n < t; ++n) this.m_vertices[n].Copy(e(n));
		return this.m_vertices[t].Copy(this.m_vertices[0]), this.m_prevVertex.Copy(this.m_vertices[this.m_count - 2]), this.m_nextVertex.Copy(this.m_vertices[1]), this;
	}
	CreateChain(...e) {
		if (typeof e[0][0] == "number") {
			let t = e[0], n = e[1], r = e[2];
			if (t.length % 2 != 0) throw Error();
			return this._CreateChain((e) => ({
				x: t[e * 2],
				y: t[e * 2 + 1]
			}), t.length / 2, n, r);
		}
		{
			let t = e[0], n = e[1], r = e[2];
			return this._CreateChain((e) => t[e], t.length, n, r);
		}
	}
	_CreateChain(e, t, n, r) {
		this.m_count = t, this.m_vertices = M.MakeArray(t);
		for (let n = 0; n < t; ++n) this.m_vertices[n].Copy(e(n));
		return this.m_prevVertex.Copy(n), this.m_nextVertex.Copy(r), this;
	}
	Clone() {
		return new e().Copy(this);
	}
	Copy(e) {
		return super.Copy(e), this._CreateChain((t) => e.m_vertices[t], e.m_count, e.m_prevVertex, e.m_nextVertex), this.m_prevVertex.Copy(e.m_prevVertex), this.m_nextVertex.Copy(e.m_nextVertex), this;
	}
	GetChildCount() {
		return this.m_count - 1;
	}
	GetChildEdge(e, t) {
		e.m_radius = this.m_radius, e.m_vertex1.Copy(this.m_vertices[t]), e.m_vertex2.Copy(this.m_vertices[t + 1]), e.m_oneSided = !0, t > 0 ? e.m_vertex0.Copy(this.m_vertices[t - 1]) : e.m_vertex0.Copy(this.m_prevVertex), t < this.m_count - 2 ? e.m_vertex3.Copy(this.m_vertices[t + 2]) : e.m_vertex3.Copy(this.m_nextVertex);
	}
	TestPoint(e, t) {
		return !1;
	}
	static ComputeDistance_s_edgeShape = new We();
	ComputeDistance(t, n, r, i) {
		let a = e.ComputeDistance_s_edgeShape;
		return this.GetChildEdge(a, i), a.ComputeDistance(t, n, r, 0);
	}
	static RayCast_s_edgeShape = new We();
	RayCast(t, n, r, i) {
		let a = e.RayCast_s_edgeShape;
		return a.m_vertex1.Copy(this.m_vertices[i]), a.m_vertex2.Copy(this.m_vertices[(i + 1) % this.m_count]), a.RayCast(t, n, r, 0);
	}
	static ComputeAABB_s_v1 = new M();
	static ComputeAABB_s_v2 = new M();
	static ComputeAABB_s_lower = new M();
	static ComputeAABB_s_upper = new M();
	ComputeAABB(t, n, r) {
		let i = this.m_vertices[r], a = this.m_vertices[(r + 1) % this.m_count], o = I.MulXV(n, i, e.ComputeAABB_s_v1), s = I.MulXV(n, a, e.ComputeAABB_s_v2), c = M.MinV(o, s, e.ComputeAABB_s_lower), l = M.MaxV(o, s, e.ComputeAABB_s_upper);
		t.lowerBound.x = c.x - this.m_radius, t.lowerBound.y = c.y - this.m_radius, t.upperBound.x = l.x + this.m_radius, t.upperBound.y = l.y + this.m_radius;
	}
	ComputeMass(e, t) {
		e.mass = 0, e.center.SetZero(), e.I = 0;
	}
	SetupDistanceProxy(e, t) {
		e.m_vertices = e.m_buffer, e.m_vertices[0].Copy(this.m_vertices[t]), t + 1 < this.m_count ? e.m_vertices[1].Copy(this.m_vertices[t + 1]) : e.m_vertices[1].Copy(this.m_vertices[0]), e.m_count = 2, e.m_radius = this.m_radius;
	}
	ComputeSubmergedArea(e, t, n, r) {
		return r.SetZero(), 0;
	}
	Dump(e) {
		e("    const shape: b2ChainShape = new b2ChainShape();\n"), e("    const vs: b2Vec2[] = [];\n");
		for (let t = 0; t < this.m_count; ++t) e("    vs[%d] = new bVec2(%.15f, %.15f);\n", t, this.m_vertices[t].x, this.m_vertices[t].y);
		e("    shape.CreateChain(vs, %d);\n", this.m_count), e("    shape.m_prevVertex.Set(%.15f, %.15f);\n", this.m_prevVertex.x, this.m_prevVertex.y), e("    shape.m_nextVertex.Set(%.15f, %.15f);\n", this.m_nextVertex.x, this.m_nextVertex.y);
	}
});
//#endregion
//#region ../../../../tmp/claude-0/-home-user/98102b14-929e-54a0-bb74-ef07c2e34668/scratchpad/b2/esm/collision/b2_circle_shape.js
var Ge = class e extends Ue {
	m_p = new M();
	constructor(e = 0) {
		super(U.e_circleShape, e);
	}
	Set(e, t = this.m_radius) {
		return this.m_p.Copy(e), this.m_radius = t, this;
	}
	Clone() {
		return new e().Copy(this);
	}
	Copy(e) {
		return super.Copy(e), this.m_p.Copy(e.m_p), this;
	}
	GetChildCount() {
		return 1;
	}
	static TestPoint_s_center = new M();
	static TestPoint_s_d = new M();
	TestPoint(t, n) {
		let r = I.MulXV(t, this.m_p, e.TestPoint_s_center), i = M.SubVV(n, r, e.TestPoint_s_d);
		return M.DotVV(i, i) <= A(this.m_radius);
	}
	static ComputeDistance_s_center = new M();
	ComputeDistance(t, n, r, i) {
		let a = I.MulXV(t, this.m_p, e.ComputeDistance_s_center);
		return M.SubVV(n, a, r), r.Normalize() - this.m_radius;
	}
	static RayCast_s_position = new M();
	static RayCast_s_s = new M();
	static RayCast_s_r = new M();
	RayCast(t, n, r, i) {
		let a = I.MulXV(r, this.m_p, e.RayCast_s_position), o = M.SubVV(n.p1, a, e.RayCast_s_s), s = M.DotVV(o, o) - A(this.m_radius), c = M.SubVV(n.p2, n.p1, e.RayCast_s_r), l = M.DotVV(o, c), u = M.DotVV(c, c), d = l * l - u * s;
		if (d < 0 || u < 1e-5) return !1;
		let f = -(l + j(d));
		return 0 <= f && f <= n.maxFraction * u && (f /= u, t.fraction = f, M.AddVMulSV(o, f, c, t.normal).SelfNormalize(), !0);
	}
	static ComputeAABB_s_p = new M();
	ComputeAABB(t, n, r) {
		let i = I.MulXV(n, this.m_p, e.ComputeAABB_s_p);
		t.lowerBound.Set(i.x - this.m_radius, i.y - this.m_radius), t.upperBound.Set(i.x + this.m_radius, i.y + this.m_radius);
	}
	ComputeMass(e, t) {
		let n = A(this.m_radius);
		e.mass = t * o * n, e.center.Copy(this.m_p), e.I = e.mass * (.5 * n + M.DotVV(this.m_p, this.m_p));
	}
	SetupDistanceProxy(e, t) {
		e.m_vertices = e.m_buffer, e.m_vertices[0].Copy(this.m_p), e.m_count = 1, e.m_radius = this.m_radius;
	}
	ComputeSubmergedArea(e, t, n, r) {
		let i = I.MulXV(n, this.m_p, new M()), a = -(M.DotVV(e, i) - t);
		if (a < -this.m_radius + 1e-5) return 0;
		if (a > this.m_radius) return r.Copy(i), o * this.m_radius * this.m_radius;
		let s = this.m_radius * this.m_radius, c = a * a, l = s * (ne(a / this.m_radius) + o / 2) + a * j(s - c), u = -2 / 3 * te(s - c, 1.5) / l;
		return r.x = i.x + e.x * u, r.y = i.y + e.y * u, l;
	}
	Dump(e) {
		e("    const shape: b2CircleShape = new b2CircleShape();\n"), e("    shape.m_radius = %.15f;\n", this.m_radius), e("    shape.m_p.Set(%.15f, %.15f);\n", this.m_p.x, this.m_p.y);
	}
}, Ke = new M(), qe = new M();
function Je(e, t, n, r, i) {
	e.pointCount = 0;
	let a = I.MulXV(n, t.m_p, Ke), o = I.MulXV(i, r.m_p, qe), s = M.DistanceSquaredVV(a, o), c = t.m_radius + r.m_radius;
	s > c * c || (e.type = z.e_circles, e.localPoint.Copy(t.m_p), e.localNormal.SetZero(), e.pointCount = 1, e.points[0].localPoint.Copy(r.m_p), e.points[0].id.key = 0);
}
var Ye = new M(), Xe = new M(), Ze = new M();
function Qe(e, t, n, r, a) {
	e.pointCount = 0;
	let o = I.MulXV(a, r.m_p, Ye), s = I.MulTXV(n, o, Xe), c = 0, l = -i, u = t.m_radius + r.m_radius, d = t.m_count, f = t.m_vertices, p = t.m_normals;
	for (let e = 0; e < d; ++e) {
		let t = M.DotVV(p[e], M.SubVV(s, f[e], M.s_t0));
		if (t > u) return;
		t > l && (l = t, c = e);
	}
	let m = c, h = (m + 1) % d, g = f[m], _ = f[h];
	if (l < 1e-5) {
		e.pointCount = 1, e.type = z.e_faceA, e.localNormal.Copy(p[c]), M.MidVV(g, _, e.localPoint), e.points[0].localPoint.Copy(r.m_p), e.points[0].id.key = 0;
		return;
	}
	let v = M.DotVV(M.SubVV(s, g, M.s_t0), M.SubVV(_, g, M.s_t1)), y = M.DotVV(M.SubVV(s, _, M.s_t0), M.SubVV(g, _, M.s_t1));
	if (v <= 0) {
		if (M.DistanceSquaredVV(s, g) > u * u) return;
		e.pointCount = 1, e.type = z.e_faceA, M.SubVV(s, g, e.localNormal).SelfNormalize(), e.localPoint.Copy(g), e.points[0].localPoint.Copy(r.m_p), e.points[0].id.key = 0;
	} else if (y <= 0) {
		if (M.DistanceSquaredVV(s, _) > u * u) return;
		e.pointCount = 1, e.type = z.e_faceA, M.SubVV(s, _, e.localNormal).SelfNormalize(), e.localPoint.Copy(_), e.points[0].localPoint.Copy(r.m_p), e.points[0].id.key = 0;
	} else {
		let t = M.MidVV(g, _, Ze);
		if (M.DotVV(M.SubVV(s, t, M.s_t1), p[m]) > u) return;
		e.pointCount = 1, e.type = z.e_faceA, e.localNormal.Copy(p[m]).SelfNormalize(), e.localPoint.Copy(t), e.points[0].localPoint.Copy(r.m_p), e.points[0].id.key = 0;
	}
}
//#endregion
//#region ../../../../tmp/claude-0/-home-user/98102b14-929e-54a0-bb74-ef07c2e34668/scratchpad/b2/esm/collision/b2_collide_edge.js
var $e = new M(), et = new M(), tt = new M(), nt = new M(), rt = new M(), it = new M(), at = new M(), ot = new Te();
function st(e, t, n, r, i) {
	e.pointCount = 0;
	let a = I.MulTXV(n, I.MulXV(i, r.m_p, M.s_t0), $e), o = t.m_vertex1, s = t.m_vertex2, c = M.SubVV(s, o, et), l = at.Set(c.y, -c.x), u = M.DotVV(l, M.SubVV(a, o, M.s_t0));
	if (t.m_oneSided && u < 0) return;
	let d = M.DotVV(c, M.SubVV(s, a, M.s_t0)), f = M.DotVV(c, M.SubVV(a, o, M.s_t0)), p = t.m_radius + r.m_radius, m = ot;
	if (m.cf.indexB = 0, m.cf.typeB = R.e_vertex, f <= 0) {
		let n = o, i = M.SubVV(a, n, tt);
		if (M.DotVV(i, i) > p * p) return;
		if (t.m_oneSided) {
			let e = t.m_vertex0, n = o, r = M.SubVV(n, e, nt);
			if (M.DotVV(r, M.SubVV(n, a, M.s_t0)) > 0) return;
		}
		m.cf.indexA = 0, m.cf.typeA = R.e_vertex, e.pointCount = 1, e.type = z.e_circles, e.localNormal.SetZero(), e.localPoint.Copy(n), e.points[0].id.Copy(m), e.points[0].localPoint.Copy(r.m_p);
		return;
	}
	if (d <= 0) {
		let n = s, i = M.SubVV(a, n, tt);
		if (M.DotVV(i, i) > p * p) return;
		if (t.m_oneSided) {
			let e = t.m_vertex3, n = s, r = M.SubVV(e, n, rt);
			if (M.DotVV(r, M.SubVV(a, n, M.s_t0)) > 0) return;
		}
		m.cf.indexA = 1, m.cf.typeA = R.e_vertex, e.pointCount = 1, e.type = z.e_circles, e.localNormal.SetZero(), e.localPoint.Copy(n), e.points[0].id.Copy(m), e.points[0].localPoint.Copy(r.m_p);
		return;
	}
	let h = M.DotVV(c, c), g = it;
	g.x = 1 / h * (d * o.x + f * s.x), g.y = 1 / h * (d * o.y + f * s.y);
	let _ = M.SubVV(a, g, tt);
	M.DotVV(_, _) > p * p || (u < 0 && l.Set(-l.x, -l.y), l.Normalize(), m.cf.indexA = 0, m.cf.typeA = R.e_face, e.pointCount = 1, e.type = z.e_faceA, e.localNormal.Copy(l), e.localPoint.Copy(o), e.points[0].id.Copy(m), e.points[0].localPoint.Copy(r.m_p));
}
var ct;
(function(e) {
	e[e.e_unknown = 0] = "e_unknown", e[e.e_edgeA = 1] = "e_edgeA", e[e.e_edgeB = 2] = "e_edgeB";
})(ct ||= {});
var lt = class {
	normal = new M();
	type = ct.e_unknown;
	index = 0;
	separation = 0;
}, ut = class {
	vertices = [];
	normals = [];
	count = 0;
}, dt = class {
	i1 = 0;
	i2 = 0;
	v1 = new M();
	v2 = new M();
	normal = new M();
	sideNormal1 = new M();
	sideOffset1 = 0;
	sideNormal2 = new M();
	sideOffset2 = 0;
}, ft = new lt(), pt = [new M(), new M()];
function mt(e, t, n) {
	let r = ft;
	r.type = ct.e_edgeA, r.index = -1, r.separation = -Number.MAX_VALUE, r.normal.SetZero();
	let i = pt;
	i[0].Copy(n), i[1].Copy(n).SelfNeg();
	for (let n = 0; n < 2; ++n) {
		let a = Number.MAX_VALUE;
		for (let r = 0; r < e.count; ++r) {
			let o = M.DotVV(i[n], M.SubVV(e.vertices[r], t, M.s_t0));
			o < a && (a = o);
		}
		a > r.separation && (r.index = n, r.separation = a, r.normal.Copy(i[n]));
	}
	return r;
}
var ht = new lt(), gt = new M();
function _t(e, t, n) {
	let r = ht;
	r.type = ct.e_unknown, r.index = -1, r.separation = -Number.MAX_VALUE, r.normal.SetZero();
	for (let i = 0; i < e.count; ++i) {
		let a = M.NegV(e.normals[i], gt), o = D(M.DotVV(a, M.SubVV(e.vertices[i], t, M.s_t0)), M.DotVV(a, M.SubVV(e.vertices[i], n, M.s_t0)));
		o > r.separation && (r.type = ct.e_edgeB, r.index = i, r.separation = o, r.normal.Copy(a));
	}
	return r;
}
var vt = new I(), yt = new M(), bt = new M(), xt = new M(), St = new M(), Ct = new M(), wt = new M(), Tt = new M(), Et = new ut(), Dt = new dt(), Ot = [new B(), new B()], kt = [new B(), new B()], At = [new B(), new B()];
function jt(e, t, n, r, i) {
	e.pointCount = 0;
	let a = I.MulTXX(n, i, vt), o = I.MulXV(a, r.m_centroid, yt), s = t.m_vertex1, c = t.m_vertex2, l = M.SubVV(c, s, bt);
	l.Normalize();
	let u = xt.Set(l.y, -l.x), d = M.DotVV(u, M.SubVV(o, s, M.s_t0)), f = t.m_oneSided;
	if (f && d < 0) return;
	let p = Et;
	p.count = r.m_count;
	for (let e = 0; e < r.m_count; ++e) p.vertices.length <= e && p.vertices.push(new M()), p.normals.length <= e && p.normals.push(new M()), I.MulXV(a, r.m_vertices[e], p.vertices[e]), F.MulRV(a.q, r.m_normals[e], p.normals[e]);
	let m = r.m_radius + t.m_radius, h = mt(p, s, u);
	if (h.separation > m) return;
	let g = _t(p, s, c);
	if (g.separation > m) return;
	let _;
	if (_ = g.separation - m > .98 * (h.separation - m) + .001 ? g : h, f) {
		let e = M.SubVV(s, t.m_vertex0, St);
		e.Normalize();
		let n = Ct.Set(e.y, -e.x), r = M.CrossVV(e, l) >= 0, i = M.SubVV(t.m_vertex3, c, wt);
		i.Normalize();
		let a = Tt.Set(i.y, -i.x), o = M.CrossVV(l, i) >= 0, u = .1;
		if (M.DotVV(_.normal, l) <= 0) {
			if (r) {
				if (M.CrossVV(_.normal, n) > u) return;
			} else _ = h;
		} else if (o) {
			if (M.CrossVV(a, _.normal) > u) return;
		} else _ = h;
	}
	let v = Ot, y = Dt;
	if (_.type === ct.e_edgeA) {
		e.type = z.e_faceA;
		let t = 0, n = M.DotVV(_.normal, p.normals[0]);
		for (let e = 1; e < p.count; ++e) {
			let r = M.DotVV(_.normal, p.normals[e]);
			r < n && (n = r, t = e);
		}
		let r = t, i = r + 1 < p.count ? r + 1 : 0;
		v[0].v.Copy(p.vertices[r]), v[0].id.cf.indexA = 0, v[0].id.cf.indexB = r, v[0].id.cf.typeA = R.e_face, v[0].id.cf.typeB = R.e_vertex, v[1].v.Copy(p.vertices[i]), v[1].id.cf.indexA = 0, v[1].id.cf.indexB = i, v[1].id.cf.typeA = R.e_face, v[1].id.cf.typeB = R.e_vertex, y.i1 = 0, y.i2 = 1, y.v1.Copy(s), y.v2.Copy(c), y.normal.Copy(_.normal), y.sideNormal1.Copy(l).SelfNeg(), y.sideNormal2.Copy(l);
	} else e.type = z.e_faceB, v[0].v.Copy(c), v[0].id.cf.indexA = 1, v[0].id.cf.indexB = _.index, v[0].id.cf.typeA = R.e_vertex, v[0].id.cf.typeB = R.e_face, v[1].v.Copy(s), v[1].id.cf.indexA = 0, v[1].id.cf.indexB = _.index, v[1].id.cf.typeA = R.e_vertex, v[1].id.cf.typeB = R.e_face, y.i1 = _.index, y.i2 = y.i1 + 1 < p.count ? y.i1 + 1 : 0, y.v1.Copy(p.vertices[y.i1]), y.v2.Copy(p.vertices[y.i2]), y.normal.Copy(p.normals[y.i1]), y.sideNormal1.Set(y.normal.y, -y.normal.x), y.sideNormal2.Copy(y.sideNormal1).SelfNeg();
	y.sideOffset1 = M.DotVV(y.sideNormal1, y.v1), y.sideOffset2 = M.DotVV(y.sideNormal2, y.v2);
	let b = kt, x = At, S;
	if (S = Ne(b, v, y.sideNormal1, y.sideOffset1, y.i1), S < 2 || (S = Ne(x, b, y.sideNormal2, y.sideOffset2, y.i2), S < 2)) return;
	_.type === ct.e_edgeA ? (e.localNormal.Copy(y.normal), e.localPoint.Copy(y.v1)) : (e.localNormal.Copy(r.m_normals[y.i1]), e.localPoint.Copy(r.m_vertices[y.i1]));
	let C = 0;
	for (let t = 0; t < 2; ++t) if (M.DotVV(y.normal, M.SubVV(x[t].v, y.v1, M.s_t0)) <= m) {
		let n = e.points[C];
		_.type === ct.e_edgeA ? (I.MulTXV(a, x[t].v, n.localPoint), n.id.Copy(x[t].id)) : (n.localPoint.Copy(x[t].v), n.id.cf.typeA = x[t].id.cf.typeB, n.id.cf.typeB = x[t].id.cf.typeA, n.id.cf.indexA = x[t].id.cf.indexB, n.id.cf.indexB = x[t].id.cf.indexA), ++C;
	}
	e.pointCount = C;
}
//#endregion
//#region ../../../../tmp/claude-0/-home-user/98102b14-929e-54a0-bb74-ef07c2e34668/scratchpad/b2/esm/collision/b2_collide_polygon.js
var Mt = new I(), Nt = new M(), Pt = new M();
function Ft(e, t, n, r, a) {
	let o = t.m_count, s = r.m_count, c = t.m_normals, l = t.m_vertices, u = r.m_vertices, d = I.MulTXX(a, n, Mt), f = 0, p = -i;
	for (let e = 0; e < o; ++e) {
		let t = F.MulRV(d.q, c[e], Nt), n = I.MulXV(d, l[e], Pt), r = i;
		for (let e = 0; e < s; ++e) {
			let i = M.DotVV(t, M.SubVV(u[e], n, M.s_t0));
			i < r && (r = i);
		}
		r > p && (p = r, f = e);
	}
	return e[0] = f, p;
}
var It = new M();
function Lt(e, t, n, r, a, o) {
	let s = t.m_normals, c = a.m_count, l = a.m_vertices, u = a.m_normals, d = F.MulTRV(o.q, F.MulRV(n.q, s[r], M.s_t0), It), f = 0, p = i;
	for (let e = 0; e < c; ++e) {
		let t = M.DotVV(d, u[e]);
		t < p && (p = t, f = e);
	}
	let m = f, h = m + 1 < c ? m + 1 : 0, g = e[0];
	I.MulXV(o, l[m], g.v);
	let _ = g.id.cf;
	_.indexA = r, _.indexB = m, _.typeA = R.e_face, _.typeB = R.e_vertex;
	let v = e[1];
	I.MulXV(o, l[h], v.v);
	let y = v.id.cf;
	y.indexA = r, y.indexB = h, y.typeA = R.e_face, y.typeB = R.e_vertex;
}
var Rt = [new B(), new B()], zt = [new B(), new B()], Bt = [new B(), new B()], Vt = [0], Ht = [0], Ut = new M(), Wt = new M(), Gt = new M(), Kt = new M(), qt = new M(), Jt = new M(), Yt = new M(), Xt = new M();
function Zt(e, t, n, r, i) {
	e.pointCount = 0;
	let a = t.m_radius + r.m_radius, o = Vt;
	o[0] = 0;
	let s = Ft(o, t, n, r, i);
	if (s > a) return;
	let c = Ht;
	c[0] = 0;
	let l = Ft(c, r, i, t, n);
	if (l > a) return;
	let u, d, f, p, m = 0, h = 0;
	l > s + 5e-4 ? (u = r, d = t, f = i, p = n, m = c[0], e.type = z.e_faceB, h = 1) : (u = t, d = r, f = n, p = i, m = o[0], e.type = z.e_faceA, h = 0);
	let g = Rt;
	Lt(g, u, f, m, d, p);
	let _ = u.m_count, v = u.m_vertices, y = m, b = m + 1 < _ ? m + 1 : 0, x = v[y], S = v[b], C = M.SubVV(S, x, Ut);
	C.Normalize();
	let w = M.CrossVOne(C, Wt), T = M.MidVV(x, S, Gt), E = F.MulRV(f.q, C, qt), D = M.CrossVOne(E, Kt), O = I.MulXV(f, x, Yt), k = I.MulXV(f, S, Xt), A = M.DotVV(D, O), ee = -M.DotVV(E, O) + a, j = M.DotVV(E, k) + a, te = zt, ne = Bt, re;
	if (re = Ne(te, g, M.NegV(E, Jt), ee, y), re < 2 || (re = Ne(ne, te, E, j, b), re < 2)) return;
	e.localNormal.Copy(w), e.localPoint.Copy(T);
	let N = 0;
	for (let t = 0; t < 2; ++t) {
		let n = ne[t];
		if (M.DotVV(D, n.v) - A <= a) {
			let t = e.points[N];
			if (I.MulTXV(p, n.v, t.localPoint), t.id.Copy(n.id), h) {
				let e = t.id.cf;
				t.id.cf.indexA = e.indexB, t.id.cf.indexB = e.indexA, t.id.cf.typeA = e.typeB, t.id.cf.typeB = e.typeA;
			}
			++N;
		}
	}
	e.pointCount = N;
}
//#endregion
//#region ../../../../tmp/claude-0/-home-user/98102b14-929e-54a0-bb74-ef07c2e34668/scratchpad/b2/esm/collision/b2_polygon_shape.js
var Qt = class e extends Ue {
	m_centroid = new M(0, 0);
	m_vertices = [];
	m_normals = [];
	m_count = 0;
	constructor() {
		super(U.e_polygonShape, u);
	}
	Clone() {
		return new e().Copy(this);
	}
	Copy(e) {
		super.Copy(e), this.m_centroid.Copy(e.m_centroid), this.m_count = e.m_count, this.m_vertices = M.MakeArray(this.m_count), this.m_normals = M.MakeArray(this.m_count);
		for (let t = 0; t < this.m_count; ++t) this.m_vertices[t].Copy(e.m_vertices[t]), this.m_normals[t].Copy(e.m_normals[t]);
		return this;
	}
	GetChildCount() {
		return 1;
	}
	static Set_s_r = new M();
	static Set_s_v = new M();
	Set(...e) {
		if (typeof e[0][0] == "number") {
			let t = e[0];
			if (t.length % 2 != 0) throw Error();
			return this._Set((e) => ({
				x: t[e * 2],
				y: t[e * 2 + 1]
			}), t.length / 2);
		}
		{
			let t = e[0], n = e[1] || t.length;
			return this._Set((e) => t[e], n);
		}
	}
	_Set(t, n) {
		if (n < 3) return this.SetAsBox(1, 1);
		let r = n, i = [];
		for (let e = 0; e < r; ++e) {
			let n = t(e), r = !0;
			for (let e = 0; e < i.length; ++e) if (M.DistanceSquaredVV(n, i[e]) < 625e-8) {
				r = !1;
				break;
			}
			r && i.push(n);
		}
		if (r = i.length, r < 3) return this.SetAsBox(1, 1);
		let a = 0, o = i[0].x;
		for (let e = 1; e < r; ++e) {
			let t = i[e].x;
			(t > o || t === o && i[e].y < i[a].y) && (a = e, o = t);
		}
		let s = [], c = 0, l = a;
		for (;;) {
			s[c] = l;
			let t = 0;
			for (let n = 1; n < r; ++n) {
				if (t === l) {
					t = n;
					continue;
				}
				let r = M.SubVV(i[t], i[s[c]], e.Set_s_r), a = M.SubVV(i[n], i[s[c]], e.Set_s_v), o = M.CrossVV(r, a);
				o < 0 && (t = n), o === 0 && a.LengthSquared() > r.LengthSquared() && (t = n);
			}
			if (++c, l = t, t === a) break;
		}
		this.m_count = c, this.m_vertices = M.MakeArray(this.m_count), this.m_normals = M.MakeArray(this.m_count);
		for (let e = 0; e < c; ++e) this.m_vertices[e].Copy(i[s[e]]);
		for (let e = 0; e < c; ++e) {
			let t = this.m_vertices[e], n = this.m_vertices[(e + 1) % c], r = M.SubVV(n, t, M.s_t0);
			M.CrossVOne(r, this.m_normals[e]).SelfNormalize();
		}
		return e.ComputeCentroid(this.m_vertices, c, this.m_centroid), this;
	}
	SetAsBox(e, t, n, r = 0) {
		if (this.m_count = 4, this.m_vertices = M.MakeArray(this.m_count), this.m_normals = M.MakeArray(this.m_count), this.m_vertices[0].Set(-e, -t), this.m_vertices[1].Set(e, -t), this.m_vertices[2].Set(e, t), this.m_vertices[3].Set(-e, t), this.m_normals[0].Set(0, -1), this.m_normals[1].Set(1, 0), this.m_normals[2].Set(0, 1), this.m_normals[3].Set(-1, 0), this.m_centroid.SetZero(), n) {
			this.m_centroid.Copy(n);
			let e = new I();
			e.SetPosition(n), e.SetRotationAngle(r);
			for (let t = 0; t < this.m_count; ++t) I.MulXV(e, this.m_vertices[t], this.m_vertices[t]), F.MulRV(e.q, this.m_normals[t], this.m_normals[t]);
		}
		return this;
	}
	static TestPoint_s_pLocal = new M();
	TestPoint(t, n) {
		let r = I.MulTXV(t, n, e.TestPoint_s_pLocal);
		for (let e = 0; e < this.m_count; ++e) if (M.DotVV(this.m_normals[e], M.SubVV(r, this.m_vertices[e], M.s_t0)) > 0) return !1;
		return !0;
	}
	static ComputeDistance_s_pLocal = new M();
	static ComputeDistance_s_normalForMaxDistance = new M();
	static ComputeDistance_s_minDistance = new M();
	static ComputeDistance_s_distance = new M();
	ComputeDistance(t, n, r, a) {
		let o = I.MulTXV(t, n, e.ComputeDistance_s_pLocal), s = -i, c = e.ComputeDistance_s_normalForMaxDistance.Copy(o);
		for (let e = 0; e < this.m_count; ++e) {
			let t = M.DotVV(this.m_normals[e], M.SubVV(o, this.m_vertices[e], M.s_t0));
			t > s && (s = t, c.Copy(this.m_normals[e]));
		}
		if (s > 0) {
			let n = e.ComputeDistance_s_minDistance.Copy(c), i = s * s;
			for (let t = 0; t < this.m_count; ++t) {
				let r = M.SubVV(o, this.m_vertices[t], e.ComputeDistance_s_distance), a = r.LengthSquared();
				i > a && (n.Copy(r), i = a);
			}
			return F.MulRV(t.q, n, r), r.Normalize(), Math.sqrt(i);
		}
		return F.MulRV(t.q, c, r), s;
	}
	static RayCast_s_p1 = new M();
	static RayCast_s_p2 = new M();
	static RayCast_s_d = new M();
	RayCast(t, n, r, i) {
		let a = I.MulTXV(r, n.p1, e.RayCast_s_p1), o = I.MulTXV(r, n.p2, e.RayCast_s_p2), s = M.SubVV(o, a, e.RayCast_s_d), c = 0, l = n.maxFraction, u = -1;
		for (let e = 0; e < this.m_count; ++e) {
			let t = M.DotVV(this.m_normals[e], M.SubVV(this.m_vertices[e], a, M.s_t0)), n = M.DotVV(this.m_normals[e], s);
			if (n === 0) {
				if (t < 0) return !1;
			} else n < 0 && t < c * n ? (c = t / n, u = e) : n > 0 && t < l * n && (l = t / n);
			if (l < c) return !1;
		}
		return u >= 0 && (t.fraction = c, F.MulRV(r.q, this.m_normals[u], t.normal), !0);
	}
	static ComputeAABB_s_v = new M();
	ComputeAABB(t, n, r) {
		let i = I.MulXV(n, this.m_vertices[0], t.lowerBound), a = t.upperBound.Copy(i);
		for (let t = 0; t < this.m_count; ++t) {
			let r = I.MulXV(n, this.m_vertices[t], e.ComputeAABB_s_v);
			M.MinV(r, i, i), M.MaxV(r, a, a);
		}
		let o = this.m_radius;
		i.SelfSubXY(o, o), a.SelfAddXY(o, o);
	}
	static ComputeMass_s_center = new M();
	static ComputeMass_s_s = new M();
	static ComputeMass_s_e1 = new M();
	static ComputeMass_s_e2 = new M();
	ComputeMass(t, n) {
		let r = e.ComputeMass_s_center.SetZero(), i = 0, a = 0, o = e.ComputeMass_s_s.Copy(this.m_vertices[0]), s = 1 / 3;
		for (let t = 0; t < this.m_count; ++t) {
			let n = M.SubVV(this.m_vertices[t], o, e.ComputeMass_s_e1), c = M.SubVV(this.m_vertices[(t + 1) % this.m_count], o, e.ComputeMass_s_e2), l = M.CrossVV(n, c), u = .5 * l;
			i += u, r.SelfAdd(M.MulSV(u * s, M.AddVV(n, c, M.s_t0), M.s_t1));
			let d = n.x, f = n.y, p = c.x, m = c.y, h = d * d + p * d + p * p, g = f * f + m * f + m * m;
			a += .25 * s * l * (h + g);
		}
		t.mass = n * i, r.SelfMul(1 / i), M.AddVV(r, o, t.center), t.I = n * a, t.I += t.mass * (M.DotVV(t.center, t.center) - M.DotVV(r, r));
	}
	static Validate_s_e = new M();
	static Validate_s_v = new M();
	Validate() {
		for (let t = 0; t < this.m_count; ++t) {
			let n = t, r = (t + 1) % this.m_count, i = this.m_vertices[n], a = M.SubVV(this.m_vertices[r], i, e.Validate_s_e);
			for (let t = 0; t < this.m_count; ++t) {
				if (t === n || t === r) continue;
				let o = M.SubVV(this.m_vertices[t], i, e.Validate_s_v);
				if (M.CrossVV(a, o) < 0) return !1;
			}
		}
		return !0;
	}
	SetupDistanceProxy(e, t) {
		e.m_vertices = this.m_vertices, e.m_count = this.m_count, e.m_radius = this.m_radius;
	}
	static ComputeSubmergedArea_s_normalL = new M();
	static ComputeSubmergedArea_s_md = new He();
	static ComputeSubmergedArea_s_intoVec = new M();
	static ComputeSubmergedArea_s_outoVec = new M();
	static ComputeSubmergedArea_s_center = new M();
	ComputeSubmergedArea(t, n, r, i) {
		let o = F.MulTRV(r.q, t, e.ComputeSubmergedArea_s_normalL), s = n - M.DotVV(t, r.p), c = [], l = 0, u = -1, d = -1, f = !1;
		for (let e = 0; e < this.m_count; ++e) {
			c[e] = M.DotVV(o, this.m_vertices[e]) - s;
			let t = c[e] < -a;
			e > 0 && (t ? f || (u = e - 1, l++) : f && (d = e - 1, l++)), f = t;
		}
		switch (l) {
			case 0:
				if (f) {
					let t = e.ComputeSubmergedArea_s_md;
					return this.ComputeMass(t, 1), I.MulXV(r, t.center, i), t.mass;
				}
				return 0;
			case 1: u === -1 ? u = this.m_count - 1 : d = this.m_count - 1;
		}
		let p = (u + 1) % this.m_count, m = (d + 1) % this.m_count, h = (0 - c[u]) / (c[p] - c[u]), g = (0 - c[d]) / (c[m] - c[d]), _ = e.ComputeSubmergedArea_s_intoVec.Set(this.m_vertices[u].x * (1 - h) + this.m_vertices[p].x * h, this.m_vertices[u].y * (1 - h) + this.m_vertices[p].y * h), v = e.ComputeSubmergedArea_s_outoVec.Set(this.m_vertices[d].x * (1 - g) + this.m_vertices[m].x * g, this.m_vertices[d].y * (1 - g) + this.m_vertices[m].y * g), y = 0, b = e.ComputeSubmergedArea_s_center.SetZero(), x = this.m_vertices[p], S, C = p;
		for (; C !== m;) {
			C = (C + 1) % this.m_count, S = C === m ? v : this.m_vertices[C];
			let e = .5 * ((x.x - _.x) * (S.y - _.y) - (x.y - _.y) * (S.x - _.x));
			y += e, b.x += e * (_.x + x.x + S.x) / 3, b.y += e * (_.y + x.y + S.y) / 3, x = S;
		}
		return b.SelfMul(1 / y), I.MulXV(r, b, i), y;
	}
	Dump(e) {
		e("    const shape: b2PolygonShape = new b2PolygonShape();\n"), e("    const vs: b2Vec2[] = [];\n");
		for (let t = 0; t < this.m_count; ++t) e("    vs[%d] = new b2Vec2(%.15f, %.15f);\n", t, this.m_vertices[t].x, this.m_vertices[t].y);
		e("    shape.Set(vs, %d);\n", this.m_count);
	}
	static ComputeCentroid_s_s = new M();
	static ComputeCentroid_s_p1 = new M();
	static ComputeCentroid_s_p2 = new M();
	static ComputeCentroid_s_p3 = new M();
	static ComputeCentroid_s_e1 = new M();
	static ComputeCentroid_s_e2 = new M();
	static ComputeCentroid(t, n, r) {
		let i = r;
		i.SetZero();
		let a = 0, o = e.ComputeCentroid_s_s.Copy(t[0]), s = 1 / 3;
		for (let r = 0; r < n; ++r) {
			let c = M.SubVV(t[0], o, e.ComputeCentroid_s_p1), l = M.SubVV(t[r], o, e.ComputeCentroid_s_p2), u = M.SubVV(t[(r + 1) % n], o, e.ComputeCentroid_s_p3), d = M.SubVV(l, c, e.ComputeCentroid_s_e1), f = M.SubVV(u, c, e.ComputeCentroid_s_e2), p = .5 * M.CrossVV(d, f);
			a += p, i.x += p * s * (c.x + l.x + u.x), i.y += p * s * (c.y + l.y + u.y);
		}
		return i.x = 1 / a * i.x + o.x, i.y = 1 / a * i.y + o.y, i;
	}
}, $t = 0, en = 0, tn = 0, nn = 0, rn = 0, an = 0, on = 0, sn = new I(), cn = new I(), ln = new M(), un = new M(), dn = new M(), fn = new M(), pn = new M(), mn = class {
	proxyA = new oe();
	proxyB = new oe();
	sweepA = new L();
	sweepB = new L();
	tMax = 0;
}, W;
(function(e) {
	e[e.e_unknown = 0] = "e_unknown", e[e.e_failed = 1] = "e_failed", e[e.e_overlapped = 2] = "e_overlapped", e[e.e_touching = 3] = "e_touching", e[e.e_separated = 4] = "e_separated";
})(W ||= {});
var hn = class {
	state = W.e_unknown;
	t = 0;
}, G;
(function(e) {
	e[e.e_unknown = -1] = "e_unknown", e[e.e_points = 0] = "e_points", e[e.e_faceA = 1] = "e_faceA", e[e.e_faceB = 2] = "e_faceB";
})(G ||= {});
var gn = class {
	m_proxyA;
	m_proxyB;
	m_sweepA = new L();
	m_sweepB = new L();
	m_type = G.e_unknown;
	m_localPoint = new M();
	m_axis = new M();
	Initialize(e, t, n, r, i, a) {
		this.m_proxyA = t, this.m_proxyB = r;
		let o = e.count;
		this.m_sweepA.Copy(n), this.m_sweepB.Copy(i);
		let s = sn, c = cn;
		if (this.m_sweepA.GetTransform(s, a), this.m_sweepB.GetTransform(c, a), o === 1) {
			this.m_type = G.e_points;
			let t = this.m_proxyA.GetVertex(e.indexA[0]), n = this.m_proxyB.GetVertex(e.indexB[0]), r = I.MulXV(s, t, ln), i = I.MulXV(c, n, un);
			M.SubVV(i, r, this.m_axis);
			let a = this.m_axis.Normalize();
			return this.m_localPoint.SetZero(), a;
		}
		if (e.indexA[0] === e.indexA[1]) {
			this.m_type = G.e_faceB;
			let t = this.m_proxyB.GetVertex(e.indexB[0]), n = this.m_proxyB.GetVertex(e.indexB[1]);
			M.CrossVOne(M.SubVV(n, t, M.s_t0), this.m_axis).SelfNormalize();
			let r = F.MulRV(c.q, this.m_axis, dn);
			M.MidVV(t, n, this.m_localPoint);
			let i = I.MulXV(c, this.m_localPoint, un), a = this.m_proxyA.GetVertex(e.indexA[0]), o = I.MulXV(s, a, ln), l = M.DotVV(M.SubVV(o, i, M.s_t0), r);
			return l < 0 && (this.m_axis.SelfNeg(), l = -l), l;
		}
		{
			this.m_type = G.e_faceA;
			let t = this.m_proxyA.GetVertex(e.indexA[0]), n = this.m_proxyA.GetVertex(e.indexA[1]);
			M.CrossVOne(M.SubVV(n, t, M.s_t0), this.m_axis).SelfNormalize();
			let r = F.MulRV(s.q, this.m_axis, dn);
			M.MidVV(t, n, this.m_localPoint);
			let i = I.MulXV(s, this.m_localPoint, ln), a = this.m_proxyB.GetVertex(e.indexB[0]), o = I.MulXV(c, a, un), l = M.DotVV(M.SubVV(o, i, M.s_t0), r);
			return l < 0 && (this.m_axis.SelfNeg(), l = -l), l;
		}
	}
	FindMinSeparation(e, t, n) {
		let r = sn, i = cn;
		switch (this.m_sweepA.GetTransform(r, n), this.m_sweepB.GetTransform(i, n), this.m_type) {
			case G.e_points: {
				let n = F.MulTRV(r.q, this.m_axis, fn), a = F.MulTRV(i.q, M.NegV(this.m_axis, M.s_t0), pn);
				e[0] = this.m_proxyA.GetSupport(n), t[0] = this.m_proxyB.GetSupport(a);
				let o = this.m_proxyA.GetVertex(e[0]), s = this.m_proxyB.GetVertex(t[0]), c = I.MulXV(r, o, ln), l = I.MulXV(i, s, un);
				return M.DotVV(M.SubVV(l, c, M.s_t0), this.m_axis);
			}
			case G.e_faceA: {
				let n = F.MulRV(r.q, this.m_axis, dn), a = I.MulXV(r, this.m_localPoint, ln), o = F.MulTRV(i.q, M.NegV(n, M.s_t0), pn);
				e[0] = -1, t[0] = this.m_proxyB.GetSupport(o);
				let s = this.m_proxyB.GetVertex(t[0]), c = I.MulXV(i, s, un);
				return M.DotVV(M.SubVV(c, a, M.s_t0), n);
			}
			case G.e_faceB: {
				let n = F.MulRV(i.q, this.m_axis, dn), a = I.MulXV(i, this.m_localPoint, un), o = F.MulTRV(r.q, M.NegV(n, M.s_t0), fn);
				t[0] = -1, e[0] = this.m_proxyA.GetSupport(o);
				let s = this.m_proxyA.GetVertex(e[0]), c = I.MulXV(r, s, ln);
				return M.DotVV(M.SubVV(c, a, M.s_t0), n);
			}
			default: return e[0] = -1, t[0] = -1, 0;
		}
	}
	Evaluate(e, t, n) {
		let r = sn, i = cn;
		switch (this.m_sweepA.GetTransform(r, n), this.m_sweepB.GetTransform(i, n), this.m_type) {
			case G.e_points: {
				let n = this.m_proxyA.GetVertex(e), a = this.m_proxyB.GetVertex(t), o = I.MulXV(r, n, ln), s = I.MulXV(i, a, un);
				return M.DotVV(M.SubVV(s, o, M.s_t0), this.m_axis);
			}
			case G.e_faceA: {
				let e = F.MulRV(r.q, this.m_axis, dn), n = I.MulXV(r, this.m_localPoint, ln), a = this.m_proxyB.GetVertex(t), o = I.MulXV(i, a, un);
				return M.DotVV(M.SubVV(o, n, M.s_t0), e);
			}
			case G.e_faceB: {
				let t = F.MulRV(i.q, this.m_axis, dn), n = I.MulXV(i, this.m_localPoint, un), a = this.m_proxyA.GetVertex(e), o = I.MulXV(r, a, ln);
				return M.DotVV(M.SubVV(o, n, M.s_t0), t);
			}
			default: return 0;
		}
	}
}, _n = new ae(), vn = new se(), yn = new ce(), bn = new le(), xn = new gn(), Sn = [0], Cn = [0], wn = new L(), Tn = new L();
function En(e, t) {
	let n = _n.Reset();
	++tn, e.state = W.e_unknown, e.t = t.tMax;
	let r = t.proxyA, i = t.proxyB, a = O(8, O(r.m_count, i.m_count)), o = wn.Copy(t.sweepA), s = Tn.Copy(t.sweepB);
	o.Normalize(), s.Normalize();
	let l = t.tMax, u = O(c, r.m_radius + i.m_radius - 3 * c), d = .25 * c, f = 0, p = 0, m = vn;
	m.count = 0;
	let h = yn;
	for (h.proxyA.Copy(t.proxyA), h.proxyB.Copy(t.proxyB), h.useRadii = !1;;) {
		let t = sn, n = cn;
		o.GetTransform(t, f), s.GetTransform(n, f), h.transformA.Copy(t), h.transformB.Copy(n);
		let c = bn;
		if (Ce(c, m, h), c.distance <= 0) {
			e.state = W.e_overlapped, e.t = 0;
			break;
		}
		if (c.distance < u + d) {
			e.state = W.e_touching, e.t = f;
			break;
		}
		let g = xn;
		g.Initialize(m, r, o, i, s, f);
		let _ = !1, v = l, y = 0;
		for (;;) {
			let t = Sn, n = Cn, r = g.FindMinSeparation(t, n, v);
			if (r > u + d) {
				e.state = W.e_separated, e.t = l, _ = !0;
				break;
			}
			if (r > u - d) {
				f = v;
				break;
			}
			let i = g.Evaluate(t[0], n[0], f);
			if (i < u - d) {
				e.state = W.e_failed, e.t = f, _ = !0;
				break;
			}
			if (i <= u + d) {
				e.state = W.e_touching, e.t = f, _ = !0;
				break;
			}
			let o = 0, s = f, c = v;
			for (;;) {
				let e = 0;
				e = o & 1 ? s + (u - i) * (c - s) / (r - i) : .5 * (s + c), ++o, ++an;
				let a = g.Evaluate(t[0], n[0], e);
				if (E(a - u) < d) {
					v = e;
					break;
				}
				if (a > u ? (s = e, i = a) : (c = e, r = a), o === 50) break;
			}
			if (on = O(on, o), ++y, y === a) break;
		}
		if (++p, ++nn, _) break;
		if (p === 20) {
			e.state = W.e_failed, e.t = f;
			break;
		}
	}
	rn = O(rn, p);
	let g = n.GetMilliseconds();
	en = O(en, g), $t += g;
}
//#endregion
//#region ../../../../tmp/claude-0/-home-user/98102b14-929e-54a0-bb74-ef07c2e34668/scratchpad/b2/esm/dynamics/b2_joint.js
var K;
(function(e) {
	e[e.e_unknownJoint = 0] = "e_unknownJoint", e[e.e_revoluteJoint = 1] = "e_revoluteJoint", e[e.e_prismaticJoint = 2] = "e_prismaticJoint", e[e.e_distanceJoint = 3] = "e_distanceJoint", e[e.e_pulleyJoint = 4] = "e_pulleyJoint", e[e.e_mouseJoint = 5] = "e_mouseJoint", e[e.e_gearJoint = 6] = "e_gearJoint", e[e.e_wheelJoint = 7] = "e_wheelJoint", e[e.e_weldJoint = 8] = "e_weldJoint", e[e.e_frictionJoint = 9] = "e_frictionJoint", e[e.e_ropeJoint = 10] = "e_ropeJoint", e[e.e_motorJoint = 11] = "e_motorJoint", e[e.e_areaJoint = 12] = "e_areaJoint";
})(K ||= {});
var Dn = class {
	_other = null;
	get other() {
		if (this._other === null) throw Error();
		return this._other;
	}
	set other(e) {
		if (this._other !== null) throw Error();
		this._other = e;
	}
	joint;
	prev = null;
	next = null;
	constructor(e) {
		this.joint = e;
	}
	Reset() {
		this._other = null, this.prev = null, this.next = null;
	}
}, On = class {
	type = K.e_unknownJoint;
	userData = null;
	bodyA;
	bodyB;
	collideConnected = !1;
	constructor(e) {
		this.type = e;
	}
}, q = class t {
	m_type = K.e_unknownJoint;
	m_prev = null;
	m_next = null;
	m_edgeA = new Dn(this);
	m_edgeB = new Dn(this);
	m_bodyA;
	m_bodyB;
	m_index = 0;
	m_islandFlag = !1;
	m_collideConnected = !1;
	m_userData = null;
	constructor(e) {
		this.m_type = e.type, this.m_edgeA.other = e.bodyB, this.m_edgeB.other = e.bodyA, this.m_bodyA = e.bodyA, this.m_bodyB = e.bodyB, this.m_collideConnected = r(e.collideConnected, !1), this.m_userData = r(e.userData, null);
	}
	GetType() {
		return this.m_type;
	}
	GetBodyA() {
		return this.m_bodyA;
	}
	GetBodyB() {
		return this.m_bodyB;
	}
	GetNext() {
		return this.m_next;
	}
	GetUserData() {
		return this.m_userData;
	}
	SetUserData(e) {
		this.m_userData = e;
	}
	IsEnabled() {
		return this.m_bodyA.IsEnabled() && this.m_bodyB.IsEnabled();
	}
	GetCollideConnected() {
		return this.m_collideConnected;
	}
	Dump(e) {
		e("// Dump is not supported for this joint type.\n");
	}
	ShiftOrigin(e) {}
	static Draw_s_p1 = new M();
	static Draw_s_p2 = new M();
	static Draw_s_color = new e(.5, .8, .8);
	static Draw_s_c = new e();
	Draw(e) {
		let n = this.m_bodyA.GetTransform(), r = this.m_bodyB.GetTransform(), i = n.p, a = r.p, o = this.GetAnchorA(t.Draw_s_p1), s = this.GetAnchorB(t.Draw_s_p2), c = t.Draw_s_color.SetRGB(.5, .8, .8);
		switch (this.m_type) {
			case K.e_distanceJoint:
				e.DrawSegment(o, s, c);
				break;
			case K.e_pulleyJoint:
				{
					let t = this, n = t.GetGroundAnchorA(), r = t.GetGroundAnchorB();
					e.DrawSegment(n, o, c), e.DrawSegment(r, s, c), e.DrawSegment(n, r, c);
				}
				break;
			case K.e_mouseJoint:
				{
					let n = t.Draw_s_c;
					n.Set(0, 1, 0), e.DrawPoint(o, 4, n), e.DrawPoint(s, 4, n), n.Set(.8, .8, .8), e.DrawSegment(o, s, n);
				}
				break;
			default: e.DrawSegment(i, o, c), e.DrawSegment(o, s, c), e.DrawSegment(a, s, c);
		}
	}
}, kn = class extends On {
	localAnchorA = new M();
	localAnchorB = new M();
	length = 1;
	minLength = 0;
	maxLength = i;
	stiffness = 0;
	damping = 0;
	constructor() {
		super(K.e_distanceJoint);
	}
	Initialize(e, t, n, r) {
		this.bodyA = e, this.bodyB = t, this.bodyA.GetLocalPoint(n, this.localAnchorA), this.bodyB.GetLocalPoint(r, this.localAnchorB), this.length = O(M.DistanceVV(n, r), c), this.minLength = this.length, this.maxLength = this.length;
	}
}, An = class t extends q {
	m_stiffness = 0;
	m_damping = 0;
	m_bias = 0;
	m_length = 0;
	m_minLength = 0;
	m_maxLength = 0;
	m_localAnchorA = new M();
	m_localAnchorB = new M();
	m_gamma = 0;
	m_impulse = 0;
	m_lowerImpulse = 0;
	m_upperImpulse = 0;
	m_indexA = 0;
	m_indexB = 0;
	m_u = new M();
	m_rA = new M();
	m_rB = new M();
	m_localCenterA = new M();
	m_localCenterB = new M();
	m_currentLength = 0;
	m_invMassA = 0;
	m_invMassB = 0;
	m_invIA = 0;
	m_invIB = 0;
	m_softMass = 0;
	m_mass = 0;
	m_qA = new F();
	m_qB = new F();
	m_lalcA = new M();
	m_lalcB = new M();
	constructor(e) {
		super(e), this.m_localAnchorA.Copy(r(e.localAnchorA, M.ZERO)), this.m_localAnchorB.Copy(r(e.localAnchorB, M.ZERO)), this.m_length = O(r(e.length, this.GetCurrentLength()), c), this.m_minLength = O(r(e.minLength, this.m_length), c), this.m_maxLength = O(r(e.maxLength, this.m_length), this.m_minLength), this.m_stiffness = r(e.stiffness, 0), this.m_damping = r(e.damping, 0);
	}
	GetAnchorA(e) {
		return this.m_bodyA.GetWorldPoint(this.m_localAnchorA, e);
	}
	GetAnchorB(e) {
		return this.m_bodyB.GetWorldPoint(this.m_localAnchorB, e);
	}
	GetReactionForce(e, t) {
		return t.x = e * (this.m_impulse + this.m_lowerImpulse - this.m_upperImpulse) * this.m_u.x, t.y = e * (this.m_impulse + this.m_lowerImpulse - this.m_upperImpulse) * this.m_u.y, t;
	}
	GetReactionTorque(e) {
		return 0;
	}
	GetLocalAnchorA() {
		return this.m_localAnchorA;
	}
	GetLocalAnchorB() {
		return this.m_localAnchorB;
	}
	SetLength(e) {
		return this.m_impulse = 0, this.m_length = O(c, e), this.m_length;
	}
	GetLength() {
		return this.m_length;
	}
	SetMinLength(e) {
		return this.m_lowerImpulse = 0, this.m_minLength = k(e, c, this.m_maxLength), this.m_minLength;
	}
	SetMaxLength(e) {
		return this.m_upperImpulse = 0, this.m_maxLength = O(e, this.m_minLength), this.m_maxLength;
	}
	GetCurrentLength() {
		let e = this.m_bodyA.GetWorldPoint(this.m_localAnchorA, new M()), t = this.m_bodyB.GetWorldPoint(this.m_localAnchorB, new M());
		return M.DistanceVV(e, t);
	}
	SetStiffness(e) {
		this.m_stiffness = e;
	}
	GetStiffness() {
		return this.m_stiffness;
	}
	SetDamping(e) {
		this.m_damping = e;
	}
	GetDamping() {
		return this.m_damping;
	}
	Dump(e) {
		let t = this.m_bodyA.m_islandIndex, n = this.m_bodyB.m_islandIndex;
		e("  const jd: b2DistanceJointDef = new b2DistanceJointDef();\n"), e("  jd.bodyA = bodies[%d];\n", t), e("  jd.bodyB = bodies[%d];\n", n), e("  jd.collideConnected = %s;\n", this.m_collideConnected ? "true" : "false"), e("  jd.localAnchorA.Set(%.15f, %.15f);\n", this.m_localAnchorA.x, this.m_localAnchorA.y), e("  jd.localAnchorB.Set(%.15f, %.15f);\n", this.m_localAnchorB.x, this.m_localAnchorB.y), e("  jd.length = %.15f;\n", this.m_length), e("  jd.minLength = %.15f;\n", this.m_minLength), e("  jd.maxLength = %.15f;\n", this.m_maxLength), e("  jd.stiffness = %.15f;\n", this.m_stiffness), e("  jd.damping = %.15f;\n", this.m_damping), e("  joints[%d] = this.m_world.CreateJoint(jd);\n", this.m_index);
	}
	static InitVelocityConstraints_s_P = new M();
	InitVelocityConstraints(e) {
		this.m_indexA = this.m_bodyA.m_islandIndex, this.m_indexB = this.m_bodyB.m_islandIndex, this.m_localCenterA.Copy(this.m_bodyA.m_sweep.localCenter), this.m_localCenterB.Copy(this.m_bodyB.m_sweep.localCenter), this.m_invMassA = this.m_bodyA.m_invMass, this.m_invMassB = this.m_bodyB.m_invMass, this.m_invIA = this.m_bodyA.m_invI, this.m_invIB = this.m_bodyB.m_invI;
		let n = e.positions[this.m_indexA].c, r = e.positions[this.m_indexA].a, i = e.velocities[this.m_indexA].v, a = e.velocities[this.m_indexA].w, o = e.positions[this.m_indexB].c, s = e.positions[this.m_indexB].a, c = e.velocities[this.m_indexB].v, l = e.velocities[this.m_indexB].w, u = this.m_qA.SetAngle(r), d = this.m_qB.SetAngle(s);
		M.SubVV(this.m_localAnchorA, this.m_localCenterA, this.m_lalcA), F.MulRV(u, this.m_lalcA, this.m_rA), M.SubVV(this.m_localAnchorB, this.m_localCenterB, this.m_lalcB), F.MulRV(d, this.m_lalcB, this.m_rB), this.m_u.x = o.x + this.m_rB.x - n.x - this.m_rA.x, this.m_u.y = o.y + this.m_rB.y - n.y - this.m_rA.y, this.m_currentLength = this.m_u.Length(), this.m_currentLength > .005 ? this.m_u.SelfMul(1 / this.m_currentLength) : (this.m_u.SetZero(), this.m_mass = 0, this.m_impulse = 0, this.m_lowerImpulse = 0, this.m_upperImpulse = 0);
		let f = M.CrossVV(this.m_rA, this.m_u), p = M.CrossVV(this.m_rB, this.m_u), m = this.m_invMassA + this.m_invIA * f * f + this.m_invMassB + this.m_invIB * p * p;
		if (this.m_mass = m === 0 ? 0 : 1 / m, this.m_stiffness > 0 && this.m_minLength < this.m_maxLength) {
			let t = this.m_currentLength - this.m_length, n = this.m_damping, r = this.m_stiffness, i = e.step.dt;
			this.m_gamma = i * (n + i * r), this.m_gamma = this.m_gamma === 0 ? 0 : 1 / this.m_gamma, this.m_bias = t * i * r * this.m_gamma, m += this.m_gamma, this.m_softMass = m === 0 ? 0 : 1 / m;
		} else this.m_gamma = 0, this.m_bias = 0, this.m_softMass = this.m_mass;
		if (e.step.warmStarting) {
			this.m_impulse *= e.step.dtRatio, this.m_lowerImpulse *= e.step.dtRatio, this.m_upperImpulse *= e.step.dtRatio;
			let n = M.MulSV(this.m_impulse + this.m_lowerImpulse - this.m_upperImpulse, this.m_u, t.InitVelocityConstraints_s_P);
			i.SelfMulSub(this.m_invMassA, n), a -= this.m_invIA * M.CrossVV(this.m_rA, n), c.SelfMulAdd(this.m_invMassB, n), l += this.m_invIB * M.CrossVV(this.m_rB, n);
		} else this.m_impulse = 0;
		e.velocities[this.m_indexA].w = a, e.velocities[this.m_indexB].w = l;
	}
	static SolveVelocityConstraints_s_vpA = new M();
	static SolveVelocityConstraints_s_vpB = new M();
	static SolveVelocityConstraints_s_P = new M();
	SolveVelocityConstraints(e) {
		let n = e.velocities[this.m_indexA].v, r = e.velocities[this.m_indexA].w, i = e.velocities[this.m_indexB].v, a = e.velocities[this.m_indexB].w;
		if (this.m_minLength < this.m_maxLength) {
			if (this.m_stiffness > 0) {
				let e = M.AddVCrossSV(n, r, this.m_rA, t.SolveVelocityConstraints_s_vpA), o = M.AddVCrossSV(i, a, this.m_rB, t.SolveVelocityConstraints_s_vpB), s = M.DotVV(this.m_u, M.SubVV(o, e, M.s_t0)), c = -this.m_softMass * (s + this.m_bias + this.m_gamma * this.m_impulse);
				this.m_impulse += c;
				let l = M.MulSV(c, this.m_u, t.SolveVelocityConstraints_s_P);
				n.SelfMulSub(this.m_invMassA, l), r -= this.m_invIA * M.CrossVV(this.m_rA, l), i.SelfMulAdd(this.m_invMassB, l), a += this.m_invIB * M.CrossVV(this.m_rB, l);
			}
			{
				let o = O(0, this.m_currentLength - this.m_minLength) * e.step.inv_dt, s = M.AddVCrossSV(n, r, this.m_rA, t.SolveVelocityConstraints_s_vpA), c = M.AddVCrossSV(i, a, this.m_rB, t.SolveVelocityConstraints_s_vpB), l = M.DotVV(this.m_u, M.SubVV(c, s, M.s_t0)), u = -this.m_mass * (l + o), d = this.m_lowerImpulse;
				this.m_lowerImpulse = O(0, this.m_lowerImpulse + u), u = this.m_lowerImpulse - d;
				let f = M.MulSV(u, this.m_u, t.SolveVelocityConstraints_s_P);
				n.SelfMulSub(this.m_invMassA, f), r -= this.m_invIA * M.CrossVV(this.m_rA, f), i.SelfMulAdd(this.m_invMassB, f), a += this.m_invIB * M.CrossVV(this.m_rB, f);
			}
			{
				let o = O(0, this.m_maxLength - this.m_currentLength) * e.step.inv_dt, s = M.AddVCrossSV(n, r, this.m_rA, t.SolveVelocityConstraints_s_vpA), c = M.AddVCrossSV(i, a, this.m_rB, t.SolveVelocityConstraints_s_vpB), l = M.DotVV(this.m_u, M.SubVV(s, c, M.s_t0)), u = -this.m_mass * (l + o), d = this.m_upperImpulse;
				this.m_upperImpulse = O(0, this.m_upperImpulse + u), u = this.m_upperImpulse - d;
				let f = M.MulSV(-u, this.m_u, t.SolveVelocityConstraints_s_P);
				n.SelfMulSub(this.m_invMassA, f), r -= this.m_invIA * M.CrossVV(this.m_rA, f), i.SelfMulAdd(this.m_invMassB, f), a += this.m_invIB * M.CrossVV(this.m_rB, f);
			}
		} else {
			let e = M.AddVCrossSV(n, r, this.m_rA, t.SolveVelocityConstraints_s_vpA), o = M.AddVCrossSV(i, a, this.m_rB, t.SolveVelocityConstraints_s_vpB), s = M.DotVV(this.m_u, M.SubVV(o, e, M.s_t0)), c = -this.m_mass * s;
			this.m_impulse += c;
			let l = M.MulSV(c, this.m_u, t.SolveVelocityConstraints_s_P);
			n.SelfMulSub(this.m_invMassA, l), r -= this.m_invIA * M.CrossVV(this.m_rA, l), i.SelfMulAdd(this.m_invMassB, l), a += this.m_invIB * M.CrossVV(this.m_rB, l);
		}
		e.velocities[this.m_indexA].w = r, e.velocities[this.m_indexB].w = a;
	}
	static SolvePositionConstraints_s_P = new M();
	SolvePositionConstraints(e) {
		let n = e.positions[this.m_indexA].c, r = e.positions[this.m_indexA].a, i = e.positions[this.m_indexB].c, a = e.positions[this.m_indexB].a, o = this.m_qA.SetAngle(r), s = this.m_qB.SetAngle(a), l = F.MulRV(o, this.m_lalcA, this.m_rA), u = F.MulRV(s, this.m_lalcB, this.m_rB), d = this.m_u;
		d.x = i.x + u.x - n.x - l.x, d.y = i.y + u.y - n.y - l.y;
		let f = this.m_u.Normalize(), p;
		if (this.m_minLength == this.m_maxLength) p = f - this.m_minLength;
		else if (f < this.m_minLength) p = f - this.m_minLength;
		else if (this.m_maxLength < f) p = f - this.m_maxLength;
		else return !0;
		let m = -this.m_mass * p, h = M.MulSV(m, d, t.SolvePositionConstraints_s_P);
		return n.SelfMulSub(this.m_invMassA, h), r -= this.m_invIA * M.CrossVV(l, h), i.SelfMulAdd(this.m_invMassB, h), a += this.m_invIB * M.CrossVV(u, h), e.positions[this.m_indexA].a = r, e.positions[this.m_indexB].a = a, E(p) < c;
	}
	static Draw_s_pA = new M();
	static Draw_s_pB = new M();
	static Draw_s_axis = new M();
	static Draw_s_c1 = new e(.7, .7, .7);
	static Draw_s_c2 = new e(.3, .9, .3);
	static Draw_s_c3 = new e(.9, .3, .3);
	static Draw_s_c4 = new e(.4, .4, .4);
	static Draw_s_pRest = new M();
	static Draw_s_pMin = new M();
	static Draw_s_pMax = new M();
	Draw(e) {
		let n = this.m_bodyA.GetTransform(), r = this.m_bodyB.GetTransform(), i = I.MulXV(n, this.m_localAnchorA, t.Draw_s_pA), a = I.MulXV(r, this.m_localAnchorB, t.Draw_s_pB), o = M.SubVV(a, i, t.Draw_s_axis);
		o.Normalize();
		let s = t.Draw_s_c1, c = t.Draw_s_c2, l = t.Draw_s_c3, u = t.Draw_s_c4;
		e.DrawSegment(i, a, u);
		let d = M.AddVMulSV(i, this.m_length, o, t.Draw_s_pRest);
		if (e.DrawPoint(d, 8, s), this.m_minLength != this.m_maxLength) {
			if (this.m_minLength > .005) {
				let n = M.AddVMulSV(i, this.m_minLength, o, t.Draw_s_pMin);
				e.DrawPoint(n, 4, c);
			}
			if (this.m_maxLength < 1e37) {
				let n = M.AddVMulSV(i, this.m_maxLength, o, t.Draw_s_pMax);
				e.DrawPoint(n, 4, l);
			}
		}
	}
}, jn = class extends q {
	m_bodies;
	m_stiffness = 0;
	m_damping = 0;
	m_impulse = 0;
	m_targetLengths;
	m_targetArea = 0;
	m_normals;
	m_joints;
	m_deltas;
	m_delta = new M();
	constructor(e) {
		super(e), this.m_bodies = e.bodies, this.m_stiffness = r(e.stiffness, 0), this.m_damping = r(e.damping, 0), this.m_targetLengths = C(e.bodies.length), this.m_normals = M.MakeArray(e.bodies.length), this.m_joints = [], this.m_deltas = M.MakeArray(e.bodies.length);
		let t = new kn();
		t.stiffness = this.m_stiffness, t.damping = this.m_damping, this.m_targetArea = 0;
		for (let e = 0; e < this.m_bodies.length; ++e) {
			let n = this.m_bodies[e], r = this.m_bodies[(e + 1) % this.m_bodies.length], i = n.GetWorldCenter(), a = r.GetWorldCenter();
			this.m_targetLengths[e] = M.DistanceVV(i, a), this.m_targetArea += M.CrossVV(i, a), t.Initialize(n, r, i, a), this.m_joints[e] = n.GetWorld().CreateJoint(t);
		}
		this.m_targetArea *= .5;
	}
	GetAnchorA(e) {
		return e;
	}
	GetAnchorB(e) {
		return e;
	}
	GetReactionForce(e, t) {
		return t;
	}
	GetReactionTorque(e) {
		return 0;
	}
	SetStiffness(e) {
		this.m_stiffness = e;
		for (let t = 0; t < this.m_joints.length; ++t) this.m_joints[t].SetStiffness(e);
	}
	GetStiffness() {
		return this.m_stiffness;
	}
	SetDamping(e) {
		this.m_damping = e;
		for (let t = 0; t < this.m_joints.length; ++t) this.m_joints[t].SetDamping(e);
	}
	GetDamping() {
		return this.m_damping;
	}
	Dump(e) {
		e("Area joint dumping is not supported.\n");
	}
	InitVelocityConstraints(e) {
		for (let t = 0; t < this.m_bodies.length; ++t) {
			let n = this.m_bodies[(t + this.m_bodies.length - 1) % this.m_bodies.length], r = this.m_bodies[(t + 1) % this.m_bodies.length], i = e.positions[n.m_islandIndex].c, a = e.positions[r.m_islandIndex].c, o = this.m_deltas[t];
			M.SubVV(a, i, o);
		}
		if (e.step.warmStarting) {
			this.m_impulse *= e.step.dtRatio;
			for (let t = 0; t < this.m_bodies.length; ++t) {
				let n = this.m_bodies[t], r = e.velocities[n.m_islandIndex].v, i = this.m_deltas[t];
				r.x += n.m_invMass * i.y * .5 * this.m_impulse, r.y += n.m_invMass * -i.x * .5 * this.m_impulse;
			}
		} else this.m_impulse = 0;
	}
	SolveVelocityConstraints(e) {
		let t = 0, n = 0;
		for (let r = 0; r < this.m_bodies.length; ++r) {
			let i = this.m_bodies[r], a = e.velocities[i.m_islandIndex].v, o = this.m_deltas[r];
			t += o.LengthSquared() / i.GetMass(), n += M.CrossVV(a, o);
		}
		let r = -2 * n / t;
		this.m_impulse += r;
		for (let t = 0; t < this.m_bodies.length; ++t) {
			let n = this.m_bodies[t], i = e.velocities[n.m_islandIndex].v, a = this.m_deltas[t];
			i.x += n.m_invMass * a.y * .5 * r, i.y += n.m_invMass * -a.x * .5 * r;
		}
	}
	SolvePositionConstraints(e) {
		let t = 0, n = 0;
		for (let r = 0; r < this.m_bodies.length; ++r) {
			let i = this.m_bodies[r], a = this.m_bodies[(r + 1) % this.m_bodies.length], o = e.positions[i.m_islandIndex].c, s = e.positions[a.m_islandIndex].c, c = M.SubVV(s, o, this.m_delta), l = c.Length();
			l < 1e-5 && (l = 1), this.m_normals[r].x = c.y / l, this.m_normals[r].y = -c.x / l, t += l, n += M.CrossVV(o, s);
		}
		n *= .5;
		let r = .5 * (this.m_targetArea - n) / t, i = !0;
		for (let t = 0; t < this.m_bodies.length; ++t) {
			let n = this.m_bodies[t], a = e.positions[n.m_islandIndex].c, o = (t + 1) % this.m_bodies.length, s = M.AddVV(this.m_normals[t], this.m_normals[o], this.m_delta);
			s.SelfMul(r);
			let c = s.LengthSquared();
			c > A(.2) && s.SelfMul(d / j(c)), c > A(.005) && (i = !1), a.x += s.x, a.y += s.y;
		}
		return i;
	}
}, Mn = class e {
	static DEFAULT = new e();
	categoryBits = 1;
	maskBits = 65535;
	groupIndex = 0;
	Clone() {
		return new e().Copy(this);
	}
	Copy(e) {
		return this.categoryBits = e.categoryBits, this.maskBits = e.maskBits, this.groupIndex = e.groupIndex || 0, this;
	}
}, Nn = class {
	shape;
	userData = null;
	friction = .2;
	restitution = 0;
	restitutionThreshold = 1;
	density = 0;
	isSensor = !1;
	filter = new Mn();
}, Pn = class e {
	aabb = new V();
	fixture;
	childIndex = 0;
	treeNode;
	constructor(e, t) {
		this.fixture = e, this.childIndex = t, this.fixture.m_shape.ComputeAABB(this.aabb, this.fixture.m_body.GetTransform(), t), this.treeNode = this.fixture.m_body.m_world.m_contactManager.m_broadPhase.CreateProxy(this.aabb, this);
	}
	Reset() {
		this.fixture.m_body.m_world.m_contactManager.m_broadPhase.DestroyProxy(this.treeNode);
	}
	Touch() {
		this.fixture.m_body.m_world.m_contactManager.m_broadPhase.TouchProxy(this.treeNode);
	}
	static Synchronize_s_aabb1 = new V();
	static Synchronize_s_aabb2 = new V();
	static Synchronize_s_displacement = new M();
	Synchronize(t, n) {
		if (t === n) this.fixture.m_shape.ComputeAABB(this.aabb, t, this.childIndex), this.fixture.m_body.m_world.m_contactManager.m_broadPhase.MoveProxy(this.treeNode, this.aabb, M.ZERO);
		else {
			let r = e.Synchronize_s_aabb1, i = e.Synchronize_s_aabb2;
			this.fixture.m_shape.ComputeAABB(r, t, this.childIndex), this.fixture.m_shape.ComputeAABB(i, n, this.childIndex), this.aabb.Combine2(r, i);
			let a = e.Synchronize_s_displacement;
			a.Copy(i.GetCenter()).SelfSub(r.GetCenter()), this.fixture.m_body.m_world.m_contactManager.m_broadPhase.MoveProxy(this.treeNode, this.aabb, a);
		}
	}
}, Fn = class {
	m_density = 0;
	m_next = null;
	m_body;
	m_shape;
	m_friction = 0;
	m_restitution = 0;
	m_restitutionThreshold = 1;
	m_proxies = [];
	get m_proxyCount() {
		return this.m_proxies.length;
	}
	m_filter = new Mn();
	m_isSensor = !1;
	m_userData = null;
	constructor(e, t) {
		this.m_body = e, this.m_shape = t.shape.Clone(), this.m_userData = r(t.userData, null), this.m_friction = r(t.friction, .2), this.m_restitution = r(t.restitution, 0), this.m_restitutionThreshold = r(t.restitutionThreshold, 0), this.m_filter.Copy(r(t.filter, Mn.DEFAULT)), this.m_isSensor = r(t.isSensor, !1), this.m_density = r(t.density, 0);
	}
	Reset() {}
	GetType() {
		return this.m_shape.GetType();
	}
	GetShape() {
		return this.m_shape;
	}
	SetSensor(e) {
		e !== this.m_isSensor && (this.m_body.SetAwake(!0), this.m_isSensor = e);
	}
	IsSensor() {
		return this.m_isSensor;
	}
	SetFilterData(e) {
		this.m_filter.Copy(e), this.Refilter();
	}
	GetFilterData() {
		return this.m_filter;
	}
	Refilter() {
		let e = this.m_body.GetContactList();
		for (; e;) {
			let t = e.contact, n = t.GetFixtureA(), r = t.GetFixtureB();
			(n === this || r === this) && t.FlagForFiltering(), e = e.next;
		}
		this.TouchProxies();
	}
	GetBody() {
		return this.m_body;
	}
	GetNext() {
		return this.m_next;
	}
	GetUserData() {
		return this.m_userData;
	}
	SetUserData(e) {
		this.m_userData = e;
	}
	TestPoint(e) {
		return this.m_shape.TestPoint(this.m_body.GetTransform(), e);
	}
	ComputeDistance(e, t, n) {
		return this.m_shape.ComputeDistance(this.m_body.GetTransform(), e, t, n);
	}
	RayCast(e, t, n) {
		return this.m_shape.RayCast(e, t, this.m_body.GetTransform(), n);
	}
	GetMassData(e = new He()) {
		return this.m_shape.ComputeMass(e, this.m_density), e;
	}
	SetDensity(e) {
		this.m_density = e;
	}
	GetDensity() {
		return this.m_density;
	}
	GetFriction() {
		return this.m_friction;
	}
	SetFriction(e) {
		this.m_friction = e;
	}
	GetRestitution() {
		return this.m_restitution;
	}
	SetRestitution(e) {
		this.m_restitution = e;
	}
	GetRestitutionThreshold() {
		return this.m_restitutionThreshold;
	}
	SetRestitutionThreshold(e) {
		this.m_restitutionThreshold = e;
	}
	GetAABB(e) {
		return this.m_proxies[e].aabb;
	}
	Dump(e, t) {
		e("    const fd: b2FixtureDef = new b2FixtureDef();\n"), e("    fd.friction = %.15f;\n", this.m_friction), e("    fd.restitution = %.15f;\n", this.m_restitution), e("    fd.restitutionThreshold = %.15f;\n", this.m_restitutionThreshold), e("    fd.density = %.15f;\n", this.m_density), e("    fd.isSensor = %s;\n", this.m_isSensor ? "true" : "false"), e("    fd.filter.categoryBits = %d;\n", this.m_filter.categoryBits), e("    fd.filter.maskBits = %d;\n", this.m_filter.maskBits), e("    fd.filter.groupIndex = %d;\n", this.m_filter.groupIndex), this.m_shape.Dump(e), e("\n"), e("    fd.shape = shape;\n"), e("\n"), e("    bodies[%d].CreateFixture(fd);\n", t);
	}
	CreateProxies() {
		if (this.m_proxies.length !== 0) throw Error();
		for (let e = 0; e < this.m_shape.GetChildCount(); ++e) this.m_proxies[e] = new Pn(this, e);
	}
	DestroyProxies() {
		for (let e of this.m_proxies) e.Reset();
		this.m_proxies.length = 0;
	}
	TouchProxies() {
		for (let e of this.m_proxies) e.Touch();
	}
	SynchronizeProxies(e, t) {
		for (let n of this.m_proxies) n.Synchronize(e, t);
	}
}, J;
(function(e) {
	e[e.b2_unknown = -1] = "b2_unknown", e[e.b2_staticBody = 0] = "b2_staticBody", e[e.b2_kinematicBody = 1] = "b2_kinematicBody", e[e.b2_dynamicBody = 2] = "b2_dynamicBody";
})(J ||= {});
var In = class {
	type = J.b2_staticBody;
	position = new M(0, 0);
	angle = 0;
	linearVelocity = new M(0, 0);
	angularVelocity = 0;
	linearDamping = 0;
	angularDamping = 0;
	allowSleep = !0;
	awake = !0;
	fixedRotation = !1;
	bullet = !1;
	enabled = !0;
	userData = null;
	gravityScale = 1;
}, Ln = class e {
	m_type = J.b2_staticBody;
	m_islandFlag = !1;
	m_awakeFlag = !1;
	m_autoSleepFlag = !1;
	m_bulletFlag = !1;
	m_fixedRotationFlag = !1;
	m_enabledFlag = !1;
	m_toiFlag = !1;
	m_islandIndex = 0;
	m_xf = new I();
	m_xf0 = new I();
	m_sweep = new L();
	m_linearVelocity = new M();
	m_angularVelocity = 0;
	m_force = new M();
	m_torque = 0;
	m_world;
	m_prev = null;
	m_next = null;
	m_fixtureList = null;
	m_fixtureCount = 0;
	m_jointList = null;
	m_contactList = null;
	m_mass = 1;
	m_invMass = 1;
	m_I = 0;
	m_invI = 0;
	m_linearDamping = 0;
	m_angularDamping = 0;
	m_gravityScale = 1;
	m_sleepTime = 0;
	m_userData = null;
	m_controllerList = null;
	m_controllerCount = 0;
	constructor(e, t) {
		this.m_bulletFlag = r(e.bullet, !1), this.m_fixedRotationFlag = r(e.fixedRotation, !1), this.m_autoSleepFlag = r(e.allowSleep, !0), r(e.awake, !0) && r(e.type, J.b2_staticBody) !== J.b2_staticBody && (this.m_awakeFlag = !0), this.m_enabledFlag = r(e.enabled, !0), this.m_world = t, this.m_xf.p.Copy(r(e.position, M.ZERO)), this.m_xf.q.SetAngle(r(e.angle, 0)), this.m_xf0.Copy(this.m_xf), this.m_sweep.localCenter.SetZero(), this.m_sweep.c0.Copy(this.m_xf.p), this.m_sweep.c.Copy(this.m_xf.p), this.m_sweep.a0 = this.m_sweep.a = this.m_xf.q.GetAngle(), this.m_sweep.alpha0 = 0, this.m_linearVelocity.Copy(r(e.linearVelocity, M.ZERO)), this.m_angularVelocity = r(e.angularVelocity, 0), this.m_linearDamping = r(e.linearDamping, 0), this.m_angularDamping = r(e.angularDamping, 0), this.m_gravityScale = r(e.gravityScale, 1), this.m_force.SetZero(), this.m_torque = 0, this.m_sleepTime = 0, this.m_type = r(e.type, J.b2_staticBody), this.m_mass = 0, this.m_invMass = 0, this.m_I = 0, this.m_invI = 0, this.m_userData = e.userData, this.m_fixtureList = null, this.m_fixtureCount = 0, this.m_controllerList = null, this.m_controllerCount = 0;
	}
	CreateFixture(e, t = 0) {
		return e instanceof Ue ? this.CreateFixtureShapeDensity(e, t) : this.CreateFixtureDef(e);
	}
	CreateFixtureDef(e) {
		if (this.m_world.IsLocked()) throw Error();
		let t = new Fn(this, e);
		return this.m_enabledFlag && t.CreateProxies(), t.m_next = this.m_fixtureList, this.m_fixtureList = t, ++this.m_fixtureCount, t.m_density > 0 && this.ResetMassData(), this.m_world.m_newContacts = !0, t;
	}
	static CreateFixtureShapeDensity_s_def = new Nn();
	CreateFixtureShapeDensity(t, n = 0) {
		let r = e.CreateFixtureShapeDensity_s_def;
		return r.shape = t, r.density = n, this.CreateFixtureDef(r);
	}
	DestroyFixture(e) {
		if (this.m_world.IsLocked()) throw Error();
		let t = this.m_fixtureList, n = null;
		for (; t !== null;) {
			if (t === e) {
				n ? n.m_next = e.m_next : this.m_fixtureList = e.m_next;
				break;
			}
			n = t, t = t.m_next;
		}
		let r = this.m_contactList;
		for (; r;) {
			let t = r.contact;
			r = r.next;
			let n = t.GetFixtureA(), i = t.GetFixtureB();
			(e === n || e === i) && this.m_world.m_contactManager.Destroy(t);
		}
		this.m_enabledFlag && e.DestroyProxies(), e.m_next = null, e.Reset(), --this.m_fixtureCount, this.ResetMassData();
	}
	SetTransformVec(e, t) {
		this.SetTransformXY(e.x, e.y, t);
	}
	SetTransformXY(e, t, n) {
		if (this.m_world.IsLocked()) throw Error();
		this.m_xf.q.SetAngle(n), this.m_xf.p.Set(e, t), this.m_xf0.Copy(this.m_xf), I.MulXV(this.m_xf, this.m_sweep.localCenter, this.m_sweep.c), this.m_sweep.a = n, this.m_sweep.c0.Copy(this.m_sweep.c), this.m_sweep.a0 = n;
		for (let e = this.m_fixtureList; e; e = e.m_next) e.SynchronizeProxies(this.m_xf, this.m_xf);
		this.m_world.m_newContacts = !0;
	}
	SetTransform(e) {
		this.SetTransformVec(e.p, e.GetAngle());
	}
	GetTransform() {
		return this.m_xf;
	}
	GetPosition() {
		return this.m_xf.p;
	}
	SetPosition(e) {
		this.SetTransformVec(e, this.GetAngle());
	}
	SetPositionXY(e, t) {
		this.SetTransformXY(e, t, this.GetAngle());
	}
	GetAngle() {
		return this.m_sweep.a;
	}
	SetAngle(e) {
		this.SetTransformVec(this.GetPosition(), e);
	}
	GetWorldCenter() {
		return this.m_sweep.c;
	}
	GetLocalCenter() {
		return this.m_sweep.localCenter;
	}
	SetLinearVelocity(e) {
		this.m_type !== J.b2_staticBody && (M.DotVV(e, e) > 0 && this.SetAwake(!0), this.m_linearVelocity.Copy(e));
	}
	GetLinearVelocity() {
		return this.m_linearVelocity;
	}
	SetAngularVelocity(e) {
		this.m_type !== J.b2_staticBody && (e * e > 0 && this.SetAwake(!0), this.m_angularVelocity = e);
	}
	GetAngularVelocity() {
		return this.m_angularVelocity;
	}
	GetDefinition(e) {
		return e.type = this.GetType(), e.allowSleep = this.m_autoSleepFlag, e.angle = this.GetAngle(), e.angularDamping = this.m_angularDamping, e.gravityScale = this.m_gravityScale, e.angularVelocity = this.m_angularVelocity, e.fixedRotation = this.m_fixedRotationFlag, e.bullet = this.m_bulletFlag, e.awake = this.m_awakeFlag, e.linearDamping = this.m_linearDamping, e.linearVelocity.Copy(this.GetLinearVelocity()), e.position.Copy(this.GetPosition()), e.userData = this.GetUserData(), e;
	}
	ApplyForce(e, t, n = !0) {
		this.m_type === J.b2_dynamicBody && (n && !this.m_awakeFlag && this.SetAwake(!0), this.m_awakeFlag && (this.m_force.x += e.x, this.m_force.y += e.y, this.m_torque += (t.x - this.m_sweep.c.x) * e.y - (t.y - this.m_sweep.c.y) * e.x));
	}
	ApplyForceToCenter(e, t = !0) {
		this.m_type === J.b2_dynamicBody && (t && !this.m_awakeFlag && this.SetAwake(!0), this.m_awakeFlag && (this.m_force.x += e.x, this.m_force.y += e.y));
	}
	ApplyTorque(e, t = !0) {
		this.m_type === J.b2_dynamicBody && (t && !this.m_awakeFlag && this.SetAwake(!0), this.m_awakeFlag && (this.m_torque += e));
	}
	ApplyLinearImpulse(e, t, n = !0) {
		this.m_type === J.b2_dynamicBody && (n && !this.m_awakeFlag && this.SetAwake(!0), this.m_awakeFlag && (this.m_linearVelocity.x += this.m_invMass * e.x, this.m_linearVelocity.y += this.m_invMass * e.y, this.m_angularVelocity += this.m_invI * ((t.x - this.m_sweep.c.x) * e.y - (t.y - this.m_sweep.c.y) * e.x)));
	}
	ApplyLinearImpulseToCenter(e, t = !0) {
		this.m_type === J.b2_dynamicBody && (t && !this.m_awakeFlag && this.SetAwake(!0), this.m_awakeFlag && (this.m_linearVelocity.x += this.m_invMass * e.x, this.m_linearVelocity.y += this.m_invMass * e.y));
	}
	ApplyAngularImpulse(e, t = !0) {
		this.m_type === J.b2_dynamicBody && (t && !this.m_awakeFlag && this.SetAwake(!0), this.m_awakeFlag && (this.m_angularVelocity += this.m_invI * e));
	}
	GetMass() {
		return this.m_mass;
	}
	GetInertia() {
		return this.m_I + this.m_mass * M.DotVV(this.m_sweep.localCenter, this.m_sweep.localCenter);
	}
	GetMassData(e) {
		return e.mass = this.m_mass, e.I = this.m_I + this.m_mass * M.DotVV(this.m_sweep.localCenter, this.m_sweep.localCenter), e.center.Copy(this.m_sweep.localCenter), e;
	}
	static SetMassData_s_oldCenter = new M();
	SetMassData(t) {
		if (this.m_world.IsLocked()) throw Error();
		if (this.m_type !== J.b2_dynamicBody) return;
		this.m_invMass = 0, this.m_I = 0, this.m_invI = 0, this.m_mass = t.mass, this.m_mass <= 0 && (this.m_mass = 1), this.m_invMass = 1 / this.m_mass, t.I > 0 && !this.m_fixedRotationFlag && (this.m_I = t.I - this.m_mass * M.DotVV(t.center, t.center), this.m_invI = 1 / this.m_I);
		let n = e.SetMassData_s_oldCenter.Copy(this.m_sweep.c);
		this.m_sweep.localCenter.Copy(t.center), I.MulXV(this.m_xf, this.m_sweep.localCenter, this.m_sweep.c), this.m_sweep.c0.Copy(this.m_sweep.c), M.AddVCrossSV(this.m_linearVelocity, this.m_angularVelocity, M.SubVV(this.m_sweep.c, n, M.s_t0), this.m_linearVelocity);
	}
	static ResetMassData_s_localCenter = new M();
	static ResetMassData_s_oldCenter = new M();
	static ResetMassData_s_massData = new He();
	ResetMassData() {
		if (this.m_mass = 0, this.m_invMass = 0, this.m_I = 0, this.m_invI = 0, this.m_sweep.localCenter.SetZero(), this.m_type === J.b2_staticBody || this.m_type === J.b2_kinematicBody) {
			this.m_sweep.c0.Copy(this.m_xf.p), this.m_sweep.c.Copy(this.m_xf.p), this.m_sweep.a0 = this.m_sweep.a;
			return;
		}
		let t = e.ResetMassData_s_localCenter.SetZero();
		for (let n = this.m_fixtureList; n; n = n.m_next) {
			if (n.m_density === 0) continue;
			let r = n.GetMassData(e.ResetMassData_s_massData);
			this.m_mass += r.mass, t.x += r.center.x * r.mass, t.y += r.center.y * r.mass, this.m_I += r.I;
		}
		this.m_mass > 0 && (this.m_invMass = 1 / this.m_mass, t.x *= this.m_invMass, t.y *= this.m_invMass), this.m_I > 0 && !this.m_fixedRotationFlag ? (this.m_I -= this.m_mass * M.DotVV(t, t), this.m_invI = 1 / this.m_I) : (this.m_I = 0, this.m_invI = 0);
		let n = e.ResetMassData_s_oldCenter.Copy(this.m_sweep.c);
		this.m_sweep.localCenter.Copy(t), I.MulXV(this.m_xf, this.m_sweep.localCenter, this.m_sweep.c), this.m_sweep.c0.Copy(this.m_sweep.c), M.AddVCrossSV(this.m_linearVelocity, this.m_angularVelocity, M.SubVV(this.m_sweep.c, n, M.s_t0), this.m_linearVelocity);
	}
	GetWorldPoint(e, t) {
		return I.MulXV(this.m_xf, e, t);
	}
	GetWorldVector(e, t) {
		return F.MulRV(this.m_xf.q, e, t);
	}
	GetLocalPoint(e, t) {
		return I.MulTXV(this.m_xf, e, t);
	}
	GetLocalVector(e, t) {
		return F.MulTRV(this.m_xf.q, e, t);
	}
	GetLinearVelocityFromWorldPoint(e, t) {
		return M.AddVCrossSV(this.m_linearVelocity, this.m_angularVelocity, M.SubVV(e, this.m_sweep.c, M.s_t0), t);
	}
	GetLinearVelocityFromLocalPoint(e, t) {
		return this.GetLinearVelocityFromWorldPoint(this.GetWorldPoint(e, t), t);
	}
	GetLinearDamping() {
		return this.m_linearDamping;
	}
	SetLinearDamping(e) {
		this.m_linearDamping = e;
	}
	GetAngularDamping() {
		return this.m_angularDamping;
	}
	SetAngularDamping(e) {
		this.m_angularDamping = e;
	}
	GetGravityScale() {
		return this.m_gravityScale;
	}
	SetGravityScale(e) {
		this.m_gravityScale = e;
	}
	SetType(e) {
		if (this.m_world.IsLocked()) throw Error();
		if (this.m_type === e) return;
		this.m_type = e, this.ResetMassData(), this.m_type === J.b2_staticBody && (this.m_linearVelocity.SetZero(), this.m_angularVelocity = 0, this.m_sweep.a0 = this.m_sweep.a, this.m_sweep.c0.Copy(this.m_sweep.c), this.m_awakeFlag = !1, this.SynchronizeFixtures()), this.SetAwake(!0), this.m_force.SetZero(), this.m_torque = 0;
		let t = this.m_contactList;
		for (; t;) {
			let e = t;
			t = t.next, this.m_world.m_contactManager.Destroy(e.contact);
		}
		this.m_contactList = null;
		for (let e = this.m_fixtureList; e; e = e.m_next) e.TouchProxies();
	}
	GetType() {
		return this.m_type;
	}
	SetBullet(e) {
		this.m_bulletFlag = e;
	}
	IsBullet() {
		return this.m_bulletFlag;
	}
	SetSleepingAllowed(e) {
		this.m_autoSleepFlag = e, e || this.SetAwake(!0);
	}
	IsSleepingAllowed() {
		return this.m_autoSleepFlag;
	}
	SetAwake(e) {
		this.m_type !== J.b2_staticBody && (e ? (this.m_awakeFlag = !0, this.m_sleepTime = 0) : (this.m_awakeFlag = !1, this.m_sleepTime = 0, this.m_linearVelocity.SetZero(), this.m_angularVelocity = 0, this.m_force.SetZero(), this.m_torque = 0));
	}
	IsAwake() {
		return this.m_awakeFlag;
	}
	SetEnabled(e) {
		if (this.m_world.IsLocked()) throw Error();
		if (e !== this.IsEnabled()) {
			if (this.m_enabledFlag = e, e) {
				for (let e = this.m_fixtureList; e; e = e.m_next) e.CreateProxies();
				this.m_world.m_newContacts = !0;
			} else {
				for (let e = this.m_fixtureList; e; e = e.m_next) e.DestroyProxies();
				let e = this.m_contactList;
				for (; e;) {
					let t = e;
					e = e.next, this.m_world.m_contactManager.Destroy(t.contact);
				}
				this.m_contactList = null;
			}
		}
	}
	IsEnabled() {
		return this.m_enabledFlag;
	}
	SetFixedRotation(e) {
		this.m_fixedRotationFlag !== e && (this.m_fixedRotationFlag = e, this.m_angularVelocity = 0, this.ResetMassData());
	}
	IsFixedRotation() {
		return this.m_fixedRotationFlag;
	}
	GetFixtureList() {
		return this.m_fixtureList;
	}
	GetJointList() {
		return this.m_jointList;
	}
	GetContactList() {
		return this.m_contactList;
	}
	GetNext() {
		return this.m_next;
	}
	GetUserData() {
		return this.m_userData;
	}
	SetUserData(e) {
		this.m_userData = e;
	}
	GetWorld() {
		return this.m_world;
	}
	Dump(e) {
		let t = this.m_islandIndex;
		e("{\n"), e("  const bd: b2BodyDef = new b2BodyDef();\n");
		let n = "";
		switch (this.m_type) {
			case J.b2_staticBody:
				n = "b2BodyType.b2_staticBody";
				break;
			case J.b2_kinematicBody:
				n = "b2BodyType.b2_kinematicBody";
				break;
			case J.b2_dynamicBody: n = "b2BodyType.b2_dynamicBody";
		}
		e("  bd.type = %s;\n", n), e("  bd.position.Set(%.15f, %.15f);\n", this.m_xf.p.x, this.m_xf.p.y), e("  bd.angle = %.15f;\n", this.m_sweep.a), e("  bd.linearVelocity.Set(%.15f, %.15f);\n", this.m_linearVelocity.x, this.m_linearVelocity.y), e("  bd.angularVelocity = %.15f;\n", this.m_angularVelocity), e("  bd.linearDamping = %.15f;\n", this.m_linearDamping), e("  bd.angularDamping = %.15f;\n", this.m_angularDamping), e("  bd.allowSleep = %s;\n", this.m_autoSleepFlag ? "true" : "false"), e("  bd.awake = %s;\n", this.m_awakeFlag ? "true" : "false"), e("  bd.fixedRotation = %s;\n", this.m_fixedRotationFlag ? "true" : "false"), e("  bd.bullet = %s;\n", this.m_bulletFlag ? "true" : "false"), e("  bd.active = %s;\n", this.m_enabledFlag ? "true" : "false"), e("  bd.gravityScale = %.15f;\n", this.m_gravityScale), e("\n"), e("  bodies[%d] = this.m_world.CreateBody(bd);\n", this.m_islandIndex), e("\n");
		for (let n = this.m_fixtureList; n; n = n.m_next) e("  {\n"), n.Dump(e, t), e("  }\n");
		e("}\n");
	}
	static SynchronizeFixtures_s_xf1 = new I();
	SynchronizeFixtures() {
		if (this.m_awakeFlag) {
			let t = e.SynchronizeFixtures_s_xf1;
			t.q.SetAngle(this.m_sweep.a0), F.MulRV(t.q, this.m_sweep.localCenter, t.p), M.SubVV(this.m_sweep.c0, t.p, t.p);
			for (let e = this.m_fixtureList; e; e = e.m_next) e.SynchronizeProxies(t, this.m_xf);
		} else for (let e = this.m_fixtureList; e; e = e.m_next) e.SynchronizeProxies(this.m_xf, this.m_xf);
	}
	SynchronizeTransform() {
		this.m_xf.q.SetAngle(this.m_sweep.a), F.MulRV(this.m_xf.q, this.m_sweep.localCenter, this.m_xf.p), M.SubVV(this.m_sweep.c, this.m_xf.p, this.m_xf.p);
	}
	ShouldCollide(e) {
		return this.m_type === J.b2_staticBody && e.m_type === J.b2_staticBody ? !1 : this.ShouldCollideConnected(e);
	}
	ShouldCollideConnected(e) {
		for (let t = this.m_jointList; t; t = t.next) if (t.other === e && !t.joint.m_collideConnected) return !1;
		return !0;
	}
	Advance(e) {
		this.m_sweep.Advance(e), this.m_sweep.c.Copy(this.m_sweep.c0), this.m_sweep.a = this.m_sweep.a0, this.m_xf.q.SetAngle(this.m_sweep.a), F.MulRV(this.m_xf.q, this.m_sweep.localCenter, this.m_xf.p), M.SubVV(this.m_sweep.c, this.m_xf.p, this.m_xf.p);
	}
	GetControllerList() {
		return this.m_controllerList;
	}
	GetControllerCount() {
		return this.m_controllerCount;
	}
};
//#endregion
//#region ../../../../tmp/claude-0/-home-user/98102b14-929e-54a0-bb74-ef07c2e34668/scratchpad/b2/esm/dynamics/b2_contact.js
function Rn(e, t) {
	return j(e * t);
}
function zn(e, t) {
	return e > t ? e : t;
}
function Bn(e, t) {
	return e < t ? e : t;
}
var Vn = class {
	_other = null;
	get other() {
		if (this._other === null) throw Error();
		return this._other;
	}
	set other(e) {
		if (this._other !== null) throw Error();
		this._other = e;
	}
	contact;
	prev = null;
	next = null;
	constructor(e) {
		this.contact = e;
	}
	Reset() {
		this._other = null, this.prev = null, this.next = null;
	}
}, Hn = class e {
	m_islandFlag = !1;
	m_touchingFlag = !1;
	m_enabledFlag = !1;
	m_filterFlag = !1;
	m_bulletHitFlag = !1;
	m_toiFlag = !1;
	m_prev = null;
	m_next = null;
	m_nodeA = new Vn(this);
	m_nodeB = new Vn(this);
	m_fixtureA;
	m_fixtureB;
	m_indexA = 0;
	m_indexB = 0;
	m_manifold = new De();
	m_toiCount = 0;
	m_toi = 0;
	m_friction = 0;
	m_restitution = 0;
	m_restitutionThreshold = 0;
	m_tangentSpeed = 0;
	m_oldManifold = new De();
	GetManifold() {
		return this.m_manifold;
	}
	GetWorldManifold(e) {
		let t = this.m_fixtureA.GetBody(), n = this.m_fixtureB.GetBody(), r = this.GetShapeA(), i = this.GetShapeB();
		e.Initialize(this.m_manifold, t.GetTransform(), r.m_radius, n.GetTransform(), i.m_radius);
	}
	IsTouching() {
		return this.m_touchingFlag;
	}
	SetEnabled(e) {
		this.m_enabledFlag = e;
	}
	IsEnabled() {
		return this.m_enabledFlag;
	}
	GetNext() {
		return this.m_next;
	}
	GetFixtureA() {
		return this.m_fixtureA;
	}
	GetChildIndexA() {
		return this.m_indexA;
	}
	GetShapeA() {
		return this.m_fixtureA.GetShape();
	}
	GetFixtureB() {
		return this.m_fixtureB;
	}
	GetChildIndexB() {
		return this.m_indexB;
	}
	GetShapeB() {
		return this.m_fixtureB.GetShape();
	}
	FlagForFiltering() {
		this.m_filterFlag = !0;
	}
	SetFriction(e) {
		this.m_friction = e;
	}
	GetFriction() {
		return this.m_friction;
	}
	ResetFriction() {
		this.m_friction = Rn(this.m_fixtureA.m_friction, this.m_fixtureB.m_friction);
	}
	SetRestitution(e) {
		this.m_restitution = e;
	}
	GetRestitution() {
		return this.m_restitution;
	}
	ResetRestitution() {
		this.m_restitution = zn(this.m_fixtureA.m_restitution, this.m_fixtureB.m_restitution);
	}
	SetRestitutionThreshold(e) {
		this.m_restitutionThreshold = e;
	}
	GetRestitutionThreshold() {
		return this.m_restitutionThreshold;
	}
	ResetRestitutionThreshold() {
		this.m_restitutionThreshold = Bn(this.m_fixtureA.m_restitutionThreshold, this.m_fixtureB.m_restitutionThreshold);
	}
	SetTangentSpeed(e) {
		this.m_tangentSpeed = e;
	}
	GetTangentSpeed() {
		return this.m_tangentSpeed;
	}
	Reset(e, t, n, r) {
		this.m_islandFlag = !1, this.m_touchingFlag = !1, this.m_enabledFlag = !0, this.m_filterFlag = !1, this.m_bulletHitFlag = !1, this.m_toiFlag = !1, this.m_fixtureA = e, this.m_fixtureB = n, this.m_indexA = t, this.m_indexB = r, this.m_manifold.pointCount = 0, this.m_prev = null, this.m_next = null, this.m_nodeA.Reset(), this.m_nodeB.Reset(), this.m_toiCount = 0, this.m_friction = Rn(this.m_fixtureA.m_friction, this.m_fixtureB.m_friction), this.m_restitution = zn(this.m_fixtureA.m_restitution, this.m_fixtureB.m_restitution), this.m_restitutionThreshold = Bn(this.m_fixtureA.m_restitutionThreshold, this.m_fixtureB.m_restitutionThreshold);
	}
	Update(e) {
		let t = this.m_oldManifold;
		this.m_oldManifold = this.m_manifold, this.m_manifold = t, this.m_enabledFlag = !0;
		let n = !1, r = this.m_touchingFlag, i = this.m_fixtureA.IsSensor(), a = this.m_fixtureB.IsSensor(), o = i || a, s = this.m_fixtureA.GetBody(), c = this.m_fixtureB.GetBody(), l = s.GetTransform(), u = c.GetTransform();
		if (o) {
			let e = this.GetShapeA(), t = this.GetShapeB();
			n = Le(e, this.m_indexA, t, this.m_indexB, l, u), this.m_manifold.pointCount = 0;
		} else {
			this.Evaluate(this.m_manifold, l, u), n = this.m_manifold.pointCount > 0;
			for (let e = 0; e < this.m_manifold.pointCount; ++e) {
				let t = this.m_manifold.points[e];
				t.normalImpulse = 0, t.tangentImpulse = 0;
				let n = t.id;
				for (let e = 0; e < this.m_oldManifold.pointCount; ++e) {
					let r = this.m_oldManifold.points[e];
					if (r.id.key === n.key) {
						t.normalImpulse = r.normalImpulse, t.tangentImpulse = r.tangentImpulse;
						break;
					}
				}
			}
			n !== r && (s.SetAwake(!0), c.SetAwake(!0));
		}
		this.m_touchingFlag = n, !r && n && e && e.BeginContact(this), r && !n && e && e.EndContact(this), !o && n && e && e.PreSolve(this, this.m_oldManifold);
	}
	static ComputeTOI_s_input = new mn();
	static ComputeTOI_s_output = new hn();
	ComputeTOI(t, n) {
		let r = e.ComputeTOI_s_input;
		r.proxyA.SetShape(this.GetShapeA(), this.m_indexA), r.proxyB.SetShape(this.GetShapeB(), this.m_indexB), r.sweepA.Copy(t), r.sweepB.Copy(n), r.tMax = c;
		let i = e.ComputeTOI_s_output;
		return En(i, r), i.t;
	}
}, Un = class e extends Hn {
	static Create() {
		return new e();
	}
	static Destroy(e) {}
	static Evaluate_s_edge = new We();
	Evaluate(t, n, r) {
		let i = e.Evaluate_s_edge;
		this.GetShapeA().GetChildEdge(i, this.m_indexA), st(t, i, n, this.GetShapeB(), r);
	}
}, Wn = class e extends Hn {
	static Create() {
		return new e();
	}
	static Destroy(e) {}
	static Evaluate_s_edge = new We();
	Evaluate(t, n, r) {
		let i = e.Evaluate_s_edge;
		this.GetShapeA().GetChildEdge(i, this.m_indexA), jt(t, i, n, this.GetShapeB(), r);
	}
}, Gn = class e extends Hn {
	static Create() {
		return new e();
	}
	static Destroy(e) {}
	Evaluate(e, t, n) {
		Je(e, this.GetShapeA(), t, this.GetShapeB(), n);
	}
}, Kn = class e extends Hn {
	static Create() {
		return new e();
	}
	static Destroy(e) {}
	Evaluate(e, t, n) {
		Zt(e, this.GetShapeA(), t, this.GetShapeB(), n);
	}
}, qn = class e extends Hn {
	static Create() {
		return new e();
	}
	static Destroy(e) {}
	Evaluate(e, t, n) {
		Qe(e, this.GetShapeA(), t, this.GetShapeB(), n);
	}
}, Jn = class e extends Hn {
	static Create() {
		return new e();
	}
	static Destroy(e) {}
	Evaluate(e, t, n) {
		st(e, this.GetShapeA(), t, this.GetShapeB(), n);
	}
}, Yn = class e extends Hn {
	static Create() {
		return new e();
	}
	static Destroy(e) {}
	Evaluate(e, t, n) {
		jt(e, this.GetShapeA(), t, this.GetShapeB(), n);
	}
}, Xn = class {
	pool = [];
	createFcn = null;
	destroyFcn = null;
	primary = !1;
}, Zn = class {
	m_registers = [];
	constructor() {
		this.InitializeRegisters();
	}
	AddType(e, t, n, r) {
		let i = [];
		function a() {
			return i.pop() || e();
		}
		function o(e) {
			i.push(e);
		}
		this.m_registers[n][r].pool = i, this.m_registers[n][r].createFcn = a, this.m_registers[n][r].destroyFcn = o, this.m_registers[n][r].primary = !0, n !== r && (this.m_registers[r][n].pool = i, this.m_registers[r][n].createFcn = a, this.m_registers[r][n].destroyFcn = o, this.m_registers[r][n].primary = !1);
	}
	InitializeRegisters() {
		for (let e = 0; e < U.e_shapeTypeCount; e++) {
			this.m_registers[e] = [];
			for (let t = 0; t < U.e_shapeTypeCount; t++) this.m_registers[e][t] = new Xn();
		}
		this.AddType(Gn.Create, Gn.Destroy, U.e_circleShape, U.e_circleShape), this.AddType(qn.Create, qn.Destroy, U.e_polygonShape, U.e_circleShape), this.AddType(Kn.Create, Kn.Destroy, U.e_polygonShape, U.e_polygonShape), this.AddType(Jn.Create, Jn.Destroy, U.e_edgeShape, U.e_circleShape), this.AddType(Yn.Create, Yn.Destroy, U.e_edgeShape, U.e_polygonShape), this.AddType(Un.Create, Un.Destroy, U.e_chainShape, U.e_circleShape), this.AddType(Wn.Create, Wn.Destroy, U.e_chainShape, U.e_polygonShape);
	}
	Create(e, t, n, r) {
		let i = e.GetType(), a = n.GetType(), o = this.m_registers[i][a];
		if (o.createFcn) {
			let i = o.createFcn();
			return o.primary ? i.Reset(e, t, n, r) : i.Reset(n, r, e, t), i;
		}
		return null;
	}
	Destroy(e) {
		let t = e.m_fixtureA.GetType(), n = e.m_fixtureB.GetType(), r = this.m_registers[t][n];
		r.destroyFcn && r.destroyFcn(e);
	}
}, Qn = class e {
	ShouldCollide(e, t) {
		let n = e.GetBody(), r = t.GetBody();
		if (r.GetType() === J.b2_staticBody && n.GetType() === J.b2_staticBody || !r.ShouldCollideConnected(n)) return !1;
		let i = e.GetFilterData(), a = t.GetFilterData();
		return i.groupIndex === a.groupIndex && i.groupIndex !== 0 ? i.groupIndex > 0 : (i.maskBits & a.categoryBits) !== 0 && (i.categoryBits & a.maskBits) !== 0;
	}
	ShouldCollideFixtureParticle(e, t, n) {
		return !0;
	}
	ShouldCollideParticleParticle(e, t, n) {
		return !0;
	}
	static b2_defaultFilter = new e();
}, $n = class {
	normalImpulses = C(2);
	tangentImpulses = C(2);
	count = 0;
}, er = class e {
	BeginContact(e) {}
	EndContact(e) {}
	BeginContactFixtureParticle(e, t) {}
	EndContactFixtureParticle(e, t) {}
	BeginContactParticleParticle(e, t) {}
	EndContactParticleParticle(e, t) {}
	PreSolve(e, t) {}
	PostSolve(e, t) {}
	static b2_defaultListener = new e();
}, tr = class {
	ReportFixture(e) {
		return !0;
	}
	ReportParticle(e, t) {
		return !1;
	}
	ShouldQueryParticleSystem(e) {
		return !0;
	}
}, nr = class {
	ReportFixture(e, t, n, r) {
		return r;
	}
	ReportParticle(e, t, n, r, i) {
		return 0;
	}
	ShouldQueryParticleSystem(e) {
		return !0;
	}
}, rr = class {
	m_broadPhase = new Ve();
	m_contactList = null;
	m_contactCount = 0;
	m_contactFilter = Qn.b2_defaultFilter;
	m_contactListener = er.b2_defaultListener;
	m_contactFactory = new Zn();
	AddPair(e, t) {
		let n = e.fixture, r = t.fixture, i = e.childIndex, a = t.childIndex, o = n.GetBody(), s = r.GetBody();
		if (o === s) return;
		let c = s.GetContactList();
		for (; c;) {
			if (c.other === o) {
				let e = c.contact.GetFixtureA(), t = c.contact.GetFixtureB(), o = c.contact.GetChildIndexA(), s = c.contact.GetChildIndexB();
				if (e === n && t === r && o === i && s === a || e === r && t === n && o === a && s === i) return;
			}
			c = c.next;
		}
		if (this.m_contactFilter && !this.m_contactFilter.ShouldCollide(n, r)) return;
		let l = this.m_contactFactory.Create(n, i, r, a);
		l !== null && (n = l.GetFixtureA(), r = l.GetFixtureB(), i = l.GetChildIndexA(), a = l.GetChildIndexB(), o = n.m_body, s = r.m_body, l.m_prev = null, l.m_next = this.m_contactList, this.m_contactList !== null && (this.m_contactList.m_prev = l), this.m_contactList = l, l.m_nodeA.other = s, l.m_nodeA.prev = null, l.m_nodeA.next = o.m_contactList, o.m_contactList !== null && (o.m_contactList.prev = l.m_nodeA), o.m_contactList = l.m_nodeA, l.m_nodeB.other = o, l.m_nodeB.prev = null, l.m_nodeB.next = s.m_contactList, s.m_contactList !== null && (s.m_contactList.prev = l.m_nodeB), s.m_contactList = l.m_nodeB, ++this.m_contactCount);
	}
	FindNewContacts() {
		this.m_broadPhase.UpdatePairs((e, t) => {
			this.AddPair(e, t);
		});
	}
	Destroy(e) {
		let t = e.GetFixtureA(), n = e.GetFixtureB(), r = t.GetBody(), i = n.GetBody();
		this.m_contactListener && e.IsTouching() && this.m_contactListener.EndContact(e), e.m_prev && (e.m_prev.m_next = e.m_next), e.m_next && (e.m_next.m_prev = e.m_prev), e === this.m_contactList && (this.m_contactList = e.m_next), e.m_nodeA.prev && (e.m_nodeA.prev.next = e.m_nodeA.next), e.m_nodeA.next && (e.m_nodeA.next.prev = e.m_nodeA.prev), e.m_nodeA === r.m_contactList && (r.m_contactList = e.m_nodeA.next), e.m_nodeB.prev && (e.m_nodeB.prev.next = e.m_nodeB.next), e.m_nodeB.next && (e.m_nodeB.next.prev = e.m_nodeB.prev), e.m_nodeB === i.m_contactList && (i.m_contactList = e.m_nodeB.next), e.m_manifold.pointCount > 0 && !t.IsSensor() && !n.IsSensor() && (t.GetBody().SetAwake(!0), n.GetBody().SetAwake(!0)), this.m_contactFactory.Destroy(e), --this.m_contactCount;
	}
	Collide() {
		let e = this.m_contactList;
		for (; e;) {
			let t = e.GetFixtureA(), n = e.GetFixtureB(), r = e.GetChildIndexA(), i = e.GetChildIndexB(), a = t.GetBody(), o = n.GetBody();
			if (e.m_filterFlag) {
				if (this.m_contactFilter && !this.m_contactFilter.ShouldCollide(t, n)) {
					let t = e;
					e = t.m_next, this.Destroy(t);
					continue;
				}
				e.m_filterFlag = !1;
			}
			let s = a.IsAwake() && a.m_type !== J.b2_staticBody, c = o.IsAwake() && o.m_type !== J.b2_staticBody;
			if (!s && !c) {
				e = e.m_next;
				continue;
			}
			let l = t.m_proxies[r].treeNode, u = n.m_proxies[i].treeNode;
			if (!Me(l.aabb, u.aabb)) {
				let t = e;
				e = t.m_next, this.Destroy(t);
				continue;
			}
			e.Update(this.m_contactListener), e = e.m_next;
		}
	}
}, ir = class {
	step = 0;
	collide = 0;
	solve = 0;
	solveInit = 0;
	solveVelocity = 0;
	solvePosition = 0;
	broadphase = 0;
	solveTOI = 0;
	Reset() {
		return this.step = 0, this.collide = 0, this.solve = 0, this.solveInit = 0, this.solveVelocity = 0, this.solvePosition = 0, this.broadphase = 0, this.solveTOI = 0, this;
	}
}, ar = class {
	dt = 0;
	inv_dt = 0;
	dtRatio = 0;
	velocityIterations = 0;
	positionIterations = 0;
	particleIterations = 0;
	warmStarting = !1;
	Copy(e) {
		return this.dt = e.dt, this.inv_dt = e.inv_dt, this.dtRatio = e.dtRatio, this.positionIterations = e.positionIterations, this.velocityIterations = e.velocityIterations, this.particleIterations = e.particleIterations, this.warmStarting = e.warmStarting, this;
	}
}, or = class e {
	c = new M();
	a = 0;
	static MakeArray(t) {
		return S(t, (t) => new e());
	}
}, sr = class e {
	v = new M();
	w = 0;
	static MakeArray(t) {
		return S(t, (t) => new e());
	}
}, cr = class {
	step = new ar();
	positions;
	velocities;
}, lr = !1, ur = class e {
	rA = new M();
	rB = new M();
	normalImpulse = 0;
	tangentImpulse = 0;
	normalMass = 0;
	tangentMass = 0;
	velocityBias = 0;
	static MakeArray(t) {
		return S(t, (t) => new e());
	}
}, dr = class e {
	points = ur.MakeArray(2);
	normal = new M();
	tangent = new M();
	normalMass = new P();
	K = new P();
	indexA = 0;
	indexB = 0;
	invMassA = 0;
	invMassB = 0;
	invIA = 0;
	invIB = 0;
	friction = 0;
	restitution = 0;
	threshold = 0;
	tangentSpeed = 0;
	pointCount = 0;
	contactIndex = 0;
	static MakeArray(t) {
		return S(t, (t) => new e());
	}
}, fr = class e {
	localPoints = M.MakeArray(2);
	localNormal = new M();
	localPoint = new M();
	indexA = 0;
	indexB = 0;
	invMassA = 0;
	invMassB = 0;
	localCenterA = new M();
	localCenterB = new M();
	invIA = 0;
	invIB = 0;
	type = z.e_unknown;
	radiusA = 0;
	radiusB = 0;
	pointCount = 0;
	static MakeArray(t) {
		return S(t, (t) => new e());
	}
}, pr = class {
	step = new ar();
	contacts;
	count = 0;
	positions;
	velocities;
}, mr = class e {
	normal = new M();
	point = new M();
	separation = 0;
	static Initialize_s_pointA = new M();
	static Initialize_s_pointB = new M();
	static Initialize_s_planePoint = new M();
	static Initialize_s_clipPoint = new M();
	Initialize(t, n, r, i) {
		let a = e.Initialize_s_pointA, o = e.Initialize_s_pointB, s = e.Initialize_s_planePoint, c = e.Initialize_s_clipPoint;
		switch (t.type) {
			case z.e_circles:
				I.MulXV(n, t.localPoint, a), I.MulXV(r, t.localPoints[0], o), M.SubVV(o, a, this.normal).SelfNormalize(), M.MidVV(a, o, this.point), this.separation = M.DotVV(M.SubVV(o, a, M.s_t0), this.normal) - t.radiusA - t.radiusB;
				break;
			case z.e_faceA:
				F.MulRV(n.q, t.localNormal, this.normal), I.MulXV(n, t.localPoint, s), I.MulXV(r, t.localPoints[i], c), this.separation = M.DotVV(M.SubVV(c, s, M.s_t0), this.normal) - t.radiusA - t.radiusB, this.point.Copy(c);
				break;
			case z.e_faceB: F.MulRV(r.q, t.localNormal, this.normal), I.MulXV(r, t.localPoint, s), I.MulXV(n, t.localPoints[i], c), this.separation = M.DotVV(M.SubVV(c, s, M.s_t0), this.normal) - t.radiusA - t.radiusB, this.point.Copy(c), this.normal.SelfNeg();
		}
	}
}, hr = class e {
	m_step = new ar();
	m_positions;
	m_velocities;
	m_positionConstraints = fr.MakeArray(1024);
	m_velocityConstraints = dr.MakeArray(1024);
	m_contacts;
	m_count = 0;
	Initialize(e) {
		if (this.m_step.Copy(e.step), this.m_count = e.count, this.m_positionConstraints.length < this.m_count) {
			let e = O(this.m_positionConstraints.length * 2, this.m_count);
			for (; this.m_positionConstraints.length < e;) this.m_positionConstraints[this.m_positionConstraints.length] = new fr();
		}
		if (this.m_velocityConstraints.length < this.m_count) {
			let e = O(this.m_velocityConstraints.length * 2, this.m_count);
			for (; this.m_velocityConstraints.length < e;) this.m_velocityConstraints[this.m_velocityConstraints.length] = new dr();
		}
		this.m_positions = e.positions, this.m_velocities = e.velocities, this.m_contacts = e.contacts;
		for (let e = 0; e < this.m_count; ++e) {
			let t = this.m_contacts[e], n = t.m_fixtureA, r = t.m_fixtureB, i = n.GetShape(), a = r.GetShape(), o = i.m_radius, s = a.m_radius, c = n.GetBody(), l = r.GetBody(), u = t.GetManifold(), d = u.pointCount, f = this.m_velocityConstraints[e];
			f.friction = t.m_friction, f.restitution = t.m_restitution, f.threshold = t.m_restitutionThreshold, f.tangentSpeed = t.m_tangentSpeed, f.indexA = c.m_islandIndex, f.indexB = l.m_islandIndex, f.invMassA = c.m_invMass, f.invMassB = l.m_invMass, f.invIA = c.m_invI, f.invIB = l.m_invI, f.contactIndex = e, f.pointCount = d, f.K.SetZero(), f.normalMass.SetZero();
			let p = this.m_positionConstraints[e];
			p.indexA = c.m_islandIndex, p.indexB = l.m_islandIndex, p.invMassA = c.m_invMass, p.invMassB = l.m_invMass, p.localCenterA.Copy(c.m_sweep.localCenter), p.localCenterB.Copy(l.m_sweep.localCenter), p.invIA = c.m_invI, p.invIB = l.m_invI, p.localNormal.Copy(u.localNormal), p.localPoint.Copy(u.localPoint), p.pointCount = d, p.radiusA = o, p.radiusB = s, p.type = u.type;
			for (let e = 0; e < d; ++e) {
				let t = u.points[e], n = f.points[e];
				this.m_step.warmStarting ? (n.normalImpulse = this.m_step.dtRatio * t.normalImpulse, n.tangentImpulse = this.m_step.dtRatio * t.tangentImpulse) : (n.normalImpulse = 0, n.tangentImpulse = 0), n.rA.SetZero(), n.rB.SetZero(), n.normalMass = 0, n.tangentMass = 0, n.velocityBias = 0, p.localPoints[e].Copy(t.localPoint);
			}
		}
		return this;
	}
	static InitializeVelocityConstraints_s_xfA = new I();
	static InitializeVelocityConstraints_s_xfB = new I();
	static InitializeVelocityConstraints_s_worldManifold = new Oe();
	InitializeVelocityConstraints() {
		let t = e.InitializeVelocityConstraints_s_xfA, n = e.InitializeVelocityConstraints_s_xfB, r = e.InitializeVelocityConstraints_s_worldManifold;
		for (let e = 0; e < this.m_count; ++e) {
			let i = this.m_velocityConstraints[e], a = this.m_positionConstraints[e], o = a.radiusA, s = a.radiusB, c = this.m_contacts[i.contactIndex].GetManifold(), l = i.indexA, u = i.indexB, d = i.invMassA, f = i.invMassB, p = i.invIA, m = i.invIB, h = a.localCenterA, g = a.localCenterB, _ = this.m_positions[l].c, v = this.m_positions[l].a, y = this.m_velocities[l].v, b = this.m_velocities[l].w, x = this.m_positions[u].c, S = this.m_positions[u].a, C = this.m_velocities[u].v, w = this.m_velocities[u].w;
			t.q.SetAngle(v), n.q.SetAngle(S), M.SubVV(_, F.MulRV(t.q, h, M.s_t0), t.p), M.SubVV(x, F.MulRV(n.q, g, M.s_t0), n.p), r.Initialize(c, t, o, n, s), i.normal.Copy(r.normal), M.CrossVOne(i.normal, i.tangent);
			let T = i.pointCount;
			for (let e = 0; e < T; ++e) {
				let t = i.points[e];
				M.SubVV(r.points[e], _, t.rA), M.SubVV(r.points[e], x, t.rB);
				let n = M.CrossVV(t.rA, i.normal), a = M.CrossVV(t.rB, i.normal), o = d + f + p * n * n + m * a * a;
				t.normalMass = o > 0 ? 1 / o : 0;
				let s = i.tangent, c = M.CrossVV(t.rA, s), l = M.CrossVV(t.rB, s), u = d + f + p * c * c + m * l * l;
				t.tangentMass = u > 0 ? 1 / u : 0, t.velocityBias = 0;
				let h = M.DotVV(i.normal, M.SubVV(M.AddVCrossSV(C, w, t.rB, M.s_t0), M.AddVCrossSV(y, b, t.rA, M.s_t1), M.s_t0));
				h < -i.threshold && (t.velocityBias += -i.restitution * h);
			}
			i.pointCount;
		}
	}
	static WarmStart_s_P = new M();
	WarmStart() {
		let t = e.WarmStart_s_P;
		for (let e = 0; e < this.m_count; ++e) {
			let n = this.m_velocityConstraints[e], r = n.indexA, i = n.indexB, a = n.invMassA, o = n.invIA, s = n.invMassB, c = n.invIB, l = n.pointCount, u = this.m_velocities[r].v, d = this.m_velocities[r].w, f = this.m_velocities[i].v, p = this.m_velocities[i].w, m = n.normal, h = n.tangent;
			for (let e = 0; e < l; ++e) {
				let r = n.points[e];
				M.AddVV(M.MulSV(r.normalImpulse, m, M.s_t0), M.MulSV(r.tangentImpulse, h, M.s_t1), t), d -= o * M.CrossVV(r.rA, t), u.SelfMulSub(a, t), p += c * M.CrossVV(r.rB, t), f.SelfMulAdd(s, t);
			}
			this.m_velocities[r].w = d, this.m_velocities[i].w = p;
		}
	}
	static SolveVelocityConstraints_s_dv = new M();
	static SolveVelocityConstraints_s_dv1 = new M();
	static SolveVelocityConstraints_s_dv2 = new M();
	static SolveVelocityConstraints_s_P = new M();
	static SolveVelocityConstraints_s_a = new M();
	static SolveVelocityConstraints_s_b = new M();
	static SolveVelocityConstraints_s_x = new M();
	static SolveVelocityConstraints_s_d = new M();
	static SolveVelocityConstraints_s_P1 = new M();
	static SolveVelocityConstraints_s_P2 = new M();
	static SolveVelocityConstraints_s_P1P2 = new M();
	SolveVelocityConstraints() {
		let t = e.SolveVelocityConstraints_s_dv, n = e.SolveVelocityConstraints_s_dv1, r = e.SolveVelocityConstraints_s_dv2, i = e.SolveVelocityConstraints_s_P, a = e.SolveVelocityConstraints_s_a, o = e.SolveVelocityConstraints_s_b, s = e.SolveVelocityConstraints_s_x, c = e.SolveVelocityConstraints_s_d, l = e.SolveVelocityConstraints_s_P1, u = e.SolveVelocityConstraints_s_P2, d = e.SolveVelocityConstraints_s_P1P2;
		for (let e = 0; e < this.m_count; ++e) {
			let f = this.m_velocityConstraints[e], p = f.indexA, m = f.indexB, h = f.invMassA, g = f.invIA, _ = f.invMassB, v = f.invIB, y = f.pointCount, b = this.m_velocities[p].v, x = this.m_velocities[p].w, S = this.m_velocities[m].v, C = this.m_velocities[m].w, w = f.normal, T = f.tangent, E = f.friction;
			for (let e = 0; e < y; ++e) {
				let n = f.points[e];
				M.SubVV(M.AddVCrossSV(S, C, n.rB, M.s_t0), M.AddVCrossSV(b, x, n.rA, M.s_t1), t);
				let r = M.DotVV(t, T) - f.tangentSpeed, a = n.tangentMass * -r, o = E * n.normalImpulse, s = k(n.tangentImpulse + a, -o, o);
				a = s - n.tangentImpulse, n.tangentImpulse = s, M.MulSV(a, T, i), b.SelfMulSub(h, i), x -= g * M.CrossVV(n.rA, i), S.SelfMulAdd(_, i), C += v * M.CrossVV(n.rB, i);
			}
			if (f.pointCount === 1 || lr === !1) for (let e = 0; e < y; ++e) {
				let n = f.points[e];
				M.SubVV(M.AddVCrossSV(S, C, n.rB, M.s_t0), M.AddVCrossSV(b, x, n.rA, M.s_t1), t);
				let r = M.DotVV(t, w), a = -n.normalMass * (r - n.velocityBias), o = O(n.normalImpulse + a, 0);
				a = o - n.normalImpulse, n.normalImpulse = o, M.MulSV(a, w, i), b.SelfMulSub(h, i), x -= g * M.CrossVV(n.rA, i), S.SelfMulAdd(_, i), C += v * M.CrossVV(n.rB, i);
			}
			else {
				let e = f.points[0], t = f.points[1];
				a.Set(e.normalImpulse, t.normalImpulse), M.SubVV(M.AddVCrossSV(S, C, e.rB, M.s_t0), M.AddVCrossSV(b, x, e.rA, M.s_t1), n), M.SubVV(M.AddVCrossSV(S, C, t.rB, M.s_t0), M.AddVCrossSV(b, x, t.rA, M.s_t1), r);
				let i = M.DotVV(n, w), p = M.DotVV(r, w);
				for (o.x = i - e.velocityBias, o.y = p - t.velocityBias, o.SelfSub(P.MulMV(f.K, a, M.s_t0));;) {
					if (P.MulMV(f.normalMass, o, s).SelfNeg(), s.x >= 0 && s.y >= 0) {
						M.SubVV(s, a, c), M.MulSV(c.x, w, l), M.MulSV(c.y, w, u), M.AddVV(l, u, d), b.SelfMulSub(h, d), x -= g * (M.CrossVV(e.rA, l) + M.CrossVV(t.rA, u)), S.SelfMulAdd(_, d), C += v * (M.CrossVV(e.rB, l) + M.CrossVV(t.rB, u)), e.normalImpulse = s.x, t.normalImpulse = s.y;
						break;
					}
					if (s.x = -e.normalMass * o.x, s.y = 0, i = 0, p = f.K.ex.y * s.x + o.y, s.x >= 0 && p >= 0) {
						M.SubVV(s, a, c), M.MulSV(c.x, w, l), M.MulSV(c.y, w, u), M.AddVV(l, u, d), b.SelfMulSub(h, d), x -= g * (M.CrossVV(e.rA, l) + M.CrossVV(t.rA, u)), S.SelfMulAdd(_, d), C += v * (M.CrossVV(e.rB, l) + M.CrossVV(t.rB, u)), e.normalImpulse = s.x, t.normalImpulse = s.y;
						break;
					}
					if (s.x = 0, s.y = -t.normalMass * o.y, i = f.K.ey.x * s.y + o.x, p = 0, s.y >= 0 && i >= 0) {
						M.SubVV(s, a, c), M.MulSV(c.x, w, l), M.MulSV(c.y, w, u), M.AddVV(l, u, d), b.SelfMulSub(h, d), x -= g * (M.CrossVV(e.rA, l) + M.CrossVV(t.rA, u)), S.SelfMulAdd(_, d), C += v * (M.CrossVV(e.rB, l) + M.CrossVV(t.rB, u)), e.normalImpulse = s.x, t.normalImpulse = s.y;
						break;
					}
					if (s.x = 0, s.y = 0, i = o.x, p = o.y, i >= 0 && p >= 0) {
						M.SubVV(s, a, c), M.MulSV(c.x, w, l), M.MulSV(c.y, w, u), M.AddVV(l, u, d), b.SelfMulSub(h, d), x -= g * (M.CrossVV(e.rA, l) + M.CrossVV(t.rA, u)), S.SelfMulAdd(_, d), C += v * (M.CrossVV(e.rB, l) + M.CrossVV(t.rB, u)), e.normalImpulse = s.x, t.normalImpulse = s.y;
						break;
					}
					break;
				}
			}
			this.m_velocities[p].w = x, this.m_velocities[m].w = C;
		}
	}
	StoreImpulses() {
		for (let e = 0; e < this.m_count; ++e) {
			let t = this.m_velocityConstraints[e], n = this.m_contacts[t.contactIndex].GetManifold();
			for (let e = 0; e < t.pointCount; ++e) n.points[e].normalImpulse = t.points[e].normalImpulse, n.points[e].tangentImpulse = t.points[e].tangentImpulse;
		}
	}
	static SolvePositionConstraints_s_xfA = new I();
	static SolvePositionConstraints_s_xfB = new I();
	static SolvePositionConstraints_s_psm = new mr();
	static SolvePositionConstraints_s_rA = new M();
	static SolvePositionConstraints_s_rB = new M();
	static SolvePositionConstraints_s_P = new M();
	SolvePositionConstraints() {
		let t = e.SolvePositionConstraints_s_xfA, n = e.SolvePositionConstraints_s_xfB, r = e.SolvePositionConstraints_s_psm, i = e.SolvePositionConstraints_s_rA, a = e.SolvePositionConstraints_s_rB, o = e.SolvePositionConstraints_s_P, s = 0;
		for (let e = 0; e < this.m_count; ++e) {
			let l = this.m_positionConstraints[e], u = l.indexA, f = l.indexB, p = l.localCenterA, h = l.invMassA, g = l.invIA, _ = l.localCenterB, v = l.invMassB, y = l.invIB, b = l.pointCount, x = this.m_positions[u].c, S = this.m_positions[u].a, C = this.m_positions[f].c, w = this.m_positions[f].a;
			for (let e = 0; e < b; ++e) {
				t.q.SetAngle(S), n.q.SetAngle(w), M.SubVV(x, F.MulRV(t.q, p, M.s_t0), t.p), M.SubVV(C, F.MulRV(n.q, _, M.s_t0), n.p), r.Initialize(l, t, n, e);
				let u = r.normal, f = r.point, b = r.separation;
				M.SubVV(f, x, i), M.SubVV(f, C, a), s = D(s, b);
				let T = k(m * (b + c), -d, 0), E = M.CrossVV(i, u), O = M.CrossVV(a, u), A = h + v + g * E * E + y * O * O, ee = A > 0 ? -T / A : 0;
				M.MulSV(ee, u, o), x.SelfMulSub(h, o), S -= g * M.CrossVV(i, o), C.SelfMulAdd(v, o), w += y * M.CrossVV(a, o);
			}
			this.m_positions[u].a = S, this.m_positions[f].a = w;
		}
		return s > -3 * c;
	}
	static SolveTOIPositionConstraints_s_xfA = new I();
	static SolveTOIPositionConstraints_s_xfB = new I();
	static SolveTOIPositionConstraints_s_psm = new mr();
	static SolveTOIPositionConstraints_s_rA = new M();
	static SolveTOIPositionConstraints_s_rB = new M();
	static SolveTOIPositionConstraints_s_P = new M();
	SolveTOIPositionConstraints(t, n) {
		let r = e.SolveTOIPositionConstraints_s_xfA, i = e.SolveTOIPositionConstraints_s_xfB, a = e.SolveTOIPositionConstraints_s_psm, o = e.SolveTOIPositionConstraints_s_rA, s = e.SolveTOIPositionConstraints_s_rB, l = e.SolveTOIPositionConstraints_s_P, u = 0;
		for (let e = 0; e < this.m_count; ++e) {
			let f = this.m_positionConstraints[e], p = f.indexA, m = f.indexB, g = f.localCenterA, _ = f.localCenterB, v = f.pointCount, y = 0, b = 0;
			(p === t || p === n) && (y = f.invMassA, b = f.invIA);
			let x = 0, S = 0;
			(m === t || m === n) && (x = f.invMassB, S = f.invIB);
			let C = this.m_positions[p].c, w = this.m_positions[p].a, T = this.m_positions[m].c, E = this.m_positions[m].a;
			for (let e = 0; e < v; ++e) {
				r.q.SetAngle(w), i.q.SetAngle(E), M.SubVV(C, F.MulRV(r.q, g, M.s_t0), r.p), M.SubVV(T, F.MulRV(i.q, _, M.s_t0), i.p), a.Initialize(f, r, i, e);
				let t = a.normal, n = a.point, p = a.separation;
				M.SubVV(n, C, o), M.SubVV(n, T, s), u = D(u, p);
				let m = k(h * (p + c), -d, 0), v = M.CrossVV(o, t), O = M.CrossVV(s, t), A = y + x + b * v * v + S * O * O, ee = A > 0 ? -m / A : 0;
				M.MulSV(ee, t, l), C.SelfMulSub(y, l), w -= b * M.CrossVV(o, l), T.SelfMulAdd(x, l), E += S * M.CrossVV(s, l);
			}
			this.m_positions[p].a = w, this.m_positions[m].a = E;
		}
		return u >= -1.5 * c;
	}
}, gr = class e extends q {
	m_localAnchorA = new M();
	m_localAnchorB = new M();
	m_linearImpulse = new M();
	m_angularImpulse = 0;
	m_maxForce = 0;
	m_maxTorque = 0;
	m_indexA = 0;
	m_indexB = 0;
	m_rA = new M();
	m_rB = new M();
	m_localCenterA = new M();
	m_localCenterB = new M();
	m_invMassA = 0;
	m_invMassB = 0;
	m_invIA = 0;
	m_invIB = 0;
	m_linearMass = new P();
	m_angularMass = 0;
	m_qA = new F();
	m_qB = new F();
	m_lalcA = new M();
	m_lalcB = new M();
	m_K = new P();
	constructor(e) {
		super(e), this.m_localAnchorA.Copy(r(e.localAnchorA, M.ZERO)), this.m_localAnchorB.Copy(r(e.localAnchorB, M.ZERO)), this.m_linearImpulse.SetZero(), this.m_maxForce = r(e.maxForce, 0), this.m_maxTorque = r(e.maxTorque, 0), this.m_linearMass.SetZero();
	}
	InitVelocityConstraints(e) {
		this.m_indexA = this.m_bodyA.m_islandIndex, this.m_indexB = this.m_bodyB.m_islandIndex, this.m_localCenterA.Copy(this.m_bodyA.m_sweep.localCenter), this.m_localCenterB.Copy(this.m_bodyB.m_sweep.localCenter), this.m_invMassA = this.m_bodyA.m_invMass, this.m_invMassB = this.m_bodyB.m_invMass, this.m_invIA = this.m_bodyA.m_invI, this.m_invIB = this.m_bodyB.m_invI;
		let t = e.positions[this.m_indexA].a, n = e.velocities[this.m_indexA].v, r = e.velocities[this.m_indexA].w, i = e.positions[this.m_indexB].a, a = e.velocities[this.m_indexB].v, o = e.velocities[this.m_indexB].w, s = this.m_qA.SetAngle(t), c = this.m_qB.SetAngle(i);
		M.SubVV(this.m_localAnchorA, this.m_localCenterA, this.m_lalcA);
		let l = F.MulRV(s, this.m_lalcA, this.m_rA);
		M.SubVV(this.m_localAnchorB, this.m_localCenterB, this.m_lalcB);
		let u = F.MulRV(c, this.m_lalcB, this.m_rB), d = this.m_invMassA, f = this.m_invMassB, p = this.m_invIA, m = this.m_invIB, h = this.m_K;
		if (h.ex.x = d + f + p * l.y * l.y + m * u.y * u.y, h.ex.y = -p * l.x * l.y - m * u.x * u.y, h.ey.x = h.ex.y, h.ey.y = d + f + p * l.x * l.x + m * u.x * u.x, h.GetInverse(this.m_linearMass), this.m_angularMass = p + m, this.m_angularMass > 0 && (this.m_angularMass = 1 / this.m_angularMass), e.step.warmStarting) {
			this.m_linearImpulse.SelfMul(e.step.dtRatio), this.m_angularImpulse *= e.step.dtRatio;
			let t = this.m_linearImpulse;
			n.SelfMulSub(d, t), r -= p * (M.CrossVV(this.m_rA, t) + this.m_angularImpulse), a.SelfMulAdd(f, t), o += m * (M.CrossVV(this.m_rB, t) + this.m_angularImpulse);
		} else this.m_linearImpulse.SetZero(), this.m_angularImpulse = 0;
		e.velocities[this.m_indexA].w = r, e.velocities[this.m_indexB].w = o;
	}
	static SolveVelocityConstraints_s_Cdot_v2 = new M();
	static SolveVelocityConstraints_s_impulseV = new M();
	static SolveVelocityConstraints_s_oldImpulseV = new M();
	SolveVelocityConstraints(t) {
		let n = t.velocities[this.m_indexA].v, r = t.velocities[this.m_indexA].w, i = t.velocities[this.m_indexB].v, a = t.velocities[this.m_indexB].w, o = this.m_invMassA, s = this.m_invMassB, c = this.m_invIA, l = this.m_invIB, u = t.step.dt;
		{
			let e = a - r, t = -this.m_angularMass * e, n = this.m_angularImpulse, i = u * this.m_maxTorque;
			this.m_angularImpulse = k(this.m_angularImpulse + t, -i, i), t = this.m_angularImpulse - n, r -= c * t, a += l * t;
		}
		{
			let t = M.SubVV(M.AddVCrossSV(i, a, this.m_rB, M.s_t0), M.AddVCrossSV(n, r, this.m_rA, M.s_t1), e.SolveVelocityConstraints_s_Cdot_v2), d = P.MulMV(this.m_linearMass, t, e.SolveVelocityConstraints_s_impulseV).SelfNeg(), f = e.SolveVelocityConstraints_s_oldImpulseV.Copy(this.m_linearImpulse);
			this.m_linearImpulse.SelfAdd(d);
			let p = u * this.m_maxForce;
			this.m_linearImpulse.LengthSquared() > p * p && (this.m_linearImpulse.Normalize(), this.m_linearImpulse.SelfMul(p)), M.SubVV(this.m_linearImpulse, f, d), n.SelfMulSub(o, d), r -= c * M.CrossVV(this.m_rA, d), i.SelfMulAdd(s, d), a += l * M.CrossVV(this.m_rB, d);
		}
		t.velocities[this.m_indexA].w = r, t.velocities[this.m_indexB].w = a;
	}
	SolvePositionConstraints(e) {
		return !0;
	}
	GetAnchorA(e) {
		return this.m_bodyA.GetWorldPoint(this.m_localAnchorA, e);
	}
	GetAnchorB(e) {
		return this.m_bodyB.GetWorldPoint(this.m_localAnchorB, e);
	}
	GetReactionForce(e, t) {
		return t.x = e * this.m_linearImpulse.x, t.y = e * this.m_linearImpulse.y, t;
	}
	GetReactionTorque(e) {
		return e * this.m_angularImpulse;
	}
	GetLocalAnchorA() {
		return this.m_localAnchorA;
	}
	GetLocalAnchorB() {
		return this.m_localAnchorB;
	}
	SetMaxForce(e) {
		this.m_maxForce = e;
	}
	GetMaxForce() {
		return this.m_maxForce;
	}
	SetMaxTorque(e) {
		this.m_maxTorque = e;
	}
	GetMaxTorque() {
		return this.m_maxTorque;
	}
	Dump(e) {
		let t = this.m_bodyA.m_islandIndex, n = this.m_bodyB.m_islandIndex;
		e("  const jd: b2FrictionJointDef = new b2FrictionJointDef();\n"), e("  jd.bodyA = bodies[%d];\n", t), e("  jd.bodyB = bodies[%d];\n", n), e("  jd.collideConnected = %s;\n", this.m_collideConnected ? "true" : "false"), e("  jd.localAnchorA.Set(%.15f, %.15f);\n", this.m_localAnchorA.x, this.m_localAnchorA.y), e("  jd.localAnchorB.Set(%.15f, %.15f);\n", this.m_localAnchorB.x, this.m_localAnchorB.y), e("  jd.maxForce = %.15f;\n", this.m_maxForce), e("  jd.maxTorque = %.15f;\n", this.m_maxTorque), e("  joints[%d] = this.m_world.CreateJoint(jd);\n", this.m_index);
	}
}, _r = class e extends q {
	m_joint1;
	m_joint2;
	m_typeA = K.e_unknownJoint;
	m_typeB = K.e_unknownJoint;
	m_bodyC;
	m_bodyD;
	m_localAnchorA = new M();
	m_localAnchorB = new M();
	m_localAnchorC = new M();
	m_localAnchorD = new M();
	m_localAxisC = new M();
	m_localAxisD = new M();
	m_referenceAngleA = 0;
	m_referenceAngleB = 0;
	m_constant = 0;
	m_ratio = 0;
	m_impulse = 0;
	m_indexA = 0;
	m_indexB = 0;
	m_indexC = 0;
	m_indexD = 0;
	m_lcA = new M();
	m_lcB = new M();
	m_lcC = new M();
	m_lcD = new M();
	m_mA = 0;
	m_mB = 0;
	m_mC = 0;
	m_mD = 0;
	m_iA = 0;
	m_iB = 0;
	m_iC = 0;
	m_iD = 0;
	m_JvAC = new M();
	m_JvBD = new M();
	m_JwA = 0;
	m_JwB = 0;
	m_JwC = 0;
	m_JwD = 0;
	m_mass = 0;
	m_qA = new F();
	m_qB = new F();
	m_qC = new F();
	m_qD = new F();
	m_lalcA = new M();
	m_lalcB = new M();
	m_lalcC = new M();
	m_lalcD = new M();
	constructor(e) {
		super(e), this.m_joint1 = e.joint1, this.m_joint2 = e.joint2, this.m_typeA = this.m_joint1.GetType(), this.m_typeB = this.m_joint2.GetType();
		let t, n;
		this.m_bodyC = this.m_joint1.GetBodyA(), this.m_bodyA = this.m_joint1.GetBodyB();
		let i = this.m_bodyA.m_xf, a = this.m_bodyA.m_sweep.a, o = this.m_bodyC.m_xf, s = this.m_bodyC.m_sweep.a;
		if (this.m_typeA === K.e_revoluteJoint) {
			let n = e.joint1;
			this.m_localAnchorC.Copy(n.m_localAnchorA), this.m_localAnchorA.Copy(n.m_localAnchorB), this.m_referenceAngleA = n.m_referenceAngle, this.m_localAxisC.SetZero(), t = a - s - this.m_referenceAngleA;
		} else {
			let n = e.joint1;
			this.m_localAnchorC.Copy(n.m_localAnchorA), this.m_localAnchorA.Copy(n.m_localAnchorB), this.m_referenceAngleA = n.m_referenceAngle, this.m_localAxisC.Copy(n.m_localXAxisA);
			let r = this.m_localAnchorC, a = F.MulTRV(o.q, M.AddVV(F.MulRV(i.q, this.m_localAnchorA, M.s_t0), M.SubVV(i.p, o.p, M.s_t1), M.s_t0), M.s_t0);
			t = M.DotVV(M.SubVV(a, r, M.s_t0), this.m_localAxisC);
		}
		this.m_bodyD = this.m_joint2.GetBodyA(), this.m_bodyB = this.m_joint2.GetBodyB();
		let c = this.m_bodyB.m_xf, l = this.m_bodyB.m_sweep.a, u = this.m_bodyD.m_xf, d = this.m_bodyD.m_sweep.a;
		if (this.m_typeB === K.e_revoluteJoint) {
			let t = e.joint2;
			this.m_localAnchorD.Copy(t.m_localAnchorA), this.m_localAnchorB.Copy(t.m_localAnchorB), this.m_referenceAngleB = t.m_referenceAngle, this.m_localAxisD.SetZero(), n = l - d - this.m_referenceAngleB;
		} else {
			let t = e.joint2;
			this.m_localAnchorD.Copy(t.m_localAnchorA), this.m_localAnchorB.Copy(t.m_localAnchorB), this.m_referenceAngleB = t.m_referenceAngle, this.m_localAxisD.Copy(t.m_localXAxisA);
			let r = this.m_localAnchorD, i = F.MulTRV(u.q, M.AddVV(F.MulRV(c.q, this.m_localAnchorB, M.s_t0), M.SubVV(c.p, u.p, M.s_t1), M.s_t0), M.s_t0);
			n = M.DotVV(M.SubVV(i, r, M.s_t0), this.m_localAxisD);
		}
		this.m_ratio = r(e.ratio, 1), this.m_constant = t + this.m_ratio * n, this.m_impulse = 0;
	}
	static InitVelocityConstraints_s_u = new M();
	static InitVelocityConstraints_s_rA = new M();
	static InitVelocityConstraints_s_rB = new M();
	static InitVelocityConstraints_s_rC = new M();
	static InitVelocityConstraints_s_rD = new M();
	InitVelocityConstraints(t) {
		this.m_indexA = this.m_bodyA.m_islandIndex, this.m_indexB = this.m_bodyB.m_islandIndex, this.m_indexC = this.m_bodyC.m_islandIndex, this.m_indexD = this.m_bodyD.m_islandIndex, this.m_lcA.Copy(this.m_bodyA.m_sweep.localCenter), this.m_lcB.Copy(this.m_bodyB.m_sweep.localCenter), this.m_lcC.Copy(this.m_bodyC.m_sweep.localCenter), this.m_lcD.Copy(this.m_bodyD.m_sweep.localCenter), this.m_mA = this.m_bodyA.m_invMass, this.m_mB = this.m_bodyB.m_invMass, this.m_mC = this.m_bodyC.m_invMass, this.m_mD = this.m_bodyD.m_invMass, this.m_iA = this.m_bodyA.m_invI, this.m_iB = this.m_bodyB.m_invI, this.m_iC = this.m_bodyC.m_invI, this.m_iD = this.m_bodyD.m_invI;
		let n = t.positions[this.m_indexA].a, r = t.velocities[this.m_indexA].v, i = t.velocities[this.m_indexA].w, a = t.positions[this.m_indexB].a, o = t.velocities[this.m_indexB].v, s = t.velocities[this.m_indexB].w, c = t.positions[this.m_indexC].a, l = t.velocities[this.m_indexC].v, u = t.velocities[this.m_indexC].w, d = t.positions[this.m_indexD].a, f = t.velocities[this.m_indexD].v, p = t.velocities[this.m_indexD].w, m = this.m_qA.SetAngle(n), h = this.m_qB.SetAngle(a), g = this.m_qC.SetAngle(c), _ = this.m_qD.SetAngle(d);
		if (this.m_mass = 0, this.m_typeA === K.e_revoluteJoint) this.m_JvAC.SetZero(), this.m_JwA = 1, this.m_JwC = 1, this.m_mass += this.m_iA + this.m_iC;
		else {
			let t = F.MulRV(g, this.m_localAxisC, e.InitVelocityConstraints_s_u);
			M.SubVV(this.m_localAnchorC, this.m_lcC, this.m_lalcC);
			let n = F.MulRV(g, this.m_lalcC, e.InitVelocityConstraints_s_rC);
			M.SubVV(this.m_localAnchorA, this.m_lcA, this.m_lalcA);
			let r = F.MulRV(m, this.m_lalcA, e.InitVelocityConstraints_s_rA);
			this.m_JvAC.Copy(t), this.m_JwC = M.CrossVV(n, t), this.m_JwA = M.CrossVV(r, t), this.m_mass += this.m_mC + this.m_mA + this.m_iC * this.m_JwC * this.m_JwC + this.m_iA * this.m_JwA * this.m_JwA;
		}
		if (this.m_typeB === K.e_revoluteJoint) this.m_JvBD.SetZero(), this.m_JwB = this.m_ratio, this.m_JwD = this.m_ratio, this.m_mass += this.m_ratio * this.m_ratio * (this.m_iB + this.m_iD);
		else {
			let t = F.MulRV(_, this.m_localAxisD, e.InitVelocityConstraints_s_u);
			M.SubVV(this.m_localAnchorD, this.m_lcD, this.m_lalcD);
			let n = F.MulRV(_, this.m_lalcD, e.InitVelocityConstraints_s_rD);
			M.SubVV(this.m_localAnchorB, this.m_lcB, this.m_lalcB);
			let r = F.MulRV(h, this.m_lalcB, e.InitVelocityConstraints_s_rB);
			M.MulSV(this.m_ratio, t, this.m_JvBD), this.m_JwD = this.m_ratio * M.CrossVV(n, t), this.m_JwB = this.m_ratio * M.CrossVV(r, t), this.m_mass += this.m_ratio * this.m_ratio * (this.m_mD + this.m_mB) + this.m_iD * this.m_JwD * this.m_JwD + this.m_iB * this.m_JwB * this.m_JwB;
		}
		this.m_mass = this.m_mass > 0 ? 1 / this.m_mass : 0, t.step.warmStarting ? (r.SelfMulAdd(this.m_mA * this.m_impulse, this.m_JvAC), i += this.m_iA * this.m_impulse * this.m_JwA, o.SelfMulAdd(this.m_mB * this.m_impulse, this.m_JvBD), s += this.m_iB * this.m_impulse * this.m_JwB, l.SelfMulSub(this.m_mC * this.m_impulse, this.m_JvAC), u -= this.m_iC * this.m_impulse * this.m_JwC, f.SelfMulSub(this.m_mD * this.m_impulse, this.m_JvBD), p -= this.m_iD * this.m_impulse * this.m_JwD) : this.m_impulse = 0, t.velocities[this.m_indexA].w = i, t.velocities[this.m_indexB].w = s, t.velocities[this.m_indexC].w = u, t.velocities[this.m_indexD].w = p;
	}
	SolveVelocityConstraints(e) {
		let t = e.velocities[this.m_indexA].v, n = e.velocities[this.m_indexA].w, r = e.velocities[this.m_indexB].v, i = e.velocities[this.m_indexB].w, a = e.velocities[this.m_indexC].v, o = e.velocities[this.m_indexC].w, s = e.velocities[this.m_indexD].v, c = e.velocities[this.m_indexD].w, l = M.DotVV(this.m_JvAC, M.SubVV(t, a, M.s_t0)) + M.DotVV(this.m_JvBD, M.SubVV(r, s, M.s_t0));
		l += this.m_JwA * n - this.m_JwC * o + (this.m_JwB * i - this.m_JwD * c);
		let u = -this.m_mass * l;
		this.m_impulse += u, t.SelfMulAdd(this.m_mA * u, this.m_JvAC), n += this.m_iA * u * this.m_JwA, r.SelfMulAdd(this.m_mB * u, this.m_JvBD), i += this.m_iB * u * this.m_JwB, a.SelfMulSub(this.m_mC * u, this.m_JvAC), o -= this.m_iC * u * this.m_JwC, s.SelfMulSub(this.m_mD * u, this.m_JvBD), c -= this.m_iD * u * this.m_JwD, e.velocities[this.m_indexA].w = n, e.velocities[this.m_indexB].w = i, e.velocities[this.m_indexC].w = o, e.velocities[this.m_indexD].w = c;
	}
	static SolvePositionConstraints_s_u = new M();
	static SolvePositionConstraints_s_rA = new M();
	static SolvePositionConstraints_s_rB = new M();
	static SolvePositionConstraints_s_rC = new M();
	static SolvePositionConstraints_s_rD = new M();
	SolvePositionConstraints(t) {
		let n = t.positions[this.m_indexA].c, r = t.positions[this.m_indexA].a, i = t.positions[this.m_indexB].c, a = t.positions[this.m_indexB].a, o = t.positions[this.m_indexC].c, s = t.positions[this.m_indexC].a, l = t.positions[this.m_indexD].c, u = t.positions[this.m_indexD].a, d = this.m_qA.SetAngle(r), f = this.m_qB.SetAngle(a), p = this.m_qC.SetAngle(s), m = this.m_qD.SetAngle(u), h, g, _ = this.m_JvAC, v = this.m_JvBD, y, b, x, S, C = 0;
		if (this.m_typeA === K.e_revoluteJoint) _.SetZero(), y = 1, x = 1, C += this.m_iA + this.m_iC, h = r - s - this.m_referenceAngleA;
		else {
			let t = F.MulRV(p, this.m_localAxisC, e.SolvePositionConstraints_s_u), r = F.MulRV(p, this.m_lalcC, e.SolvePositionConstraints_s_rC), i = F.MulRV(d, this.m_lalcA, e.SolvePositionConstraints_s_rA);
			_.Copy(t), x = M.CrossVV(r, t), y = M.CrossVV(i, t), C += this.m_mC + this.m_mA + this.m_iC * x * x + this.m_iA * y * y;
			let a = this.m_lalcC, s = F.MulTRV(p, M.AddVV(i, M.SubVV(n, o, M.s_t0), M.s_t0), M.s_t0);
			h = M.DotVV(M.SubVV(s, a, M.s_t0), this.m_localAxisC);
		}
		if (this.m_typeB === K.e_revoluteJoint) v.SetZero(), b = this.m_ratio, S = this.m_ratio, C += this.m_ratio * this.m_ratio * (this.m_iB + this.m_iD), g = a - u - this.m_referenceAngleB;
		else {
			let t = F.MulRV(m, this.m_localAxisD, e.SolvePositionConstraints_s_u), n = F.MulRV(m, this.m_lalcD, e.SolvePositionConstraints_s_rD), r = F.MulRV(f, this.m_lalcB, e.SolvePositionConstraints_s_rB);
			M.MulSV(this.m_ratio, t, v), S = this.m_ratio * M.CrossVV(n, t), b = this.m_ratio * M.CrossVV(r, t), C += this.m_ratio * this.m_ratio * (this.m_mD + this.m_mB) + this.m_iD * S * S + this.m_iB * b * b;
			let a = this.m_lalcD, o = F.MulTRV(m, M.AddVV(r, M.SubVV(i, l, M.s_t0), M.s_t0), M.s_t0);
			g = M.DotVV(M.SubVV(o, a, M.s_t0), this.m_localAxisD);
		}
		let w = h + this.m_ratio * g - this.m_constant, T = 0;
		return C > 0 && (T = -w / C), n.SelfMulAdd(this.m_mA * T, _), r += this.m_iA * T * y, i.SelfMulAdd(this.m_mB * T, v), a += this.m_iB * T * b, o.SelfMulSub(this.m_mC * T, _), s -= this.m_iC * T * x, l.SelfMulSub(this.m_mD * T, v), u -= this.m_iD * T * S, t.positions[this.m_indexA].a = r, t.positions[this.m_indexB].a = a, t.positions[this.m_indexC].a = s, t.positions[this.m_indexD].a = u, 0 < c;
	}
	GetAnchorA(e) {
		return this.m_bodyA.GetWorldPoint(this.m_localAnchorA, e);
	}
	GetAnchorB(e) {
		return this.m_bodyB.GetWorldPoint(this.m_localAnchorB, e);
	}
	GetReactionForce(e, t) {
		return M.MulSV(e * this.m_impulse, this.m_JvAC, t);
	}
	GetReactionTorque(e) {
		return e * this.m_impulse * this.m_JwA;
	}
	GetJoint1() {
		return this.m_joint1;
	}
	GetJoint2() {
		return this.m_joint2;
	}
	GetRatio() {
		return this.m_ratio;
	}
	SetRatio(e) {
		this.m_ratio = e;
	}
	Dump(e) {
		let t = this.m_bodyA.m_islandIndex, n = this.m_bodyB.m_islandIndex, r = this.m_joint1.m_index, i = this.m_joint2.m_index;
		e("  const jd: b2GearJointDef = new b2GearJointDef();\n"), e("  jd.bodyA = bodies[%d];\n", t), e("  jd.bodyB = bodies[%d];\n", n), e("  jd.collideConnected = %s;\n", this.m_collideConnected ? "true" : "false"), e("  jd.joint1 = joints[%d];\n", r), e("  jd.joint2 = joints[%d];\n", i), e("  jd.ratio = %.15f;\n", this.m_ratio), e("  joints[%d] = this.m_world.CreateJoint(jd);\n", this.m_index);
	}
}, vr = class e {
	m_listener;
	m_bodies = [];
	m_contacts = [];
	m_joints = [];
	m_positions = or.MakeArray(1024);
	m_velocities = sr.MakeArray(1024);
	m_bodyCount = 0;
	m_jointCount = 0;
	m_contactCount = 0;
	m_bodyCapacity = 0;
	m_contactCapacity = 0;
	m_jointCapacity = 0;
	Initialize(e, t, n, r) {
		if (this.m_bodyCapacity = e, this.m_contactCapacity = t, this.m_jointCapacity = n, this.m_bodyCount = 0, this.m_contactCount = 0, this.m_jointCount = 0, this.m_listener = r, this.m_positions.length < e) {
			let t = O(this.m_positions.length * 2, e);
			for (; this.m_positions.length < t;) this.m_positions[this.m_positions.length] = new or();
		}
		if (this.m_velocities.length < e) {
			let t = O(this.m_velocities.length * 2, e);
			for (; this.m_velocities.length < t;) this.m_velocities[this.m_velocities.length] = new sr();
		}
	}
	Clear() {
		this.m_bodyCount = 0, this.m_contactCount = 0, this.m_jointCount = 0;
	}
	AddBody(e) {
		e.m_islandIndex = this.m_bodyCount, this.m_bodies[this.m_bodyCount++] = e;
	}
	AddContact(e) {
		this.m_contacts[this.m_contactCount++] = e;
	}
	AddJoint(e) {
		this.m_joints[this.m_jointCount++] = e;
	}
	static s_timer = new ae();
	static s_solverData = new cr();
	static s_contactSolverDef = new pr();
	static s_contactSolver = new hr();
	static s_translation = new M();
	Solve(t, n, r, a) {
		let o = e.s_timer.Reset(), s = n.dt;
		for (let e = 0; e < this.m_bodyCount; ++e) {
			let t = this.m_bodies[e];
			this.m_positions[e].c.Copy(t.m_sweep.c);
			let n = t.m_sweep.a, i = this.m_velocities[e].v.Copy(t.m_linearVelocity), a = t.m_angularVelocity;
			t.m_sweep.c0.Copy(t.m_sweep.c), t.m_sweep.a0 = t.m_sweep.a, t.m_type === J.b2_dynamicBody && (i.x += s * t.m_invMass * (t.m_gravityScale * t.m_mass * r.x + t.m_force.x), i.y += s * t.m_invMass * (t.m_gravityScale * t.m_mass * r.y + t.m_force.y), a += s * t.m_invI * t.m_torque, i.SelfMul(1 / (1 + s * t.m_linearDamping)), a *= 1 / (1 + s * t.m_angularDamping)), this.m_positions[e].a = n, this.m_velocities[e].w = a;
		}
		o.Reset();
		let c = e.s_solverData;
		c.step.Copy(n), c.positions = this.m_positions, c.velocities = this.m_velocities;
		let l = e.s_contactSolverDef;
		l.step.Copy(n), l.contacts = this.m_contacts, l.count = this.m_contactCount, l.positions = this.m_positions, l.velocities = this.m_velocities;
		let u = e.s_contactSolver.Initialize(l);
		u.InitializeVelocityConstraints(), n.warmStarting && u.WarmStart();
		for (let e = 0; e < this.m_jointCount; ++e) this.m_joints[e].InitVelocityConstraints(c);
		t.solveInit = o.GetMilliseconds(), o.Reset();
		for (let e = 0; e < n.velocityIterations; ++e) {
			for (let e = 0; e < this.m_jointCount; ++e) this.m_joints[e].SolveVelocityConstraints(c);
			u.SolveVelocityConstraints();
		}
		u.StoreImpulses(), t.solveVelocity = o.GetMilliseconds();
		for (let t = 0; t < this.m_bodyCount; ++t) {
			let n = this.m_positions[t].c, r = this.m_positions[t].a, i = this.m_velocities[t].v, a = this.m_velocities[t].w, o = M.MulSV(s, i, e.s_translation);
			if (M.DotVV(o, o) > 4) {
				let e = 2 / o.Length();
				i.SelfMul(e);
			}
			let c = s * a;
			if (c * c > 2.4674011002726646) {
				let e = p / E(c);
				a *= e;
			}
			n.x += s * i.x, n.y += s * i.y, r += s * a, this.m_positions[t].a = r, this.m_velocities[t].w = a;
		}
		o.Reset();
		let d = !1;
		for (let e = 0; e < n.positionIterations; ++e) {
			let e = u.SolvePositionConstraints(), t = !0;
			for (let e = 0; e < this.m_jointCount; ++e) {
				let n = this.m_joints[e].SolvePositionConstraints(c);
				t &&= n;
			}
			if (e && t) {
				d = !0;
				break;
			}
		}
		for (let e = 0; e < this.m_bodyCount; ++e) {
			let t = this.m_bodies[e];
			t.m_sweep.c.Copy(this.m_positions[e].c), t.m_sweep.a = this.m_positions[e].a, t.m_linearVelocity.Copy(this.m_velocities[e].v), t.m_angularVelocity = this.m_velocities[e].w, t.SynchronizeTransform();
		}
		if (t.solvePosition = o.GetMilliseconds(), this.Report(u.m_velocityConstraints), a) {
			let e = i, t = b * b, n = x * x;
			for (let r = 0; r < this.m_bodyCount; ++r) {
				let i = this.m_bodies[r];
				i.GetType() !== J.b2_staticBody && (!i.m_autoSleepFlag || i.m_angularVelocity * i.m_angularVelocity > n || M.DotVV(i.m_linearVelocity, i.m_linearVelocity) > t ? (i.m_sleepTime = 0, e = 0) : (i.m_sleepTime += s, e = D(e, i.m_sleepTime)));
			}
			if (e >= .5 && d) for (let e = 0; e < this.m_bodyCount; ++e) this.m_bodies[e].SetAwake(!1);
		}
	}
	SolveTOI(t, n, r) {
		for (let e = 0; e < this.m_bodyCount; ++e) {
			let t = this.m_bodies[e];
			this.m_positions[e].c.Copy(t.m_sweep.c), this.m_positions[e].a = t.m_sweep.a, this.m_velocities[e].v.Copy(t.m_linearVelocity), this.m_velocities[e].w = t.m_angularVelocity;
		}
		let i = e.s_contactSolverDef;
		i.contacts = this.m_contacts, i.count = this.m_contactCount, i.step.Copy(t), i.positions = this.m_positions, i.velocities = this.m_velocities;
		let a = e.s_contactSolver.Initialize(i);
		for (let e = 0; e < t.positionIterations && !a.SolveTOIPositionConstraints(n, r); ++e);
		this.m_bodies[n].m_sweep.c0.Copy(this.m_positions[n].c), this.m_bodies[n].m_sweep.a0 = this.m_positions[n].a, this.m_bodies[r].m_sweep.c0.Copy(this.m_positions[r].c), this.m_bodies[r].m_sweep.a0 = this.m_positions[r].a, a.InitializeVelocityConstraints();
		for (let e = 0; e < t.velocityIterations; ++e) a.SolveVelocityConstraints();
		let o = t.dt;
		for (let t = 0; t < this.m_bodyCount; ++t) {
			let n = this.m_positions[t].c, r = this.m_positions[t].a, i = this.m_velocities[t].v, a = this.m_velocities[t].w, s = M.MulSV(o, i, e.s_translation);
			if (M.DotVV(s, s) > 4) {
				let e = 2 / s.Length();
				i.SelfMul(e);
			}
			let c = o * a;
			if (c * c > 2.4674011002726646) {
				let e = p / E(c);
				a *= e;
			}
			n.SelfMulAdd(o, i), r += o * a, this.m_positions[t].a = r, this.m_velocities[t].w = a;
			let l = this.m_bodies[t];
			l.m_sweep.c.Copy(n), l.m_sweep.a = r, l.m_linearVelocity.Copy(i), l.m_angularVelocity = a, l.SynchronizeTransform();
		}
		this.Report(a.m_velocityConstraints);
	}
	static s_impulse = new $n();
	Report(t) {
		if (this.m_listener !== null) for (let n = 0; n < this.m_contactCount; ++n) {
			let r = this.m_contacts[n];
			if (!r) continue;
			let i = t[n], a = e.s_impulse;
			a.count = i.pointCount;
			for (let e = 0; e < i.pointCount; ++e) a.normalImpulses[e] = i.points[e].normalImpulse, a.tangentImpulses[e] = i.points[e].tangentImpulse;
			this.m_listener.PostSolve(r, a);
		}
	}
}, yr = class e extends q {
	m_linearOffset = new M();
	m_angularOffset = 0;
	m_linearImpulse = new M();
	m_angularImpulse = 0;
	m_maxForce = 0;
	m_maxTorque = 0;
	m_correctionFactor = .3;
	m_indexA = 0;
	m_indexB = 0;
	m_rA = new M();
	m_rB = new M();
	m_localCenterA = new M();
	m_localCenterB = new M();
	m_linearError = new M();
	m_angularError = 0;
	m_invMassA = 0;
	m_invMassB = 0;
	m_invIA = 0;
	m_invIB = 0;
	m_linearMass = new P();
	m_angularMass = 0;
	m_qA = new F();
	m_qB = new F();
	m_K = new P();
	constructor(e) {
		super(e), this.m_linearOffset.Copy(r(e.linearOffset, M.ZERO)), this.m_linearImpulse.SetZero(), this.m_maxForce = r(e.maxForce, 0), this.m_maxTorque = r(e.maxTorque, 0), this.m_correctionFactor = r(e.correctionFactor, .3);
	}
	GetAnchorA(e) {
		let t = this.m_bodyA.GetPosition();
		return e.x = t.x, e.y = t.y, e;
	}
	GetAnchorB(e) {
		let t = this.m_bodyB.GetPosition();
		return e.x = t.x, e.y = t.y, e;
	}
	GetReactionForce(e, t) {
		return M.MulSV(e, this.m_linearImpulse, t);
	}
	GetReactionTorque(e) {
		return e * this.m_angularImpulse;
	}
	SetLinearOffset(e) {
		M.IsEqualToV(e, this.m_linearOffset) || (this.m_bodyA.SetAwake(!0), this.m_bodyB.SetAwake(!0), this.m_linearOffset.Copy(e));
	}
	GetLinearOffset() {
		return this.m_linearOffset;
	}
	SetAngularOffset(e) {
		e !== this.m_angularOffset && (this.m_bodyA.SetAwake(!0), this.m_bodyB.SetAwake(!0), this.m_angularOffset = e);
	}
	GetAngularOffset() {
		return this.m_angularOffset;
	}
	SetMaxForce(e) {
		this.m_maxForce = e;
	}
	GetMaxForce() {
		return this.m_maxForce;
	}
	SetMaxTorque(e) {
		this.m_maxTorque = e;
	}
	GetMaxTorque() {
		return this.m_maxTorque;
	}
	InitVelocityConstraints(e) {
		this.m_indexA = this.m_bodyA.m_islandIndex, this.m_indexB = this.m_bodyB.m_islandIndex, this.m_localCenterA.Copy(this.m_bodyA.m_sweep.localCenter), this.m_localCenterB.Copy(this.m_bodyB.m_sweep.localCenter), this.m_invMassA = this.m_bodyA.m_invMass, this.m_invMassB = this.m_bodyB.m_invMass, this.m_invIA = this.m_bodyA.m_invI, this.m_invIB = this.m_bodyB.m_invI;
		let t = e.positions[this.m_indexA].c, n = e.positions[this.m_indexA].a, r = e.velocities[this.m_indexA].v, i = e.velocities[this.m_indexA].w, a = e.positions[this.m_indexB].c, o = e.positions[this.m_indexB].a, s = e.velocities[this.m_indexB].v, c = e.velocities[this.m_indexB].w, l = this.m_qA.SetAngle(n), u = this.m_qB.SetAngle(o), d = F.MulRV(l, M.SubVV(this.m_linearOffset, this.m_localCenterA, M.s_t0), this.m_rA), f = F.MulRV(u, M.NegV(this.m_localCenterB, M.s_t0), this.m_rB), p = this.m_invMassA, m = this.m_invMassB, h = this.m_invIA, g = this.m_invIB, _ = this.m_K;
		if (_.ex.x = p + m + h * d.y * d.y + g * f.y * f.y, _.ex.y = -h * d.x * d.y - g * f.x * f.y, _.ey.x = _.ex.y, _.ey.y = p + m + h * d.x * d.x + g * f.x * f.x, _.GetInverse(this.m_linearMass), this.m_angularMass = h + g, this.m_angularMass > 0 && (this.m_angularMass = 1 / this.m_angularMass), M.SubVV(M.AddVV(a, f, M.s_t0), M.AddVV(t, d, M.s_t1), this.m_linearError), this.m_angularError = o - n - this.m_angularOffset, e.step.warmStarting) {
			this.m_linearImpulse.SelfMul(e.step.dtRatio), this.m_angularImpulse *= e.step.dtRatio;
			let t = this.m_linearImpulse;
			r.SelfMulSub(p, t), i -= h * (M.CrossVV(d, t) + this.m_angularImpulse), s.SelfMulAdd(m, t), c += g * (M.CrossVV(f, t) + this.m_angularImpulse);
		} else this.m_linearImpulse.SetZero(), this.m_angularImpulse = 0;
		e.velocities[this.m_indexA].w = i, e.velocities[this.m_indexB].w = c;
	}
	static SolveVelocityConstraints_s_Cdot_v2 = new M();
	static SolveVelocityConstraints_s_impulse_v2 = new M();
	static SolveVelocityConstraints_s_oldImpulse_v2 = new M();
	SolveVelocityConstraints(t) {
		let n = t.velocities[this.m_indexA].v, r = t.velocities[this.m_indexA].w, i = t.velocities[this.m_indexB].v, a = t.velocities[this.m_indexB].w, o = this.m_invMassA, s = this.m_invMassB, c = this.m_invIA, l = this.m_invIB, u = t.step.dt, d = t.step.inv_dt;
		{
			let e = a - r + d * this.m_correctionFactor * this.m_angularError, t = -this.m_angularMass * e, n = this.m_angularImpulse, i = u * this.m_maxTorque;
			this.m_angularImpulse = k(this.m_angularImpulse + t, -i, i), t = this.m_angularImpulse - n, r -= c * t, a += l * t;
		}
		{
			let t = this.m_rA, f = this.m_rB, p = M.AddVV(M.SubVV(M.AddVV(i, M.CrossSV(a, f, M.s_t0), M.s_t0), M.AddVV(n, M.CrossSV(r, t, M.s_t1), M.s_t1), M.s_t2), M.MulSV(d * this.m_correctionFactor, this.m_linearError, M.s_t3), e.SolveVelocityConstraints_s_Cdot_v2), m = P.MulMV(this.m_linearMass, p, e.SolveVelocityConstraints_s_impulse_v2).SelfNeg(), h = e.SolveVelocityConstraints_s_oldImpulse_v2.Copy(this.m_linearImpulse);
			this.m_linearImpulse.SelfAdd(m);
			let g = u * this.m_maxForce;
			this.m_linearImpulse.LengthSquared() > g * g && (this.m_linearImpulse.Normalize(), this.m_linearImpulse.SelfMul(g)), M.SubVV(this.m_linearImpulse, h, m), n.SelfMulSub(o, m), r -= c * M.CrossVV(t, m), i.SelfMulAdd(s, m), a += l * M.CrossVV(f, m);
		}
		t.velocities[this.m_indexA].w = r, t.velocities[this.m_indexB].w = a;
	}
	SolvePositionConstraints(e) {
		return !0;
	}
	Dump(e) {
		let t = this.m_bodyA.m_islandIndex, n = this.m_bodyB.m_islandIndex;
		e("  const jd: b2MotorJointDef = new b2MotorJointDef();\n"), e("  jd.bodyA = bodies[%d];\n", t), e("  jd.bodyB = bodies[%d];\n", n), e("  jd.collideConnected = %s;\n", this.m_collideConnected ? "true" : "false"), e("  jd.linearOffset.Set(%.15f, %.15f);\n", this.m_linearOffset.x, this.m_linearOffset.y), e("  jd.angularOffset = %.15f;\n", this.m_angularOffset), e("  jd.maxForce = %.15f;\n", this.m_maxForce), e("  jd.maxTorque = %.15f;\n", this.m_maxTorque), e("  jd.correctionFactor = %.15f;\n", this.m_correctionFactor), e("  joints[%d] = this.m_world.CreateJoint(jd);\n", this.m_index);
	}
}, br = class e extends q {
	m_localAnchorB = new M();
	m_targetA = new M();
	m_stiffness = 0;
	m_damping = 0;
	m_beta = 0;
	m_impulse = new M();
	m_maxForce = 0;
	m_gamma = 0;
	m_indexA = 0;
	m_indexB = 0;
	m_rB = new M();
	m_localCenterB = new M();
	m_invMassB = 0;
	m_invIB = 0;
	m_mass = new P();
	m_C = new M();
	m_qB = new F();
	m_lalcB = new M();
	m_K = new P();
	constructor(e) {
		super(e), this.m_targetA.Copy(r(e.target, M.ZERO)), I.MulTXV(this.m_bodyB.GetTransform(), this.m_targetA, this.m_localAnchorB), this.m_maxForce = r(e.maxForce, 0), this.m_impulse.SetZero(), this.m_stiffness = r(e.stiffness, 0), this.m_damping = r(e.damping, 0), this.m_beta = 0, this.m_gamma = 0;
	}
	SetTarget(e) {
		this.m_bodyB.IsAwake() || this.m_bodyB.SetAwake(!0), this.m_targetA.Copy(e);
	}
	GetTarget() {
		return this.m_targetA;
	}
	SetMaxForce(e) {
		this.m_maxForce = e;
	}
	GetMaxForce() {
		return this.m_maxForce;
	}
	SetStiffness(e) {
		this.m_stiffness = e;
	}
	GetStiffness() {
		return this.m_stiffness;
	}
	SetDamping(e) {
		this.m_damping = e;
	}
	GetDamping() {
		return this.m_damping;
	}
	InitVelocityConstraints(e) {
		this.m_indexB = this.m_bodyB.m_islandIndex, this.m_localCenterB.Copy(this.m_bodyB.m_sweep.localCenter), this.m_invMassB = this.m_bodyB.m_invMass, this.m_invIB = this.m_bodyB.m_invI;
		let t = e.positions[this.m_indexB].c, n = e.positions[this.m_indexB].a, r = e.velocities[this.m_indexB].v, i = e.velocities[this.m_indexB].w, a = this.m_qB.SetAngle(n), s = this.m_bodyB.GetMass(), c = 2 * o * this.m_stiffness, l = 2 * s * this.m_damping * c, u = c * c * s, d = e.step.dt;
		this.m_gamma = d * (l + d * u), this.m_gamma !== 0 && (this.m_gamma = 1 / this.m_gamma), this.m_beta = d * u * this.m_gamma, M.SubVV(this.m_localAnchorB, this.m_localCenterB, this.m_lalcB), F.MulRV(a, this.m_lalcB, this.m_rB);
		let f = this.m_K;
		f.ex.x = this.m_invMassB + this.m_invIB * this.m_rB.y * this.m_rB.y + this.m_gamma, f.ex.y = -this.m_invIB * this.m_rB.x * this.m_rB.y, f.ey.x = f.ex.y, f.ey.y = this.m_invMassB + this.m_invIB * this.m_rB.x * this.m_rB.x + this.m_gamma, f.GetInverse(this.m_mass), this.m_C.x = t.x + this.m_rB.x - this.m_targetA.x, this.m_C.y = t.y + this.m_rB.y - this.m_targetA.y, this.m_C.SelfMul(this.m_beta), i *= .98, e.step.warmStarting ? (this.m_impulse.SelfMul(e.step.dtRatio), r.x += this.m_invMassB * this.m_impulse.x, r.y += this.m_invMassB * this.m_impulse.y, i += this.m_invIB * M.CrossVV(this.m_rB, this.m_impulse)) : this.m_impulse.SetZero(), e.velocities[this.m_indexB].w = i;
	}
	static SolveVelocityConstraints_s_Cdot = new M();
	static SolveVelocityConstraints_s_impulse = new M();
	static SolveVelocityConstraints_s_oldImpulse = new M();
	SolveVelocityConstraints(t) {
		let n = t.velocities[this.m_indexB].v, r = t.velocities[this.m_indexB].w, i = M.AddVCrossSV(n, r, this.m_rB, e.SolveVelocityConstraints_s_Cdot), a = P.MulMV(this.m_mass, M.AddVV(i, M.AddVV(this.m_C, M.MulSV(this.m_gamma, this.m_impulse, M.s_t0), M.s_t0), M.s_t0).SelfNeg(), e.SolveVelocityConstraints_s_impulse), o = e.SolveVelocityConstraints_s_oldImpulse.Copy(this.m_impulse);
		this.m_impulse.SelfAdd(a);
		let s = t.step.dt * this.m_maxForce;
		this.m_impulse.LengthSquared() > s * s && this.m_impulse.SelfMul(s / this.m_impulse.Length()), M.SubVV(this.m_impulse, o, a), n.SelfMulAdd(this.m_invMassB, a), r += this.m_invIB * M.CrossVV(this.m_rB, a), t.velocities[this.m_indexB].w = r;
	}
	SolvePositionConstraints(e) {
		return !0;
	}
	GetAnchorA(e) {
		return e.x = this.m_targetA.x, e.y = this.m_targetA.y, e;
	}
	GetAnchorB(e) {
		return this.m_bodyB.GetWorldPoint(this.m_localAnchorB, e);
	}
	GetReactionForce(e, t) {
		return M.MulSV(e, this.m_impulse, t);
	}
	GetReactionTorque(e) {
		return 0;
	}
	Dump(e) {
		e("Mouse joint dumping is not supported.\n");
	}
	ShiftOrigin(e) {
		this.m_targetA.SelfSub(e);
	}
}, xr = class t extends q {
	m_localAnchorA = new M();
	m_localAnchorB = new M();
	m_localXAxisA = new M();
	m_localYAxisA = new M();
	m_referenceAngle = 0;
	m_impulse = new M(0, 0);
	m_motorImpulse = 0;
	m_lowerImpulse = 0;
	m_upperImpulse = 0;
	m_lowerTranslation = 0;
	m_upperTranslation = 0;
	m_maxMotorForce = 0;
	m_motorSpeed = 0;
	m_enableLimit = !1;
	m_enableMotor = !1;
	m_indexA = 0;
	m_indexB = 0;
	m_localCenterA = new M();
	m_localCenterB = new M();
	m_invMassA = 0;
	m_invMassB = 0;
	m_invIA = 0;
	m_invIB = 0;
	m_axis = new M(0, 0);
	m_perp = new M(0, 0);
	m_s1 = 0;
	m_s2 = 0;
	m_a1 = 0;
	m_a2 = 0;
	m_K = new P();
	m_K3 = new ie();
	m_K2 = new P();
	m_translation = 0;
	m_axialMass = 0;
	m_qA = new F();
	m_qB = new F();
	m_lalcA = new M();
	m_lalcB = new M();
	m_rA = new M();
	m_rB = new M();
	constructor(e) {
		super(e), this.m_localAnchorA.Copy(r(e.localAnchorA, M.ZERO)), this.m_localAnchorB.Copy(r(e.localAnchorB, M.ZERO)), this.m_localXAxisA.Copy(r(e.localAxisA, new M(1, 0))).SelfNormalize(), M.CrossOneV(this.m_localXAxisA, this.m_localYAxisA), this.m_referenceAngle = r(e.referenceAngle, 0), this.m_lowerTranslation = r(e.lowerTranslation, 0), this.m_upperTranslation = r(e.upperTranslation, 0), this.m_maxMotorForce = r(e.maxMotorForce, 0), this.m_motorSpeed = r(e.motorSpeed, 0), this.m_enableLimit = r(e.enableLimit, !1), this.m_enableMotor = r(e.enableMotor, !1);
	}
	static InitVelocityConstraints_s_d = new M();
	static InitVelocityConstraints_s_P = new M();
	InitVelocityConstraints(e) {
		this.m_indexA = this.m_bodyA.m_islandIndex, this.m_indexB = this.m_bodyB.m_islandIndex, this.m_localCenterA.Copy(this.m_bodyA.m_sweep.localCenter), this.m_localCenterB.Copy(this.m_bodyB.m_sweep.localCenter), this.m_invMassA = this.m_bodyA.m_invMass, this.m_invMassB = this.m_bodyB.m_invMass, this.m_invIA = this.m_bodyA.m_invI, this.m_invIB = this.m_bodyB.m_invI;
		let n = e.positions[this.m_indexA].c, r = e.positions[this.m_indexA].a, i = e.velocities[this.m_indexA].v, a = e.velocities[this.m_indexA].w, o = e.positions[this.m_indexB].c, s = e.positions[this.m_indexB].a, c = e.velocities[this.m_indexB].v, l = e.velocities[this.m_indexB].w, u = this.m_qA.SetAngle(r), d = this.m_qB.SetAngle(s);
		M.SubVV(this.m_localAnchorA, this.m_localCenterA, this.m_lalcA);
		let f = F.MulRV(u, this.m_lalcA, this.m_rA);
		M.SubVV(this.m_localAnchorB, this.m_localCenterB, this.m_lalcB);
		let p = F.MulRV(d, this.m_lalcB, this.m_rB), m = M.AddVV(M.SubVV(o, n, M.s_t0), M.SubVV(p, f, M.s_t1), t.InitVelocityConstraints_s_d), h = this.m_invMassA, g = this.m_invMassB, _ = this.m_invIA, v = this.m_invIB;
		if (F.MulRV(u, this.m_localXAxisA, this.m_axis), this.m_a1 = M.CrossVV(M.AddVV(m, f, M.s_t0), this.m_axis), this.m_a2 = M.CrossVV(p, this.m_axis), this.m_axialMass = h + g + _ * this.m_a1 * this.m_a1 + v * this.m_a2 * this.m_a2, this.m_axialMass > 0 && (this.m_axialMass = 1 / this.m_axialMass), F.MulRV(u, this.m_localYAxisA, this.m_perp), this.m_s1 = M.CrossVV(M.AddVV(m, f, M.s_t0), this.m_perp), this.m_s2 = M.CrossVV(p, this.m_perp), this.m_K.ex.x = h + g + _ * this.m_s1 * this.m_s1 + v * this.m_s2 * this.m_s2, this.m_K.ex.y = _ * this.m_s1 + v * this.m_s2, this.m_K.ey.x = this.m_K.ex.y, this.m_K.ey.y = _ + v, this.m_K.ey.y === 0 && (this.m_K.ey.y = 1), this.m_enableLimit ? this.m_translation = M.DotVV(this.m_axis, m) : (this.m_lowerImpulse = 0, this.m_upperImpulse = 0), this.m_enableMotor || (this.m_motorImpulse = 0), e.step.warmStarting) {
			this.m_impulse.SelfMul(e.step.dtRatio), this.m_motorImpulse *= e.step.dtRatio, this.m_lowerImpulse *= e.step.dtRatio, this.m_upperImpulse *= e.step.dtRatio;
			let n = this.m_motorImpulse + this.m_lowerImpulse - this.m_upperImpulse, r = M.AddVV(M.MulSV(this.m_impulse.x, this.m_perp, M.s_t0), M.MulSV(n, this.m_axis, M.s_t1), t.InitVelocityConstraints_s_P), o = this.m_impulse.x * this.m_s1 + this.m_impulse.y + n * this.m_a1, s = this.m_impulse.x * this.m_s2 + this.m_impulse.y + n * this.m_a2;
			i.SelfMulSub(h, r), a -= _ * o, c.SelfMulAdd(g, r), l += v * s;
		} else this.m_impulse.SetZero(), this.m_motorImpulse = 0, this.m_lowerImpulse = 0, this.m_upperImpulse = 0;
		e.velocities[this.m_indexA].w = a, e.velocities[this.m_indexB].w = l;
	}
	static SolveVelocityConstraints_s_P = new M();
	static SolveVelocityConstraints_s_df = new M();
	SolveVelocityConstraints(e) {
		let n = e.velocities[this.m_indexA].v, r = e.velocities[this.m_indexA].w, i = e.velocities[this.m_indexB].v, a = e.velocities[this.m_indexB].w, o = this.m_invMassA, s = this.m_invMassB, c = this.m_invIA, l = this.m_invIB;
		if (this.m_enableMotor) {
			let u = M.DotVV(this.m_axis, M.SubVV(i, n, M.s_t0)) + this.m_a2 * a - this.m_a1 * r, d = this.m_axialMass * (this.m_motorSpeed - u), f = this.m_motorImpulse, p = e.step.dt * this.m_maxMotorForce;
			this.m_motorImpulse = k(this.m_motorImpulse + d, -p, p), d = this.m_motorImpulse - f;
			let m = M.MulSV(d, this.m_axis, t.SolveVelocityConstraints_s_P), h = d * this.m_a1, g = d * this.m_a2;
			n.SelfMulSub(o, m), r -= c * h, i.SelfMulAdd(s, m), a += l * g;
		}
		if (this.m_enableLimit) {
			{
				let u = this.m_translation - this.m_lowerTranslation, d = M.DotVV(this.m_axis, M.SubVV(i, n, M.s_t0)) + this.m_a2 * a - this.m_a1 * r, f = -this.m_axialMass * (d + O(u, 0) * e.step.inv_dt), p = this.m_lowerImpulse;
				this.m_lowerImpulse = O(this.m_lowerImpulse + f, 0), f = this.m_lowerImpulse - p;
				let m = M.MulSV(f, this.m_axis, t.SolveVelocityConstraints_s_P), h = f * this.m_a1, g = f * this.m_a2;
				n.SelfMulSub(o, m), r -= c * h, i.SelfMulAdd(s, m), a += l * g;
			}
			{
				let u = this.m_upperTranslation - this.m_translation, d = M.DotVV(this.m_axis, M.SubVV(n, i, M.s_t0)) + this.m_a1 * r - this.m_a2 * a, f = -this.m_axialMass * (d + O(u, 0) * e.step.inv_dt), p = this.m_upperImpulse;
				this.m_upperImpulse = O(this.m_upperImpulse + f, 0), f = this.m_upperImpulse - p;
				let m = M.MulSV(f, this.m_axis, t.SolveVelocityConstraints_s_P), h = f * this.m_a1, g = f * this.m_a2;
				n.SelfMulAdd(o, m), r += c * h, i.SelfMulSub(s, m), a -= l * g;
			}
		}
		{
			let e = M.DotVV(this.m_perp, M.SubVV(i, n, M.s_t0)) + this.m_s2 * a - this.m_s1 * r, u = a - r, d = this.m_K.Solve(-e, -u, t.SolveVelocityConstraints_s_df);
			this.m_impulse.SelfAdd(d);
			let f = M.MulSV(d.x, this.m_perp, t.SolveVelocityConstraints_s_P), p = d.x * this.m_s1 + d.y, m = d.x * this.m_s2 + d.y;
			n.SelfMulSub(o, f), r -= c * p, i.SelfMulAdd(s, f), a += l * m;
		}
		e.velocities[this.m_indexA].w = r, e.velocities[this.m_indexB].w = a;
	}
	static SolvePositionConstraints_s_d = new M();
	static SolvePositionConstraints_s_impulse = new N();
	static SolvePositionConstraints_s_impulse1 = new M();
	static SolvePositionConstraints_s_P = new M();
	SolvePositionConstraints(e) {
		let n = e.positions[this.m_indexA].c, r = e.positions[this.m_indexA].a, i = e.positions[this.m_indexB].c, a = e.positions[this.m_indexB].a, o = this.m_qA.SetAngle(r), s = this.m_qB.SetAngle(a), c = this.m_invMassA, l = this.m_invMassB, u = this.m_invIA, d = this.m_invIB, f = F.MulRV(o, this.m_lalcA, this.m_rA), p = F.MulRV(s, this.m_lalcB, this.m_rB), m = M.SubVV(M.AddVV(i, p, M.s_t0), M.AddVV(n, f, M.s_t1), t.SolvePositionConstraints_s_d), h = F.MulRV(o, this.m_localXAxisA, this.m_axis), g = M.CrossVV(M.AddVV(m, f, M.s_t0), h), _ = M.CrossVV(p, h), v = F.MulRV(o, this.m_localYAxisA, this.m_perp), y = M.CrossVV(M.AddVV(m, f, M.s_t0), v), b = M.CrossVV(p, v), x = t.SolvePositionConstraints_s_impulse, S = M.DotVV(v, m), C = a - r - this.m_referenceAngle, w = E(S), T = E(C), k = !1, A = 0;
		if (this.m_enableLimit) {
			let e = M.DotVV(h, m);
			E(this.m_upperTranslation - this.m_lowerTranslation) < .01 ? (A = e, w = O(w, E(e)), k = !0) : e <= this.m_lowerTranslation ? (A = D(e - this.m_lowerTranslation, 0), w = O(w, this.m_lowerTranslation - e), k = !0) : e >= this.m_upperTranslation && (A = O(e - this.m_upperTranslation, 0), w = O(w, e - this.m_upperTranslation), k = !0);
		}
		if (k) {
			let e = c + l + u * y * y + d * b * b, t = u * y + d * b, n = u * y * g + d * b * _, r = u + d;
			r === 0 && (r = 1);
			let i = u * g + d * _, a = c + l + u * g * g + d * _ * _, o = this.m_K3;
			o.ex.SetXYZ(e, t, n), o.ey.SetXYZ(t, r, i), o.ez.SetXYZ(n, i, a), x = o.Solve33(-S, -C, -A, x);
		} else {
			let e = c + l + u * y * y + d * b * b, n = u * y + d * b, r = u + d;
			r === 0 && (r = 1);
			let i = this.m_K2;
			i.ex.Set(e, n), i.ey.Set(n, r);
			let a = i.Solve(-S, -C, t.SolvePositionConstraints_s_impulse1);
			x.x = a.x, x.y = a.y, x.z = 0;
		}
		let ee = M.AddVV(M.MulSV(x.x, v, M.s_t0), M.MulSV(x.z, h, M.s_t1), t.SolvePositionConstraints_s_P), j = x.x * y + x.y + x.z * g, te = x.x * b + x.y + x.z * _;
		return n.SelfMulSub(c, ee), r -= u * j, i.SelfMulAdd(l, ee), a += d * te, e.positions[this.m_indexA].a = r, e.positions[this.m_indexB].a = a, w <= .005 && T <= .03490658503988889;
	}
	GetAnchorA(e) {
		return this.m_bodyA.GetWorldPoint(this.m_localAnchorA, e);
	}
	GetAnchorB(e) {
		return this.m_bodyB.GetWorldPoint(this.m_localAnchorB, e);
	}
	GetReactionForce(e, t) {
		return t.x = e * (this.m_impulse.x * this.m_perp.x + (this.m_motorImpulse + this.m_lowerImpulse - this.m_upperImpulse) * this.m_axis.x), t.y = e * (this.m_impulse.y * this.m_perp.y + (this.m_motorImpulse + this.m_lowerImpulse - this.m_upperImpulse) * this.m_axis.y), t;
	}
	GetReactionTorque(e) {
		return e * this.m_impulse.y;
	}
	GetLocalAnchorA() {
		return this.m_localAnchorA;
	}
	GetLocalAnchorB() {
		return this.m_localAnchorB;
	}
	GetLocalAxisA() {
		return this.m_localXAxisA;
	}
	GetReferenceAngle() {
		return this.m_referenceAngle;
	}
	static GetJointTranslation_s_pA = new M();
	static GetJointTranslation_s_pB = new M();
	static GetJointTranslation_s_d = new M();
	static GetJointTranslation_s_axis = new M();
	GetJointTranslation() {
		let e = this.m_bodyA.GetWorldPoint(this.m_localAnchorA, t.GetJointTranslation_s_pA), n = this.m_bodyB.GetWorldPoint(this.m_localAnchorB, t.GetJointTranslation_s_pB), r = M.SubVV(n, e, t.GetJointTranslation_s_d), i = this.m_bodyA.GetWorldVector(this.m_localXAxisA, t.GetJointTranslation_s_axis);
		return M.DotVV(r, i);
	}
	GetJointSpeed() {
		let e = this.m_bodyA, t = this.m_bodyB;
		M.SubVV(this.m_localAnchorA, e.m_sweep.localCenter, this.m_lalcA);
		let n = F.MulRV(e.m_xf.q, this.m_lalcA, this.m_rA);
		M.SubVV(this.m_localAnchorB, t.m_sweep.localCenter, this.m_lalcB);
		let r = F.MulRV(t.m_xf.q, this.m_lalcB, this.m_rB), i = M.AddVV(e.m_sweep.c, n, M.s_t0), a = M.AddVV(t.m_sweep.c, r, M.s_t1), o = M.SubVV(a, i, M.s_t2), s = e.GetWorldVector(this.m_localXAxisA, this.m_axis), c = e.m_linearVelocity, l = t.m_linearVelocity, u = e.m_angularVelocity, d = t.m_angularVelocity;
		return M.DotVV(o, M.CrossSV(u, s, M.s_t0)) + M.DotVV(s, M.SubVV(M.AddVCrossSV(l, d, r, M.s_t0), M.AddVCrossSV(c, u, n, M.s_t1), M.s_t0));
	}
	IsLimitEnabled() {
		return this.m_enableLimit;
	}
	EnableLimit(e) {
		e !== this.m_enableLimit && (this.m_bodyA.SetAwake(!0), this.m_bodyB.SetAwake(!0), this.m_enableLimit = e, this.m_lowerImpulse = 0, this.m_upperImpulse = 0);
	}
	GetLowerLimit() {
		return this.m_lowerTranslation;
	}
	GetUpperLimit() {
		return this.m_upperTranslation;
	}
	SetLimits(e, t) {
		(e !== this.m_lowerTranslation || t !== this.m_upperTranslation) && (this.m_bodyA.SetAwake(!0), this.m_bodyB.SetAwake(!0), this.m_lowerTranslation = e, this.m_upperTranslation = t, this.m_lowerImpulse = 0, this.m_upperImpulse = 0);
	}
	IsMotorEnabled() {
		return this.m_enableMotor;
	}
	EnableMotor(e) {
		e !== this.m_enableMotor && (this.m_bodyA.SetAwake(!0), this.m_bodyB.SetAwake(!0), this.m_enableMotor = e);
	}
	SetMotorSpeed(e) {
		e !== this.m_motorSpeed && (this.m_bodyA.SetAwake(!0), this.m_bodyB.SetAwake(!0), this.m_motorSpeed = e);
	}
	GetMotorSpeed() {
		return this.m_motorSpeed;
	}
	SetMaxMotorForce(e) {
		e !== this.m_maxMotorForce && (this.m_bodyA.SetAwake(!0), this.m_bodyB.SetAwake(!0), this.m_maxMotorForce = e);
	}
	GetMaxMotorForce() {
		return this.m_maxMotorForce;
	}
	GetMotorForce(e) {
		return e * this.m_motorImpulse;
	}
	Dump(e) {
		let t = this.m_bodyA.m_islandIndex, n = this.m_bodyB.m_islandIndex;
		e("  const jd: b2PrismaticJointDef = new b2PrismaticJointDef();\n"), e("  jd.bodyA = bodies[%d];\n", t), e("  jd.bodyB = bodies[%d];\n", n), e("  jd.collideConnected = %s;\n", this.m_collideConnected ? "true" : "false"), e("  jd.localAnchorA.Set(%.15f, %.15f);\n", this.m_localAnchorA.x, this.m_localAnchorA.y), e("  jd.localAnchorB.Set(%.15f, %.15f);\n", this.m_localAnchorB.x, this.m_localAnchorB.y), e("  jd.localAxisA.Set(%.15f, %.15f);\n", this.m_localXAxisA.x, this.m_localXAxisA.y), e("  jd.referenceAngle = %.15f;\n", this.m_referenceAngle), e("  jd.enableLimit = %s;\n", this.m_enableLimit ? "true" : "false"), e("  jd.lowerTranslation = %.15f;\n", this.m_lowerTranslation), e("  jd.upperTranslation = %.15f;\n", this.m_upperTranslation), e("  jd.enableMotor = %s;\n", this.m_enableMotor ? "true" : "false"), e("  jd.motorSpeed = %.15f;\n", this.m_motorSpeed), e("  jd.maxMotorForce = %.15f;\n", this.m_maxMotorForce), e("  joints[%d] = this.m_world.CreateJoint(jd);\n", this.m_index);
	}
	static Draw_s_pA = new M();
	static Draw_s_pB = new M();
	static Draw_s_axis = new M();
	static Draw_s_c1 = new e(.7, .7, .7);
	static Draw_s_c2 = new e(.3, .9, .3);
	static Draw_s_c3 = new e(.9, .3, .3);
	static Draw_s_c4 = new e(.3, .3, .9);
	static Draw_s_c5 = new e(.4, .4, .4);
	static Draw_s_lower = new M();
	static Draw_s_upper = new M();
	static Draw_s_perp = new M();
	Draw(e) {
		let n = this.m_bodyA.GetTransform(), r = this.m_bodyB.GetTransform(), i = I.MulXV(n, this.m_localAnchorA, t.Draw_s_pA), a = I.MulXV(r, this.m_localAnchorB, t.Draw_s_pB), o = F.MulRV(n.q, this.m_localXAxisA, t.Draw_s_axis), s = t.Draw_s_c1, c = t.Draw_s_c2, l = t.Draw_s_c3, u = t.Draw_s_c4, d = t.Draw_s_c5;
		if (e.DrawSegment(i, a, d), this.m_enableLimit) {
			let r = M.AddVMulSV(i, this.m_lowerTranslation, o, t.Draw_s_lower), a = M.AddVMulSV(i, this.m_upperTranslation, o, t.Draw_s_upper), u = F.MulRV(n.q, this.m_localYAxisA, t.Draw_s_perp);
			e.DrawSegment(r, a, s), e.DrawSegment(M.AddVMulSV(r, -.5, u, M.s_t0), M.AddVMulSV(r, .5, u, M.s_t1), c), e.DrawSegment(M.AddVMulSV(a, -.5, u, M.s_t0), M.AddVMulSV(a, .5, u, M.s_t1), l);
		} else e.DrawSegment(M.AddVMulSV(i, -1, o, M.s_t0), M.AddVMulSV(i, 1, o, M.s_t1), s);
		e.DrawPoint(i, 5, s), e.DrawPoint(a, 5, u);
	}
}, Sr = class e extends q {
	m_groundAnchorA = new M();
	m_groundAnchorB = new M();
	m_lengthA = 0;
	m_lengthB = 0;
	m_localAnchorA = new M();
	m_localAnchorB = new M();
	m_constant = 0;
	m_ratio = 0;
	m_impulse = 0;
	m_indexA = 0;
	m_indexB = 0;
	m_uA = new M();
	m_uB = new M();
	m_rA = new M();
	m_rB = new M();
	m_localCenterA = new M();
	m_localCenterB = new M();
	m_invMassA = 0;
	m_invMassB = 0;
	m_invIA = 0;
	m_invIB = 0;
	m_mass = 0;
	m_qA = new F();
	m_qB = new F();
	m_lalcA = new M();
	m_lalcB = new M();
	constructor(e) {
		super(e), this.m_groundAnchorA.Copy(r(e.groundAnchorA, new M(-1, 1))), this.m_groundAnchorB.Copy(r(e.groundAnchorB, new M(1, 0))), this.m_localAnchorA.Copy(r(e.localAnchorA, new M(-1, 0))), this.m_localAnchorB.Copy(r(e.localAnchorB, new M(1, 0))), this.m_lengthA = r(e.lengthA, 0), this.m_lengthB = r(e.lengthB, 0), this.m_ratio = r(e.ratio, 1), this.m_constant = r(e.lengthA, 0) + this.m_ratio * r(e.lengthB, 0), this.m_impulse = 0;
	}
	static InitVelocityConstraints_s_PA = new M();
	static InitVelocityConstraints_s_PB = new M();
	InitVelocityConstraints(t) {
		this.m_indexA = this.m_bodyA.m_islandIndex, this.m_indexB = this.m_bodyB.m_islandIndex, this.m_localCenterA.Copy(this.m_bodyA.m_sweep.localCenter), this.m_localCenterB.Copy(this.m_bodyB.m_sweep.localCenter), this.m_invMassA = this.m_bodyA.m_invMass, this.m_invMassB = this.m_bodyB.m_invMass, this.m_invIA = this.m_bodyA.m_invI, this.m_invIB = this.m_bodyB.m_invI;
		let n = t.positions[this.m_indexA].c, r = t.positions[this.m_indexA].a, i = t.velocities[this.m_indexA].v, a = t.velocities[this.m_indexA].w, o = t.positions[this.m_indexB].c, s = t.positions[this.m_indexB].a, c = t.velocities[this.m_indexB].v, l = t.velocities[this.m_indexB].w, u = this.m_qA.SetAngle(r), d = this.m_qB.SetAngle(s);
		M.SubVV(this.m_localAnchorA, this.m_localCenterA, this.m_lalcA), F.MulRV(u, this.m_lalcA, this.m_rA), M.SubVV(this.m_localAnchorB, this.m_localCenterB, this.m_lalcB), F.MulRV(d, this.m_lalcB, this.m_rB), this.m_uA.Copy(n).SelfAdd(this.m_rA).SelfSub(this.m_groundAnchorA), this.m_uB.Copy(o).SelfAdd(this.m_rB).SelfSub(this.m_groundAnchorB);
		let f = this.m_uA.Length(), p = this.m_uB.Length();
		f > .05 ? this.m_uA.SelfMul(1 / f) : this.m_uA.SetZero(), p > .05 ? this.m_uB.SelfMul(1 / p) : this.m_uB.SetZero();
		let m = M.CrossVV(this.m_rA, this.m_uA), h = M.CrossVV(this.m_rB, this.m_uB), g = this.m_invMassA + this.m_invIA * m * m, _ = this.m_invMassB + this.m_invIB * h * h;
		if (this.m_mass = g + this.m_ratio * this.m_ratio * _, this.m_mass > 0 && (this.m_mass = 1 / this.m_mass), t.step.warmStarting) {
			this.m_impulse *= t.step.dtRatio;
			let n = M.MulSV(-this.m_impulse, this.m_uA, e.InitVelocityConstraints_s_PA), r = M.MulSV(-this.m_ratio * this.m_impulse, this.m_uB, e.InitVelocityConstraints_s_PB);
			i.SelfMulAdd(this.m_invMassA, n), a += this.m_invIA * M.CrossVV(this.m_rA, n), c.SelfMulAdd(this.m_invMassB, r), l += this.m_invIB * M.CrossVV(this.m_rB, r);
		} else this.m_impulse = 0;
		t.velocities[this.m_indexA].w = a, t.velocities[this.m_indexB].w = l;
	}
	static SolveVelocityConstraints_s_vpA = new M();
	static SolveVelocityConstraints_s_vpB = new M();
	static SolveVelocityConstraints_s_PA = new M();
	static SolveVelocityConstraints_s_PB = new M();
	SolveVelocityConstraints(t) {
		let n = t.velocities[this.m_indexA].v, r = t.velocities[this.m_indexA].w, i = t.velocities[this.m_indexB].v, a = t.velocities[this.m_indexB].w, o = M.AddVCrossSV(n, r, this.m_rA, e.SolveVelocityConstraints_s_vpA), s = M.AddVCrossSV(i, a, this.m_rB, e.SolveVelocityConstraints_s_vpB), c = -M.DotVV(this.m_uA, o) - this.m_ratio * M.DotVV(this.m_uB, s), l = -this.m_mass * c;
		this.m_impulse += l;
		let u = M.MulSV(-l, this.m_uA, e.SolveVelocityConstraints_s_PA), d = M.MulSV(-this.m_ratio * l, this.m_uB, e.SolveVelocityConstraints_s_PB);
		n.SelfMulAdd(this.m_invMassA, u), r += this.m_invIA * M.CrossVV(this.m_rA, u), i.SelfMulAdd(this.m_invMassB, d), a += this.m_invIB * M.CrossVV(this.m_rB, d), t.velocities[this.m_indexA].w = r, t.velocities[this.m_indexB].w = a;
	}
	static SolvePositionConstraints_s_PA = new M();
	static SolvePositionConstraints_s_PB = new M();
	SolvePositionConstraints(t) {
		let n = t.positions[this.m_indexA].c, r = t.positions[this.m_indexA].a, i = t.positions[this.m_indexB].c, a = t.positions[this.m_indexB].a, o = this.m_qA.SetAngle(r), s = this.m_qB.SetAngle(a);
		M.SubVV(this.m_localAnchorA, this.m_localCenterA, this.m_lalcA);
		let l = F.MulRV(o, this.m_lalcA, this.m_rA);
		M.SubVV(this.m_localAnchorB, this.m_localCenterB, this.m_lalcB);
		let u = F.MulRV(s, this.m_lalcB, this.m_rB), d = this.m_uA.Copy(n).SelfAdd(l).SelfSub(this.m_groundAnchorA), f = this.m_uB.Copy(i).SelfAdd(u).SelfSub(this.m_groundAnchorB), p = d.Length(), m = f.Length();
		p > .05 ? d.SelfMul(1 / p) : d.SetZero(), m > .05 ? f.SelfMul(1 / m) : f.SetZero();
		let h = M.CrossVV(l, d), g = M.CrossVV(u, f), _ = this.m_invMassA + this.m_invIA * h * h, v = this.m_invMassB + this.m_invIB * g * g, y = _ + this.m_ratio * this.m_ratio * v;
		y > 0 && (y = 1 / y);
		let b = this.m_constant - p - this.m_ratio * m, x = E(b), S = -y * b, C = M.MulSV(-S, d, e.SolvePositionConstraints_s_PA), w = M.MulSV(-this.m_ratio * S, f, e.SolvePositionConstraints_s_PB);
		return n.SelfMulAdd(this.m_invMassA, C), r += this.m_invIA * M.CrossVV(l, C), i.SelfMulAdd(this.m_invMassB, w), a += this.m_invIB * M.CrossVV(u, w), t.positions[this.m_indexA].a = r, t.positions[this.m_indexB].a = a, x < c;
	}
	GetAnchorA(e) {
		return this.m_bodyA.GetWorldPoint(this.m_localAnchorA, e);
	}
	GetAnchorB(e) {
		return this.m_bodyB.GetWorldPoint(this.m_localAnchorB, e);
	}
	GetReactionForce(e, t) {
		return t.x = e * this.m_impulse * this.m_uB.x, t.y = e * this.m_impulse * this.m_uB.y, t;
	}
	GetReactionTorque(e) {
		return 0;
	}
	GetGroundAnchorA() {
		return this.m_groundAnchorA;
	}
	GetGroundAnchorB() {
		return this.m_groundAnchorB;
	}
	GetLengthA() {
		return this.m_lengthA;
	}
	GetLengthB() {
		return this.m_lengthB;
	}
	GetRatio() {
		return this.m_ratio;
	}
	static GetCurrentLengthA_s_p = new M();
	GetCurrentLengthA() {
		let t = this.m_bodyA.GetWorldPoint(this.m_localAnchorA, e.GetCurrentLengthA_s_p), n = this.m_groundAnchorA;
		return M.DistanceVV(t, n);
	}
	static GetCurrentLengthB_s_p = new M();
	GetCurrentLengthB() {
		let t = this.m_bodyB.GetWorldPoint(this.m_localAnchorB, e.GetCurrentLengthB_s_p), n = this.m_groundAnchorB;
		return M.DistanceVV(t, n);
	}
	Dump(e) {
		let t = this.m_bodyA.m_islandIndex, n = this.m_bodyB.m_islandIndex;
		e("  const jd: b2PulleyJointDef = new b2PulleyJointDef();\n"), e("  jd.bodyA = bodies[%d];\n", t), e("  jd.bodyB = bodies[%d];\n", n), e("  jd.collideConnected = %s;\n", this.m_collideConnected ? "true" : "false"), e("  jd.groundAnchorA.Set(%.15f, %.15f);\n", this.m_groundAnchorA.x, this.m_groundAnchorA.y), e("  jd.groundAnchorB.Set(%.15f, %.15f);\n", this.m_groundAnchorB.x, this.m_groundAnchorB.y), e("  jd.localAnchorA.Set(%.15f, %.15f);\n", this.m_localAnchorA.x, this.m_localAnchorA.y), e("  jd.localAnchorB.Set(%.15f, %.15f);\n", this.m_localAnchorB.x, this.m_localAnchorB.y), e("  jd.lengthA = %.15f;\n", this.m_lengthA), e("  jd.lengthB = %.15f;\n", this.m_lengthB), e("  jd.ratio = %.15f;\n", this.m_ratio), e("  joints[%d] = this.m_world.CreateJoint(jd);\n", this.m_index);
	}
	ShiftOrigin(e) {
		this.m_groundAnchorA.SelfSub(e), this.m_groundAnchorB.SelfSub(e);
	}
}, Cr = class t extends q {
	m_localAnchorA = new M();
	m_localAnchorB = new M();
	m_impulse = new M();
	m_motorImpulse = 0;
	m_lowerImpulse = 0;
	m_upperImpulse = 0;
	m_enableMotor = !1;
	m_maxMotorTorque = 0;
	m_motorSpeed = 0;
	m_enableLimit = !1;
	m_referenceAngle = 0;
	m_lowerAngle = 0;
	m_upperAngle = 0;
	m_indexA = 0;
	m_indexB = 0;
	m_rA = new M();
	m_rB = new M();
	m_localCenterA = new M();
	m_localCenterB = new M();
	m_invMassA = 0;
	m_invMassB = 0;
	m_invIA = 0;
	m_invIB = 0;
	m_K = new P();
	m_angle = 0;
	m_axialMass = 0;
	m_qA = new F();
	m_qB = new F();
	m_lalcA = new M();
	m_lalcB = new M();
	constructor(e) {
		super(e), this.m_localAnchorA.Copy(r(e.localAnchorA, M.ZERO)), this.m_localAnchorB.Copy(r(e.localAnchorB, M.ZERO)), this.m_referenceAngle = r(e.referenceAngle, 0), this.m_impulse.SetZero(), this.m_motorImpulse = 0, this.m_lowerAngle = r(e.lowerAngle, 0), this.m_upperAngle = r(e.upperAngle, 0), this.m_maxMotorTorque = r(e.maxMotorTorque, 0), this.m_motorSpeed = r(e.motorSpeed, 0), this.m_enableLimit = r(e.enableLimit, !1), this.m_enableMotor = r(e.enableMotor, !1);
	}
	static InitVelocityConstraints_s_P = new M();
	InitVelocityConstraints(e) {
		this.m_indexA = this.m_bodyA.m_islandIndex, this.m_indexB = this.m_bodyB.m_islandIndex, this.m_localCenterA.Copy(this.m_bodyA.m_sweep.localCenter), this.m_localCenterB.Copy(this.m_bodyB.m_sweep.localCenter), this.m_invMassA = this.m_bodyA.m_invMass, this.m_invMassB = this.m_bodyB.m_invMass, this.m_invIA = this.m_bodyA.m_invI, this.m_invIB = this.m_bodyB.m_invI;
		let n = e.positions[this.m_indexA].a, r = e.velocities[this.m_indexA].v, i = e.velocities[this.m_indexA].w, a = e.positions[this.m_indexB].a, o = e.velocities[this.m_indexB].v, s = e.velocities[this.m_indexB].w, c = this.m_qA.SetAngle(n), l = this.m_qB.SetAngle(a);
		M.SubVV(this.m_localAnchorA, this.m_localCenterA, this.m_lalcA), F.MulRV(c, this.m_lalcA, this.m_rA), M.SubVV(this.m_localAnchorB, this.m_localCenterB, this.m_lalcB), F.MulRV(l, this.m_lalcB, this.m_rB);
		let u = this.m_invMassA, d = this.m_invMassB, f = this.m_invIA, p = this.m_invIB;
		this.m_K.ex.x = u + d + this.m_rA.y * this.m_rA.y * f + this.m_rB.y * this.m_rB.y * p, this.m_K.ey.x = -this.m_rA.y * this.m_rA.x * f - this.m_rB.y * this.m_rB.x * p, this.m_K.ex.y = this.m_K.ey.x, this.m_K.ey.y = u + d + this.m_rA.x * this.m_rA.x * f + this.m_rB.x * this.m_rB.x * p, this.m_axialMass = f + p;
		let m;
		if (this.m_axialMass > 0 ? (this.m_axialMass = 1 / this.m_axialMass, m = !1) : m = !0, this.m_angle = a - n - this.m_referenceAngle, (this.m_enableLimit === !1 || m) && (this.m_lowerImpulse = 0, this.m_upperImpulse = 0), (this.m_enableMotor === !1 || m) && (this.m_motorImpulse = 0), e.step.warmStarting) {
			this.m_impulse.SelfMul(e.step.dtRatio), this.m_motorImpulse *= e.step.dtRatio, this.m_lowerImpulse *= e.step.dtRatio, this.m_upperImpulse *= e.step.dtRatio;
			let n = this.m_motorImpulse + this.m_lowerImpulse - this.m_upperImpulse, a = t.InitVelocityConstraints_s_P.Set(this.m_impulse.x, this.m_impulse.y);
			r.SelfMulSub(u, a), i -= f * (M.CrossVV(this.m_rA, a) + n), o.SelfMulAdd(d, a), s += p * (M.CrossVV(this.m_rB, a) + n);
		} else this.m_impulse.SetZero(), this.m_motorImpulse = 0, this.m_lowerImpulse = 0, this.m_upperImpulse = 0;
		e.velocities[this.m_indexA].w = i, e.velocities[this.m_indexB].w = s;
	}
	static SolveVelocityConstraints_s_Cdot_v2 = new M();
	static SolveVelocityConstraints_s_impulse_v2 = new M();
	SolveVelocityConstraints(e) {
		let n = e.velocities[this.m_indexA].v, r = e.velocities[this.m_indexA].w, i = e.velocities[this.m_indexB].v, a = e.velocities[this.m_indexB].w, o = this.m_invMassA, s = this.m_invMassB, c = this.m_invIA, l = this.m_invIB, u = c + l === 0;
		if (this.m_enableMotor && !u) {
			let t = a - r - this.m_motorSpeed, n = -this.m_axialMass * t, i = this.m_motorImpulse, o = e.step.dt * this.m_maxMotorTorque;
			this.m_motorImpulse = k(this.m_motorImpulse + n, -o, o), n = this.m_motorImpulse - i, r -= c * n, a += l * n;
		}
		if (this.m_enableLimit && !u) {
			{
				let t = this.m_angle - this.m_lowerAngle, n = a - r, i = -this.m_axialMass * (n + O(t, 0) * e.step.inv_dt), o = this.m_lowerImpulse;
				this.m_lowerImpulse = O(this.m_lowerImpulse + i, 0), i = this.m_lowerImpulse - o, r -= c * i, a += l * i;
			}
			{
				let t = this.m_upperAngle - this.m_angle, n = r - a, i = -this.m_axialMass * (n + O(t, 0) * e.step.inv_dt), o = this.m_upperImpulse;
				this.m_upperImpulse = O(this.m_upperImpulse + i, 0), i = this.m_upperImpulse - o, r += c * i, a -= l * i;
			}
		}
		{
			let e = M.SubVV(M.AddVCrossSV(i, a, this.m_rB, M.s_t0), M.AddVCrossSV(n, r, this.m_rA, M.s_t1), t.SolveVelocityConstraints_s_Cdot_v2), u = this.m_K.Solve(-e.x, -e.y, t.SolveVelocityConstraints_s_impulse_v2);
			this.m_impulse.x += u.x, this.m_impulse.y += u.y, n.SelfMulSub(o, u), r -= c * M.CrossVV(this.m_rA, u), i.SelfMulAdd(s, u), a += l * M.CrossVV(this.m_rB, u);
		}
		e.velocities[this.m_indexA].w = r, e.velocities[this.m_indexB].w = a;
	}
	static SolvePositionConstraints_s_C_v2 = new M();
	static SolvePositionConstraints_s_impulse = new M();
	SolvePositionConstraints(e) {
		let n = e.positions[this.m_indexA].c, r = e.positions[this.m_indexA].a, i = e.positions[this.m_indexB].c, a = e.positions[this.m_indexB].a, o = this.m_qA.SetAngle(r), s = this.m_qB.SetAngle(a), c = 0, u = 0, d = this.m_invIA + this.m_invIB === 0;
		if (this.m_enableLimit && !d) {
			let e = a - r - this.m_referenceAngle, t = 0;
			E(this.m_upperAngle - this.m_lowerAngle) < .06981317007977778 ? t = k(e - this.m_lowerAngle, -f, f) : e <= this.m_lowerAngle ? t = k(e - this.m_lowerAngle + l, -f, 0) : e >= this.m_upperAngle && (t = k(e - this.m_upperAngle - l, 0, f));
			let n = -this.m_axialMass * t;
			r -= this.m_invIA * n, a += this.m_invIB * n, c = E(t);
		}
		{
			o.SetAngle(r), s.SetAngle(a), M.SubVV(this.m_localAnchorA, this.m_localCenterA, this.m_lalcA);
			let e = F.MulRV(o, this.m_lalcA, this.m_rA);
			M.SubVV(this.m_localAnchorB, this.m_localCenterB, this.m_lalcB);
			let c = F.MulRV(s, this.m_lalcB, this.m_rB), l = M.SubVV(M.AddVV(i, c, M.s_t0), M.AddVV(n, e, M.s_t1), t.SolvePositionConstraints_s_C_v2);
			u = l.Length();
			let d = this.m_invMassA, f = this.m_invMassB, p = this.m_invIA, m = this.m_invIB, h = this.m_K;
			h.ex.x = d + f + p * e.y * e.y + m * c.y * c.y, h.ex.y = -p * e.x * e.y - m * c.x * c.y, h.ey.x = h.ex.y, h.ey.y = d + f + p * e.x * e.x + m * c.x * c.x;
			let g = h.Solve(l.x, l.y, t.SolvePositionConstraints_s_impulse).SelfNeg();
			n.SelfMulSub(d, g), r -= p * M.CrossVV(e, g), i.SelfMulAdd(f, g), a += m * M.CrossVV(c, g);
		}
		return e.positions[this.m_indexA].a = r, e.positions[this.m_indexB].a = a, u <= .005 && c <= .03490658503988889;
	}
	GetAnchorA(e) {
		return this.m_bodyA.GetWorldPoint(this.m_localAnchorA, e);
	}
	GetAnchorB(e) {
		return this.m_bodyB.GetWorldPoint(this.m_localAnchorB, e);
	}
	GetReactionForce(e, t) {
		return t.x = e * this.m_impulse.x, t.y = e * this.m_impulse.y, t;
	}
	GetReactionTorque(e) {
		return e * (this.m_lowerImpulse - this.m_upperImpulse);
	}
	GetLocalAnchorA() {
		return this.m_localAnchorA;
	}
	GetLocalAnchorB() {
		return this.m_localAnchorB;
	}
	GetReferenceAngle() {
		return this.m_referenceAngle;
	}
	GetJointAngle() {
		return this.m_bodyB.m_sweep.a - this.m_bodyA.m_sweep.a - this.m_referenceAngle;
	}
	GetJointSpeed() {
		return this.m_bodyB.m_angularVelocity - this.m_bodyA.m_angularVelocity;
	}
	IsMotorEnabled() {
		return this.m_enableMotor;
	}
	EnableMotor(e) {
		e !== this.m_enableMotor && (this.m_bodyA.SetAwake(!0), this.m_bodyB.SetAwake(!0), this.m_enableMotor = e);
	}
	GetMotorTorque(e) {
		return e * this.m_motorImpulse;
	}
	GetMotorSpeed() {
		return this.m_motorSpeed;
	}
	SetMaxMotorTorque(e) {
		e !== this.m_maxMotorTorque && (this.m_bodyA.SetAwake(!0), this.m_bodyB.SetAwake(!0), this.m_maxMotorTorque = e);
	}
	GetMaxMotorTorque() {
		return this.m_maxMotorTorque;
	}
	IsLimitEnabled() {
		return this.m_enableLimit;
	}
	EnableLimit(e) {
		e !== this.m_enableLimit && (this.m_bodyA.SetAwake(!0), this.m_bodyB.SetAwake(!0), this.m_enableLimit = e, this.m_lowerImpulse = 0, this.m_upperImpulse = 0);
	}
	GetLowerLimit() {
		return this.m_lowerAngle;
	}
	GetUpperLimit() {
		return this.m_upperAngle;
	}
	SetLimits(e, t) {
		(e !== this.m_lowerAngle || t !== this.m_upperAngle) && (this.m_bodyA.SetAwake(!0), this.m_bodyB.SetAwake(!0), this.m_lowerImpulse = 0, this.m_upperImpulse = 0, this.m_lowerAngle = e, this.m_upperAngle = t);
	}
	SetMotorSpeed(e) {
		e !== this.m_motorSpeed && (this.m_bodyA.SetAwake(!0), this.m_bodyB.SetAwake(!0), this.m_motorSpeed = e);
	}
	Dump(e) {
		let t = this.m_bodyA.m_islandIndex, n = this.m_bodyB.m_islandIndex;
		e("  const jd: b2RevoluteJointDef = new b2RevoluteJointDef();\n"), e("  jd.bodyA = bodies[%d];\n", t), e("  jd.bodyB = bodies[%d];\n", n), e("  jd.collideConnected = %s;\n", this.m_collideConnected ? "true" : "false"), e("  jd.localAnchorA.Set(%.15f, %.15f);\n", this.m_localAnchorA.x, this.m_localAnchorA.y), e("  jd.localAnchorB.Set(%.15f, %.15f);\n", this.m_localAnchorB.x, this.m_localAnchorB.y), e("  jd.referenceAngle = %.15f;\n", this.m_referenceAngle), e("  jd.enableLimit = %s;\n", this.m_enableLimit ? "true" : "false"), e("  jd.lowerAngle = %.15f;\n", this.m_lowerAngle), e("  jd.upperAngle = %.15f;\n", this.m_upperAngle), e("  jd.enableMotor = %s;\n", this.m_enableMotor ? "true" : "false"), e("  jd.motorSpeed = %.15f;\n", this.m_motorSpeed), e("  jd.maxMotorTorque = %.15f;\n", this.m_maxMotorTorque), e("  joints[%d] = this.m_world.CreateJoint(jd);\n", this.m_index);
	}
	static Draw_s_pA = new M();
	static Draw_s_pB = new M();
	static Draw_s_c1 = new e(.7, .7, .7);
	static Draw_s_c2 = new e(.3, .9, .3);
	static Draw_s_c3 = new e(.9, .3, .3);
	static Draw_s_c4 = new e(.3, .3, .9);
	static Draw_s_c5 = new e(.4, .4, .4);
	static Draw_s_color_ = new e(.5, .8, .8);
	static Draw_s_r = new M();
	static Draw_s_rlo = new M();
	static Draw_s_rhi = new M();
	Draw(e) {
		let n = this.m_bodyA.GetTransform(), r = this.m_bodyB.GetTransform(), i = I.MulXV(n, this.m_localAnchorA, t.Draw_s_pA), a = I.MulXV(r, this.m_localAnchorB, t.Draw_s_pB), o = t.Draw_s_c1, s = t.Draw_s_c2, c = t.Draw_s_c3, l = t.Draw_s_c4, u = t.Draw_s_c5;
		e.DrawPoint(i, 5, l), e.DrawPoint(a, 5, u);
		let d = this.m_bodyA.GetAngle(), f = this.m_bodyB.GetAngle() - d - this.m_referenceAngle, p = .5, m = t.Draw_s_r.Set(p * Math.cos(f), p * Math.sin(f));
		if (e.DrawSegment(a, M.AddVV(a, m, M.s_t0), o), e.DrawCircle(a, p, o), this.m_enableLimit) {
			let n = t.Draw_s_rlo.Set(p * Math.cos(this.m_lowerAngle), p * Math.sin(this.m_lowerAngle)), r = t.Draw_s_rhi.Set(p * Math.cos(this.m_upperAngle), p * Math.sin(this.m_upperAngle));
			e.DrawSegment(a, M.AddVV(a, n, M.s_t0), s), e.DrawSegment(a, M.AddVV(a, r, M.s_t0), c);
		}
		let h = t.Draw_s_color_;
		e.DrawSegment(n.p, i, h), e.DrawSegment(i, a, h), e.DrawSegment(r.p, a, h);
	}
}, wr = class e extends q {
	m_stiffness = 0;
	m_damping = 0;
	m_bias = 0;
	m_localAnchorA = new M();
	m_localAnchorB = new M();
	m_referenceAngle = 0;
	m_gamma = 0;
	m_impulse = new N(0, 0, 0);
	m_indexA = 0;
	m_indexB = 0;
	m_rA = new M();
	m_rB = new M();
	m_localCenterA = new M();
	m_localCenterB = new M();
	m_invMassA = 0;
	m_invMassB = 0;
	m_invIA = 0;
	m_invIB = 0;
	m_mass = new ie();
	m_qA = new F();
	m_qB = new F();
	m_lalcA = new M();
	m_lalcB = new M();
	m_K = new ie();
	constructor(e) {
		super(e), this.m_stiffness = r(e.stiffness, 0), this.m_damping = r(e.damping, 0), this.m_localAnchorA.Copy(r(e.localAnchorA, M.ZERO)), this.m_localAnchorB.Copy(r(e.localAnchorB, M.ZERO)), this.m_referenceAngle = r(e.referenceAngle, 0), this.m_impulse.SetZero();
	}
	static InitVelocityConstraints_s_P = new M();
	InitVelocityConstraints(t) {
		this.m_indexA = this.m_bodyA.m_islandIndex, this.m_indexB = this.m_bodyB.m_islandIndex, this.m_localCenterA.Copy(this.m_bodyA.m_sweep.localCenter), this.m_localCenterB.Copy(this.m_bodyB.m_sweep.localCenter), this.m_invMassA = this.m_bodyA.m_invMass, this.m_invMassB = this.m_bodyB.m_invMass, this.m_invIA = this.m_bodyA.m_invI, this.m_invIB = this.m_bodyB.m_invI;
		let n = t.positions[this.m_indexA].a, r = t.velocities[this.m_indexA].v, i = t.velocities[this.m_indexA].w, a = t.positions[this.m_indexB].a, o = t.velocities[this.m_indexB].v, s = t.velocities[this.m_indexB].w, c = this.m_qA.SetAngle(n), l = this.m_qB.SetAngle(a);
		M.SubVV(this.m_localAnchorA, this.m_localCenterA, this.m_lalcA), F.MulRV(c, this.m_lalcA, this.m_rA), M.SubVV(this.m_localAnchorB, this.m_localCenterB, this.m_lalcB), F.MulRV(l, this.m_lalcB, this.m_rB);
		let u = this.m_invMassA, d = this.m_invMassB, f = this.m_invIA, p = this.m_invIB, m = this.m_K;
		if (m.ex.x = u + d + this.m_rA.y * this.m_rA.y * f + this.m_rB.y * this.m_rB.y * p, m.ey.x = -this.m_rA.y * this.m_rA.x * f - this.m_rB.y * this.m_rB.x * p, m.ez.x = -this.m_rA.y * f - this.m_rB.y * p, m.ex.y = m.ey.x, m.ey.y = u + d + this.m_rA.x * this.m_rA.x * f + this.m_rB.x * this.m_rB.x * p, m.ez.y = this.m_rA.x * f + this.m_rB.x * p, m.ex.z = m.ez.x, m.ey.z = m.ez.y, m.ez.z = f + p, this.m_stiffness > 0) {
			m.GetInverse22(this.m_mass);
			let e = f + p, r = a - n - this.m_referenceAngle, i = this.m_damping, o = this.m_stiffness, s = t.step.dt;
			this.m_gamma = s * (i + s * o), this.m_gamma = this.m_gamma === 0 ? 0 : 1 / this.m_gamma, this.m_bias = r * s * o * this.m_gamma, e += this.m_gamma, this.m_mass.ez.z = e === 0 ? 0 : 1 / e;
		} else m.GetSymInverse33(this.m_mass), this.m_gamma = 0, this.m_bias = 0;
		if (t.step.warmStarting) {
			this.m_impulse.SelfMul(t.step.dtRatio);
			let n = e.InitVelocityConstraints_s_P.Set(this.m_impulse.x, this.m_impulse.y);
			r.SelfMulSub(u, n), i -= f * (M.CrossVV(this.m_rA, n) + this.m_impulse.z), o.SelfMulAdd(d, n), s += p * (M.CrossVV(this.m_rB, n) + this.m_impulse.z);
		} else this.m_impulse.SetZero();
		t.velocities[this.m_indexA].w = i, t.velocities[this.m_indexB].w = s;
	}
	static SolveVelocityConstraints_s_Cdot1 = new M();
	static SolveVelocityConstraints_s_impulse1 = new M();
	static SolveVelocityConstraints_s_impulse = new N();
	static SolveVelocityConstraints_s_P = new M();
	SolveVelocityConstraints(t) {
		let n = t.velocities[this.m_indexA].v, r = t.velocities[this.m_indexA].w, i = t.velocities[this.m_indexB].v, a = t.velocities[this.m_indexB].w, o = this.m_invMassA, s = this.m_invMassB, c = this.m_invIA, l = this.m_invIB;
		if (this.m_stiffness > 0) {
			let t = a - r, u = -this.m_mass.ez.z * (t + this.m_bias + this.m_gamma * this.m_impulse.z);
			this.m_impulse.z += u, r -= c * u, a += l * u;
			let d = M.SubVV(M.AddVCrossSV(i, a, this.m_rB, M.s_t0), M.AddVCrossSV(n, r, this.m_rA, M.s_t1), e.SolveVelocityConstraints_s_Cdot1), f = ie.MulM33XY(this.m_mass, d.x, d.y, e.SolveVelocityConstraints_s_impulse1).SelfNeg();
			this.m_impulse.x += f.x, this.m_impulse.y += f.y;
			let p = f;
			n.SelfMulSub(o, p), r -= c * M.CrossVV(this.m_rA, p), i.SelfMulAdd(s, p), a += l * M.CrossVV(this.m_rB, p);
		} else {
			let t = M.SubVV(M.AddVCrossSV(i, a, this.m_rB, M.s_t0), M.AddVCrossSV(n, r, this.m_rA, M.s_t1), e.SolveVelocityConstraints_s_Cdot1), u = a - r, d = ie.MulM33XYZ(this.m_mass, t.x, t.y, u, e.SolveVelocityConstraints_s_impulse).SelfNeg();
			this.m_impulse.SelfAdd(d);
			let f = e.SolveVelocityConstraints_s_P.Set(d.x, d.y);
			n.SelfMulSub(o, f), r -= c * (M.CrossVV(this.m_rA, f) + d.z), i.SelfMulAdd(s, f), a += l * (M.CrossVV(this.m_rB, f) + d.z);
		}
		t.velocities[this.m_indexA].w = r, t.velocities[this.m_indexB].w = a;
	}
	static SolvePositionConstraints_s_C1 = new M();
	static SolvePositionConstraints_s_P = new M();
	static SolvePositionConstraints_s_impulse = new N();
	SolvePositionConstraints(t) {
		let n = t.positions[this.m_indexA].c, r = t.positions[this.m_indexA].a, i = t.positions[this.m_indexB].c, a = t.positions[this.m_indexB].a, o = this.m_qA.SetAngle(r), s = this.m_qB.SetAngle(a), c = this.m_invMassA, l = this.m_invMassB, u = this.m_invIA, d = this.m_invIB;
		M.SubVV(this.m_localAnchorA, this.m_localCenterA, this.m_lalcA);
		let f = F.MulRV(o, this.m_lalcA, this.m_rA);
		M.SubVV(this.m_localAnchorB, this.m_localCenterB, this.m_lalcB);
		let p = F.MulRV(s, this.m_lalcB, this.m_rB), m, h, g = this.m_K;
		if (g.ex.x = c + l + f.y * f.y * u + p.y * p.y * d, g.ey.x = -f.y * f.x * u - p.y * p.x * d, g.ez.x = -f.y * u - p.y * d, g.ex.y = g.ey.x, g.ey.y = c + l + f.x * f.x * u + p.x * p.x * d, g.ez.y = f.x * u + p.x * d, g.ex.z = g.ez.x, g.ey.z = g.ez.y, g.ez.z = u + d, this.m_stiffness > 0) {
			let t = M.SubVV(M.AddVV(i, p, M.s_t0), M.AddVV(n, f, M.s_t1), e.SolvePositionConstraints_s_C1);
			m = t.Length(), h = 0;
			let o = g.Solve22(t.x, t.y, e.SolvePositionConstraints_s_P).SelfNeg();
			n.SelfMulSub(c, o), r -= u * M.CrossVV(f, o), i.SelfMulAdd(l, o), a += d * M.CrossVV(p, o);
		} else {
			let t = M.SubVV(M.AddVV(i, p, M.s_t0), M.AddVV(n, f, M.s_t1), e.SolvePositionConstraints_s_C1), o = a - r - this.m_referenceAngle;
			m = t.Length(), h = E(o);
			let s = g.Solve33(t.x, t.y, o, e.SolvePositionConstraints_s_impulse).SelfNeg(), _ = e.SolvePositionConstraints_s_P.Set(s.x, s.y);
			n.SelfMulSub(c, _), r -= u * (M.CrossVV(this.m_rA, _) + s.z), i.SelfMulAdd(l, _), a += d * (M.CrossVV(this.m_rB, _) + s.z);
		}
		return t.positions[this.m_indexA].a = r, t.positions[this.m_indexB].a = a, m <= .005 && h <= .03490658503988889;
	}
	GetAnchorA(e) {
		return this.m_bodyA.GetWorldPoint(this.m_localAnchorA, e);
	}
	GetAnchorB(e) {
		return this.m_bodyB.GetWorldPoint(this.m_localAnchorB, e);
	}
	GetReactionForce(e, t) {
		return t.x = e * this.m_impulse.x, t.y = e * this.m_impulse.y, t;
	}
	GetReactionTorque(e) {
		return e * this.m_impulse.z;
	}
	GetLocalAnchorA() {
		return this.m_localAnchorA;
	}
	GetLocalAnchorB() {
		return this.m_localAnchorB;
	}
	GetReferenceAngle() {
		return this.m_referenceAngle;
	}
	SetStiffness(e) {
		this.m_stiffness = e;
	}
	GetStiffness() {
		return this.m_stiffness;
	}
	SetDamping(e) {
		this.m_damping = e;
	}
	GetDamping() {
		return this.m_damping;
	}
	Dump(e) {
		let t = this.m_bodyA.m_islandIndex, n = this.m_bodyB.m_islandIndex;
		e("  const jd: b2WeldJointDef = new b2WeldJointDef();\n"), e("  jd.bodyA = bodies[%d];\n", t), e("  jd.bodyB = bodies[%d];\n", n), e("  jd.collideConnected = %s;\n", this.m_collideConnected ? "true" : "false"), e("  jd.localAnchorA.Set(%.15f, %.15f);\n", this.m_localAnchorA.x, this.m_localAnchorA.y), e("  jd.localAnchorB.Set(%.15f, %.15f);\n", this.m_localAnchorB.x, this.m_localAnchorB.y), e("  jd.referenceAngle = %.15f;\n", this.m_referenceAngle), e("  jd.stiffness = %.15f;\n", this.m_stiffness), e("  jd.damping = %.15f;\n", this.m_damping), e("  joints[%d] = this.m_world.CreateJoint(jd);\n", this.m_index);
	}
}, Tr = class t extends q {
	m_localAnchorA = new M();
	m_localAnchorB = new M();
	m_localXAxisA = new M();
	m_localYAxisA = new M();
	m_impulse = 0;
	m_motorImpulse = 0;
	m_springImpulse = 0;
	m_lowerImpulse = 0;
	m_upperImpulse = 0;
	m_translation = 0;
	m_lowerTranslation = 0;
	m_upperTranslation = 0;
	m_maxMotorTorque = 0;
	m_motorSpeed = 0;
	m_enableLimit = !1;
	m_enableMotor = !1;
	m_stiffness = 0;
	m_damping = 0;
	m_indexA = 0;
	m_indexB = 0;
	m_localCenterA = new M();
	m_localCenterB = new M();
	m_invMassA = 0;
	m_invMassB = 0;
	m_invIA = 0;
	m_invIB = 0;
	m_ax = new M();
	m_ay = new M();
	m_sAx = 0;
	m_sBx = 0;
	m_sAy = 0;
	m_sBy = 0;
	m_mass = 0;
	m_motorMass = 0;
	m_axialMass = 0;
	m_springMass = 0;
	m_bias = 0;
	m_gamma = 0;
	m_qA = new F();
	m_qB = new F();
	m_lalcA = new M();
	m_lalcB = new M();
	m_rA = new M();
	m_rB = new M();
	constructor(e) {
		super(e), this.m_localAnchorA.Copy(r(e.localAnchorA, M.ZERO)), this.m_localAnchorB.Copy(r(e.localAnchorB, M.ZERO)), this.m_localXAxisA.Copy(r(e.localAxisA, M.UNITX)), M.CrossOneV(this.m_localXAxisA, this.m_localYAxisA), this.m_lowerTranslation = r(e.lowerTranslation, 0), this.m_upperTranslation = r(e.upperTranslation, 0), this.m_enableLimit = r(e.enableLimit, !1), this.m_maxMotorTorque = r(e.maxMotorTorque, 0), this.m_motorSpeed = r(e.motorSpeed, 0), this.m_enableMotor = r(e.enableMotor, !1), this.m_ax.SetZero(), this.m_ay.SetZero(), this.m_stiffness = r(e.stiffness, 0), this.m_damping = r(e.damping, 0);
	}
	GetMotorSpeed() {
		return this.m_motorSpeed;
	}
	GetMaxMotorTorque() {
		return this.m_maxMotorTorque;
	}
	SetSpringFrequencyHz(e) {
		this.m_stiffness = e;
	}
	GetSpringFrequencyHz() {
		return this.m_stiffness;
	}
	SetSpringDampingRatio(e) {
		this.m_damping = e;
	}
	GetSpringDampingRatio() {
		return this.m_damping;
	}
	static InitVelocityConstraints_s_d = new M();
	static InitVelocityConstraints_s_P = new M();
	InitVelocityConstraints(e) {
		this.m_indexA = this.m_bodyA.m_islandIndex, this.m_indexB = this.m_bodyB.m_islandIndex, this.m_localCenterA.Copy(this.m_bodyA.m_sweep.localCenter), this.m_localCenterB.Copy(this.m_bodyB.m_sweep.localCenter), this.m_invMassA = this.m_bodyA.m_invMass, this.m_invMassB = this.m_bodyB.m_invMass, this.m_invIA = this.m_bodyA.m_invI, this.m_invIB = this.m_bodyB.m_invI;
		let n = this.m_invMassA, r = this.m_invMassB, i = this.m_invIA, a = this.m_invIB, o = e.positions[this.m_indexA].c, s = e.positions[this.m_indexA].a, c = e.velocities[this.m_indexA].v, l = e.velocities[this.m_indexA].w, u = e.positions[this.m_indexB].c, d = e.positions[this.m_indexB].a, f = e.velocities[this.m_indexB].v, p = e.velocities[this.m_indexB].w, m = this.m_qA.SetAngle(s), h = this.m_qB.SetAngle(d);
		M.SubVV(this.m_localAnchorA, this.m_localCenterA, this.m_lalcA);
		let g = F.MulRV(m, this.m_lalcA, this.m_rA);
		M.SubVV(this.m_localAnchorB, this.m_localCenterB, this.m_lalcB);
		let _ = F.MulRV(h, this.m_lalcB, this.m_rB), v = M.SubVV(M.AddVV(u, _, M.s_t0), M.AddVV(o, g, M.s_t1), t.InitVelocityConstraints_s_d);
		F.MulRV(m, this.m_localYAxisA, this.m_ay), this.m_sAy = M.CrossVV(M.AddVV(v, g, M.s_t0), this.m_ay), this.m_sBy = M.CrossVV(_, this.m_ay), this.m_mass = n + r + i * this.m_sAy * this.m_sAy + a * this.m_sBy * this.m_sBy, this.m_mass > 0 && (this.m_mass = 1 / this.m_mass), F.MulRV(m, this.m_localXAxisA, this.m_ax), this.m_sAx = M.CrossVV(M.AddVV(v, g, M.s_t0), this.m_ax), this.m_sBx = M.CrossVV(_, this.m_ax);
		let y = n + r + i * this.m_sAx * this.m_sAx + a * this.m_sBx * this.m_sBx;
		if (this.m_axialMass = y > 0 ? 1 / y : 0, this.m_springMass = 0, this.m_bias = 0, this.m_gamma = 0, this.m_stiffness > 0 && y > 0) {
			this.m_springMass = 1 / y;
			let t = M.DotVV(v, this.m_ax), n = e.step.dt;
			this.m_gamma = n * (this.m_damping + n * this.m_stiffness), this.m_gamma > 0 && (this.m_gamma = 1 / this.m_gamma), this.m_bias = t * n * this.m_stiffness * this.m_gamma, this.m_springMass = y + this.m_gamma, this.m_springMass > 0 && (this.m_springMass = 1 / this.m_springMass);
		} else this.m_springImpulse = 0;
		if (this.m_enableLimit ? this.m_translation = M.DotVV(this.m_ax, v) : (this.m_lowerImpulse = 0, this.m_upperImpulse = 0), this.m_enableMotor ? (this.m_motorMass = i + a, this.m_motorMass > 0 && (this.m_motorMass = 1 / this.m_motorMass)) : (this.m_motorMass = 0, this.m_motorImpulse = 0), e.step.warmStarting) {
			this.m_impulse *= e.step.dtRatio, this.m_springImpulse *= e.step.dtRatio, this.m_motorImpulse *= e.step.dtRatio;
			let n = this.m_springImpulse + this.m_lowerImpulse - this.m_upperImpulse, r = M.AddVV(M.MulSV(this.m_impulse, this.m_ay, M.s_t0), M.MulSV(n, this.m_ax, M.s_t1), t.InitVelocityConstraints_s_P), i = this.m_impulse * this.m_sAy + n * this.m_sAx + this.m_motorImpulse, a = this.m_impulse * this.m_sBy + n * this.m_sBx + this.m_motorImpulse;
			c.SelfMulSub(this.m_invMassA, r), l -= this.m_invIA * i, f.SelfMulAdd(this.m_invMassB, r), p += this.m_invIB * a;
		} else this.m_impulse = 0, this.m_springImpulse = 0, this.m_motorImpulse = 0, this.m_lowerImpulse = 0, this.m_upperImpulse = 0;
		e.velocities[this.m_indexA].w = l, e.velocities[this.m_indexB].w = p;
	}
	static SolveVelocityConstraints_s_P = new M();
	SolveVelocityConstraints(e) {
		let n = this.m_invMassA, r = this.m_invMassB, i = this.m_invIA, a = this.m_invIB, o = e.velocities[this.m_indexA].v, s = e.velocities[this.m_indexA].w, c = e.velocities[this.m_indexB].v, l = e.velocities[this.m_indexB].w;
		{
			let e = M.DotVV(this.m_ax, M.SubVV(c, o, M.s_t0)) + this.m_sBx * l - this.m_sAx * s, u = -this.m_springMass * (e + this.m_bias + this.m_gamma * this.m_springImpulse);
			this.m_springImpulse += u;
			let d = M.MulSV(u, this.m_ax, t.SolveVelocityConstraints_s_P), f = u * this.m_sAx, p = u * this.m_sBx;
			o.SelfMulSub(n, d), s -= i * f, c.SelfMulAdd(r, d), l += a * p;
		}
		{
			let t = l - s - this.m_motorSpeed, n = -this.m_motorMass * t, r = this.m_motorImpulse, o = e.step.dt * this.m_maxMotorTorque;
			this.m_motorImpulse = k(this.m_motorImpulse + n, -o, o), n = this.m_motorImpulse - r, s -= i * n, l += a * n;
		}
		if (this.m_enableLimit) {
			{
				let u = this.m_translation - this.m_lowerTranslation, d = M.DotVV(this.m_ax, M.SubVV(c, o, M.s_t0)) + this.m_sBx * l - this.m_sAx * s, f = -this.m_axialMass * (d + O(u, 0) * e.step.inv_dt), p = this.m_lowerImpulse;
				this.m_lowerImpulse = O(this.m_lowerImpulse + f, 0), f = this.m_lowerImpulse - p;
				let m = M.MulSV(f, this.m_ax, t.SolveVelocityConstraints_s_P), h = f * this.m_sAx, g = f * this.m_sBx;
				o.SelfMulSub(n, m), s -= i * h, c.SelfMulAdd(r, m), l += a * g;
			}
			{
				let u = this.m_upperTranslation - this.m_translation, d = M.DotVV(this.m_ax, M.SubVV(o, c, M.s_t0)) + this.m_sAx * s - this.m_sBx * l, f = -this.m_axialMass * (d + O(u, 0) * e.step.inv_dt), p = this.m_upperImpulse;
				this.m_upperImpulse = O(this.m_upperImpulse + f, 0), f = this.m_upperImpulse - p;
				let m = M.MulSV(f, this.m_ax, t.SolveVelocityConstraints_s_P), h = f * this.m_sAx, g = f * this.m_sBx;
				o.SelfMulAdd(n, m), s += i * h, c.SelfMulSub(r, m), l -= a * g;
			}
		}
		{
			let e = M.DotVV(this.m_ay, M.SubVV(c, o, M.s_t0)) + this.m_sBy * l - this.m_sAy * s, u = -this.m_mass * e;
			this.m_impulse += u;
			let d = M.MulSV(u, this.m_ay, t.SolveVelocityConstraints_s_P), f = u * this.m_sAy, p = u * this.m_sBy;
			o.SelfMulSub(n, d), s -= i * f, c.SelfMulAdd(r, d), l += a * p;
		}
		e.velocities[this.m_indexA].w = s, e.velocities[this.m_indexB].w = l;
	}
	static SolvePositionConstraints_s_d = new M();
	static SolvePositionConstraints_s_P = new M();
	SolvePositionConstraints(e) {
		let n = e.positions[this.m_indexA].c, r = e.positions[this.m_indexA].a, i = e.positions[this.m_indexB].c, a = e.positions[this.m_indexB].a, o = 0;
		if (this.m_enableLimit) {
			let e = this.m_qA.SetAngle(r), s = this.m_qB.SetAngle(a);
			M.SubVV(this.m_localAnchorA, this.m_localCenterA, this.m_lalcA);
			let c = F.MulRV(e, this.m_lalcA, this.m_rA);
			M.SubVV(this.m_localAnchorB, this.m_localCenterB, this.m_lalcB);
			let l = F.MulRV(s, this.m_lalcB, this.m_rB), u = M.AddVV(M.SubVV(i, n, M.s_t0), M.SubVV(l, c, M.s_t1), t.SolvePositionConstraints_s_d), d = F.MulRV(e, this.m_localXAxisA, this.m_ax), f = M.CrossVV(M.AddVV(u, c, M.s_t0), this.m_ax), p = M.CrossVV(l, this.m_ax), m = 0, h = M.DotVV(d, u);
			if (E(this.m_upperTranslation - this.m_lowerTranslation) < .01 ? m = h : h <= this.m_lowerTranslation ? m = D(h - this.m_lowerTranslation, 0) : h >= this.m_upperTranslation && (m = O(h - this.m_upperTranslation, 0)), m !== 0) {
				let e = this.m_invMassA + this.m_invMassB + this.m_invIA * f * f + this.m_invIB * p * p, s = 0;
				e !== 0 && (s = -m / e);
				let c = M.MulSV(s, d, t.SolvePositionConstraints_s_P), l = s * f, u = s * p;
				n.SelfMulSub(this.m_invMassA, c), r -= this.m_invIA * l, i.SelfMulAdd(this.m_invMassB, c), a += this.m_invIB * u, o = E(m);
			}
		}
		{
			let e = this.m_qA.SetAngle(r), s = this.m_qB.SetAngle(a);
			M.SubVV(this.m_localAnchorA, this.m_localCenterA, this.m_lalcA);
			let c = F.MulRV(e, this.m_lalcA, this.m_rA);
			M.SubVV(this.m_localAnchorB, this.m_localCenterB, this.m_lalcB);
			let l = F.MulRV(s, this.m_lalcB, this.m_rB), u = M.AddVV(M.SubVV(i, n, M.s_t0), M.SubVV(l, c, M.s_t1), t.SolvePositionConstraints_s_d), d = F.MulRV(e, this.m_localYAxisA, this.m_ay), f = M.CrossVV(M.AddVV(u, c, M.s_t0), d), p = M.CrossVV(l, d), m = M.DotVV(u, d), h = this.m_invMassA + this.m_invMassB + this.m_invIA * this.m_sAy * this.m_sAy + this.m_invIB * this.m_sBy * this.m_sBy, g = 0;
			h !== 0 && (g = -m / h);
			let _ = M.MulSV(g, d, t.SolvePositionConstraints_s_P), v = g * f, y = g * p;
			n.SelfMulSub(this.m_invMassA, _), r -= this.m_invIA * v, i.SelfMulAdd(this.m_invMassB, _), a += this.m_invIB * y, o = O(o, E(m));
		}
		return e.positions[this.m_indexA].a = r, e.positions[this.m_indexB].a = a, o <= c;
	}
	GetDefinition(e) {
		return e;
	}
	GetAnchorA(e) {
		return this.m_bodyA.GetWorldPoint(this.m_localAnchorA, e);
	}
	GetAnchorB(e) {
		return this.m_bodyB.GetWorldPoint(this.m_localAnchorB, e);
	}
	GetReactionForce(e, t) {
		return t.x = e * (this.m_impulse * this.m_ay.x + (this.m_springImpulse + this.m_lowerImpulse - this.m_upperImpulse) * this.m_ax.x), t.y = e * (this.m_impulse * this.m_ay.y + (this.m_springImpulse + this.m_lowerImpulse - this.m_upperImpulse) * this.m_ax.y), t;
	}
	GetReactionTorque(e) {
		return e * this.m_motorImpulse;
	}
	GetLocalAnchorA() {
		return this.m_localAnchorA;
	}
	GetLocalAnchorB() {
		return this.m_localAnchorB;
	}
	GetLocalAxisA() {
		return this.m_localXAxisA;
	}
	GetJointTranslation() {
		return this.GetPrismaticJointTranslation();
	}
	GetJointLinearSpeed() {
		return this.GetPrismaticJointSpeed();
	}
	GetJointAngle() {
		return this.GetRevoluteJointAngle();
	}
	GetJointAngularSpeed() {
		return this.GetRevoluteJointSpeed();
	}
	GetPrismaticJointTranslation() {
		let e = this.m_bodyA, t = this.m_bodyB, n = e.GetWorldPoint(this.m_localAnchorA, new M()), r = t.GetWorldPoint(this.m_localAnchorB, new M()), i = M.SubVV(r, n, new M()), a = e.GetWorldVector(this.m_localXAxisA, new M());
		return M.DotVV(i, a);
	}
	GetPrismaticJointSpeed() {
		let e = this.m_bodyA, t = this.m_bodyB;
		M.SubVV(this.m_localAnchorA, e.m_sweep.localCenter, this.m_lalcA);
		let n = F.MulRV(e.m_xf.q, this.m_lalcA, this.m_rA);
		M.SubVV(this.m_localAnchorB, t.m_sweep.localCenter, this.m_lalcB);
		let r = F.MulRV(t.m_xf.q, this.m_lalcB, this.m_rB), i = M.AddVV(e.m_sweep.c, n, M.s_t0), a = M.AddVV(t.m_sweep.c, r, M.s_t1), o = M.SubVV(a, i, M.s_t2), s = e.GetWorldVector(this.m_localXAxisA, new M()), c = e.m_linearVelocity, l = t.m_linearVelocity, u = e.m_angularVelocity, d = t.m_angularVelocity;
		return M.DotVV(o, M.CrossSV(u, s, M.s_t0)) + M.DotVV(s, M.SubVV(M.AddVCrossSV(l, d, r, M.s_t0), M.AddVCrossSV(c, u, n, M.s_t1), M.s_t0));
	}
	GetRevoluteJointAngle() {
		return this.m_bodyB.m_sweep.a - this.m_bodyA.m_sweep.a;
	}
	GetRevoluteJointSpeed() {
		let e = this.m_bodyA.m_angularVelocity;
		return this.m_bodyB.m_angularVelocity - e;
	}
	IsMotorEnabled() {
		return this.m_enableMotor;
	}
	EnableMotor(e) {
		e !== this.m_enableMotor && (this.m_bodyA.SetAwake(!0), this.m_bodyB.SetAwake(!0), this.m_enableMotor = e);
	}
	SetMotorSpeed(e) {
		e !== this.m_motorSpeed && (this.m_bodyA.SetAwake(!0), this.m_bodyB.SetAwake(!0), this.m_motorSpeed = e);
	}
	SetMaxMotorTorque(e) {
		e !== this.m_maxMotorTorque && (this.m_bodyA.SetAwake(!0), this.m_bodyB.SetAwake(!0), this.m_maxMotorTorque = e);
	}
	GetMotorTorque(e) {
		return e * this.m_motorImpulse;
	}
	IsLimitEnabled() {
		return this.m_enableLimit;
	}
	EnableLimit(e) {
		e !== this.m_enableLimit && (this.m_bodyA.SetAwake(!0), this.m_bodyB.SetAwake(!0), this.m_enableLimit = e, this.m_lowerImpulse = 0, this.m_upperImpulse = 0);
	}
	GetLowerLimit() {
		return this.m_lowerTranslation;
	}
	GetUpperLimit() {
		return this.m_upperTranslation;
	}
	SetLimits(e, t) {
		(e !== this.m_lowerTranslation || t !== this.m_upperTranslation) && (this.m_bodyA.SetAwake(!0), this.m_bodyB.SetAwake(!0), this.m_lowerTranslation = e, this.m_upperTranslation = t, this.m_lowerImpulse = 0, this.m_upperImpulse = 0);
	}
	Dump(e) {
		let t = this.m_bodyA.m_islandIndex, n = this.m_bodyB.m_islandIndex;
		e("  const jd: b2WheelJointDef = new b2WheelJointDef();\n"), e("  jd.bodyA = bodies[%d];\n", t), e("  jd.bodyB = bodies[%d];\n", n), e("  jd.collideConnected = %s;\n", this.m_collideConnected ? "true" : "false"), e("  jd.localAnchorA.Set(%.15f, %.15f);\n", this.m_localAnchorA.x, this.m_localAnchorA.y), e("  jd.localAnchorB.Set(%.15f, %.15f);\n", this.m_localAnchorB.x, this.m_localAnchorB.y), e("  jd.localAxisA.Set(%.15f, %.15f);\n", this.m_localXAxisA.x, this.m_localXAxisA.y), e("  jd.enableMotor = %s;\n", this.m_enableMotor ? "true" : "false"), e("  jd.motorSpeed = %.15f;\n", this.m_motorSpeed), e("  jd.maxMotorTorque = %.15f;\n", this.m_maxMotorTorque), e("  jd.stiffness = %.15f;\n", this.m_stiffness), e("  jd.damping = %.15f;\n", this.m_damping), e("  joints[%d] = this.m_world.CreateJoint(jd);\n", this.m_index);
	}
	static Draw_s_pA = new M();
	static Draw_s_pB = new M();
	static Draw_s_axis = new M();
	static Draw_s_c1 = new e(.7, .7, .7);
	static Draw_s_c2 = new e(.3, .9, .3);
	static Draw_s_c3 = new e(.9, .3, .3);
	static Draw_s_c4 = new e(.3, .3, .9);
	static Draw_s_c5 = new e(.4, .4, .4);
	static Draw_s_lower = new M();
	static Draw_s_upper = new M();
	static Draw_s_perp = new M();
	Draw(e) {
		let n = this.m_bodyA.GetTransform(), r = this.m_bodyB.GetTransform(), i = I.MulXV(n, this.m_localAnchorA, t.Draw_s_pA), a = I.MulXV(r, this.m_localAnchorB, t.Draw_s_pB), o = F.MulRV(n.q, this.m_localXAxisA, t.Draw_s_axis), s = t.Draw_s_c1, c = t.Draw_s_c2, l = t.Draw_s_c3, u = t.Draw_s_c4, d = t.Draw_s_c5;
		if (e.DrawSegment(i, a, d), this.m_enableLimit) {
			let r = M.AddVMulSV(i, this.m_lowerTranslation, o, t.Draw_s_lower), a = M.AddVMulSV(i, this.m_upperTranslation, o, t.Draw_s_upper), u = F.MulRV(n.q, this.m_localYAxisA, t.Draw_s_perp);
			e.DrawSegment(r, a, s), e.DrawSegment(M.AddVMulSV(r, -.5, u, M.s_t0), M.AddVMulSV(r, .5, u, M.s_t1), c), e.DrawSegment(M.AddVMulSV(a, -.5, u, M.s_t0), M.AddVMulSV(a, .5, u, M.s_t1), l);
		} else e.DrawSegment(M.AddVMulSV(i, -1, o, M.s_t0), M.AddVMulSV(i, 1, o, M.s_t1), s);
		e.DrawPoint(i, 5, s), e.DrawPoint(a, 5, u);
	}
}, Y;
(function(e) {
	e[e.b2_waterParticle = 0] = "b2_waterParticle", e[e.b2_zombieParticle = 2] = "b2_zombieParticle", e[e.b2_wallParticle = 4] = "b2_wallParticle", e[e.b2_springParticle = 8] = "b2_springParticle", e[e.b2_elasticParticle = 16] = "b2_elasticParticle", e[e.b2_viscousParticle = 32] = "b2_viscousParticle", e[e.b2_powderParticle = 64] = "b2_powderParticle", e[e.b2_tensileParticle = 128] = "b2_tensileParticle", e[e.b2_colorMixingParticle = 256] = "b2_colorMixingParticle", e[e.b2_destructionListenerParticle = 512] = "b2_destructionListenerParticle", e[e.b2_barrierParticle = 1024] = "b2_barrierParticle", e[e.b2_staticPressureParticle = 2048] = "b2_staticPressureParticle", e[e.b2_reactiveParticle = 4096] = "b2_reactiveParticle", e[e.b2_repulsiveParticle = 8192] = "b2_repulsiveParticle", e[e.b2_fixtureContactListenerParticle = 16384] = "b2_fixtureContactListenerParticle", e[e.b2_particleContactListenerParticle = 32768] = "b2_particleContactListenerParticle", e[e.b2_fixtureContactFilterParticle = 65536] = "b2_fixtureContactFilterParticle", e[e.b2_particleContactFilterParticle = 131072] = "b2_particleContactFilterParticle";
})(Y ||= {});
var Er = class {
	flags = 0;
	position = new M();
	velocity = new M();
	color = new e(0, 0, 0, 0);
	lifetime = 0;
	userData = null;
	group = null;
};
function Dr(e, t, n) {
	return k(Math.ceil(Math.sqrt(e / (.01 * t)) * n), 1, 8);
}
var Or = class {
	m_index = -1;
	GetIndex() {
		return this.m_index;
	}
	SetIndex(e) {
		this.m_index = e;
	}
}, X;
(function(e) {
	e[e.b2_none = 0] = "b2_none", e[e.b2_solidParticleGroup = 1] = "b2_solidParticleGroup", e[e.b2_rigidParticleGroup = 2] = "b2_rigidParticleGroup", e[e.b2_particleGroupCanBeEmpty = 4] = "b2_particleGroupCanBeEmpty", e[e.b2_particleGroupWillBeDestroyed = 8] = "b2_particleGroupWillBeDestroyed", e[e.b2_particleGroupNeedsUpdateDepth = 16] = "b2_particleGroupNeedsUpdateDepth", e[e.b2_particleGroupInternalMask = 24] = "b2_particleGroupInternalMask";
})(X ||= {});
var kr = class {
	flags = 0;
	groupFlags = 0;
	position = new M();
	angle = 0;
	linearVelocity = new M();
	angularVelocity = 0;
	color = new e();
	strength = 1;
	shape;
	shapes;
	shapeCount = 0;
	stride = 0;
	particleCount = 0;
	positionData;
	lifetime = 0;
	userData = null;
	group = null;
}, Ar = class e {
	m_system;
	m_firstIndex = 0;
	m_lastIndex = 0;
	m_groupFlags = 0;
	m_strength = 1;
	m_prev = null;
	m_next = null;
	m_timestamp = -1;
	m_mass = 0;
	m_inertia = 0;
	m_center = new M();
	m_linearVelocity = new M();
	m_angularVelocity = 0;
	m_transform = new I();
	m_userData = null;
	constructor(e) {
		this.m_system = e;
	}
	GetNext() {
		return this.m_next;
	}
	GetParticleSystem() {
		return this.m_system;
	}
	GetParticleCount() {
		return this.m_lastIndex - this.m_firstIndex;
	}
	GetBufferIndex() {
		return this.m_firstIndex;
	}
	ContainsParticle(e) {
		return this.m_firstIndex <= e && e < this.m_lastIndex;
	}
	GetAllParticleFlags() {
		if (!this.m_system.m_flagsBuffer.data) throw Error();
		let e = 0;
		for (let t = this.m_firstIndex; t < this.m_lastIndex; t++) e |= this.m_system.m_flagsBuffer.data[t];
		return e;
	}
	GetGroupFlags() {
		return this.m_groupFlags;
	}
	SetGroupFlags(e) {
		e |= this.m_groupFlags & X.b2_particleGroupInternalMask, this.m_system.SetGroupFlags(this, e);
	}
	GetMass() {
		return this.UpdateStatistics(), this.m_mass;
	}
	GetInertia() {
		return this.UpdateStatistics(), this.m_inertia;
	}
	GetCenter() {
		return this.UpdateStatistics(), this.m_center;
	}
	GetLinearVelocity() {
		return this.UpdateStatistics(), this.m_linearVelocity;
	}
	GetAngularVelocity() {
		return this.UpdateStatistics(), this.m_angularVelocity;
	}
	GetTransform() {
		return this.m_transform;
	}
	GetPosition() {
		return this.m_transform.p;
	}
	GetAngle() {
		return this.m_transform.q.GetAngle();
	}
	GetLinearVelocityFromWorldPoint(t, n) {
		let r = e.GetLinearVelocityFromWorldPoint_s_t0;
		return this.UpdateStatistics(), M.AddVCrossSV(this.m_linearVelocity, this.m_angularVelocity, M.SubVV(t, this.m_center, r), n);
	}
	static GetLinearVelocityFromWorldPoint_s_t0 = new M();
	GetUserData() {
		return this.m_userData;
	}
	SetUserData(e) {
		this.m_userData = e;
	}
	ApplyForce(e) {
		this.m_system.ApplyForce(this.m_firstIndex, this.m_lastIndex, e);
	}
	ApplyLinearImpulse(e) {
		this.m_system.ApplyLinearImpulse(this.m_firstIndex, this.m_lastIndex, e);
	}
	DestroyParticles(e) {
		if (this.m_system.m_world.IsLocked()) throw Error();
		for (let t = this.m_firstIndex; t < this.m_lastIndex; t++) this.m_system.DestroyParticle(t, e);
	}
	UpdateStatistics() {
		if (!this.m_system.m_positionBuffer.data || !this.m_system.m_velocityBuffer.data) throw Error();
		let e = new M(), t = new M();
		if (this.m_timestamp !== this.m_system.m_timestamp) {
			let n = this.m_system.GetParticleMass();
			this.m_mass = n * (this.m_lastIndex - this.m_firstIndex), this.m_center.SetZero(), this.m_linearVelocity.SetZero();
			for (let e = this.m_firstIndex; e < this.m_lastIndex; e++) this.m_center.SelfMulAdd(n, this.m_system.m_positionBuffer.data[e]), this.m_linearVelocity.SelfMulAdd(n, this.m_system.m_velocityBuffer.data[e]);
			if (this.m_mass > 0) {
				let e = 1 / this.m_mass;
				this.m_center.SelfMul(e), this.m_linearVelocity.SelfMul(e);
			}
			this.m_inertia = 0, this.m_angularVelocity = 0;
			for (let r = this.m_firstIndex; r < this.m_lastIndex; r++) M.SubVV(this.m_system.m_positionBuffer.data[r], this.m_center, e), M.SubVV(this.m_system.m_velocityBuffer.data[r], this.m_linearVelocity, t), this.m_inertia += n * M.DotVV(e, e), this.m_angularVelocity += n * M.CrossVV(e, t);
			this.m_inertia > 0 && (this.m_angularVelocity *= 1 / this.m_inertia), this.m_timestamp = this.m_system.m_timestamp;
		}
	}
}, jr = class {
	m_buffer = [];
	m_front = 0;
	m_back = 0;
	get m_capacity() {
		return this.m_buffer.length;
	}
	constructor(e) {
		this.m_buffer.fill(null, 0, e);
	}
	Push(e) {
		if (this.m_back >= this.m_capacity) {
			for (let e = this.m_front; e < this.m_back; e++) this.m_buffer[e - this.m_front] = this.m_buffer[e];
			this.m_back -= this.m_front, this.m_front = 0;
		}
		this.m_buffer[this.m_back] = e, this.m_back++;
	}
	Pop() {
		this.m_buffer[this.m_front] = null, this.m_front++;
	}
	Empty() {
		return this.m_front === this.m_back;
	}
	Front() {
		let e = this.m_buffer[this.m_front];
		if (!e) throw Error();
		return e;
	}
}, Mr = class {
	m_generatorBuffer;
	m_generatorCapacity = 0;
	m_generatorCount = 0;
	m_countX = 0;
	m_countY = 0;
	m_diagram = [];
	constructor(e) {
		this.m_generatorBuffer = S(e, (e) => new Nr()), this.m_generatorCapacity = e;
	}
	AddGenerator(e, t, n) {
		let r = this.m_generatorBuffer[this.m_generatorCount++];
		r.center.Copy(e), r.tag = t, r.necessary = n;
	}
	Generate(e, t) {
		let n = 1 / e, r = new M(+i, +i), a = new M(-i, -i), o = 0;
		for (let e = 0; e < this.m_generatorCount; e++) {
			let t = this.m_generatorBuffer[e];
			t.necessary && (M.MinV(r, t.center, r), M.MaxV(a, t.center, a), ++o);
		}
		if (o === 0) {
			this.m_countX = 0, this.m_countY = 0;
			return;
		}
		r.x -= t, r.y -= t, a.x += t, a.y += t, this.m_countX = 1 + Math.floor(n * (a.x - r.x)), this.m_countY = 1 + Math.floor(n * (a.y - r.y)), this.m_diagram = [];
		let s = new jr(4 * this.m_countX * this.m_countY);
		for (let e = 0; e < this.m_generatorCount; e++) {
			let t = this.m_generatorBuffer[e];
			t.center.SelfSub(r).SelfMul(n);
			let i = Math.floor(t.center.x), a = Math.floor(t.center.y);
			i >= 0 && a >= 0 && i < this.m_countX && a < this.m_countY && s.Push(new Z(i, a, i + a * this.m_countX, t));
		}
		for (; !s.Empty();) {
			let e = s.Front(), t = e.m_x, n = e.m_y, r = e.m_i, i = e.m_generator;
			s.Pop(), this.m_diagram[r] || (this.m_diagram[r] = i, t > 0 && s.Push(new Z(t - 1, n, r - 1, i)), n > 0 && s.Push(new Z(t, n - 1, r - this.m_countX, i)), t < this.m_countX - 1 && s.Push(new Z(t + 1, n, r + 1, i)), n < this.m_countY - 1 && s.Push(new Z(t, n + 1, r + this.m_countX, i)));
		}
		for (let e = 0; e < this.m_countY; e++) for (let t = 0; t < this.m_countX - 1; t++) {
			let n = t + e * this.m_countX, r = this.m_diagram[n], i = this.m_diagram[n + 1];
			r !== i && (s.Push(new Z(t, e, n, i)), s.Push(new Z(t + 1, e, n + 1, r)));
		}
		for (let e = 0; e < this.m_countY - 1; e++) for (let t = 0; t < this.m_countX; t++) {
			let n = t + e * this.m_countX, r = this.m_diagram[n], i = this.m_diagram[n + this.m_countX];
			r !== i && (s.Push(new Z(t, e, n, i)), s.Push(new Z(t, e + 1, n + this.m_countX, r)));
		}
		for (; !s.Empty();) {
			let e = s.Front(), t = e.m_x, n = e.m_y, r = e.m_i, i = e.m_generator;
			s.Pop();
			let a = this.m_diagram[r], o = i;
			if (a !== o) {
				let e = a.center.x - t, i = a.center.y - n, c = o.center.x - t, l = o.center.y - n;
				e * e + i * i > c * c + l * l && (this.m_diagram[r] = o, t > 0 && s.Push(new Z(t - 1, n, r - 1, o)), n > 0 && s.Push(new Z(t, n - 1, r - this.m_countX, o)), t < this.m_countX - 1 && s.Push(new Z(t + 1, n, r + 1, o)), n < this.m_countY - 1 && s.Push(new Z(t, n + 1, r + this.m_countX, o)));
			}
		}
	}
	GetNodes(e) {
		for (let t = 0; t < this.m_countY - 1; t++) for (let n = 0; n < this.m_countX - 1; n++) {
			let r = n + t * this.m_countX, i = this.m_diagram[r], a = this.m_diagram[r + 1], o = this.m_diagram[r + this.m_countX], s = this.m_diagram[r + 1 + this.m_countX];
			a !== o && (i !== a && i !== o && (i.necessary || a.necessary || o.necessary) && e(i.tag, a.tag, o.tag), s !== a && s !== o && (i.necessary || a.necessary || o.necessary) && e(a.tag, s.tag, o.tag));
		}
	}
}, Nr = class {
	center = new M();
	tag = 0;
	necessary = !1;
}, Z = class {
	m_x;
	m_y;
	m_i;
	m_generator;
	constructor(e, t, n, r) {
		this.m_x = e, this.m_y = t, this.m_i = n, this.m_generator = r;
	}
};
//#endregion
//#region ../../../../tmp/claude-0/-home-user/98102b14-929e-54a0-bb74-ef07c2e34668/scratchpad/b2/esm/particle/b2_particle_system.js
function Pr(e, t, n) {
	let r = e[t];
	e[t] = e[n], e[n] = r;
}
function Fr(e, t) {
	return e < t;
}
function Ir(e, t = 0, n = e.length - t, r = Fr) {
	let i = t, a = [], o = 0;
	for (;;) {
		for (; i + 1 < n; n++) {
			let t = e[i + Math.floor(Math.random() * (n - i))];
			a[o++] = n;
			for (let a = i - 1;;) {
				for (; r(e[++a], t););
				for (; r(t, e[--n]););
				if (a >= n) break;
				Pr(e, a, n);
			}
		}
		if (o === 0) break;
		i = n, n = a[--o];
	}
	return e;
}
function Lr(e, t = 0, n = e.length - t, r = Fr) {
	return Ir(e, t, n, r);
}
function Rr(e, t, n = e.length) {
	let r = 0;
	for (let i = 0; i < n; ++i) if (!t(e[i])) {
		if (i === r) {
			++r;
			continue;
		}
		Pr(e, r++, i);
	}
	return r;
}
function zr(e, t, n, r, i) {
	let a = n - t;
	for (; a > 0;) {
		let n = Math.floor(a / 2), o = t + n;
		i(e[o], r) ? (t = ++o, a -= n + 1) : a = n;
	}
	return t;
}
function Br(e, t, n, r, i) {
	let a = n - t;
	for (; a > 0;) {
		let n = Math.floor(a / 2), o = t + n;
		i(r, e[o]) ? a = n : (t = ++o, a -= n + 1);
	}
	return t;
}
function Q(e, t, n, r) {
	let i = n;
	for (; t !== i;) Pr(e, t++, i++), i === r ? i = n : t === n && (n = i);
}
function Vr(e, t, n, r) {
	if (t === n) return n;
	let i = t;
	for (; ++t !== n;) r(e[i], e[t]) || Pr(e, ++i, t);
	return ++i;
}
var Hr = class {
	data = [];
	count = 0;
	capacity = 0;
	allocator;
	constructor(e) {
		this.allocator = e;
	}
	Append() {
		return this.count >= this.capacity && this.Grow(), this.count++;
	}
	Reserve(e) {
		if (!(this.capacity >= e)) {
			for (let t = this.capacity; t < e; ++t) this.data[t] = this.allocator();
			this.capacity = e;
		}
	}
	Grow() {
		let e = this.capacity ? 2 * this.capacity : 256;
		this.Reserve(e);
	}
	Free() {
		this.data.length !== 0 && (this.data = [], this.capacity = 0, this.count = 0);
	}
	Shorten(e) {}
	Data() {
		return this.data;
	}
	GetCount() {
		return this.count;
	}
	SetCount(e) {
		this.count = e;
	}
	GetCapacity() {
		return this.capacity;
	}
	RemoveIf(e) {
		this.count = Rr(this.data, e, this.count);
	}
	Unique(e) {
		this.count = Vr(this.data, 0, this.count, e);
	}
}, Ur = class extends tr {
	m_system;
	constructor(e) {
		super(), this.m_system = e;
	}
	ShouldQueryParticleSystem(e) {
		return !1;
	}
	ReportFixture(e) {
		if (e.IsSensor()) return !0;
		let t = e.GetShape().GetChildCount();
		for (let n = 0; n < t; n++) {
			let t = e.GetAABB(n), r = this.m_system.GetInsideBoundsEnumerator(t), i;
			for (; (i = r.GetNext()) >= 0;) this.ReportFixtureAndParticle(e, n, i);
		}
		return !0;
	}
	ReportParticle(e, t) {
		return !1;
	}
	ReportFixtureAndParticle(e, t, n) {}
}, Wr = class {
	indexA = 0;
	indexB = 0;
	weight = 0;
	normal = new M();
	flags = 0;
	SetIndices(e, t) {
		this.indexA = e, this.indexB = t;
	}
	SetWeight(e) {
		this.weight = e;
	}
	SetNormal(e) {
		this.normal.Copy(e);
	}
	SetFlags(e) {
		this.flags = e;
	}
	GetIndexA() {
		return this.indexA;
	}
	GetIndexB() {
		return this.indexB;
	}
	GetWeight() {
		return this.weight;
	}
	GetNormal() {
		return this.normal;
	}
	GetFlags() {
		return this.flags;
	}
	IsEqual(e) {
		return this.indexA === e.indexA && this.indexB === e.indexB && this.flags === e.flags && this.weight === e.weight && this.normal.x === e.normal.x && this.normal.y === e.normal.y;
	}
	IsNotEqual(e) {
		return !this.IsEqual(e);
	}
	ApproximatelyEqual(e) {
		return this.indexA === e.indexA && this.indexB === e.indexB && this.flags === e.flags && E(this.weight - e.weight) < .01 && M.DistanceSquaredVV(this.normal, e.normal) < 1e-4;
	}
}, Gr = class {
	index = 0;
	body;
	fixture;
	weight = 0;
	normal = new M();
	mass = 0;
}, Kr = class {
	indexA = 0;
	indexB = 0;
	flags = 0;
	strength = 0;
	distance = 0;
}, qr = class {
	indexA = 0;
	indexB = 0;
	indexC = 0;
	flags = 0;
	strength = 0;
	pa = new M(0, 0);
	pb = new M(0, 0);
	pc = new M(0, 0);
	ka = 0;
	kb = 0;
	kc = 0;
	s = 0;
}, Jr = class e {
	strictContactCheck = !1;
	density = 1;
	gravityScale = 1;
	radius = 1;
	maxCount = 0;
	pressureStrength = .005;
	dampingStrength = 1;
	elasticStrength = .25;
	springStrength = .25;
	viscousStrength = .25;
	surfaceTensionPressureStrength = .2;
	surfaceTensionNormalStrength = .2;
	repulsiveStrength = 1;
	powderStrength = .5;
	ejectionStrength = .5;
	staticPressureStrength = .2;
	staticPressureRelaxation = .2;
	staticPressureIterations = 8;
	colorMixingStrength = .5;
	destroyByAge = !0;
	lifetimeGranularity = 1 / 60;
	Copy(e) {
		return this.strictContactCheck = e.strictContactCheck, this.density = e.density, this.gravityScale = e.gravityScale, this.radius = e.radius, this.maxCount = e.maxCount, this.pressureStrength = e.pressureStrength, this.dampingStrength = e.dampingStrength, this.elasticStrength = e.elasticStrength, this.springStrength = e.springStrength, this.viscousStrength = e.viscousStrength, this.surfaceTensionPressureStrength = e.surfaceTensionPressureStrength, this.surfaceTensionNormalStrength = e.surfaceTensionNormalStrength, this.repulsiveStrength = e.repulsiveStrength, this.powderStrength = e.powderStrength, this.ejectionStrength = e.ejectionStrength, this.staticPressureStrength = e.staticPressureStrength, this.staticPressureRelaxation = e.staticPressureRelaxation, this.staticPressureIterations = e.staticPressureIterations, this.colorMixingStrength = e.colorMixingStrength, this.destroyByAge = e.destroyByAge, this.lifetimeGranularity = e.lifetimeGranularity, this;
	}
	Clone() {
		return new e().Copy(this);
	}
}, Yr = class n {
	m_paused = !1;
	m_timestamp = 0;
	m_allParticleFlags = 0;
	m_needsUpdateAllParticleFlags = !1;
	m_allGroupFlags = 0;
	m_needsUpdateAllGroupFlags = !1;
	m_hasForce = !1;
	m_iterationIndex = 0;
	m_inverseDensity = 0;
	m_particleDiameter = 0;
	m_inverseDiameter = 0;
	m_squaredDiameter = 0;
	m_count = 0;
	m_internalAllocatedCapacity = 0;
	m_handleIndexBuffer = new $();
	m_flagsBuffer = new $();
	m_positionBuffer = new $();
	m_velocityBuffer = new $();
	m_forceBuffer = [];
	m_weightBuffer = [];
	m_staticPressureBuffer = [];
	m_accumulationBuffer = [];
	m_accumulation2Buffer = [];
	m_depthBuffer = [];
	m_colorBuffer = new $();
	m_groupBuffer = [];
	m_userDataBuffer = new $();
	m_stuckThreshold = 0;
	m_lastBodyContactStepBuffer = new $();
	m_bodyContactCountBuffer = new $();
	m_consecutiveContactStepsBuffer = new $();
	m_stuckParticleBuffer = new Hr(() => 0);
	m_proxyBuffer = new Hr(() => new Xr());
	m_contactBuffer = new Hr(() => new Wr());
	m_bodyContactBuffer = new Hr(() => new Gr());
	m_pairBuffer = new Hr(() => new Kr());
	m_triadBuffer = new Hr(() => new qr());
	m_expirationTimeBuffer = new $();
	m_indexByExpirationTimeBuffer = new $();
	m_timeElapsed = 0;
	m_expirationTimeBufferRequiresSorting = !1;
	m_groupCount = 0;
	m_groupList = null;
	m_def = new Jr();
	m_world;
	m_prev = null;
	m_next = null;
	static xTruncBits = 12;
	static yTruncBits = 12;
	static tagBits = 32;
	static yOffset = 1 << n.yTruncBits - 1;
	static yShift = n.tagBits - n.yTruncBits;
	static xShift = n.tagBits - n.yTruncBits - n.xTruncBits;
	static xScale = 1 << n.xShift;
	static xOffset = n.xScale * (1 << n.xTruncBits - 1);
	static yMask = (1 << n.yTruncBits) - 1 << n.yShift;
	static xMask = ~n.yMask;
	static computeTag(e, t) {
		return (t + n.yOffset >>> 0 << n.yShift) + (n.xScale * e + n.xOffset >>> 0) >>> 0;
	}
	static computeRelativeTag(e, t, r) {
		return e + (r << n.yShift) + (t << n.xShift) >>> 0;
	}
	constructor(e, t) {
		this.SetStrictContactCheck(e.strictContactCheck), this.SetDensity(e.density), this.SetGravityScale(e.gravityScale), this.SetRadius(e.radius), this.SetMaxParticleCount(e.maxCount), this.m_def = e.Clone(), this.m_world = t, this.SetDestructionByAge(this.m_def.destroyByAge);
	}
	Drop() {
		for (; this.m_groupList;) this.DestroyParticleGroup(this.m_groupList);
		this.FreeUserOverridableBuffer(this.m_handleIndexBuffer), this.FreeUserOverridableBuffer(this.m_flagsBuffer), this.FreeUserOverridableBuffer(this.m_lastBodyContactStepBuffer), this.FreeUserOverridableBuffer(this.m_bodyContactCountBuffer), this.FreeUserOverridableBuffer(this.m_consecutiveContactStepsBuffer), this.FreeUserOverridableBuffer(this.m_positionBuffer), this.FreeUserOverridableBuffer(this.m_velocityBuffer), this.FreeUserOverridableBuffer(this.m_colorBuffer), this.FreeUserOverridableBuffer(this.m_userDataBuffer), this.FreeUserOverridableBuffer(this.m_expirationTimeBuffer), this.FreeUserOverridableBuffer(this.m_indexByExpirationTimeBuffer), this.FreeBuffer(this.m_forceBuffer, this.m_internalAllocatedCapacity), this.FreeBuffer(this.m_weightBuffer, this.m_internalAllocatedCapacity), this.FreeBuffer(this.m_staticPressureBuffer, this.m_internalAllocatedCapacity), this.FreeBuffer(this.m_accumulationBuffer, this.m_internalAllocatedCapacity), this.FreeBuffer(this.m_accumulation2Buffer, this.m_internalAllocatedCapacity), this.FreeBuffer(this.m_depthBuffer, this.m_internalAllocatedCapacity), this.FreeBuffer(this.m_groupBuffer, this.m_internalAllocatedCapacity);
	}
	CreateParticle(t) {
		if (this.m_world.IsLocked()) throw Error();
		if (this.m_count >= this.m_internalAllocatedCapacity) {
			let e = this.m_count ? 2 * this.m_count : 256;
			this.ReallocateInternalAllocatedBuffers(e);
		}
		if (this.m_count >= this.m_internalAllocatedCapacity) {
			if (this.m_def.destroyByAge) this.DestroyOldestParticle(0, !1), this.SolveZombie();
			else return -1;
		}
		let n = this.m_count++;
		this.m_flagsBuffer.data[n] = 0, this.m_lastBodyContactStepBuffer.data && (this.m_lastBodyContactStepBuffer.data[n] = 0), this.m_bodyContactCountBuffer.data && (this.m_bodyContactCountBuffer.data[n] = 0), this.m_consecutiveContactStepsBuffer.data && (this.m_consecutiveContactStepsBuffer.data[n] = 0), this.m_positionBuffer.data[n] = (this.m_positionBuffer.data[n] || new M()).Copy(r(t.position, M.ZERO)), this.m_velocityBuffer.data[n] = (this.m_velocityBuffer.data[n] || new M()).Copy(r(t.velocity, M.ZERO)), this.m_weightBuffer[n] = 0, this.m_forceBuffer[n] = (this.m_forceBuffer[n] || new M()).SetZero(), this.m_staticPressureBuffer && (this.m_staticPressureBuffer[n] = 0), this.m_depthBuffer && (this.m_depthBuffer[n] = 0);
		let i = new e().Copy(r(t.color, e.ZERO));
		(this.m_colorBuffer.data || !i.IsZero()) && (this.m_colorBuffer.data = this.RequestBuffer(this.m_colorBuffer.data), this.m_colorBuffer.data[n] = (this.m_colorBuffer.data[n] || new e()).Copy(i)), (this.m_userDataBuffer.data || t.userData) && (this.m_userDataBuffer.data = this.RequestBuffer(this.m_userDataBuffer.data), this.m_userDataBuffer.data[n] = t.userData), this.m_handleIndexBuffer.data && (this.m_handleIndexBuffer.data[n] = null);
		let a = this.m_proxyBuffer.data[this.m_proxyBuffer.Append()], o = r(t.lifetime, 0), s = o > 0;
		(this.m_expirationTimeBuffer.data || s) && (this.SetParticleLifetime(n, s ? o : this.ExpirationTimeToLifetime(-this.GetQuantizedTimeElapsed())), this.m_indexByExpirationTimeBuffer.data[n] = n), a.index = n;
		let c = r(t.group, null);
		return this.m_groupBuffer[n] = c, c && (c.m_firstIndex < c.m_lastIndex ? (this.RotateBuffer(c.m_firstIndex, c.m_lastIndex, n), c.m_lastIndex = n + 1) : (c.m_firstIndex = n, c.m_lastIndex = n + 1)), this.SetParticleFlags(n, r(t.flags, 0)), n;
	}
	GetParticleHandleFromIndex(e) {
		this.m_handleIndexBuffer.data = this.RequestBuffer(this.m_handleIndexBuffer.data);
		let t = this.m_handleIndexBuffer.data[e];
		return t || (t = new Or(), t.SetIndex(e), this.m_handleIndexBuffer.data[e] = t, t);
	}
	DestroyParticle(e, t = !1) {
		let n = Y.b2_zombieParticle;
		t && (n |= Y.b2_destructionListenerParticle), this.SetParticleFlags(e, this.m_flagsBuffer.data[e] | n);
	}
	DestroyOldestParticle(e, t = !1) {
		let n = this.GetParticleCount(), r = this.m_indexByExpirationTimeBuffer.data[n - (e + 1)], i = this.m_indexByExpirationTimeBuffer.data[e];
		this.DestroyParticle(this.m_expirationTimeBuffer.data[r] > 0 ? r : i, t);
	}
	DestroyParticlesInShape(e, t, r = !1) {
		let i = n.DestroyParticlesInShape_s_aabb;
		if (this.m_world.IsLocked()) throw Error();
		let a = new ri(this, e, t, r), o = i;
		return e.ComputeAABB(o, t, 0), this.m_world.QueryAABB(a, o), a.Destroyed();
	}
	static DestroyParticlesInShape_s_aabb = new V();
	CreateParticleGroup(e) {
		let t = n.CreateParticleGroup_s_transform;
		if (this.m_world.IsLocked()) throw Error();
		let i = t;
		i.SetPositionAngle(r(e.position, M.ZERO), r(e.angle, 0));
		let a = this.m_count;
		if (e.shape && this.CreateParticlesWithShapeForGroup(e.shape, e, i), e.shapes && this.CreateParticlesWithShapesForGroup(e.shapes, r(e.shapeCount, e.shapes.length), e, i), e.positionData) {
			let t = r(e.particleCount, e.positionData.length);
			for (let n = 0; n < t; n++) {
				let t = e.positionData[n];
				this.CreateParticleForGroup(e, i, t);
			}
		}
		let o = this.m_count, s = new Ar(this);
		s.m_firstIndex = a, s.m_lastIndex = o, s.m_strength = r(e.strength, 1), s.m_userData = e.userData, s.m_transform.Copy(i), s.m_prev = null, s.m_next = this.m_groupList, this.m_groupList && (this.m_groupList.m_prev = s), this.m_groupList = s, ++this.m_groupCount;
		for (let e = a; e < o; e++) this.m_groupBuffer[e] = s;
		this.SetGroupFlags(s, r(e.groupFlags, 0));
		let c = new ni();
		return this.UpdateContacts(!0), this.UpdatePairsAndTriads(a, o, c), e.group && (this.JoinParticleGroups(e.group, s), s = e.group), s;
	}
	static CreateParticleGroup_s_transform = new I();
	JoinParticleGroups(e, t) {
		if (this.m_world.IsLocked()) throw Error();
		this.RotateBuffer(t.m_firstIndex, t.m_lastIndex, this.m_count), this.RotateBuffer(e.m_firstIndex, e.m_lastIndex, t.m_firstIndex);
		let n = new ii(t.m_firstIndex);
		this.UpdateContacts(!0), this.UpdatePairsAndTriads(e.m_firstIndex, t.m_lastIndex, n);
		for (let n = t.m_firstIndex; n < t.m_lastIndex; n++) this.m_groupBuffer[n] = e;
		let r = e.m_groupFlags | t.m_groupFlags;
		this.SetGroupFlags(e, r), e.m_lastIndex = t.m_lastIndex, t.m_firstIndex = t.m_lastIndex, this.DestroyParticleGroup(t);
	}
	SplitParticleGroup(e) {
		this.UpdateContacts(!0);
		let t = S(e.GetParticleCount(), (e) => new Qr());
		n.InitializeParticleLists(e, t), this.MergeParticleListsInContact(e, t);
		let r = n.FindLongestParticleList(e, t);
		this.MergeZombieParticleListNodes(e, t, r), this.CreateParticleGroupsFromParticleList(e, t, r), this.UpdatePairsAndTriadsWithParticleList(e, t);
	}
	GetParticleGroupList() {
		return this.m_groupList;
	}
	GetParticleGroupCount() {
		return this.m_groupCount;
	}
	GetParticleCount() {
		return this.m_count;
	}
	GetMaxParticleCount() {
		return this.m_def.maxCount;
	}
	SetMaxParticleCount(e) {
		this.m_def.maxCount = e;
	}
	GetAllParticleFlags() {
		return this.m_allParticleFlags;
	}
	GetAllGroupFlags() {
		return this.m_allGroupFlags;
	}
	SetPaused(e) {
		this.m_paused = e;
	}
	GetPaused() {
		return this.m_paused;
	}
	SetDensity(e) {
		this.m_def.density = e, this.m_inverseDensity = 1 / this.m_def.density;
	}
	GetDensity() {
		return this.m_def.density;
	}
	SetGravityScale(e) {
		this.m_def.gravityScale = e;
	}
	GetGravityScale() {
		return this.m_def.gravityScale;
	}
	SetDamping(e) {
		this.m_def.dampingStrength = e;
	}
	GetDamping() {
		return this.m_def.dampingStrength;
	}
	SetStaticPressureIterations(e) {
		this.m_def.staticPressureIterations = e;
	}
	GetStaticPressureIterations() {
		return this.m_def.staticPressureIterations;
	}
	SetRadius(e) {
		this.m_particleDiameter = 2 * e, this.m_squaredDiameter = this.m_particleDiameter * this.m_particleDiameter, this.m_inverseDiameter = 1 / this.m_particleDiameter;
	}
	GetRadius() {
		return this.m_particleDiameter / 2;
	}
	GetPositionBuffer() {
		return this.m_positionBuffer.data;
	}
	GetVelocityBuffer() {
		return this.m_velocityBuffer.data;
	}
	GetColorBuffer() {
		return this.m_colorBuffer.data = this.RequestBuffer(this.m_colorBuffer.data), this.m_colorBuffer.data;
	}
	GetGroupBuffer() {
		return this.m_groupBuffer;
	}
	GetWeightBuffer() {
		return this.m_weightBuffer;
	}
	GetUserDataBuffer() {
		return this.m_userDataBuffer.data = this.RequestBuffer(this.m_userDataBuffer.data), this.m_userDataBuffer.data;
	}
	GetFlagsBuffer() {
		return this.m_flagsBuffer.data;
	}
	SetParticleFlags(e, t) {
		this.m_flagsBuffer.data[e] & ~t && (this.m_needsUpdateAllParticleFlags = !0), ~this.m_allParticleFlags & t && (t & Y.b2_tensileParticle && (this.m_accumulation2Buffer = this.RequestBuffer(this.m_accumulation2Buffer)), t & Y.b2_colorMixingParticle && (this.m_colorBuffer.data = this.RequestBuffer(this.m_colorBuffer.data)), this.m_allParticleFlags |= t), this.m_flagsBuffer.data[e] = t;
	}
	GetParticleFlags(e) {
		return this.m_flagsBuffer.data[e];
	}
	SetFlagsBuffer(e) {
		this.SetUserOverridableBuffer(this.m_flagsBuffer, e);
	}
	SetPositionBuffer(e) {
		if (e instanceof Float32Array) {
			if (e.length % 2 != 0) throw Error();
			let t = e.length / 2, n = Array(t);
			for (let r = 0; r < t; ++r) n[r] = new re(e.subarray(r * 2, r * 2 + 2));
			e = n;
		}
		this.SetUserOverridableBuffer(this.m_positionBuffer, e);
	}
	SetVelocityBuffer(e) {
		if (e instanceof Float32Array) {
			if (e.length % 2 != 0) throw Error();
			let t = e.length / 2, n = Array(t);
			for (let r = 0; r < t; ++r) n[r] = new re(e.subarray(r * 2, r * 2 + 2));
			e = n;
		}
		this.SetUserOverridableBuffer(this.m_velocityBuffer, e);
	}
	SetColorBuffer(e) {
		if (e instanceof Float32Array) {
			if (e.length % 4 != 0) throw Error();
			let n = e.length / 4, r = Array(n);
			for (let i = 0; i < n; ++i) r[i] = new t(e.subarray(i * 4, i * 4 + 4));
			e = r;
		}
		this.SetUserOverridableBuffer(this.m_colorBuffer, e);
	}
	SetUserDataBuffer(e) {
		this.SetUserOverridableBuffer(this.m_userDataBuffer, e);
	}
	GetContacts() {
		return this.m_contactBuffer.data;
	}
	GetContactCount() {
		return this.m_contactBuffer.count;
	}
	GetBodyContacts() {
		return this.m_bodyContactBuffer.data;
	}
	GetBodyContactCount() {
		return this.m_bodyContactBuffer.count;
	}
	GetPairs() {
		return this.m_pairBuffer.data;
	}
	GetPairCount() {
		return this.m_pairBuffer.count;
	}
	GetTriads() {
		return this.m_triadBuffer.data;
	}
	GetTriadCount() {
		return this.m_triadBuffer.count;
	}
	SetStuckThreshold(e) {
		this.m_stuckThreshold = e, e > 0 && (this.m_lastBodyContactStepBuffer.data = this.RequestBuffer(this.m_lastBodyContactStepBuffer.data), this.m_bodyContactCountBuffer.data = this.RequestBuffer(this.m_bodyContactCountBuffer.data), this.m_consecutiveContactStepsBuffer.data = this.RequestBuffer(this.m_consecutiveContactStepsBuffer.data));
	}
	GetStuckCandidates() {
		return this.m_stuckParticleBuffer.Data();
	}
	GetStuckCandidateCount() {
		return this.m_stuckParticleBuffer.GetCount();
	}
	ComputeCollisionEnergy() {
		let e = n.ComputeCollisionEnergy_s_v, t = this.m_velocityBuffer.data, r = 0;
		for (let n = 0; n < this.m_contactBuffer.count; n++) {
			let i = this.m_contactBuffer.data[n], a = i.indexA, o = i.indexB, s = i.normal, c = M.SubVV(t[o], t[a], e), l = M.DotVV(c, s);
			l < 0 && (r += l * l);
		}
		return .5 * this.GetParticleMass() * r;
	}
	static ComputeCollisionEnergy_s_v = new M();
	SetStrictContactCheck(e) {
		this.m_def.strictContactCheck = e;
	}
	GetStrictContactCheck() {
		return this.m_def.strictContactCheck;
	}
	SetParticleLifetime(e, t) {
		let n = this.m_indexByExpirationTimeBuffer.data === null;
		if (this.m_expirationTimeBuffer.data = this.RequestBuffer(this.m_expirationTimeBuffer.data), this.m_indexByExpirationTimeBuffer.data = this.RequestBuffer(this.m_indexByExpirationTimeBuffer.data), n) {
			let e = this.GetParticleCount();
			for (let t = 0; t < e; ++t) this.m_indexByExpirationTimeBuffer.data[t] = t;
		}
		let r = t / this.m_def.lifetimeGranularity, i = r > 0 ? this.GetQuantizedTimeElapsed() + r : r;
		i !== this.m_expirationTimeBuffer.data[e] && (this.m_expirationTimeBuffer.data[e] = i, this.m_expirationTimeBufferRequiresSorting = !0);
	}
	GetParticleLifetime(e) {
		return this.ExpirationTimeToLifetime(this.GetExpirationTimeBuffer()[e]);
	}
	SetDestructionByAge(e) {
		e && this.GetExpirationTimeBuffer(), this.m_def.destroyByAge = e;
	}
	GetDestructionByAge() {
		return this.m_def.destroyByAge;
	}
	GetExpirationTimeBuffer() {
		return this.m_expirationTimeBuffer.data = this.RequestBuffer(this.m_expirationTimeBuffer.data), this.m_expirationTimeBuffer.data;
	}
	ExpirationTimeToLifetime(e) {
		return (e > 0 ? e - this.GetQuantizedTimeElapsed() : e) * this.m_def.lifetimeGranularity;
	}
	GetIndexByExpirationTimeBuffer() {
		return this.GetParticleCount() ? this.SetParticleLifetime(0, this.GetParticleLifetime(0)) : this.m_indexByExpirationTimeBuffer.data = this.RequestBuffer(this.m_indexByExpirationTimeBuffer.data), this.m_indexByExpirationTimeBuffer.data;
	}
	ParticleApplyLinearImpulse(e, t) {
		this.ApplyLinearImpulse(e, e + 1, t);
	}
	ApplyLinearImpulse(e, t, n) {
		let r = this.m_velocityBuffer.data, i = (t - e) * this.GetParticleMass(), a = new M().Copy(n).SelfMul(1 / i);
		for (let n = e; n < t; n++) r[n].SelfAdd(a);
	}
	static IsSignificantForce(e) {
		return e.x !== 0 || e.y !== 0;
	}
	ParticleApplyForce(e, t) {
		n.IsSignificantForce(t) && this.ForceCanBeApplied(this.m_flagsBuffer.data[e]) && (this.PrepareForceBuffer(), this.m_forceBuffer[e].SelfAdd(t));
	}
	ApplyForce(e, t, r) {
		let i = new M().Copy(r).SelfMul(1 / (t - e));
		if (n.IsSignificantForce(i)) {
			this.PrepareForceBuffer();
			for (let n = e; n < t; n++) this.m_forceBuffer[n].SelfAdd(i);
		}
	}
	GetNext() {
		return this.m_next;
	}
	QueryAABB(e, t) {
		if (this.m_proxyBuffer.count === 0) return;
		let r = this.m_proxyBuffer.count, i = zr(this.m_proxyBuffer.data, 0, r, n.computeTag(this.m_inverseDiameter * t.lowerBound.x, this.m_inverseDiameter * t.lowerBound.y), Xr.CompareProxyTag), a = Br(this.m_proxyBuffer.data, i, r, n.computeTag(this.m_inverseDiameter * t.upperBound.x, this.m_inverseDiameter * t.upperBound.y), Xr.CompareTagProxy), o = this.m_positionBuffer.data;
		for (let n = i; n < a; ++n) {
			let r = this.m_proxyBuffer.data[n].index, i = o[r];
			if (t.lowerBound.x < i.x && i.x < t.upperBound.x && t.lowerBound.y < i.y && i.y < t.upperBound.y && !e.ReportParticle(this, r)) break;
		}
	}
	QueryShapeAABB(e, t, r, i = 0) {
		let a = n.QueryShapeAABB_s_aabb;
		t.ComputeAABB(a, r, i), this.QueryAABB(e, a);
	}
	static QueryShapeAABB_s_aabb = new V();
	QueryPointAABB(e, t, r = c) {
		let i = n.QueryPointAABB_s_aabb;
		i.lowerBound.Set(t.x - r, t.y - r), i.upperBound.Set(t.x + r, t.y + r), this.QueryAABB(e, i);
	}
	static QueryPointAABB_s_aabb = new V();
	RayCast(e, t, r) {
		let i = n.RayCast_s_aabb, a = n.RayCast_s_p, o = n.RayCast_s_v, s = n.RayCast_s_n, c = n.RayCast_s_point;
		if (this.m_proxyBuffer.count === 0) return;
		let l = this.m_positionBuffer.data, u = i;
		M.MinV(t, r, u.lowerBound), M.MaxV(t, r, u.upperBound);
		let d = 1, f = M.SubVV(r, t, o), p = M.DotVV(f, f), m = this.GetInsideBoundsEnumerator(u), h;
		for (; (h = m.GetNext()) >= 0;) {
			let n = M.SubVV(t, l[h], a), r = M.DotVV(n, f), i = M.DotVV(n, n), o = r * r - p * (i - this.m_squaredDiameter);
			if (o >= 0) {
				let i = j(o), a = (-r - i) / p;
				if (a > d || a < 0 && (a = (-r + i) / p, a < 0 || a > d)) continue;
				let l = M.AddVMulSV(n, a, f, s);
				l.Normalize();
				let u = e.ReportParticle(this, h, M.AddVMulSV(t, a, f, c), l, a);
				if (d = D(d, u), d <= 0) break;
			}
		}
	}
	static RayCast_s_aabb = new V();
	static RayCast_s_p = new M();
	static RayCast_s_v = new M();
	static RayCast_s_n = new M();
	static RayCast_s_point = new M();
	ComputeAABB(e) {
		let t = this.GetParticleCount();
		e.lowerBound.x = +i, e.lowerBound.y = +i, e.upperBound.x = -i, e.upperBound.y = -i;
		let n = this.m_positionBuffer.data;
		for (let r = 0; r < t; r++) {
			let t = n[r];
			M.MinV(e.lowerBound, t, e.lowerBound), M.MaxV(e.upperBound, t, e.upperBound);
		}
		e.lowerBound.x -= this.m_particleDiameter, e.lowerBound.y -= this.m_particleDiameter, e.upperBound.x += this.m_particleDiameter, e.upperBound.y += this.m_particleDiameter;
	}
	static k_pairFlags = Y.b2_springParticle;
	static k_triadFlags = Y.b2_elasticParticle;
	static k_noPressureFlags = Y.b2_powderParticle | Y.b2_tensileParticle;
	static k_extraDampingFlags = Y.b2_staticPressureParticle;
	static k_barrierWallFlags = Y.b2_barrierParticle | Y.b2_wallParticle;
	FreeBuffer(e, t) {
		e !== null && (e.length = 0);
	}
	FreeUserOverridableBuffer(e) {
		e.userSuppliedCapacity === 0 && this.FreeBuffer(e.data, this.m_internalAllocatedCapacity);
	}
	ReallocateBuffer3(e, t, n) {
		if (n <= t) throw Error();
		let r = e ? e.slice() : [];
		return r.length = n, r;
	}
	ReallocateBuffer5(e, t, n, r, i) {
		if (r <= n || !(!t || r <= t)) throw Error();
		return (!i || e) && !t && (e = this.ReallocateBuffer3(e, n, r)), e;
	}
	ReallocateBuffer4(e, t, n, r) {
		return this.ReallocateBuffer5(e.data, e.userSuppliedCapacity, t, n, r);
	}
	RequestBuffer(e) {
		return e || (this.m_internalAllocatedCapacity === 0 && this.ReallocateInternalAllocatedBuffers(256), e = [], e.length = this.m_internalAllocatedCapacity), e;
	}
	ReallocateHandleBuffers(e) {
		this.m_handleIndexBuffer.data = this.ReallocateBuffer4(this.m_handleIndexBuffer, this.m_internalAllocatedCapacity, e, !0);
	}
	ReallocateInternalAllocatedBuffers(e) {
		function t(e, t) {
			return t && e > t ? t : e;
		}
		if (e = t(e, this.m_def.maxCount), e = t(e, this.m_flagsBuffer.userSuppliedCapacity), e = t(e, this.m_positionBuffer.userSuppliedCapacity), e = t(e, this.m_velocityBuffer.userSuppliedCapacity), e = t(e, this.m_colorBuffer.userSuppliedCapacity), e = t(e, this.m_userDataBuffer.userSuppliedCapacity), this.m_internalAllocatedCapacity < e) {
			this.ReallocateHandleBuffers(e), this.m_flagsBuffer.data = this.ReallocateBuffer4(this.m_flagsBuffer, this.m_internalAllocatedCapacity, e, !1);
			let t = this.m_stuckThreshold > 0;
			this.m_lastBodyContactStepBuffer.data = this.ReallocateBuffer4(this.m_lastBodyContactStepBuffer, this.m_internalAllocatedCapacity, e, t), this.m_bodyContactCountBuffer.data = this.ReallocateBuffer4(this.m_bodyContactCountBuffer, this.m_internalAllocatedCapacity, e, t), this.m_consecutiveContactStepsBuffer.data = this.ReallocateBuffer4(this.m_consecutiveContactStepsBuffer, this.m_internalAllocatedCapacity, e, t), this.m_positionBuffer.data = this.ReallocateBuffer4(this.m_positionBuffer, this.m_internalAllocatedCapacity, e, !1), this.m_velocityBuffer.data = this.ReallocateBuffer4(this.m_velocityBuffer, this.m_internalAllocatedCapacity, e, !1), this.m_forceBuffer = this.ReallocateBuffer5(this.m_forceBuffer, 0, this.m_internalAllocatedCapacity, e, !1), this.m_weightBuffer = this.ReallocateBuffer5(this.m_weightBuffer, 0, this.m_internalAllocatedCapacity, e, !1), this.m_staticPressureBuffer = this.ReallocateBuffer5(this.m_staticPressureBuffer, 0, this.m_internalAllocatedCapacity, e, !0), this.m_accumulationBuffer = this.ReallocateBuffer5(this.m_accumulationBuffer, 0, this.m_internalAllocatedCapacity, e, !1), this.m_accumulation2Buffer = this.ReallocateBuffer5(this.m_accumulation2Buffer, 0, this.m_internalAllocatedCapacity, e, !0), this.m_depthBuffer = this.ReallocateBuffer5(this.m_depthBuffer, 0, this.m_internalAllocatedCapacity, e, !0), this.m_colorBuffer.data = this.ReallocateBuffer4(this.m_colorBuffer, this.m_internalAllocatedCapacity, e, !0), this.m_groupBuffer = this.ReallocateBuffer5(this.m_groupBuffer, 0, this.m_internalAllocatedCapacity, e, !1), this.m_userDataBuffer.data = this.ReallocateBuffer4(this.m_userDataBuffer, this.m_internalAllocatedCapacity, e, !0), this.m_expirationTimeBuffer.data = this.ReallocateBuffer4(this.m_expirationTimeBuffer, this.m_internalAllocatedCapacity, e, !0), this.m_indexByExpirationTimeBuffer.data = this.ReallocateBuffer4(this.m_indexByExpirationTimeBuffer, this.m_internalAllocatedCapacity, e, !1), this.m_internalAllocatedCapacity = e;
		}
	}
	CreateParticleForGroup(t, n, i) {
		let a = new Er();
		a.flags = r(t.flags, 0), I.MulXV(n, i, a.position), M.AddVV(r(t.linearVelocity, M.ZERO), M.CrossSV(r(t.angularVelocity, 0), M.SubVV(a.position, r(t.position, M.ZERO), M.s_t0), M.s_t0), a.velocity), a.color.Copy(r(t.color, e.ZERO)), a.lifetime = r(t.lifetime, 0), a.userData = t.userData, this.CreateParticle(a);
	}
	CreateParticlesStrokeShapeForGroup(e, t, i) {
		let a = n.CreateParticlesStrokeShapeForGroup_s_edge, o = n.CreateParticlesStrokeShapeForGroup_s_d, s = n.CreateParticlesStrokeShapeForGroup_s_p, c = r(t.stride, 0);
		c === 0 && (c = this.GetParticleStride());
		let l = 0, u = e.GetChildCount();
		for (let n = 0; n < u; n++) {
			let r = null;
			e.GetType() === U.e_edgeShape ? r = e : (r = a, e.GetChildEdge(r, n));
			let u = M.SubVV(r.m_vertex2, r.m_vertex1, o), d = u.Length();
			for (; l < d;) {
				let e = M.AddVMulSV(r.m_vertex1, l / d, u, s);
				this.CreateParticleForGroup(t, i, e), l += c;
			}
			l -= d;
		}
	}
	static CreateParticlesStrokeShapeForGroup_s_edge = new We();
	static CreateParticlesStrokeShapeForGroup_s_d = new M();
	static CreateParticlesStrokeShapeForGroup_s_p = new M();
	CreateParticlesFillShapeForGroup(e, t, i) {
		let a = n.CreateParticlesFillShapeForGroup_s_aabb, o = n.CreateParticlesFillShapeForGroup_s_p, s = r(t.stride, 0);
		s === 0 && (s = this.GetParticleStride());
		let c = I.IDENTITY, l = a;
		e.ComputeAABB(l, c, 0);
		for (let n = Math.floor(l.lowerBound.y / s) * s; n < l.upperBound.y; n += s) for (let r = Math.floor(l.lowerBound.x / s) * s; r < l.upperBound.x; r += s) {
			let a = o.Set(r, n);
			e.TestPoint(c, a) && this.CreateParticleForGroup(t, i, a);
		}
	}
	static CreateParticlesFillShapeForGroup_s_aabb = new V();
	static CreateParticlesFillShapeForGroup_s_p = new M();
	CreateParticlesWithShapeForGroup(e, t, n) {
		switch (e.GetType()) {
			case U.e_edgeShape:
			case U.e_chainShape:
				this.CreateParticlesStrokeShapeForGroup(e, t, n);
				break;
			case U.e_polygonShape:
			case U.e_circleShape: this.CreateParticlesFillShapeForGroup(e, t, n);
		}
	}
	CreateParticlesWithShapesForGroup(e, t, n, r) {
		let i = new ai(e, t);
		this.CreateParticlesFillShapeForGroup(i, n, r);
	}
	CloneParticle(e, t) {
		let n = new Er();
		n.flags = this.m_flagsBuffer.data[e], n.position.Copy(this.m_positionBuffer.data[e]), n.velocity.Copy(this.m_velocityBuffer.data[e]), this.m_colorBuffer.data && n.color.Copy(this.m_colorBuffer.data[e]), this.m_userDataBuffer.data && (n.userData = this.m_userDataBuffer.data[e]), n.group = t;
		let r = this.CreateParticle(n);
		if (this.m_handleIndexBuffer.data) {
			let t = this.m_handleIndexBuffer.data[e];
			t && t.SetIndex(r), this.m_handleIndexBuffer.data[r] = t, this.m_handleIndexBuffer.data[e] = null;
		}
		return this.m_lastBodyContactStepBuffer.data && (this.m_lastBodyContactStepBuffer.data[r] = this.m_lastBodyContactStepBuffer.data[e]), this.m_bodyContactCountBuffer.data && (this.m_bodyContactCountBuffer.data[r] = this.m_bodyContactCountBuffer.data[e]), this.m_consecutiveContactStepsBuffer.data && (this.m_consecutiveContactStepsBuffer.data[r] = this.m_consecutiveContactStepsBuffer.data[e]), this.m_hasForce && this.m_forceBuffer[r].Copy(this.m_forceBuffer[e]), this.m_staticPressureBuffer && (this.m_staticPressureBuffer[r] = this.m_staticPressureBuffer[e]), this.m_depthBuffer && (this.m_depthBuffer[r] = this.m_depthBuffer[e]), this.m_expirationTimeBuffer.data && (this.m_expirationTimeBuffer.data[r] = this.m_expirationTimeBuffer.data[e]), r;
	}
	DestroyParticlesInGroup(e, t = !1) {
		for (let n = e.m_firstIndex; n < e.m_lastIndex; n++) this.DestroyParticle(n, t);
	}
	DestroyParticleGroup(e) {
		this.m_world.m_destructionListener && this.m_world.m_destructionListener.SayGoodbyeParticleGroup(e), this.SetGroupFlags(e, 0);
		for (let t = e.m_firstIndex; t < e.m_lastIndex; t++) this.m_groupBuffer[t] = null;
		e.m_prev && (e.m_prev.m_next = e.m_next), e.m_next && (e.m_next.m_prev = e.m_prev), e === this.m_groupList && (this.m_groupList = e.m_next), --this.m_groupCount;
	}
	static ParticleCanBeConnected(e, t) {
		return (e & (Y.b2_wallParticle | Y.b2_springParticle | Y.b2_elasticParticle)) !== 0 || t !== null && (t.GetGroupFlags() & X.b2_rigidParticleGroup) !== 0;
	}
	UpdatePairsAndTriads(e, t, r) {
		let i = n.UpdatePairsAndTriads_s_dab, a = n.UpdatePairsAndTriads_s_dbc, o = n.UpdatePairsAndTriads_s_dca, s = this.m_positionBuffer.data, c = 0;
		for (let n = e; n < t; n++) c |= this.m_flagsBuffer.data[n];
		if (c & n.k_pairFlags) for (let i = 0; i < this.m_contactBuffer.count; i++) {
			let a = this.m_contactBuffer.data[i], o = a.indexA, c = a.indexB, l = this.m_flagsBuffer.data[o], u = this.m_flagsBuffer.data[c], d = this.m_groupBuffer[o], f = this.m_groupBuffer[c];
			if (o >= e && o < t && c >= e && c < t && !((l | u) & Y.b2_zombieParticle) && (l | u) & n.k_pairFlags && (r.IsNecessary(o) || r.IsNecessary(c)) && n.ParticleCanBeConnected(l, d) && n.ParticleCanBeConnected(u, f) && r.ShouldCreatePair(o, c)) {
				let e = this.m_pairBuffer.data[this.m_pairBuffer.Append()];
				e.indexA = o, e.indexB = c, e.flags = a.flags, e.strength = D(d ? d.m_strength : 1, f ? f.m_strength : 1), e.distance = M.DistanceVV(s[o], s[c]);
			}
			Lr(this.m_pairBuffer.data, 0, this.m_pairBuffer.count, n.ComparePairIndices), this.m_pairBuffer.Unique(n.MatchPairIndices);
		}
		if (c & n.k_triadFlags) {
			let c = new Mr(t - e);
			for (let i = e; i < t; i++) {
				let e = this.m_flagsBuffer.data[i], t = this.m_groupBuffer[i];
				!(e & Y.b2_zombieParticle) && n.ParticleCanBeConnected(e, t) && c.AddGenerator(s[i], i, r.IsNecessary(i));
			}
			let l = this.GetParticleStride();
			c.Generate(l / 2, l * 2);
			let u = this;
			c.GetNodes((e, t, c) => {
				let l = u.m_flagsBuffer.data[e], d = u.m_flagsBuffer.data[t], f = u.m_flagsBuffer.data[c];
				if ((l | d | f) & n.k_triadFlags && r.ShouldCreateTriad(e, t, c)) {
					let n = s[e], r = s[t], p = s[c], m = M.SubVV(n, r, i), h = M.SubVV(r, p, a), g = M.SubVV(p, n, o), _ = 4 * u.m_squaredDiameter;
					if (M.DotVV(m, m) > _ || M.DotVV(h, h) > _ || M.DotVV(g, g) > _) return;
					let v = u.m_groupBuffer[e], y = u.m_groupBuffer[t], b = u.m_groupBuffer[c], x = u.m_triadBuffer.data[u.m_triadBuffer.Append()];
					x.indexA = e, x.indexB = t, x.indexC = c, x.flags = l | d | f, x.strength = D(D(v ? v.m_strength : 1, y ? y.m_strength : 1), b ? b.m_strength : 1);
					let S = (n.x + r.x + p.x) / 3, C = (n.y + r.y + p.y) / 3;
					x.pa.x = n.x - S, x.pa.y = n.y - C, x.pb.x = r.x - S, x.pb.y = r.y - C, x.pc.x = p.x - S, x.pc.y = p.y - C, x.ka = -M.DotVV(g, m), x.kb = -M.DotVV(m, h), x.kc = -M.DotVV(h, g), x.s = M.CrossVV(n, r) + M.CrossVV(r, p) + M.CrossVV(p, n);
				}
			}), Lr(this.m_triadBuffer.data, 0, this.m_triadBuffer.count, n.CompareTriadIndices), this.m_triadBuffer.Unique(n.MatchTriadIndices);
		}
	}
	static UpdatePairsAndTriads_s_dab = new M();
	static UpdatePairsAndTriads_s_dbc = new M();
	static UpdatePairsAndTriads_s_dca = new M();
	UpdatePairsAndTriadsWithReactiveParticles() {
		let e = new oi(this.m_flagsBuffer);
		this.UpdatePairsAndTriads(0, this.m_count, e);
		for (let e = 0; e < this.m_count; e++) this.m_flagsBuffer.data[e] &= ~Y.b2_reactiveParticle;
		this.m_allParticleFlags &= ~Y.b2_reactiveParticle;
	}
	static ComparePairIndices(e, t) {
		let n = e.indexA - t.indexA;
		return n === 0 ? e.indexB < t.indexB : n < 0;
	}
	static MatchPairIndices(e, t) {
		return e.indexA === t.indexA && e.indexB === t.indexB;
	}
	static CompareTriadIndices(e, t) {
		let n = e.indexA - t.indexA;
		if (n !== 0) return n < 0;
		let r = e.indexB - t.indexB;
		return r === 0 ? e.indexC < t.indexC : r < 0;
	}
	static MatchTriadIndices(e, t) {
		return e.indexA === t.indexA && e.indexB === t.indexB && e.indexC === t.indexC;
	}
	static InitializeParticleLists(e, t) {
		let n = e.GetBufferIndex(), r = e.GetParticleCount();
		for (let e = 0; e < r; e++) {
			let r = t[e];
			r.list = r, r.next = null, r.count = 1, r.index = e + n;
		}
	}
	MergeParticleListsInContact(e, t) {
		let r = e.GetBufferIndex();
		for (let i = 0; i < this.m_contactBuffer.count; i++) {
			let a = this.m_contactBuffer.data[i], o = a.indexA, s = a.indexB;
			if (!e.ContainsParticle(o) || !e.ContainsParticle(s)) continue;
			let c = t[o - r].list, l = t[s - r].list;
			if (c !== l) {
				if (c.count < l.count) {
					let e = c;
					c = l, l = e;
				}
				n.MergeParticleLists(c, l);
			}
		}
	}
	static MergeParticleLists(e, t) {
		for (let n = t;;) {
			n.list = e;
			let t = n.next;
			if (t) n = t;
			else {
				n.next = e.next;
				break;
			}
		}
		e.next = t, e.count += t.count, t.count = 0;
	}
	static FindLongestParticleList(e, t) {
		let n = e.GetParticleCount(), r = t[0];
		for (let e = 0; e < n; e++) {
			let n = t[e];
			r.count < n.count && (r = n);
		}
		return r;
	}
	MergeZombieParticleListNodes(e, t, r) {
		let i = e.GetParticleCount();
		for (let e = 0; e < i; e++) {
			let i = t[e];
			i !== r && this.m_flagsBuffer.data[i.index] & Y.b2_zombieParticle && n.MergeParticleListAndNode(r, i);
		}
	}
	static MergeParticleListAndNode(e, t) {
		t.list = e, t.next = e.next, e.next = t, e.count++, t.count = 0;
	}
	CreateParticleGroupsFromParticleList(e, t, n) {
		let r = e.GetParticleCount(), i = new kr();
		i.groupFlags = e.GetGroupFlags(), i.userData = e.GetUserData();
		for (let e = 0; e < r; e++) {
			let r = t[e];
			if (!r.count || r === n) continue;
			let a = this.CreateParticleGroup(i);
			for (let e = r; e; e = e.next) {
				let t = e.index, n = this.CloneParticle(t, a);
				this.m_flagsBuffer.data[t] |= Y.b2_zombieParticle, e.index = n;
			}
		}
	}
	UpdatePairsAndTriadsWithParticleList(e, t) {
		let n = e.GetBufferIndex();
		for (let r = 0; r < this.m_pairBuffer.count; r++) {
			let i = this.m_pairBuffer.data[r], a = i.indexA, o = i.indexB;
			e.ContainsParticle(a) && (i.indexA = t[a - n].index), e.ContainsParticle(o) && (i.indexB = t[o - n].index);
		}
		for (let r = 0; r < this.m_triadBuffer.count; r++) {
			let i = this.m_triadBuffer.data[r], a = i.indexA, o = i.indexB, s = i.indexC;
			e.ContainsParticle(a) && (i.indexA = t[a - n].index), e.ContainsParticle(o) && (i.indexB = t[o - n].index), e.ContainsParticle(s) && (i.indexC = t[s - n].index);
		}
	}
	ComputeDepth() {
		let e = [], t = 0;
		for (let n = 0; n < this.m_contactBuffer.count; n++) {
			let r = this.m_contactBuffer.data[n], i = r.indexA, a = r.indexB, o = this.m_groupBuffer[i], s = this.m_groupBuffer[a];
			o && o === s && o.m_groupFlags & X.b2_particleGroupNeedsUpdateDepth && (e[t++] = r);
		}
		let n = [], r = 0;
		for (let e = this.m_groupList; e; e = e.GetNext()) if (e.m_groupFlags & X.b2_particleGroupNeedsUpdateDepth) {
			n[r++] = e, this.SetGroupFlags(e, e.m_groupFlags & ~X.b2_particleGroupNeedsUpdateDepth);
			for (let t = e.m_firstIndex; t < e.m_lastIndex; t++) this.m_accumulationBuffer[t] = 0;
		}
		for (let n = 0; n < t; n++) {
			let t = e[n], r = t.indexA, i = t.indexB, a = t.weight;
			this.m_accumulationBuffer[r] += a, this.m_accumulationBuffer[i] += a;
		}
		for (let e = 0; e < r; e++) {
			let t = n[e];
			for (let e = t.m_firstIndex; e < t.m_lastIndex; e++) {
				let t = this.m_accumulationBuffer[e];
				this.m_depthBuffer[e] = t < .8 ? 0 : i;
			}
		}
		let a = j(this.m_count) >> 0;
		for (let n = 0; n < a; n++) {
			let n = !1;
			for (let r = 0; r < t; r++) {
				let t = e[r], i = t.indexA, a = t.indexB, o = 1 - t.weight, s = this.m_depthBuffer[i], c = this.m_depthBuffer[a], l = c + o, u = s + o;
				s > l && (this.m_depthBuffer[i] = l, n = !0), c > u && (this.m_depthBuffer[a] = u, n = !0);
			}
			if (!n) break;
		}
		for (let e = 0; e < r; e++) {
			let t = n[e];
			for (let e = t.m_firstIndex; e < t.m_lastIndex; e++) this.m_depthBuffer[e] < 1e37 ? this.m_depthBuffer[e] *= this.m_particleDiameter : this.m_depthBuffer[e] = 0;
		}
	}
	GetInsideBoundsEnumerator(e) {
		let t = n.computeTag(this.m_inverseDiameter * e.lowerBound.x - 1, this.m_inverseDiameter * e.lowerBound.y - 1), r = n.computeTag(this.m_inverseDiameter * e.upperBound.x + 1, this.m_inverseDiameter * e.upperBound.y + 1), i = this.m_proxyBuffer.count, a = zr(this.m_proxyBuffer.data, 0, i, t, Xr.CompareProxyTag), o = Br(this.m_proxyBuffer.data, 0, i, r, Xr.CompareTagProxy);
		return new Zr(this, t, r, a, o);
	}
	UpdateAllParticleFlags() {
		this.m_allParticleFlags = 0;
		for (let e = 0; e < this.m_count; e++) this.m_allParticleFlags |= this.m_flagsBuffer.data[e];
		this.m_needsUpdateAllParticleFlags = !1;
	}
	UpdateAllGroupFlags() {
		this.m_allGroupFlags = 0;
		for (let e = this.m_groupList; e; e = e.GetNext()) this.m_allGroupFlags |= e.m_groupFlags;
		this.m_needsUpdateAllGroupFlags = !1;
	}
	AddContact(e, t, r) {
		let i = this.m_flagsBuffer.data, a = this.m_positionBuffer.data, o = M.SubVV(a[t], a[e], n.AddContact_s_d), s = M.DotVV(o, o);
		if (0 < s && s < this.m_squaredDiameter) {
			let n = ee(s), r = this.m_contactBuffer.data[this.m_contactBuffer.Append()];
			r.indexA = e, r.indexB = t, r.flags = i[e] | i[t], r.weight = 1 - s * n * this.m_inverseDiameter, r.normal.x = n * o.x, r.normal.y = n * o.y;
		}
	}
	static AddContact_s_d = new M();
	FindContacts_Reference(e) {
		let t = this.m_proxyBuffer.count;
		this.m_contactBuffer.count = 0;
		for (let e = 0, r = 0; e < t; e++) {
			let i = n.computeRelativeTag(this.m_proxyBuffer.data[e].tag, 1, 0);
			for (let n = e + 1; n < t && !(i < this.m_proxyBuffer.data[n].tag); n++) this.AddContact(this.m_proxyBuffer.data[e].index, this.m_proxyBuffer.data[n].index, this.m_contactBuffer);
			let a = n.computeRelativeTag(this.m_proxyBuffer.data[e].tag, -1, 1);
			for (; r < t && !(a <= this.m_proxyBuffer.data[r].tag); r++);
			let o = n.computeRelativeTag(this.m_proxyBuffer.data[e].tag, 1, 1);
			for (let n = r; n < t && !(o < this.m_proxyBuffer.data[n].tag); n++) this.AddContact(this.m_proxyBuffer.data[e].index, this.m_proxyBuffer.data[n].index, this.m_contactBuffer);
		}
	}
	FindContacts(e) {
		this.FindContacts_Reference(e);
	}
	UpdateProxies_Reference(e) {
		let t = this.m_positionBuffer.data, r = this.m_inverseDiameter;
		for (let e = 0; e < this.m_proxyBuffer.count; ++e) {
			let i = this.m_proxyBuffer.data[e], a = t[i.index];
			i.tag = n.computeTag(r * a.x, r * a.y);
		}
	}
	UpdateProxies(e) {
		this.UpdateProxies_Reference(e);
	}
	SortProxies(e) {
		Ir(this.m_proxyBuffer.data, 0, this.m_proxyBuffer.count, Xr.CompareProxyProxy);
	}
	FilterContacts(e) {
		let t = this.GetParticleContactFilter();
		if (t === null) return;
		let n = this;
		this.m_contactBuffer.RemoveIf((e) => (e.flags & Y.b2_particleContactFilterParticle) !== 0 && !t.ShouldCollideParticleParticle(n, e.indexA, e.indexB));
	}
	NotifyContactListenerPreContact(e) {
		if (this.GetParticleContactListener() !== null) throw e.Initialize(this.m_contactBuffer, this.m_flagsBuffer), Error();
	}
	NotifyContactListenerPostContact(e) {
		let t = this.GetParticleContactListener();
		if (t !== null) {
			for (let e = 0; e < this.m_contactBuffer.count; ++e) {
				let n = this.m_contactBuffer.data[e];
				t.BeginContactParticleParticle(this, n);
			}
			throw Error();
		}
	}
	static b2ParticleContactIsZombie(e) {
		return (e.flags & Y.b2_zombieParticle) === Y.b2_zombieParticle;
	}
	UpdateContacts(e) {
		this.UpdateProxies(this.m_proxyBuffer), this.SortProxies(this.m_proxyBuffer);
		let t = new ti();
		this.NotifyContactListenerPreContact(t), this.FindContacts(this.m_contactBuffer), this.FilterContacts(this.m_contactBuffer), this.NotifyContactListenerPostContact(t), e && this.m_contactBuffer.RemoveIf(n.b2ParticleContactIsZombie);
	}
	NotifyBodyContactListenerPreContact(e) {
		if (this.GetFixtureContactListener() !== null) throw e.Initialize(this.m_bodyContactBuffer, this.m_flagsBuffer), Error();
	}
	NotifyBodyContactListenerPostContact(e) {
		let t = this.GetFixtureContactListener();
		if (t !== null) {
			for (let e = 0; e < this.m_bodyContactBuffer.count; e++) {
				let n = this.m_bodyContactBuffer.data[e];
				t.BeginContactFixtureParticle(this, n);
			}
			throw Error();
		}
	}
	UpdateBodyContacts() {
		let e = n.UpdateBodyContacts_s_aabb, t = new ei();
		if (this.NotifyBodyContactListenerPreContact(t), this.m_stuckThreshold > 0) {
			let e = this.GetParticleCount();
			for (let t = 0; t < e; t++) this.m_bodyContactCountBuffer.data[t] = 0, this.m_timestamp > this.m_lastBodyContactStepBuffer.data[t] + 1 && (this.m_consecutiveContactStepsBuffer.data[t] = 0);
		}
		this.m_bodyContactBuffer.SetCount(0), this.m_stuckParticleBuffer.SetCount(0);
		let r = e;
		this.ComputeAABB(r), this.UpdateBodyContacts_callback === null && (this.UpdateBodyContacts_callback = new si(this));
		let i = this.UpdateBodyContacts_callback;
		i.m_contactFilter = this.GetFixtureContactFilter(), this.m_world.QueryAABB(i, r), this.m_def.strictContactCheck && this.RemoveSpuriousBodyContacts(), this.NotifyBodyContactListenerPostContact(t);
	}
	static UpdateBodyContacts_s_aabb = new V();
	UpdateBodyContacts_callback = null;
	Solve(e) {
		let t = n.Solve_s_subStep;
		if (this.m_count !== 0 && (this.m_expirationTimeBuffer.data && this.SolveLifetimes(e), this.m_allParticleFlags & Y.b2_zombieParticle && this.SolveZombie(), this.m_needsUpdateAllParticleFlags && this.UpdateAllParticleFlags(), this.m_needsUpdateAllGroupFlags && this.UpdateAllGroupFlags(), !this.m_paused)) for (this.m_iterationIndex = 0; this.m_iterationIndex < e.particleIterations; this.m_iterationIndex++) {
			++this.m_timestamp;
			let r = t.Copy(e);
			r.dt /= e.particleIterations, r.inv_dt *= e.particleIterations, this.UpdateContacts(!1), this.UpdateBodyContacts(), this.ComputeWeight(), this.m_allGroupFlags & X.b2_particleGroupNeedsUpdateDepth && this.ComputeDepth(), this.m_allParticleFlags & Y.b2_reactiveParticle && this.UpdatePairsAndTriadsWithReactiveParticles(), this.m_hasForce && this.SolveForce(r), this.m_allParticleFlags & Y.b2_viscousParticle && this.SolveViscous(), this.m_allParticleFlags & Y.b2_repulsiveParticle && this.SolveRepulsive(r), this.m_allParticleFlags & Y.b2_powderParticle && this.SolvePowder(r), this.m_allParticleFlags & Y.b2_tensileParticle && this.SolveTensile(r), this.m_allGroupFlags & X.b2_solidParticleGroup && this.SolveSolid(r), this.m_allParticleFlags & Y.b2_colorMixingParticle && this.SolveColorMixing(), this.SolveGravity(r), this.m_allParticleFlags & Y.b2_staticPressureParticle && this.SolveStaticPressure(r), this.SolvePressure(r), this.SolveDamping(r), this.m_allParticleFlags & n.k_extraDampingFlags && this.SolveExtraDamping(), this.m_allParticleFlags & Y.b2_elasticParticle && this.SolveElastic(r), this.m_allParticleFlags & Y.b2_springParticle && this.SolveSpring(r), this.LimitVelocity(r), this.m_allGroupFlags & X.b2_rigidParticleGroup && this.SolveRigidDamping(), this.m_allParticleFlags & Y.b2_barrierParticle && this.SolveBarrier(r), this.SolveCollision(r), this.m_allGroupFlags & X.b2_rigidParticleGroup && this.SolveRigid(r), this.m_allParticleFlags & Y.b2_wallParticle && this.SolveWall();
			for (let e = 0; e < this.m_count; e++) this.m_positionBuffer.data[e].SelfMulAdd(r.dt, this.m_velocityBuffer.data[e]);
		}
	}
	static Solve_s_subStep = new ar();
	SolveCollision(e) {
		let t = n.SolveCollision_s_aabb, r = this.m_positionBuffer.data, a = this.m_velocityBuffer.data, o = t;
		o.lowerBound.x = +i, o.lowerBound.y = +i, o.upperBound.x = -i, o.upperBound.y = -i;
		for (let t = 0; t < this.m_count; t++) {
			let n = a[t], i = r[t], s = i.x + e.dt * n.x, c = i.y + e.dt * n.y;
			o.lowerBound.x = D(o.lowerBound.x, D(i.x, s)), o.lowerBound.y = D(o.lowerBound.y, D(i.y, c)), o.upperBound.x = O(o.upperBound.x, O(i.x, s)), o.upperBound.y = O(o.upperBound.y, O(i.y, c));
		}
		this.SolveCollision_callback === null && (this.SolveCollision_callback = new ci(this, e));
		let s = this.SolveCollision_callback;
		s.m_step = e, this.m_world.QueryAABB(s, o);
	}
	static SolveCollision_s_aabb = new V();
	SolveCollision_callback = null;
	LimitVelocity(e) {
		let t = this.m_velocityBuffer.data, n = this.GetCriticalVelocitySquared(e);
		for (let e = 0; e < this.m_count; e++) {
			let r = t[e], i = M.DotVV(r, r);
			i > n && r.SelfMul(j(n / i));
		}
	}
	SolveGravity(e) {
		let t = n.SolveGravity_s_gravity, r = this.m_velocityBuffer.data, i = M.MulSV(e.dt * this.m_def.gravityScale, this.m_world.GetGravity(), t);
		for (let e = 0; e < this.m_count; e++) r[e].SelfAdd(i);
	}
	static SolveGravity_s_gravity = new M();
	SolveBarrier(e) {
		let t = n.SolveBarrier_s_aabb, r = n.SolveBarrier_s_va, i = n.SolveBarrier_s_vb, a = n.SolveBarrier_s_pba, o = n.SolveBarrier_s_vba, s = n.SolveBarrier_s_vc, c = n.SolveBarrier_s_pca, l = n.SolveBarrier_s_vca, u = n.SolveBarrier_s_qba, d = n.SolveBarrier_s_qca, f = n.SolveBarrier_s_dv, p = n.SolveBarrier_s_f, m = this.m_positionBuffer.data, h = this.m_velocityBuffer.data;
		for (let e = 0; e < this.m_count; e++) (this.m_flagsBuffer.data[e] & n.k_barrierWallFlags) !== 0 && h[e].SetZero();
		let g = y * e.dt, _ = this.GetParticleMass();
		for (let n = 0; n < this.m_pairBuffer.count; n++) {
			let v = this.m_pairBuffer.data[n];
			if (v.flags & Y.b2_barrierParticle) {
				let n = v.indexA, y = v.indexB, b = m[n], x = m[y], S = t;
				M.MinV(b, x, S.lowerBound), M.MaxV(b, x, S.upperBound);
				let C = this.m_groupBuffer[n], w = this.m_groupBuffer[y], T = this.GetLinearVelocity(C, n, b, r), E = this.GetLinearVelocity(w, y, x, i), D = M.SubVV(x, b, a), O = M.SubVV(E, T, o), k = this.GetInsideBoundsEnumerator(S), A;
				for (; (A = k.GetNext()) >= 0;) {
					let t = m[A], n = this.m_groupBuffer[A];
					if (C !== n && w !== n) {
						let r = this.GetLinearVelocity(n, A, t, s), i = M.SubVV(t, b, c), a = M.SubVV(r, T, l), o = M.CrossVV(O, a), m = M.CrossVV(D, a) - M.CrossVV(i, O), v = M.CrossVV(D, i), y, x, S = u, C = d;
						if (o === 0) {
							if (m === 0 || (x = -v / m, !(x >= 0 && x < g)) || (M.AddVMulSV(D, x, O, S), M.AddVMulSV(i, x, a, C), y = M.DotVV(S, C) / M.DotVV(S, S), !(y >= 0 && y <= 1))) continue;
						} else {
							let e = m * m - 4 * v * o;
							if (e < 0) continue;
							let t = j(e), n = (-m - t) / (2 * o), r = (-m + t) / (2 * o);
							if (n > r) {
								let e = n;
								n = r, r = e;
							}
							if (x = n, M.AddVMulSV(D, x, O, S), M.AddVMulSV(i, x, a, C), y = M.DotVV(S, C) / M.DotVV(S, S), !(x >= 0 && x < g && y >= 0 && y <= 1) && (x = r, !(x >= 0 && x < g) || (M.AddVMulSV(D, x, O, S), M.AddVMulSV(i, x, a, C), y = M.DotVV(S, C) / M.DotVV(S, S), !(y >= 0 && y <= 1)))) continue;
						}
						let w = f;
						w.x = T.x + y * O.x - r.x, w.y = T.y + y * O.y - r.y;
						let E = M.MulSV(_, w, p);
						if (n && this.IsRigidGroup(n)) {
							let e = n.GetMass(), r = n.GetInertia();
							e > 0 && n.m_linearVelocity.SelfMulAdd(1 / e, E), r > 0 && (n.m_angularVelocity += M.CrossVV(M.SubVV(t, n.GetCenter(), M.s_t0), E) / r);
						} else h[A].SelfAdd(w);
						this.ParticleApplyForce(A, E.SelfMul(-e.inv_dt));
					}
				}
			}
		}
	}
	static SolveBarrier_s_aabb = new V();
	static SolveBarrier_s_va = new M();
	static SolveBarrier_s_vb = new M();
	static SolveBarrier_s_pba = new M();
	static SolveBarrier_s_vba = new M();
	static SolveBarrier_s_vc = new M();
	static SolveBarrier_s_pca = new M();
	static SolveBarrier_s_vca = new M();
	static SolveBarrier_s_qba = new M();
	static SolveBarrier_s_qca = new M();
	static SolveBarrier_s_dv = new M();
	static SolveBarrier_s_f = new M();
	SolveStaticPressure(e) {
		this.m_staticPressureBuffer = this.RequestBuffer(this.m_staticPressureBuffer);
		let t = this.GetCriticalPressure(e), n = this.m_def.staticPressureStrength * t, r = _ * t, i = this.m_def.staticPressureRelaxation;
		for (let e = 0; e < this.m_def.staticPressureIterations; e++) {
			for (let e = 0; e < this.m_count; e++) this.m_accumulationBuffer[e] = 0;
			for (let e = 0; e < this.m_contactBuffer.count; e++) {
				let t = this.m_contactBuffer.data[e];
				if (t.flags & Y.b2_staticPressureParticle) {
					let e = t.indexA, n = t.indexB, r = t.weight;
					this.m_accumulationBuffer[e] += r * this.m_staticPressureBuffer[n], this.m_accumulationBuffer[n] += r * this.m_staticPressureBuffer[e];
				}
			}
			for (let e = 0; e < this.m_count; e++) {
				let t = this.m_weightBuffer[e];
				if (this.m_flagsBuffer.data[e] & Y.b2_staticPressureParticle) {
					let a = (this.m_accumulationBuffer[e] + n * (t - 1)) / (t + i);
					this.m_staticPressureBuffer[e] = k(a, 0, r);
				} else this.m_staticPressureBuffer[e] = 0;
			}
		}
	}
	ComputeWeight() {
		for (let e = 0; e < this.m_count; e++) this.m_weightBuffer[e] = 0;
		for (let e = 0; e < this.m_bodyContactBuffer.count; e++) {
			let t = this.m_bodyContactBuffer.data[e], n = t.index, r = t.weight;
			this.m_weightBuffer[n] += r;
		}
		for (let e = 0; e < this.m_contactBuffer.count; e++) {
			let t = this.m_contactBuffer.data[e], n = t.indexA, r = t.indexB, i = t.weight;
			this.m_weightBuffer[n] += i, this.m_weightBuffer[r] += i;
		}
	}
	SolvePressure(e) {
		let t = n.SolvePressure_s_f, r = this.m_positionBuffer.data, i = this.m_velocityBuffer.data, a = this.GetCriticalPressure(e), o = this.m_def.pressureStrength * a, s = _ * a;
		for (let e = 0; e < this.m_count; e++) {
			let t = this.m_weightBuffer[e], n = o * O(0, t - 1);
			this.m_accumulationBuffer[e] = D(n, s);
		}
		if (this.m_allParticleFlags & n.k_noPressureFlags) for (let e = 0; e < this.m_count; e++) this.m_flagsBuffer.data[e] & n.k_noPressureFlags && (this.m_accumulationBuffer[e] = 0);
		if (this.m_allParticleFlags & Y.b2_staticPressureParticle) for (let e = 0; e < this.m_count; e++) this.m_flagsBuffer.data[e] & Y.b2_staticPressureParticle && (this.m_accumulationBuffer[e] += this.m_staticPressureBuffer[e]);
		let c = e.dt / (this.m_def.density * this.m_particleDiameter), l = this.GetParticleInvMass();
		for (let e = 0; e < this.m_bodyContactBuffer.count; e++) {
			let n = this.m_bodyContactBuffer.data[e], a = n.index, s = n.body, u = n.weight, d = n.mass, f = n.normal, p = r[a], m = this.m_accumulationBuffer[a] + o * u, h = M.MulSV(c * u * d * m, f, t);
			i[a].SelfMulSub(l, h), s.ApplyLinearImpulse(h, p, !0);
		}
		for (let e = 0; e < this.m_contactBuffer.count; e++) {
			let n = this.m_contactBuffer.data[e], r = n.indexA, a = n.indexB, o = n.weight, s = n.normal, l = this.m_accumulationBuffer[r] + this.m_accumulationBuffer[a], u = M.MulSV(c * o * l, s, t);
			i[r].SelfSub(u), i[a].SelfAdd(u);
		}
	}
	static SolvePressure_s_f = new M();
	SolveDamping(e) {
		let t = n.SolveDamping_s_v, r = n.SolveDamping_s_f, i = this.m_positionBuffer.data, a = this.m_velocityBuffer.data, o = this.m_def.dampingStrength, s = 1 / this.GetCriticalVelocity(e), c = this.GetParticleInvMass();
		for (let e = 0; e < this.m_bodyContactBuffer.count; e++) {
			let n = this.m_bodyContactBuffer.data[e], l = n.index, u = n.body, d = n.weight, f = n.mass, p = n.normal, m = i[l], h = M.SubVV(u.GetLinearVelocityFromWorldPoint(m, M.s_t0), a[l], t), g = M.DotVV(h, p);
			if (g < 0) {
				let e = O(o * d, D(-s * g, .5)), t = M.MulSV(e * f * g, p, r);
				a[l].SelfMulAdd(c, t), u.ApplyLinearImpulse(t.SelfNeg(), m, !0);
			}
		}
		for (let e = 0; e < this.m_contactBuffer.count; e++) {
			let n = this.m_contactBuffer.data[e], i = n.indexA, c = n.indexB, l = n.weight, u = n.normal, d = M.SubVV(a[c], a[i], t), f = M.DotVV(d, u);
			if (f < 0) {
				let e = O(o * l, D(-s * f, .5)), t = M.MulSV(e * f, u, r);
				a[i].SelfAdd(t), a[c].SelfSub(t);
			}
		}
	}
	static SolveDamping_s_v = new M();
	static SolveDamping_s_f = new M();
	SolveRigidDamping() {
		let e = n.SolveRigidDamping_s_t0, t = n.SolveRigidDamping_s_t1, r = n.SolveRigidDamping_s_p, i = n.SolveRigidDamping_s_v, a = [0], o = [0], s = [0], c = [0], l = [0], u = [0], d = this.m_positionBuffer.data, f = this.m_def.dampingStrength;
		for (let n = 0; n < this.m_bodyContactBuffer.count; n++) {
			let r = this.m_bodyContactBuffer.data[n], p = r.index, m = this.m_groupBuffer[p];
			if (m && this.IsRigidGroup(m)) {
				let n = r.body, h = r.normal, g = r.weight, _ = d[p], v = M.SubVV(n.GetLinearVelocityFromWorldPoint(_, e), m.GetLinearVelocityFromWorldPoint(_, t), i), y = M.DotVV(v, h);
				if (y < 0) {
					this.InitDampingParameterWithRigidGroupOrParticle(a, o, s, !0, m, p, _, h), this.InitDampingParameter(c, l, u, n.GetMass(), n.GetInertia() - n.GetMass() * n.GetLocalCenter().LengthSquared(), n.GetWorldCenter(), _, h);
					let e = f * D(g, 1) * this.ComputeDampingImpulse(a[0], o[0], s[0], c[0], l[0], u[0], y);
					this.ApplyDamping(a[0], o[0], s[0], !0, m, p, e, h), n.ApplyLinearImpulse(M.MulSV(-e, h, M.s_t0), _, !0);
				}
			}
		}
		for (let n = 0; n < this.m_contactBuffer.count; n++) {
			let p = this.m_contactBuffer.data[n], m = p.indexA, h = p.indexB, g = p.normal, _ = p.weight, v = this.m_groupBuffer[m], y = this.m_groupBuffer[h], b = this.IsRigidGroup(v), x = this.IsRigidGroup(y);
			if (v !== y && (b || x)) {
				let n = M.MidVV(d[m], d[h], r), p = M.SubVV(this.GetLinearVelocity(y, h, n, e), this.GetLinearVelocity(v, m, n, t), i), S = M.DotVV(p, g);
				if (S < 0) {
					this.InitDampingParameterWithRigidGroupOrParticle(a, o, s, b, v, m, n, g), this.InitDampingParameterWithRigidGroupOrParticle(c, l, u, x, y, h, n, g);
					let e = f * _ * this.ComputeDampingImpulse(a[0], o[0], s[0], c[0], l[0], u[0], S);
					this.ApplyDamping(a[0], o[0], s[0], b, v, m, e, g), this.ApplyDamping(c[0], l[0], u[0], x, y, h, -e, g);
				}
			}
		}
	}
	static SolveRigidDamping_s_t0 = new M();
	static SolveRigidDamping_s_t1 = new M();
	static SolveRigidDamping_s_p = new M();
	static SolveRigidDamping_s_v = new M();
	SolveExtraDamping() {
		let e = n.SolveExtraDamping_s_v, t = n.SolveExtraDamping_s_f, r = this.m_velocityBuffer.data, i = this.m_positionBuffer.data, a = this.GetParticleInvMass();
		for (let o = 0; o < this.m_bodyContactBuffer.count; o++) {
			let s = this.m_bodyContactBuffer.data[o], c = s.index;
			if (this.m_flagsBuffer.data[c] & n.k_extraDampingFlags) {
				let n = s.body, o = s.mass, l = s.normal, u = i[c], d = M.SubVV(n.GetLinearVelocityFromWorldPoint(u, M.s_t0), r[c], e), f = M.DotVV(d, l);
				if (f < 0) {
					let e = M.MulSV(.5 * o * f, l, t);
					r[c].SelfMulAdd(a, e), n.ApplyLinearImpulse(e.SelfNeg(), u, !0);
				}
			}
		}
	}
	static SolveExtraDamping_s_v = new M();
	static SolveExtraDamping_s_f = new M();
	SolveWall() {
		let e = this.m_velocityBuffer.data;
		for (let t = 0; t < this.m_count; t++) this.m_flagsBuffer.data[t] & Y.b2_wallParticle && e[t].SetZero();
	}
	SolveRigid(e) {
		let t = n.SolveRigid_s_position, r = n.SolveRigid_s_rotation, i = n.SolveRigid_s_transform, a = n.SolveRigid_s_velocityTransform, o = this.m_positionBuffer.data, s = this.m_velocityBuffer.data;
		for (let n = this.m_groupList; n; n = n.GetNext()) if (n.m_groupFlags & X.b2_rigidParticleGroup) {
			n.UpdateStatistics();
			let c = r;
			c.SetAngle(e.dt * n.m_angularVelocity);
			let l = M.AddVV(n.m_center, M.SubVV(M.MulSV(e.dt, n.m_linearVelocity, M.s_t0), F.MulRV(c, n.m_center, M.s_t1), M.s_t0), t), u = i;
			u.SetPositionRotation(l, c), I.MulXX(u, n.m_transform, n.m_transform);
			let d = a;
			d.p.x = e.inv_dt * u.p.x, d.p.y = e.inv_dt * u.p.y, d.q.s = e.inv_dt * u.q.s, d.q.c = e.inv_dt * (u.q.c - 1);
			for (let e = n.m_firstIndex; e < n.m_lastIndex; e++) I.MulXV(d, o[e], s[e]);
		}
	}
	static SolveRigid_s_position = new M();
	static SolveRigid_s_rotation = new F();
	static SolveRigid_s_transform = new I();
	static SolveRigid_s_velocityTransform = new I();
	SolveElastic(e) {
		let t = n.SolveElastic_s_pa, r = n.SolveElastic_s_pb, i = n.SolveElastic_s_pc, a = n.SolveElastic_s_r, o = n.SolveElastic_s_t0, s = this.m_positionBuffer.data, c = this.m_velocityBuffer.data, l = e.inv_dt * this.m_def.elasticStrength;
		for (let n = 0; n < this.m_triadBuffer.count; n++) {
			let u = this.m_triadBuffer.data[n];
			if (u.flags & Y.b2_elasticParticle) {
				let n = u.indexA, d = u.indexB, f = u.indexC, p = u.pa, m = u.pb, h = u.pc, g = t.Copy(s[n]), _ = r.Copy(s[d]), v = i.Copy(s[f]), y = c[n], b = c[d], x = c[f];
				g.SelfMulAdd(e.dt, y), _.SelfMulAdd(e.dt, b), v.SelfMulAdd(e.dt, x);
				let S = (g.x + _.x + v.x) / 3, C = (g.y + _.y + v.y) / 3;
				g.x -= S, g.y -= C, _.x -= S, _.y -= C, v.x -= S, v.y -= C;
				let w = a;
				w.s = M.CrossVV(p, g) + M.CrossVV(m, _) + M.CrossVV(h, v), w.c = M.DotVV(p, g) + M.DotVV(m, _) + M.DotVV(h, v);
				let T = ee(w.s * w.s + w.c * w.c);
				isFinite(T) || (T = 0x11306cdfdbeaee000), w.s *= T, w.c *= T;
				let E = l * u.strength;
				F.MulRV(w, p, o), M.SubVV(o, g, o), M.MulSV(E, o, o), y.SelfAdd(o), F.MulRV(w, m, o), M.SubVV(o, _, o), M.MulSV(E, o, o), b.SelfAdd(o), F.MulRV(w, h, o), M.SubVV(o, v, o), M.MulSV(E, o, o), x.SelfAdd(o);
			}
		}
	}
	static SolveElastic_s_pa = new M();
	static SolveElastic_s_pb = new M();
	static SolveElastic_s_pc = new M();
	static SolveElastic_s_r = new F();
	static SolveElastic_s_t0 = new M();
	SolveSpring(e) {
		let t = n.SolveSpring_s_pa, r = n.SolveSpring_s_pb, i = n.SolveSpring_s_d, a = n.SolveSpring_s_f, o = this.m_positionBuffer.data, s = this.m_velocityBuffer.data, c = e.inv_dt * this.m_def.springStrength;
		for (let n = 0; n < this.m_pairBuffer.count; n++) {
			let l = this.m_pairBuffer.data[n];
			if (l.flags & Y.b2_springParticle) {
				let n = l.indexA, u = l.indexB, d = t.Copy(o[n]), f = r.Copy(o[u]), p = s[n], m = s[u];
				d.SelfMulAdd(e.dt, p), f.SelfMulAdd(e.dt, m);
				let h = M.SubVV(f, d, i), g = l.distance, _ = h.Length(), v = c * l.strength, y = M.MulSV(v * (g - _) / _, h, a);
				p.SelfSub(y), m.SelfAdd(y);
			}
		}
	}
	static SolveSpring_s_pa = new M();
	static SolveSpring_s_pb = new M();
	static SolveSpring_s_d = new M();
	static SolveSpring_s_f = new M();
	SolveTensile(e) {
		let t = n.SolveTensile_s_weightedNormal, r = n.SolveTensile_s_s, i = n.SolveTensile_s_f, a = this.m_velocityBuffer.data;
		for (let e = 0; e < this.m_count; e++) this.m_accumulation2Buffer[e] = new M(), this.m_accumulation2Buffer[e].SetZero();
		for (let e = 0; e < this.m_contactBuffer.count; e++) {
			let n = this.m_contactBuffer.data[e];
			if (n.flags & Y.b2_tensileParticle) {
				let e = n.indexA, r = n.indexB, i = n.weight, a = n.normal, o = M.MulSV((1 - i) * i, a, t);
				this.m_accumulation2Buffer[e].SelfSub(o), this.m_accumulation2Buffer[r].SelfAdd(o);
			}
		}
		let o = this.GetCriticalVelocity(e), s = this.m_def.surfaceTensionPressureStrength * o, c = this.m_def.surfaceTensionNormalStrength * o, l = v * o;
		for (let e = 0; e < this.m_contactBuffer.count; e++) {
			let t = this.m_contactBuffer.data[e];
			if (t.flags & Y.b2_tensileParticle) {
				let e = t.indexA, n = t.indexB, o = t.weight, u = t.normal, d = this.m_weightBuffer[e] + this.m_weightBuffer[n], f = M.SubVV(this.m_accumulation2Buffer[n], this.m_accumulation2Buffer[e], r), p = D(s * (d - 2) + c * M.DotVV(f, u), l) * o, m = M.MulSV(p, u, i);
				a[e].SelfSub(m), a[n].SelfAdd(m);
			}
		}
	}
	static SolveTensile_s_weightedNormal = new M();
	static SolveTensile_s_s = new M();
	static SolveTensile_s_f = new M();
	SolveViscous() {
		let e = n.SolveViscous_s_v, t = n.SolveViscous_s_f, r = this.m_positionBuffer.data, i = this.m_velocityBuffer.data, a = this.m_def.viscousStrength, o = this.GetParticleInvMass();
		for (let n = 0; n < this.m_bodyContactBuffer.count; n++) {
			let s = this.m_bodyContactBuffer.data[n], c = s.index;
			if (this.m_flagsBuffer.data[c] & Y.b2_viscousParticle) {
				let n = s.body, l = s.weight, u = s.mass, d = r[c], f = M.SubVV(n.GetLinearVelocityFromWorldPoint(d, M.s_t0), i[c], e), p = M.MulSV(a * u * l, f, t);
				i[c].SelfMulAdd(o, p), n.ApplyLinearImpulse(p.SelfNeg(), d, !0);
			}
		}
		for (let n = 0; n < this.m_contactBuffer.count; n++) {
			let r = this.m_contactBuffer.data[n];
			if (r.flags & Y.b2_viscousParticle) {
				let n = r.indexA, o = r.indexB, s = r.weight, c = M.SubVV(i[o], i[n], e), l = M.MulSV(a * s, c, t);
				i[n].SelfAdd(l), i[o].SelfSub(l);
			}
		}
	}
	static SolveViscous_s_v = new M();
	static SolveViscous_s_f = new M();
	SolveRepulsive(e) {
		let t = n.SolveRepulsive_s_f, r = this.m_velocityBuffer.data, i = this.m_def.repulsiveStrength * this.GetCriticalVelocity(e);
		for (let e = 0; e < this.m_contactBuffer.count; e++) {
			let n = this.m_contactBuffer.data[e];
			if (n.flags & Y.b2_repulsiveParticle) {
				let e = n.indexA, a = n.indexB;
				if (this.m_groupBuffer[e] !== this.m_groupBuffer[a]) {
					let o = n.weight, s = n.normal, c = M.MulSV(i * o, s, t);
					r[e].SelfSub(c), r[a].SelfAdd(c);
				}
			}
		}
	}
	static SolveRepulsive_s_f = new M();
	SolvePowder(e) {
		let t = n.SolvePowder_s_f, r = this.m_positionBuffer.data, i = this.m_velocityBuffer.data, a = this.m_def.powderStrength * this.GetCriticalVelocity(e), o = 1 - g, s = this.GetParticleInvMass();
		for (let e = 0; e < this.m_bodyContactBuffer.count; e++) {
			let n = this.m_bodyContactBuffer.data[e], c = n.index;
			if (this.m_flagsBuffer.data[c] & Y.b2_powderParticle) {
				let e = n.weight;
				if (e > o) {
					let l = n.body, u = n.mass, d = r[c], f = n.normal, p = M.MulSV(a * u * (e - o), f, t);
					i[c].SelfMulSub(s, p), l.ApplyLinearImpulse(p, d, !0);
				}
			}
		}
		for (let e = 0; e < this.m_contactBuffer.count; e++) {
			let n = this.m_contactBuffer.data[e];
			if (n.flags & Y.b2_powderParticle) {
				let e = n.weight;
				if (e > o) {
					let r = n.indexA, s = n.indexB, c = n.normal, l = M.MulSV(a * (e - o), c, t);
					i[r].SelfSub(l), i[s].SelfAdd(l);
				}
			}
		}
	}
	static SolvePowder_s_f = new M();
	SolveSolid(e) {
		let t = n.SolveSolid_s_f, r = this.m_velocityBuffer.data;
		this.m_depthBuffer = this.RequestBuffer(this.m_depthBuffer);
		let i = e.inv_dt * this.m_def.ejectionStrength;
		for (let e = 0; e < this.m_contactBuffer.count; e++) {
			let n = this.m_contactBuffer.data[e], a = n.indexA, o = n.indexB;
			if (this.m_groupBuffer[a] !== this.m_groupBuffer[o]) {
				let e = n.weight, s = n.normal, c = this.m_depthBuffer[a] + this.m_depthBuffer[o], l = M.MulSV(i * c * e, s, t);
				r[a].SelfSub(l), r[o].SelfAdd(l);
			}
		}
	}
	static SolveSolid_s_f = new M();
	SolveForce(e) {
		let t = this.m_velocityBuffer.data, n = e.dt * this.GetParticleInvMass();
		for (let e = 0; e < this.m_count; e++) t[e].SelfMulAdd(n, this.m_forceBuffer[e]);
		this.m_hasForce = !1;
	}
	SolveColorMixing() {
		let t = .5 * this.m_def.colorMixingStrength;
		if (t) for (let n = 0; n < this.m_contactBuffer.count; n++) {
			let r = this.m_contactBuffer.data[n], i = r.indexA, a = r.indexB;
			if (this.m_flagsBuffer.data[i] & this.m_flagsBuffer.data[a] & Y.b2_colorMixingParticle) {
				let n = this.m_colorBuffer.data[i], r = this.m_colorBuffer.data[a];
				e.MixColors(n, r, t);
			}
		}
	}
	SolveZombie() {
		let e = 0, t = [];
		for (let e = 0; e < this.m_count; e++) t[e] = -1;
		let n = 0;
		for (let r = 0; r < this.m_count; r++) {
			let i = this.m_flagsBuffer.data[r];
			if (i & Y.b2_zombieParticle) {
				let e = this.m_world.m_destructionListener;
				if (i & Y.b2_destructionListenerParticle && e && e.SayGoodbyeParticle(this, r), this.m_handleIndexBuffer.data) {
					let e = this.m_handleIndexBuffer.data[r];
					e && (e.SetIndex(-1), this.m_handleIndexBuffer.data[r] = null);
				}
				t[r] = -1;
			} else {
				if (t[r] = e, r !== e) {
					if (this.m_handleIndexBuffer.data) {
						let t = this.m_handleIndexBuffer.data[r];
						t && t.SetIndex(e), this.m_handleIndexBuffer.data[e] = t;
					}
					this.m_flagsBuffer.data[e] = this.m_flagsBuffer.data[r], this.m_lastBodyContactStepBuffer.data && (this.m_lastBodyContactStepBuffer.data[e] = this.m_lastBodyContactStepBuffer.data[r]), this.m_bodyContactCountBuffer.data && (this.m_bodyContactCountBuffer.data[e] = this.m_bodyContactCountBuffer.data[r]), this.m_consecutiveContactStepsBuffer.data && (this.m_consecutiveContactStepsBuffer.data[e] = this.m_consecutiveContactStepsBuffer.data[r]), this.m_positionBuffer.data[e].Copy(this.m_positionBuffer.data[r]), this.m_velocityBuffer.data[e].Copy(this.m_velocityBuffer.data[r]), this.m_groupBuffer[e] = this.m_groupBuffer[r], this.m_hasForce && this.m_forceBuffer[e].Copy(this.m_forceBuffer[r]), this.m_staticPressureBuffer && (this.m_staticPressureBuffer[e] = this.m_staticPressureBuffer[r]), this.m_depthBuffer && (this.m_depthBuffer[e] = this.m_depthBuffer[r]), this.m_colorBuffer.data && this.m_colorBuffer.data[e].Copy(this.m_colorBuffer.data[r]), this.m_userDataBuffer.data && (this.m_userDataBuffer.data[e] = this.m_userDataBuffer.data[r]), this.m_expirationTimeBuffer.data && (this.m_expirationTimeBuffer.data[e] = this.m_expirationTimeBuffer.data[r]);
				}
				e++, n |= i;
			}
		}
		let r = {
			IsProxyInvalid: (e) => e.index < 0,
			IsContactInvalid: (e) => e.indexA < 0 || e.indexB < 0,
			IsBodyContactInvalid: (e) => e.index < 0,
			IsPairInvalid: (e) => e.indexA < 0 || e.indexB < 0,
			IsTriadInvalid: (e) => e.indexA < 0 || e.indexB < 0 || e.indexC < 0
		};
		for (let e = 0; e < this.m_proxyBuffer.count; e++) {
			let n = this.m_proxyBuffer.data[e];
			n.index = t[n.index];
		}
		this.m_proxyBuffer.RemoveIf(r.IsProxyInvalid);
		for (let e = 0; e < this.m_contactBuffer.count; e++) {
			let n = this.m_contactBuffer.data[e];
			n.indexA = t[n.indexA], n.indexB = t[n.indexB];
		}
		this.m_contactBuffer.RemoveIf(r.IsContactInvalid);
		for (let e = 0; e < this.m_bodyContactBuffer.count; e++) {
			let n = this.m_bodyContactBuffer.data[e];
			n.index = t[n.index];
		}
		this.m_bodyContactBuffer.RemoveIf(r.IsBodyContactInvalid);
		for (let e = 0; e < this.m_pairBuffer.count; e++) {
			let n = this.m_pairBuffer.data[e];
			n.indexA = t[n.indexA], n.indexB = t[n.indexB];
		}
		this.m_pairBuffer.RemoveIf(r.IsPairInvalid);
		for (let e = 0; e < this.m_triadBuffer.count; e++) {
			let n = this.m_triadBuffer.data[e];
			n.indexA = t[n.indexA], n.indexB = t[n.indexB], n.indexC = t[n.indexC];
		}
		if (this.m_triadBuffer.RemoveIf(r.IsTriadInvalid), this.m_indexByExpirationTimeBuffer.data) {
			let e = 0;
			for (let n = 0; n < this.m_count; n++) {
				let r = t[this.m_indexByExpirationTimeBuffer.data[n]];
				r !== -1 && (this.m_indexByExpirationTimeBuffer.data[e++] = r);
			}
		}
		for (let n = this.m_groupList; n; n = n.GetNext()) {
			let r = e, i = 0, a = !1;
			for (let e = n.m_firstIndex; e < n.m_lastIndex; e++) {
				let n = t[e];
				n >= 0 ? (r = D(r, n), i = O(i, n + 1)) : a = !0;
			}
			r < i ? (n.m_firstIndex = r, n.m_lastIndex = i, a && n.m_groupFlags & X.b2_solidParticleGroup && this.SetGroupFlags(n, n.m_groupFlags | X.b2_particleGroupNeedsUpdateDepth)) : (n.m_firstIndex = 0, n.m_lastIndex = 0, n.m_groupFlags & X.b2_particleGroupCanBeEmpty || this.SetGroupFlags(n, n.m_groupFlags | X.b2_particleGroupWillBeDestroyed));
		}
		this.m_count = e, this.m_allParticleFlags = n, this.m_needsUpdateAllParticleFlags = !1;
		for (let e = this.m_groupList; e;) {
			let t = e.GetNext();
			e.m_groupFlags & X.b2_particleGroupWillBeDestroyed && this.DestroyParticleGroup(e), e = t;
		}
	}
	SolveLifetimes(e) {
		this.m_timeElapsed = this.LifetimeToExpirationTime(e.dt);
		let t = this.GetQuantizedTimeElapsed(), n = this.m_expirationTimeBuffer.data, r = this.m_indexByExpirationTimeBuffer.data, i = this.GetParticleCount();
		this.m_expirationTimeBufferRequiresSorting &&= (Ir(r, 0, i, (e, t) => {
			let r = n[e], i = n[t], a = r <= 0;
			return a === i <= 0 ? r > i : a;
		}), !1);
		for (let e = i - 1; e >= 0; --e) {
			let i = r[e], a = n[i];
			if (t < a || a <= 0) break;
			this.DestroyParticle(i);
		}
	}
	RotateBuffer(e, t, n) {
		if (e === t || t === n) return;
		function r(r) {
			return r < e ? r : r < t ? r + n - t : r < n ? r + e - t : r;
		}
		if (Q(this.m_flagsBuffer.data, e, t, n), this.m_lastBodyContactStepBuffer.data && Q(this.m_lastBodyContactStepBuffer.data, e, t, n), this.m_bodyContactCountBuffer.data && Q(this.m_bodyContactCountBuffer.data, e, t, n), this.m_consecutiveContactStepsBuffer.data && Q(this.m_consecutiveContactStepsBuffer.data, e, t, n), Q(this.m_positionBuffer.data, e, t, n), Q(this.m_velocityBuffer.data, e, t, n), Q(this.m_groupBuffer, e, t, n), this.m_hasForce && Q(this.m_forceBuffer, e, t, n), this.m_staticPressureBuffer && Q(this.m_staticPressureBuffer, e, t, n), this.m_depthBuffer && Q(this.m_depthBuffer, e, t, n), this.m_colorBuffer.data && Q(this.m_colorBuffer.data, e, t, n), this.m_userDataBuffer.data && Q(this.m_userDataBuffer.data, e, t, n), this.m_handleIndexBuffer.data) {
			Q(this.m_handleIndexBuffer.data, e, t, n);
			for (let t = e; t < n; ++t) {
				let e = this.m_handleIndexBuffer.data[t];
				e && e.SetIndex(r(e.GetIndex()));
			}
		}
		if (this.m_expirationTimeBuffer.data) {
			Q(this.m_expirationTimeBuffer.data, e, t, n);
			let i = this.GetParticleCount(), a = this.m_indexByExpirationTimeBuffer.data;
			for (let e = 0; e < i; ++e) a[e] = r(a[e]);
		}
		for (let e = 0; e < this.m_proxyBuffer.count; e++) {
			let t = this.m_proxyBuffer.data[e];
			t.index = r(t.index);
		}
		for (let e = 0; e < this.m_contactBuffer.count; e++) {
			let t = this.m_contactBuffer.data[e];
			t.indexA = r(t.indexA), t.indexB = r(t.indexB);
		}
		for (let e = 0; e < this.m_bodyContactBuffer.count; e++) {
			let t = this.m_bodyContactBuffer.data[e];
			t.index = r(t.index);
		}
		for (let e = 0; e < this.m_pairBuffer.count; e++) {
			let t = this.m_pairBuffer.data[e];
			t.indexA = r(t.indexA), t.indexB = r(t.indexB);
		}
		for (let e = 0; e < this.m_triadBuffer.count; e++) {
			let t = this.m_triadBuffer.data[e];
			t.indexA = r(t.indexA), t.indexB = r(t.indexB), t.indexC = r(t.indexC);
		}
		for (let e = this.m_groupList; e; e = e.GetNext()) e.m_firstIndex = r(e.m_firstIndex), e.m_lastIndex = r(e.m_lastIndex - 1) + 1;
	}
	GetCriticalVelocity(e) {
		return this.m_particleDiameter * e.inv_dt;
	}
	GetCriticalVelocitySquared(e) {
		let t = this.GetCriticalVelocity(e);
		return t * t;
	}
	GetCriticalPressure(e) {
		return this.m_def.density * this.GetCriticalVelocitySquared(e);
	}
	GetParticleStride() {
		return g * this.m_particleDiameter;
	}
	GetParticleMass() {
		let e = this.GetParticleStride();
		return this.m_def.density * e * e;
	}
	GetParticleInvMass() {
		let e = this.m_inverseDiameter * (1 / g);
		return this.m_inverseDensity * e * e;
	}
	GetFixtureContactFilter() {
		return this.m_allParticleFlags & Y.b2_fixtureContactFilterParticle ? this.m_world.m_contactManager.m_contactFilter : null;
	}
	GetParticleContactFilter() {
		return this.m_allParticleFlags & Y.b2_particleContactFilterParticle ? this.m_world.m_contactManager.m_contactFilter : null;
	}
	GetFixtureContactListener() {
		return this.m_allParticleFlags & Y.b2_fixtureContactListenerParticle ? this.m_world.m_contactManager.m_contactListener : null;
	}
	GetParticleContactListener() {
		return this.m_allParticleFlags & Y.b2_particleContactListenerParticle ? this.m_world.m_contactManager.m_contactListener : null;
	}
	SetUserOverridableBuffer(e, t) {
		e.data = t, e.userSuppliedCapacity = t.length;
	}
	SetGroupFlags(e, t) {
		let n = e.m_groupFlags;
		(n ^ t) & X.b2_solidParticleGroup && (t |= X.b2_particleGroupNeedsUpdateDepth), n & ~t && (this.m_needsUpdateAllGroupFlags = !0), ~this.m_allGroupFlags & t && (t & X.b2_solidParticleGroup && (this.m_depthBuffer = this.RequestBuffer(this.m_depthBuffer)), this.m_allGroupFlags |= t), e.m_groupFlags = t;
	}
	static BodyContactCompare(e, t) {
		return e.index === t.index ? e.weight > t.weight : e.index < t.index;
	}
	RemoveSpuriousBodyContacts() {
		Ir(this.m_bodyContactBuffer.data, 0, this.m_bodyContactBuffer.count, n.BodyContactCompare);
		let e = n.RemoveSpuriousBodyContacts_s_n, t = n.RemoveSpuriousBodyContacts_s_pos, r = n.RemoveSpuriousBodyContacts_s_normal, i = this, a = -1, o = 0, s = (n) => {
			if (n.index !== a && (o = 0, a = n.index), o++ > 3) return !0;
			let s = e.Copy(n.normal);
			s.SelfMul(i.m_particleDiameter * (1 - n.weight));
			let c = M.AddVV(i.m_positionBuffer.data[n.index], s, t);
			if (!n.fixture.TestPoint(c)) {
				let e = n.fixture.GetShape().GetChildCount();
				for (let t = 0; t < e; t++) {
					let e = r;
					if (n.fixture.ComputeDistance(c, e, t) < .005) return !1;
				}
				return !0;
			}
			return !1;
		};
		this.m_bodyContactBuffer.count = Rr(this.m_bodyContactBuffer.data, s, this.m_bodyContactBuffer.count);
	}
	static RemoveSpuriousBodyContacts_s_n = new M();
	static RemoveSpuriousBodyContacts_s_pos = new M();
	static RemoveSpuriousBodyContacts_s_normal = new M();
	DetectStuckParticle(e) {
		this.m_stuckThreshold <= 0 || (++this.m_bodyContactCountBuffer.data[e], this.m_bodyContactCountBuffer.data[e] === 2 && (++this.m_consecutiveContactStepsBuffer.data[e], this.m_consecutiveContactStepsBuffer.data[e] > this.m_stuckThreshold && (this.m_stuckParticleBuffer.data[this.m_stuckParticleBuffer.Append()] = e)), this.m_lastBodyContactStepBuffer.data[e] = this.m_timestamp);
	}
	ValidateParticleIndex(e) {
		return e >= 0 && e < this.GetParticleCount() && e !== -1;
	}
	GetQuantizedTimeElapsed() {
		return Math.floor(this.m_timeElapsed / 4294967296);
	}
	LifetimeToExpirationTime(e) {
		return this.m_timeElapsed + Math.floor(e / this.m_def.lifetimeGranularity * 4294967296);
	}
	ForceCanBeApplied(e) {
		return !(e & Y.b2_wallParticle);
	}
	PrepareForceBuffer() {
		if (!this.m_hasForce) {
			for (let e = 0; e < this.m_count; e++) this.m_forceBuffer[e].SetZero();
			this.m_hasForce = !0;
		}
	}
	IsRigidGroup(e) {
		return e !== null && (e.m_groupFlags & X.b2_rigidParticleGroup) !== 0;
	}
	GetLinearVelocity(e, t, n, r) {
		return e && this.IsRigidGroup(e) ? e.GetLinearVelocityFromWorldPoint(n, r) : r.Copy(this.m_velocityBuffer.data[t]);
	}
	InitDampingParameter(e, t, n, r, i, a, o, s) {
		e[0] = r > 0 ? 1 / r : 0, t[0] = i > 0 ? 1 / i : 0, n[0] = M.CrossVV(M.SubVV(o, a, M.s_t0), s);
	}
	InitDampingParameterWithRigidGroupOrParticle(e, t, n, r, i, a, o, s) {
		if (i && r) this.InitDampingParameter(e, t, n, i.GetMass(), i.GetInertia(), i.GetCenter(), o, s);
		else {
			let r = this.m_flagsBuffer.data[a];
			this.InitDampingParameter(e, t, n, r & Y.b2_wallParticle ? 0 : this.GetParticleMass(), 0, o, o, s);
		}
	}
	ComputeDampingImpulse(e, t, n, r, i, a, o) {
		let s = e + t * n * n + r + i * a * a;
		return s > 0 ? o / s : 0;
	}
	ApplyDamping(e, t, n, r, i, a, o, s) {
		i && r ? (i.m_linearVelocity.SelfMulAdd(o * e, s), i.m_angularVelocity += o * n * t) : this.m_velocityBuffer.data[a].SelfMulAdd(o * e, s);
	}
}, $ = class {
	_data = null;
	get data() {
		return this._data;
	}
	set data(e) {
		this._data = e;
	}
	userSuppliedCapacity = 0;
}, Xr = class {
	index = -1;
	tag = 0;
	static CompareProxyProxy(e, t) {
		return e.tag < t.tag;
	}
	static CompareTagProxy(e, t) {
		return e < t.tag;
	}
	static CompareProxyTag(e, t) {
		return e.tag < t;
	}
}, Zr = class {
	m_system;
	m_xLower;
	m_xUpper;
	m_yLower;
	m_yUpper;
	m_first;
	m_last;
	constructor(e, t, n, r, i) {
		this.m_system = e, this.m_xLower = (t & Yr.xMask) >>> 0, this.m_xUpper = (n & Yr.xMask) >>> 0, this.m_yLower = (t & Yr.yMask) >>> 0, this.m_yUpper = (n & Yr.yMask) >>> 0, this.m_first = r, this.m_last = i;
	}
	GetNext() {
		for (; this.m_first < this.m_last;) {
			let e = (this.m_system.m_proxyBuffer.data[this.m_first].tag & Yr.xMask) >>> 0;
			if (e >= this.m_xLower && e <= this.m_xUpper) return this.m_system.m_proxyBuffer.data[this.m_first++].index;
			this.m_first++;
		}
		return -1;
	}
}, Qr = class {
	list;
	next = null;
	count = 0;
	index = 0;
}, $r = class {
	Allocate(e, t) {
		return t;
	}
	Clear() {}
	GetCount() {
		return 0;
	}
	Invalidate(e) {}
	GetValidBuffer() {
		return [];
	}
	GetBuffer() {
		return [];
	}
	SetCount(e) {}
}, ei = class extends $r {
	Initialize(e, t) {}
	Find(e) {
		return -1;
	}
}, ti = class extends $r {
	Initialize(e, t) {}
	Find(e) {
		return -1;
	}
}, ni = class {
	IsNecessary(e) {
		return !0;
	}
	ShouldCreatePair(e, t) {
		return !0;
	}
	ShouldCreateTriad(e, t, n) {
		return !0;
	}
}, ri = class extends tr {
	m_system;
	m_shape;
	m_xf;
	m_callDestructionListener = !1;
	m_destroyed = 0;
	constructor(e, t, n, r) {
		super(), this.m_system = e, this.m_shape = t, this.m_xf = n, this.m_callDestructionListener = r, this.m_destroyed = 0;
	}
	ReportFixture(e) {
		return !1;
	}
	ReportParticle(e, t) {
		return e === this.m_system && (this.m_shape.TestPoint(this.m_xf, this.m_system.m_positionBuffer.data[t]) && (this.m_system.DestroyParticle(t, this.m_callDestructionListener), this.m_destroyed++), !0);
	}
	Destroyed() {
		return this.m_destroyed;
	}
}, ii = class extends ni {
	m_threshold = 0;
	constructor(e) {
		super(), this.m_threshold = e;
	}
	ShouldCreatePair(e, t) {
		return e < this.m_threshold && this.m_threshold <= t || t < this.m_threshold && this.m_threshold <= e;
	}
	ShouldCreateTriad(e, t, n) {
		return (e < this.m_threshold || t < this.m_threshold || n < this.m_threshold) && (this.m_threshold <= e || this.m_threshold <= t || this.m_threshold <= n);
	}
}, ai = class extends Ue {
	constructor(e, t = e.length) {
		super(U.e_unknown, 0), this.m_shapes = e, this.m_shapeCount = t;
	}
	m_shapes;
	m_shapeCount = 0;
	Clone() {
		throw Error();
	}
	GetChildCount() {
		return 1;
	}
	TestPoint(e, t) {
		for (let n = 0; n < this.m_shapeCount; n++) if (this.m_shapes[n].TestPoint(e, t)) return !0;
		return !1;
	}
	ComputeDistance(e, t, n, r) {
		return 0;
	}
	RayCast(e, t, n, r) {
		return !1;
	}
	ComputeAABB(e, t, n) {
		let r = new V();
		e.lowerBound.x = +i, e.lowerBound.y = +i, e.upperBound.x = -i, e.upperBound.y = -i;
		for (let n = 0; n < this.m_shapeCount; n++) {
			let i = this.m_shapes[n].GetChildCount();
			for (let a = 0; a < i; a++) {
				let i = r;
				this.m_shapes[n].ComputeAABB(i, t, a), e.Combine1(i);
			}
		}
	}
	ComputeMass(e, t) {}
	SetupDistanceProxy(e, t) {}
	ComputeSubmergedArea(e, t, n, r) {
		return 0;
	}
	Dump(e) {}
}, oi = class extends ni {
	m_flagsBuffer;
	constructor(e) {
		super(), this.m_flagsBuffer = e;
	}
	IsNecessary(e) {
		return (this.m_flagsBuffer.data[e] & Y.b2_reactiveParticle) !== 0;
	}
}, si = class e extends Ur {
	m_contactFilter = null;
	constructor(e, t = null) {
		super(e), this.m_contactFilter = t;
	}
	ShouldCollideFixtureParticle(e, t, n) {
		return this.m_contactFilter && this.m_system.GetFlagsBuffer()[n] & Y.b2_fixtureContactFilterParticle ? this.m_contactFilter.ShouldCollideFixtureParticle(e, this.m_system, n) : !0;
	}
	ReportFixtureAndParticle(t, n, r) {
		let i = e.ReportFixtureAndParticle_s_n, a = e.ReportFixtureAndParticle_s_rp, o = this.m_system.m_positionBuffer.data[r], s = i, c = t.ComputeDistance(o, s, n);
		if (c < this.m_system.m_particleDiameter && this.ShouldCollideFixtureParticle(t, this.m_system, r)) {
			let e = t.GetBody(), n = e.GetWorldCenter(), i = e.GetMass(), l = e.GetInertia() - i * e.GetLocalCenter().LengthSquared(), u = i > 0 ? 1 / i : 0, d = l > 0 ? 1 / l : 0, f = this.m_system.m_flagsBuffer.data[r] & Y.b2_wallParticle ? 0 : this.m_system.GetParticleInvMass(), p = M.SubVV(o, n, a), m = M.CrossVV(p, s), h = f + u + d * m * m, g = this.m_system.m_bodyContactBuffer.data[this.m_system.m_bodyContactBuffer.Append()];
			g.index = r, g.body = e, g.fixture = t, g.weight = 1 - c * this.m_system.m_inverseDiameter, g.normal.Copy(s.SelfNeg()), g.mass = h > 0 ? 1 / h : 0, this.m_system.DetectStuckParticle(r);
		}
	}
	static ReportFixtureAndParticle_s_n = new M();
	static ReportFixtureAndParticle_s_rp = new M();
}, ci = class e extends Ur {
	m_step;
	constructor(e, t) {
		super(e), this.m_step = t;
	}
	ReportFixtureAndParticle(t, n, r) {
		let i = e.ReportFixtureAndParticle_s_p1, a = e.ReportFixtureAndParticle_s_output, o = e.ReportFixtureAndParticle_s_input, s = e.ReportFixtureAndParticle_s_p, l = e.ReportFixtureAndParticle_s_v, u = e.ReportFixtureAndParticle_s_f, d = t.GetBody(), f = this.m_system.m_positionBuffer.data[r], p = this.m_system.m_velocityBuffer.data[r], m = a, h = o;
		if (this.m_system.m_iterationIndex === 0) {
			let e = I.MulTXV(d.m_xf0, f, i);
			t.GetShape().GetType() === U.e_circleShape && (e.SelfSub(d.GetLocalCenter()), F.MulRV(d.m_xf0.q, e, e), F.MulTRV(d.m_xf.q, e, e), e.SelfAdd(d.GetLocalCenter())), I.MulXV(d.m_xf, e, h.p1);
		} else h.p1.Copy(f);
		if (M.AddVMulSV(f, this.m_step.dt, p, h.p2), h.maxFraction = 1, t.RayCast(m, h, n)) {
			let e = m.normal, t = s;
			t.x = (1 - m.fraction) * h.p1.x + m.fraction * h.p2.x + c * e.x, t.y = (1 - m.fraction) * h.p1.y + m.fraction * h.p2.y + c * e.y;
			let n = l;
			n.x = this.m_step.inv_dt * (t.x - f.x), n.y = this.m_step.inv_dt * (t.y - f.y), this.m_system.m_velocityBuffer.data[r].Copy(n);
			let i = u;
			i.x = this.m_step.inv_dt * this.m_system.GetParticleMass() * (p.x - n.x), i.y = this.m_step.inv_dt * this.m_system.GetParticleMass() * (p.y - n.y), this.m_system.ParticleApplyForce(r, i);
		}
	}
	static ReportFixtureAndParticle_s_p1 = new M();
	static ReportFixtureAndParticle_s_output = new je();
	static ReportFixtureAndParticle_s_input = new Ae();
	static ReportFixtureAndParticle_s_p = new M();
	static ReportFixtureAndParticle_s_v = new M();
	static ReportFixtureAndParticle_s_f = new M();
	ReportParticle(e, t) {
		return !1;
	}
}, li = class t {
	m_contactManager = new rr();
	m_bodyList = null;
	m_jointList = null;
	m_particleSystemList = null;
	m_bodyCount = 0;
	m_jointCount = 0;
	m_gravity = new M();
	m_allowSleep = !0;
	m_destructionListener = null;
	m_debugDraw = null;
	m_inv_dt0 = 0;
	m_newContacts = !1;
	m_locked = !1;
	m_clearForces = !0;
	m_warmStarting = !0;
	m_continuousPhysics = !0;
	m_subStepping = !1;
	m_stepComplete = !0;
	m_profile = new ir();
	m_island = new vr();
	s_stack = [];
	m_controllerList = null;
	m_controllerCount = 0;
	constructor(e) {
		this.m_gravity.Copy(e);
	}
	SetDestructionListener(e) {
		this.m_destructionListener = e;
	}
	SetContactFilter(e) {
		this.m_contactManager.m_contactFilter = e;
	}
	SetContactListener(e) {
		this.m_contactManager.m_contactListener = e;
	}
	SetDebugDraw(e) {
		this.m_debugDraw = e;
	}
	CreateBody(e = {}) {
		if (this.IsLocked()) throw Error();
		let t = new Ln(e, this);
		return t.m_prev = null, t.m_next = this.m_bodyList, this.m_bodyList && (this.m_bodyList.m_prev = t), this.m_bodyList = t, ++this.m_bodyCount, t;
	}
	DestroyBody(e) {
		if (this.IsLocked()) throw Error();
		let t = e.m_jointList;
		for (; t;) {
			let n = t;
			t = t.next, this.m_destructionListener && this.m_destructionListener.SayGoodbyeJoint(n.joint), this.DestroyJoint(n.joint), e.m_jointList = t;
		}
		e.m_jointList = null;
		let n = e.m_controllerList;
		for (; n;) {
			let t = n;
			n = n.nextController, t.controller.RemoveBody(e);
		}
		let r = e.m_contactList;
		for (; r;) {
			let e = r;
			r = r.next, this.m_contactManager.Destroy(e.contact);
		}
		e.m_contactList = null;
		let i = e.m_fixtureList;
		for (; i;) {
			let t = i;
			i = i.m_next, this.m_destructionListener && this.m_destructionListener.SayGoodbyeFixture(t), t.DestroyProxies(), t.Reset(), e.m_fixtureList = i, --e.m_fixtureCount;
		}
		e.m_fixtureList = null, e.m_fixtureCount = 0, e.m_prev && (e.m_prev.m_next = e.m_next), e.m_next && (e.m_next.m_prev = e.m_prev), e === this.m_bodyList && (this.m_bodyList = e.m_next), --this.m_bodyCount;
	}
	static _Joint_Create(e) {
		switch (e.type) {
			case K.e_distanceJoint: return new An(e);
			case K.e_mouseJoint: return new br(e);
			case K.e_prismaticJoint: return new xr(e);
			case K.e_revoluteJoint: return new Cr(e);
			case K.e_pulleyJoint: return new Sr(e);
			case K.e_gearJoint: return new _r(e);
			case K.e_wheelJoint: return new Tr(e);
			case K.e_weldJoint: return new wr(e);
			case K.e_frictionJoint: return new gr(e);
			case K.e_motorJoint: return new yr(e);
			case K.e_areaJoint: return new jn(e);
		}
		throw Error();
	}
	static _Joint_Destroy(e) {}
	CreateJoint(e) {
		if (this.IsLocked()) throw Error();
		let n = t._Joint_Create(e);
		n.m_prev = null, n.m_next = this.m_jointList, this.m_jointList && (this.m_jointList.m_prev = n), this.m_jointList = n, ++this.m_jointCount, n.m_edgeA.prev = null, n.m_edgeA.next = n.m_bodyA.m_jointList, n.m_bodyA.m_jointList && (n.m_bodyA.m_jointList.prev = n.m_edgeA), n.m_bodyA.m_jointList = n.m_edgeA, n.m_edgeB.prev = null, n.m_edgeB.next = n.m_bodyB.m_jointList, n.m_bodyB.m_jointList && (n.m_bodyB.m_jointList.prev = n.m_edgeB), n.m_bodyB.m_jointList = n.m_edgeB;
		let r = n.m_bodyA, i = n.m_bodyB;
		if (!n.m_collideConnected) {
			let e = i.GetContactList();
			for (; e;) e.other === r && e.contact.FlagForFiltering(), e = e.next;
		}
		return n;
	}
	DestroyJoint(e) {
		if (this.IsLocked()) throw Error();
		e.m_prev && (e.m_prev.m_next = e.m_next), e.m_next && (e.m_next.m_prev = e.m_prev), e === this.m_jointList && (this.m_jointList = e.m_next);
		let n = e.m_bodyA, r = e.m_bodyB, i = e.m_collideConnected;
		if (n.SetAwake(!0), r.SetAwake(!0), e.m_edgeA.prev && (e.m_edgeA.prev.next = e.m_edgeA.next), e.m_edgeA.next && (e.m_edgeA.next.prev = e.m_edgeA.prev), e.m_edgeA === n.m_jointList && (n.m_jointList = e.m_edgeA.next), e.m_edgeA.Reset(), e.m_edgeB.prev && (e.m_edgeB.prev.next = e.m_edgeB.next), e.m_edgeB.next && (e.m_edgeB.next.prev = e.m_edgeB.prev), e.m_edgeB === r.m_jointList && (r.m_jointList = e.m_edgeB.next), e.m_edgeB.Reset(), t._Joint_Destroy(e), --this.m_jointCount, !i) {
			let e = r.GetContactList();
			for (; e;) e.other === n && e.contact.FlagForFiltering(), e = e.next;
		}
	}
	CreateParticleSystem(e) {
		if (this.IsLocked()) throw Error();
		let t = new Yr(e, this);
		return t.m_prev = null, t.m_next = this.m_particleSystemList, this.m_particleSystemList && (this.m_particleSystemList.m_prev = t), this.m_particleSystemList = t, t;
	}
	DestroyParticleSystem(e) {
		if (this.IsLocked()) throw Error();
		e.m_prev && (e.m_prev.m_next = e.m_next), e.m_next && (e.m_next.m_prev = e.m_prev), e === this.m_particleSystemList && (this.m_particleSystemList = e.m_next);
	}
	CalculateReasonableParticleIterations(e) {
		if (this.m_particleSystemList === null) return 1;
		function t(e) {
			let t = i;
			for (let n = e.GetParticleSystemList(); n !== null; n = n.m_next) t = D(t, n.GetRadius());
			return t;
		}
		return Dr(this.m_gravity.Length(), t(this), e);
	}
	static Step_s_step = new ar();
	static Step_s_stepTimer = new ae();
	static Step_s_timer = new ae();
	Step(e, n, r, i = this.CalculateReasonableParticleIterations(e)) {
		let a = t.Step_s_stepTimer.Reset();
		this.m_newContacts &&= (this.m_contactManager.FindNewContacts(), !1), this.m_locked = !0;
		let o = t.Step_s_step;
		o.dt = e, o.velocityIterations = n, o.positionIterations = r, o.particleIterations = i, o.inv_dt = e > 0 ? 1 / e : 0, o.dtRatio = this.m_inv_dt0 * e, o.warmStarting = this.m_warmStarting;
		let s = t.Step_s_timer.Reset();
		if (this.m_contactManager.Collide(), this.m_profile.collide = s.GetMilliseconds(), this.m_stepComplete && o.dt > 0) {
			let e = t.Step_s_timer.Reset();
			for (let e = this.m_particleSystemList; e; e = e.m_next) e.Solve(o);
			this.Solve(o), this.m_profile.solve = e.GetMilliseconds();
		}
		if (this.m_continuousPhysics && o.dt > 0) {
			let e = t.Step_s_timer.Reset();
			this.SolveTOI(o), this.m_profile.solveTOI = e.GetMilliseconds();
		}
		o.dt > 0 && (this.m_inv_dt0 = o.inv_dt), this.m_clearForces && this.ClearForces(), this.m_locked = !1, this.m_profile.step = a.GetMilliseconds();
	}
	ClearForces() {
		for (let e = this.m_bodyList; e; e = e.m_next) e.m_force.SetZero(), e.m_torque = 0;
	}
	DrawParticleSystem(e) {
		if (this.m_debugDraw === null) return;
		let t = e.GetParticleCount();
		if (t) {
			let n = e.GetRadius(), r = e.GetPositionBuffer();
			if (e.m_colorBuffer.data) {
				let i = e.GetColorBuffer();
				this.m_debugDraw.DrawParticles(r, n, i, t);
			} else this.m_debugDraw.DrawParticles(r, n, null, t);
		}
	}
	static DebugDraw_s_color = new e(0, 0, 0);
	static DebugDraw_s_vs = M.MakeArray(4);
	static DebugDraw_s_xf = new I();
	DebugDraw() {
		if (this.m_debugDraw === null) return;
		let r = this.m_debugDraw.GetFlags(), i = t.DebugDraw_s_color.SetRGB(0, 0, 0);
		if (r & n.e_shapeBit) for (let t = this.m_bodyList; t; t = t.m_next) {
			let n = t.m_xf;
			this.m_debugDraw.PushTransform(n);
			for (let n = t.GetFixtureList(); n; n = n.m_next) t.GetType() === J.b2_dynamicBody && t.m_mass === 0 ? this.DrawShape(n, new e(1, 0, 0)) : t.IsEnabled() ? t.GetType() === J.b2_staticBody ? (i.SetRGB(.5, .9, .5), this.DrawShape(n, i)) : t.GetType() === J.b2_kinematicBody ? (i.SetRGB(.5, .5, .9), this.DrawShape(n, i)) : t.IsAwake() ? (i.SetRGB(.9, .7, .7), this.DrawShape(n, i)) : (i.SetRGB(.6, .6, .6), this.DrawShape(n, i)) : (i.SetRGB(.5, .5, .3), this.DrawShape(n, i));
			this.m_debugDraw.PopTransform(n);
		}
		if (r & n.e_particleBit) for (let e = this.m_particleSystemList; e; e = e.m_next) this.DrawParticleSystem(e);
		if (r & n.e_jointBit) for (let e = this.m_jointList; e; e = e.m_next) e.Draw(this.m_debugDraw);
		if (r & n.e_pairBit) {
			i.SetRGB(.3, .9, .9);
			for (let e = this.m_contactManager.m_contactList; e; e = e.m_next) {
				let t = e.GetFixtureA(), n = e.GetFixtureB(), r = e.GetChildIndexA(), a = e.GetChildIndexB(), o = t.GetAABB(r).GetCenter(), s = n.GetAABB(a).GetCenter();
				this.m_debugDraw.DrawSegment(o, s, i);
			}
		}
		if (r & n.e_aabbBit) {
			i.SetRGB(.9, .3, .9);
			let e = t.DebugDraw_s_vs;
			for (let t = this.m_bodyList; t; t = t.m_next) if (t.IsEnabled()) for (let n = t.GetFixtureList(); n; n = n.m_next) for (let t = 0; t < n.m_proxyCount; ++t) {
				let r = n.m_proxies[t].treeNode.aabb;
				e[0].Set(r.lowerBound.x, r.lowerBound.y), e[1].Set(r.upperBound.x, r.lowerBound.y), e[2].Set(r.upperBound.x, r.upperBound.y), e[3].Set(r.lowerBound.x, r.upperBound.y), this.m_debugDraw.DrawPolygon(e, 4, i);
			}
		}
		if (r & n.e_centerOfMassBit) for (let e = this.m_bodyList; e; e = e.m_next) {
			let n = t.DebugDraw_s_xf;
			n.q.Copy(e.m_xf.q), n.p.Copy(e.GetWorldCenter()), this.m_debugDraw.DrawTransform(n);
		}
		if (r & n.e_controllerBit) for (let e = this.m_controllerList; e; e = e.m_next) e.Draw(this.m_debugDraw);
	}
	QueryAABB(...e) {
		e[0] instanceof tr ? this._QueryAABB(e[0], e[1]) : this._QueryAABB(null, e[0], e[1]);
	}
	_QueryAABB(e, t, n) {
		if (this.m_contactManager.m_broadPhase.Query(t, (t) => {
			let r = t.userData.fixture;
			return e ? e.ReportFixture(r) : !n || n(r);
		}), e instanceof tr) for (let n = this.m_particleSystemList; n; n = n.m_next) e.ShouldQueryParticleSystem(n) && n.QueryAABB(e, t);
	}
	QueryAllAABB(e, t = []) {
		return this.QueryAABB(e, (e) => (t.push(e), !0)), t;
	}
	QueryPointAABB(...e) {
		e[0] instanceof tr ? this._QueryPointAABB(e[0], e[1]) : this._QueryPointAABB(null, e[0], e[1]);
	}
	_QueryPointAABB(e, t, n) {
		if (this.m_contactManager.m_broadPhase.QueryPoint(t, (t) => {
			let r = t.userData.fixture;
			return e ? e.ReportFixture(r) : !n || n(r);
		}), e instanceof tr) for (let n = this.m_particleSystemList; n; n = n.m_next) e.ShouldQueryParticleSystem(n) && n.QueryPointAABB(e, t);
	}
	QueryAllPointAABB(e, t = []) {
		return this.QueryPointAABB(e, (e) => (t.push(e), !0)), t;
	}
	QueryFixtureShape(...e) {
		e[0] instanceof tr ? this._QueryFixtureShape(e[0], e[1], e[2], e[3]) : this._QueryFixtureShape(null, e[0], e[1], e[2], e[3]);
	}
	static QueryFixtureShape_s_aabb = new V();
	_QueryFixtureShape(e, n, r, i, a) {
		let o = t.QueryFixtureShape_s_aabb;
		if (n.ComputeAABB(o, i, r), this.m_contactManager.m_broadPhase.Query(o, (t) => {
			let o = t.userData, s = o.fixture;
			if (Le(n, r, s.GetShape(), o.childIndex, i, s.GetBody().GetTransform())) {
				if (e) return e.ReportFixture(s);
				if (a) return a(s);
			}
			return !0;
		}), e instanceof tr) for (let t = this.m_particleSystemList; t; t = t.m_next) e.ShouldQueryParticleSystem(t) && t.QueryAABB(e, o);
	}
	QueryAllFixtureShape(e, t, n, r = []) {
		return this.QueryFixtureShape(e, t, n, (e) => (r.push(e), !0)), r;
	}
	QueryFixturePoint(...e) {
		e[0] instanceof tr ? this._QueryFixturePoint(e[0], e[1]) : this._QueryFixturePoint(null, e[0], e[1]);
	}
	_QueryFixturePoint(e, t, n) {
		if (this.m_contactManager.m_broadPhase.QueryPoint(t, (r) => {
			let i = r.userData.fixture;
			if (i.TestPoint(t)) {
				if (e) return e.ReportFixture(i);
				if (n) return n(i);
			}
			return !0;
		}), e) for (let n = this.m_particleSystemList; n; n = n.m_next) e.ShouldQueryParticleSystem(n) && n.QueryPointAABB(e, t);
	}
	QueryAllFixturePoint(e, t = []) {
		return this.QueryFixturePoint(e, (e) => (t.push(e), !0)), t;
	}
	RayCast(...e) {
		e[0] instanceof nr ? this._RayCast(e[0], e[1], e[2]) : this._RayCast(null, e[0], e[1], e[2]);
	}
	static RayCast_s_input = new Ae();
	static RayCast_s_output = new je();
	static RayCast_s_point = new M();
	_RayCast(e, n, r, i) {
		let a = t.RayCast_s_input;
		if (a.maxFraction = 1, a.p1.Copy(n), a.p2.Copy(r), this.m_contactManager.m_broadPhase.RayCast(a, (a, o) => {
			let s = o.userData, c = s.fixture, l = s.childIndex, u = t.RayCast_s_output;
			if (c.RayCast(u, a, l)) {
				let a = u.fraction, o = t.RayCast_s_point;
				if (o.Set((1 - a) * n.x + a * r.x, (1 - a) * n.y + a * r.y), e) return e.ReportFixture(c, o, u.normal, a);
				if (i) return i(c, o, u.normal, a);
			}
			return a.maxFraction;
		}), e) for (let t = this.m_particleSystemList; t; t = t.m_next) e.ShouldQueryParticleSystem(t) && t.RayCast(e, n, r);
	}
	RayCastOne(e, t) {
		let n = null, r = 1;
		return this.RayCast(e, t, (e, t, i, a) => (a < r && (r = a, n = e), r)), n;
	}
	RayCastAll(e, t, n = []) {
		return this.RayCast(e, t, (e, t, r, i) => (n.push(e), 1)), n;
	}
	GetBodyList() {
		return this.m_bodyList;
	}
	GetJointList() {
		return this.m_jointList;
	}
	GetParticleSystemList() {
		return this.m_particleSystemList;
	}
	GetContactList() {
		return this.m_contactManager.m_contactList;
	}
	SetAllowSleeping(e) {
		if (e !== this.m_allowSleep && (this.m_allowSleep = e, !this.m_allowSleep)) for (let e = this.m_bodyList; e; e = e.m_next) e.SetAwake(!0);
	}
	GetAllowSleeping() {
		return this.m_allowSleep;
	}
	SetWarmStarting(e) {
		this.m_warmStarting = e;
	}
	GetWarmStarting() {
		return this.m_warmStarting;
	}
	SetContinuousPhysics(e) {
		this.m_continuousPhysics = e;
	}
	GetContinuousPhysics() {
		return this.m_continuousPhysics;
	}
	SetSubStepping(e) {
		this.m_subStepping = e;
	}
	GetSubStepping() {
		return this.m_subStepping;
	}
	GetProxyCount() {
		return this.m_contactManager.m_broadPhase.GetProxyCount();
	}
	GetBodyCount() {
		return this.m_bodyCount;
	}
	GetJointCount() {
		return this.m_jointCount;
	}
	GetContactCount() {
		return this.m_contactManager.m_contactCount;
	}
	GetTreeHeight() {
		return this.m_contactManager.m_broadPhase.GetTreeHeight();
	}
	GetTreeBalance() {
		return this.m_contactManager.m_broadPhase.GetTreeBalance();
	}
	GetTreeQuality() {
		return this.m_contactManager.m_broadPhase.GetTreeQuality();
	}
	SetGravity(e, t = !0) {
		if (!M.IsEqualToV(this.m_gravity, e) && (this.m_gravity.Copy(e), t)) for (let e = this.m_bodyList; e; e = e.m_next) e.SetAwake(!0);
	}
	GetGravity() {
		return this.m_gravity;
	}
	IsLocked() {
		return this.m_locked;
	}
	SetAutoClearForces(e) {
		this.m_clearForces = e;
	}
	GetAutoClearForces() {
		return this.m_clearForces;
	}
	ShiftOrigin(e) {
		if (this.IsLocked()) throw Error();
		for (let t = this.m_bodyList; t; t = t.m_next) t.m_xf.p.SelfSub(e), t.m_sweep.c0.SelfSub(e), t.m_sweep.c.SelfSub(e);
		for (let t = this.m_jointList; t; t = t.m_next) t.ShiftOrigin(e);
		this.m_contactManager.m_broadPhase.ShiftOrigin(e);
	}
	GetContactManager() {
		return this.m_contactManager;
	}
	GetProfile() {
		return this.m_profile;
	}
	Dump(e) {
		if (this.m_locked) return;
		e("const g: b2Vec2 = new b2Vec2(%.15f, %.15f);\n", this.m_gravity.x, this.m_gravity.y), e("this.m_world.SetGravity(g);\n"), e("const bodies: b2Body[] = [];\n"), e("const joints: b2Joint[] = [];\n");
		let t = 0;
		for (let n = this.m_bodyList; n; n = n.m_next) n.m_islandIndex = t, n.Dump(e), ++t;
		t = 0;
		for (let e = this.m_jointList; e; e = e.m_next) e.m_index = t, ++t;
		for (let t = this.m_jointList; t; t = t.m_next) t.m_type !== K.e_gearJoint && (e("{\n"), t.Dump(e), e("}\n"));
		for (let t = this.m_jointList; t; t = t.m_next) t.m_type === K.e_gearJoint && (e("{\n"), t.Dump(e), e("}\n"));
	}
	DrawShape(e, t) {
		if (this.m_debugDraw === null) return;
		let n = e.GetShape();
		switch (n.m_type) {
			case U.e_circleShape: {
				let e = n, r = e.m_p, i = e.m_radius, a = M.UNITX;
				this.m_debugDraw.DrawSolidCircle(r, i, a, t);
				break;
			}
			case U.e_edgeShape: {
				let e = n, r = e.m_vertex1, i = e.m_vertex2;
				this.m_debugDraw.DrawSegment(r, i, t), e.m_oneSided === !1 && (this.m_debugDraw.DrawPoint(r, 4, t), this.m_debugDraw.DrawPoint(i, 4, t));
				break;
			}
			case U.e_chainShape: {
				let e = n, r = e.m_count, i = e.m_vertices, a = i[0];
				for (let e = 1; e < r; ++e) {
					let n = i[e];
					this.m_debugDraw.DrawSegment(a, n, t), a = n;
				}
				break;
			}
			case U.e_polygonShape: {
				let e = n, r = e.m_count, i = e.m_vertices;
				this.m_debugDraw.DrawSolidPolygon(i, r, t);
				break;
			}
		}
	}
	Solve(e) {
		for (let e = this.m_bodyList; e; e = e.m_next) e.m_xf0.Copy(e.m_xf);
		for (let t = this.m_controllerList; t; t = t.m_next) t.Step(e);
		this.m_profile.solveInit = 0, this.m_profile.solveVelocity = 0, this.m_profile.solvePosition = 0;
		let t = this.m_island;
		t.Initialize(this.m_bodyCount, this.m_contactManager.m_contactCount, this.m_jointCount, this.m_contactManager.m_contactListener);
		for (let e = this.m_bodyList; e; e = e.m_next) e.m_islandFlag = !1;
		for (let e = this.m_contactManager.m_contactList; e; e = e.m_next) e.m_islandFlag = !1;
		for (let e = this.m_jointList; e; e = e.m_next) e.m_islandFlag = !1;
		let n = this.s_stack;
		for (let r = this.m_bodyList; r; r = r.m_next) {
			if (r.m_islandFlag || !r.IsAwake() || !r.IsEnabled() || r.GetType() === J.b2_staticBody) continue;
			t.Clear();
			let i = 0;
			for (n[i++] = r, r.m_islandFlag = !0; i > 0;) {
				let e = n[--i];
				if (!e) throw Error();
				if (t.AddBody(e), e.GetType() !== J.b2_staticBody) {
					e.m_awakeFlag = !0;
					for (let r = e.m_contactList; r; r = r.next) {
						let e = r.contact;
						if (e.m_islandFlag || !e.IsEnabled() || !e.IsTouching()) continue;
						let a = e.m_fixtureA.m_isSensor, o = e.m_fixtureB.m_isSensor;
						if (a || o) continue;
						t.AddContact(e), e.m_islandFlag = !0;
						let s = r.other;
						s.m_islandFlag ||= (n[i++] = s, !0);
					}
					for (let r = e.m_jointList; r; r = r.next) {
						if (r.joint.m_islandFlag) continue;
						let e = r.other;
						e.IsEnabled() && (t.AddJoint(r.joint), r.joint.m_islandFlag = !0, !e.m_islandFlag && (n[i++] = e, e.m_islandFlag = !0));
					}
				}
			}
			let a = new ir();
			t.Solve(a, e, this.m_gravity, this.m_allowSleep), this.m_profile.solveInit += a.solveInit, this.m_profile.solveVelocity += a.solveVelocity, this.m_profile.solvePosition += a.solvePosition;
			for (let e = 0; e < t.m_bodyCount; ++e) {
				let n = t.m_bodies[e];
				n.GetType() === J.b2_staticBody && (n.m_islandFlag = !1);
			}
		}
		for (let e = 0; e < n.length && n[e]; ++e) n[e] = null;
		let r = new ae();
		for (let e = this.m_bodyList; e; e = e.m_next) e.m_islandFlag && e.GetType() !== J.b2_staticBody && e.SynchronizeFixtures();
		this.m_contactManager.FindNewContacts(), this.m_profile.broadphase = r.GetMilliseconds();
	}
	static SolveTOI_s_subStep = new ar();
	static SolveTOI_s_backup = new L();
	static SolveTOI_s_backup1 = new L();
	static SolveTOI_s_backup2 = new L();
	static SolveTOI_s_toi_input = new mn();
	static SolveTOI_s_toi_output = new hn();
	SolveTOI(e) {
		let n = this.m_island;
		if (n.Initialize(64, 32, 0, this.m_contactManager.m_contactListener), this.m_stepComplete) {
			for (let e = this.m_bodyList; e; e = e.m_next) e.m_islandFlag = !1, e.m_sweep.alpha0 = 0;
			for (let e = this.m_contactManager.m_contactList; e; e = e.m_next) e.m_toiFlag = !1, e.m_islandFlag = !1, e.m_toiCount = 0, e.m_toi = 1;
		}
		for (;;) {
			let r = null, i = 1;
			for (let e = this.m_contactManager.m_contactList; e; e = e.m_next) {
				if (!e.IsEnabled() || e.m_toiCount > 8) continue;
				let n = 1;
				if (e.m_toiFlag) n = e.m_toi;
				else {
					let r = e.GetFixtureA(), i = e.GetFixtureB();
					if (r.IsSensor() || i.IsSensor()) continue;
					let a = r.GetBody(), o = i.GetBody(), s = a.m_type, c = o.m_type, l = a.IsAwake() && s !== J.b2_staticBody, u = o.IsAwake() && c !== J.b2_staticBody;
					if (!l && !u) continue;
					let d = a.IsBullet() || s !== J.b2_dynamicBody, f = o.IsBullet() || c !== J.b2_dynamicBody;
					if (!d && !f) continue;
					let p = a.m_sweep.alpha0;
					a.m_sweep.alpha0 < o.m_sweep.alpha0 ? (p = o.m_sweep.alpha0, a.m_sweep.Advance(p)) : o.m_sweep.alpha0 < a.m_sweep.alpha0 && (p = a.m_sweep.alpha0, o.m_sweep.Advance(p));
					let m = e.GetChildIndexA(), h = e.GetChildIndexB(), g = t.SolveTOI_s_toi_input;
					g.proxyA.SetShape(r.GetShape(), m), g.proxyB.SetShape(i.GetShape(), h), g.sweepA.Copy(a.m_sweep), g.sweepB.Copy(o.m_sweep), g.tMax = 1;
					let _ = t.SolveTOI_s_toi_output;
					En(_, g);
					let v = _.t;
					n = _.state === W.e_touching ? D(p + (1 - p) * v, 1) : 1, e.m_toi = n, e.m_toiFlag = !0;
				}
				n < i && (r = e, i = n);
			}
			if (r === null || .9999 < i) {
				this.m_stepComplete = !0;
				break;
			}
			let a = r.GetFixtureA(), o = r.GetFixtureB(), s = a.GetBody(), c = o.GetBody(), l = t.SolveTOI_s_backup1.Copy(s.m_sweep), u = t.SolveTOI_s_backup2.Copy(c.m_sweep);
			if (s.Advance(i), c.Advance(i), r.Update(this.m_contactManager.m_contactListener), r.m_toiFlag = !1, ++r.m_toiCount, !r.IsEnabled() || !r.IsTouching()) {
				r.SetEnabled(!1), s.m_sweep.Copy(l), c.m_sweep.Copy(u), s.SynchronizeTransform(), c.SynchronizeTransform();
				continue;
			}
			s.SetAwake(!0), c.SetAwake(!0), n.Clear(), n.AddBody(s), n.AddBody(c), n.AddContact(r), s.m_islandFlag = !0, c.m_islandFlag = !0, r.m_islandFlag = !0;
			for (let e = 0; e < 2; ++e) {
				let r = e === 0 ? s : c;
				if (r.m_type === J.b2_dynamicBody) for (let e = r.m_contactList; e && n.m_bodyCount !== n.m_bodyCapacity && n.m_contactCount !== n.m_contactCapacity; e = e.next) {
					let a = e.contact;
					if (a.m_islandFlag) continue;
					let o = e.other;
					if (o.m_type === J.b2_dynamicBody && !r.IsBullet() && !o.IsBullet()) continue;
					let s = a.m_fixtureA.m_isSensor, c = a.m_fixtureB.m_isSensor;
					if (s || c) continue;
					let l = t.SolveTOI_s_backup.Copy(o.m_sweep);
					if (o.m_islandFlag || o.Advance(i), a.Update(this.m_contactManager.m_contactListener), !a.IsEnabled()) {
						o.m_sweep.Copy(l), o.SynchronizeTransform();
						continue;
					}
					if (!a.IsTouching()) {
						o.m_sweep.Copy(l), o.SynchronizeTransform();
						continue;
					}
					a.m_islandFlag = !0, n.AddContact(a), !o.m_islandFlag && (o.m_islandFlag = !0, o.m_type !== J.b2_staticBody && o.SetAwake(!0), n.AddBody(o));
				}
			}
			let d = t.SolveTOI_s_subStep;
			d.dt = (1 - i) * e.dt, d.inv_dt = 1 / d.dt, d.dtRatio = 1, d.positionIterations = 20, d.velocityIterations = e.velocityIterations, d.particleIterations = e.particleIterations, d.warmStarting = !1, n.SolveTOI(d, s.m_islandIndex, c.m_islandIndex);
			for (let e = 0; e < n.m_bodyCount; ++e) {
				let t = n.m_bodies[e];
				if (t.m_islandFlag = !1, t.m_type === J.b2_dynamicBody) {
					t.SynchronizeFixtures();
					for (let e = t.m_contactList; e; e = e.next) e.contact.m_toiFlag = !1, e.contact.m_islandFlag = !1;
				}
			}
			if (this.m_contactManager.FindNewContacts(), this.m_subStepping) {
				this.m_stepComplete = !1;
				break;
			}
		}
	}
	AddController(e) {
		return e.m_next = this.m_controllerList, e.m_prev = null, this.m_controllerList && (this.m_controllerList.m_prev = e), this.m_controllerList = e, ++this.m_controllerCount, e;
	}
	RemoveController(e) {
		return e.m_prev && (e.m_prev.m_next = e.m_next), e.m_next && (e.m_next.m_prev = e.m_prev), this.m_controllerList === e && (this.m_controllerList = e.m_next), --this.m_controllerCount, e.m_prev = null, e.m_next = null, e;
	}
}, ui;
(function(e) {
	e[e.b2_pbdStretchingModel = 0] = "b2_pbdStretchingModel", e[e.b2_xpbdStretchingModel = 1] = "b2_xpbdStretchingModel";
})(ui ||= {});
var di;
(function(e) {
	e[e.b2_springAngleBendingModel = 0] = "b2_springAngleBendingModel", e[e.b2_pbdAngleBendingModel = 1] = "b2_pbdAngleBendingModel", e[e.b2_xpbdAngleBendingModel = 2] = "b2_xpbdAngleBendingModel", e[e.b2_pbdDistanceBendingModel = 3] = "b2_pbdDistanceBendingModel", e[e.b2_pbdHeightBendingModel = 4] = "b2_pbdHeightBendingModel", e[e.b2_pbdTriangleBendingModel = 5] = "b2_pbdTriangleBendingModel";
})(di ||= {});
//#endregion
//#region ../../../../tmp/claude-0/-home-user/98102b14-929e-54a0-bb74-ef07c2e34668/scratchpad/b2/esm/controllers/b2_controller.js
var fi = class {
	controller;
	body;
	prevBody = null;
	nextBody = null;
	prevController = null;
	nextController = null;
	constructor(e, t) {
		this.controller = e, this.body = t;
	}
}, pi = class {
	m_bodyList = null;
	m_bodyCount = 0;
	m_prev = null;
	m_next = null;
	GetNext() {
		return this.m_next;
	}
	GetPrev() {
		return this.m_prev;
	}
	GetBodyList() {
		return this.m_bodyList;
	}
	AddBody(e) {
		let t = new fi(this, e);
		t.nextBody = this.m_bodyList, t.prevBody = null, this.m_bodyList && (this.m_bodyList.prevBody = t), this.m_bodyList = t, ++this.m_bodyCount, t.nextController = e.m_controllerList, t.prevController = null, e.m_controllerList && (e.m_controllerList.prevController = t), e.m_controllerList = t, ++e.m_controllerCount;
	}
	RemoveBody(e) {
		if (this.m_bodyCount <= 0) throw Error();
		let t = this.m_bodyList;
		for (; t && t.body !== e;) t = t.nextBody;
		if (t === null) throw Error();
		t.prevBody && (t.prevBody.nextBody = t.nextBody), t.nextBody && (t.nextBody.prevBody = t.prevBody), this.m_bodyList === t && (this.m_bodyList = t.nextBody), --this.m_bodyCount, t.nextController && (t.nextController.prevController = t.prevController), t.prevController && (t.prevController.nextController = t.nextController), e.m_controllerList === t && (e.m_controllerList = t.nextController), --e.m_controllerCount;
	}
	Clear() {
		for (; this.m_bodyList;) this.RemoveBody(this.m_bodyList.body);
		this.m_bodyCount = 0;
	}
};
(class e extends pi {
	A = new M(0, 0);
	Step(t) {
		let n = M.MulSV(t.dt, this.A, e.Step_s_dtA);
		for (let e = this.m_bodyList; e; e = e.nextBody) {
			let t = e.body;
			t.IsAwake() && t.SetLinearVelocity(M.AddVV(t.GetLinearVelocity(), n, M.s_t0));
		}
	}
	static Step_s_dtA = new M();
	Draw(e) {}
}), class e extends pi {
	G = 1;
	invSqr = !0;
	Step(t) {
		if (this.invSqr) for (let t = this.m_bodyList; t; t = t.nextBody) {
			let n = t.body, r = n.GetWorldCenter(), i = n.GetMass();
			for (let a = this.m_bodyList; a && a !== t; a = a.nextBody) {
				let t = a.body, o = t.GetWorldCenter(), s = t.GetMass(), c = o.x - r.x, l = o.y - r.y, u = c * c + l * l;
				if (u < 1e-5) continue;
				let d = e.Step_s_f.Set(c, l);
				d.SelfMul(this.G / u / j(u) * i * s), n.IsAwake() && n.ApplyForce(d, r), t.IsAwake() && t.ApplyForce(d.SelfMul(-1), o);
			}
		}
		else for (let t = this.m_bodyList; t; t = t.nextBody) {
			let n = t.body, r = n.GetWorldCenter(), i = n.GetMass();
			for (let a = this.m_bodyList; a && a !== t; a = a.nextBody) {
				let t = a.body, o = t.GetWorldCenter(), s = t.GetMass(), c = o.x - r.x, l = o.y - r.y, u = c * c + l * l;
				if (u < 1e-5) continue;
				let d = e.Step_s_f.Set(c, l);
				d.SelfMul(this.G / u * i * s), n.IsAwake() && n.ApplyForce(d, r), t.IsAwake() && t.ApplyForce(d.SelfMul(-1), o);
			}
		}
	}
	static Step_s_f = new M();
	Draw(e) {}
}, class e extends pi {
	T = new P();
	maxTimestep = 0;
	Step(t) {
		let n = t.dt;
		if (!(n <= 1e-5)) {
			n > this.maxTimestep && this.maxTimestep > 0 && (n = this.maxTimestep);
			for (let t = this.m_bodyList; t; t = t.nextBody) {
				let r = t.body;
				if (!r.IsAwake()) continue;
				let i = r.GetWorldVector(P.MulMV(this.T, r.GetLocalVector(r.GetLinearVelocity(), M.s_t0), M.s_t1), e.Step_s_damping);
				r.SetLinearVelocity(M.AddVV(r.GetLinearVelocity(), M.MulSV(n, i, M.s_t0), M.s_t1));
			}
		}
	}
	static Step_s_damping = new M();
	Draw(e) {}
	SetAxisAligned(e, t) {
		this.T.ex.x = -e, this.T.ex.y = 0, this.T.ey.x = 0, this.T.ey.y = -t, this.maxTimestep = e > 0 || t > 0 ? 1 / O(e, t) : 0;
	}
}, J.b2_staticBody, J.b2_kinematicBody, J.b2_dynamicBody, di.b2_springAngleBendingModel, di.b2_pbdAngleBendingModel, di.b2_xpbdAngleBendingModel, di.b2_pbdDistanceBendingModel, di.b2_pbdHeightBendingModel, di.b2_pbdTriangleBendingModel, ui.b2_pbdStretchingModel, ui.b2_xpbdStretchingModel;
//#endregion
export { In as BodyDef, J as BodyType, Ge as CircleShape, Hn as Contact, Nn as FixtureDef, De as Manifold, Qt as PolygonShape, M as Vec2, li as World, Oe as WorldManifold };
