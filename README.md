# Comparison of JSON and Protocol Buffers

As expected there is hardly any benefit when transferring utf-8 text, roughly 1 - 3 % when using gzip.

For numbers the benefit is 13 - 21 % smaller payloads.

Example output:

```
Text JSON
--------------------------
Transferred bytes  400941
Uncompressed bytes 1049227
--------------------------

Text JSON with plain object keys
--------------------------
Transferred bytes  392128
Uncompressed bytes 729227
--------------------------

Text Protobuf
--------------------------
Transferred bytes  388118
Uncompressed bytes 532462
--------------------------

16-bit Number JSON
--------------------------
Transferred bytes  166768
Uncompressed bytes 741186
--------------------------

16-bit sint32 Protobuf
--------------------------
Transferred bytes  134635
Uncompressed bytes 162925
--------------------------

32-bit Number JSON
--------------------------
Transferred bytes  275981
Uncompressed bytes 937733
--------------------------

32-bit sint32 Protobuf
--------------------------
Transferred bytes  219059
Uncompressed bytes 245416
--------------------------

53-bit Number JSON
--------------------------
Transferred bytes  392513
Uncompressed bytes 1183118
--------------------------

53-bit sint64 Protobuf
--------------------------
Transferred bytes  334116
Uncompressed bytes 366792
--------------------------

53-bit int64 Footgun Protobuf
--------------------------
Transferred bytes  341627
Uncompressed bytes 406786
--------------------------

Protobuf of utf-8 text was 3.20 % smaller than JSON
Protobuf of utf-8 text was 1.02 % smaller than JSON with plain object keys

Protobuf of 16-bit sint32 numbers was 19.27 % smaller than JSON
Protobuf of 32-bit sint32 numbers was 20.63 % smaller than JSON
Protobuf of 53-bit sint64 numbers was 14.88 % smaller than JSON
Protobuf of 53-bit int64  numbers was 12.96 % smaller than JSON

Text JSON and protobuf have the same data
```
