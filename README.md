# Comparison of JSON and Protocol Buffers

As expected there is hardly any benefit when transferring utf-8 text, roughly 1 - 3 % when using gzip.

For numbers the benefit is 13 - 21 % smaller payloads.

Example output:

```
Text JSON
--------------------------
Transferred bytes 1049227
Compressed bytes  400929
--------------------------

Text JSON with plain object keys
--------------------------
Transferred bytes 729227
Compressed bytes  392116
--------------------------

Text Protobuf
--------------------------
Transferred bytes 532462
Compressed bytes  388106
--------------------------

16-bit Number JSON
--------------------------
Transferred bytes 741186
Compressed bytes  166756
--------------------------

16-bit Number Protobuf
--------------------------
Transferred bytes 162925
Compressed bytes  134623
--------------------------

32-bit Number JSON
--------------------------
Transferred bytes 937733
Compressed bytes  275969
--------------------------

32-bit Number Protobuf
--------------------------
Transferred bytes 245416
Compressed bytes  219047
--------------------------

53-bit Number JSON
--------------------------
Transferred bytes 1183118
Compressed bytes  392501
--------------------------

53-bit Number Protobuf
--------------------------
Transferred bytes 366792
Compressed bytes  334104
--------------------------

53-bit Number Footgun Protobuf
--------------------------
Transferred bytes 406786
Compressed bytes  341615
--------------------------

Protobuf of utf-8 text was 3.20 % smaller than JSON
Protobuf of utf-8 text was 1.02 % smaller than JSON with plain object keys

Protobuf of 16-bit sint32 numbers was 19.27 % smaller than JSON
Protobuf of 32-bit sint32 numbers was 20.63 % smaller than JSON
Protobuf of 53-bit sint64 numbers was 14.88 % smaller than JSON
Protobuf of 53-bit int64  numbers was 12.96 % smaller than JSON
```
