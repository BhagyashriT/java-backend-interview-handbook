# Java 11: streams, generics, and practical snippets

```java
Map<String, Long> counts = words.stream()
    .collect(java.util.stream.Collectors.groupingBy(
        s -> s, java.util.stream.Collectors.counting()));

List<String> all = lists.stream()
    .flatMap(java.util.Collection::stream)
    .collect(java.util.stream.Collectors.toList());
```

- `map`: one element → one transformed value; `flatMap`: element → stream, flatten.
- Intermediate stream operations are lazy; terminal operation triggers traversal.
- Avoid side effects in stream pipelines, especially with parallel streams.
- `Optional<T>` represents optional return values; use `orElseGet` to defer expensive defaults. `orElse` evaluates its argument eagerly.
- Generics use **type erasure** in Java; `List<String>` and `List<Integer>` don't become separately specialized runtime classes.
- `List<? extends Number>` is for reading Number values, generally not adding; `List<? super Integer>` can receive Integer values. (PECS: producer extends, consumer super.)
- `Map.merge(key, 1, Integer::sum)` is concise for counts.
- `Collections.unmodifiableList` is an unmodifiable view, not necessarily an immutable snapshot.

### Speakable answer

“I prefer imperative loops when state and early exits dominate. Streams are great for straightforward transformations; I don't force a long chain when it hides debugging or performance.”

### Java 11 details

Java 11 includes `String.isBlank`, `lines`, `strip` and `repeat`, plus standard `java.net.http.HttpClient` APIs. Check your interview's target JDK before relying on newer features such as records or switch expressions.
