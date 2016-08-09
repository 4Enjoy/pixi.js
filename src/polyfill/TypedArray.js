/**
 * Created by chaika on 09.08.16.
 */
if(typeof Float32Array != 'undefined') {
    if(Float32Array.prototype && !Float32Array.prototype.subarray) {
        // Approximations of internal ECMAScript conversion functions
        var ECMAScript = (function() {
            return {
                ToInt32: function(v) { return v >> 0; }
            };
        }());

        Float32Array.prototype.subarray = function(start, end) {
            function clamp(v, min, max) { return v < min ? min : v > max ? max : v; }

            start = ECMAScript.ToInt32(start);
            end = ECMAScript.ToInt32(end);

            if (arguments.length < 1) { start = 0; }
            if (arguments.length < 2) { end = this.length; }

            if (start < 0) { start = this.length + start; }
            if (end < 0) { end = this.length + end; }

            start = clamp(start, 0, this.length);
            end = clamp(end, 0, this.length);

            var len = end - start;
            if (len < 0) {
                len = 0;
            }

            return new this.constructor(
                this.buffer, this.byteOffset + start * this.BYTES_PER_ELEMENT, len);
        };
    }
}
