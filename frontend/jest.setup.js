import '@testing-library/jest-dom'
// Polyfill fetch for jest/jsdom environment
import 'whatwg-fetch'

// Polyfill TextEncoder/TextDecoder required by some libraries (e.g., MSW/interceptors)
import { TextEncoder, TextDecoder } from 'util'
// Guard against redefining in environments that already provide them
if (typeof global.TextEncoder === 'undefined') {
	// @ts-ignore
	global.TextEncoder = TextEncoder
}
if (typeof global.TextDecoder === 'undefined') {
	// @ts-ignore
	global.TextDecoder = TextDecoder
}

// Provide a minimal BroadcastChannel stub if missing (used by msw)
// Avoid using the 'broadcast-channel' package here to prevent conflicts in jsdom.
// @ts-ignore
if (typeof global.BroadcastChannel === 'undefined') {
	// @ts-ignore
	global.BroadcastChannel = class {
		constructor(name) { this.name = name }
		postMessage() {}
		close() {}
		addEventListener() {}
		removeEventListener() {}
	}
}