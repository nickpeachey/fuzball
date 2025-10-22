import '@testing-library/jest-dom'
// Polyfill fetch for jest/jsdom environment
import 'whatwg-fetch'

// Polyfill TextEncoder/TextDecoder required by some libraries (e.g., MSW/interceptors)
import { TextEncoder, TextDecoder } from 'util'
// Guard against redefining in environments that already provide them
if (typeof globalThis.TextEncoder === 'undefined') {
	globalThis.TextEncoder = TextEncoder
}
if (typeof globalThis.TextDecoder === 'undefined') {
	globalThis.TextDecoder = TextDecoder
}

// Provide a minimal BroadcastChannel stub if missing (used by msw)
// Avoid using the 'broadcast-channel' package here to prevent conflicts in jsdom.
if (typeof globalThis.BroadcastChannel === 'undefined') {
	globalThis.BroadcastChannel = class {
		constructor(name) { this.name = name }
		postMessage() {}
		close() {}
		addEventListener() {}
		removeEventListener() {}
	}
}