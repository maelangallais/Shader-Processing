
const fragmentShaderSource = /* glsl */`
    precision mediump float;

    uniform vec2 u_resolution;
    uniform float u_time;
    uniform vec2 u_offsetScreen;

    float sdSegment(in vec2 p, in vec2 a, in vec2 b) {
        vec2 pa = p - a;
        vec2 ba = b - a;

        float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);

        return length(pa - ba * h);
    }

    float hash(vec2 p) {
        p = fract(p * vec4(443.897, 441.423, 437.195, 444.129).xy);
        p += dot(p, p.yx + 19.19);
        return fract(p.x * p.y);
    }

    float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);

        // vec2 u = f;
        // vec2 u = f * f * (3.0 - 2.0 * f);
        vec2 u = f * f * f * (f * (f * 6.0 - 15.0) + 10.0);

        float topLeftCorner = hash(i + vec2(0., 0.));
        float topRightCorner = hash(i + vec2(1., 0.));
        float bottomLeftCorner = hash(i + vec2(0., 1.));
        float bottomRightCorner = hash(i + vec2(1., 1.));

        float topMix = mix(topLeftCorner, topRightCorner, u.x);
        float bottomMix = mix(bottomLeftCorner, bottomRightCorner, u.x);

        float finalMix = mix(topMix, bottomMix, u.y);

        return finalMix;
    }

    float fbm(vec2 p) {
        float value = 0.;
        float amplitude = .5;
        for (int i = 0; i < 5; i++) {
            value += amplitude * noise(p);
            p *= 2.;
            amplitude *= .5;
        }

        return value;
    }

    void main() {
        vec2 st = gl_FragCoord.xy/u_resolution.xy;
        st.x *= u_resolution.x / u_resolution.y;
        st += u_offsetScreen;

        vec2 centre = vec2(0.5 * (u_resolution.x / u_resolution.y), 0.5);
        float rayon = 0.3 + pow(sin(u_time) * 0.13, 2.) * 0.25;
        float dist = length(st - centre);

        float sphereMask = 1. - smoothstep(rayon - 0.005, rayon + 0.005, dist);

        vec3 color1 = vec3(.85, .2, .15);
        vec3 color2 = vec3(1., .75, .1);

        float scale = 25.;
        st *= scale;

        vec3 innerSun = mix(color2, color1, 1. - fbm(st)) * sphereMask * 1.2;

        float outerLayer = clamp(smoothstep(rayon - 0.005, rayon + 0.005, dist) - smoothstep(0., rayon + 0.2, dist), 0., 1.);
        vec3 outerSun = mix(color2, color1, outerLayer) * outerLayer;

        gl_FragColor = vec4(innerSun + outerSun, 1.0);
    }
`;
