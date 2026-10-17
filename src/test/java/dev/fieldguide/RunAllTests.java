package dev.fieldguide;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;

/** No dependencies needed. Throws AssertionError on any failure. */
public final class RunAllTests {
    private static int assertions;

    public static void main(String[] args) {
        eq(0, LongestUniqueSubstring.length(""), "empty substring");
        eq(2, LongestUniqueSubstring.length("abba"), "duplicate within window");
        eq(3, LongestUniqueSubstring.length("abcabcbb"), "sliding window");
        eq(1, LongestUniqueSubstring.length("aaaa"), "all identical");

        eq(2L, SubarraySumK.count(new int[]{1,2,1},3), "subarray count");
        eq(3L, SubarraySumK.count(new int[]{0,0},0), "zero prefixes");
        eq(1L, SubarraySumK.count(new int[]{-1,2,-1},0), "negatives");
        eq(0L, SubarraySumK.count(new int[]{},0), "empty count");

        eq(1, LowerBound.find(new int[]{1,3,3,8},3), "first equal");
        eq(4, LowerBound.find(new int[]{1,3,3,8},9), "past end");
        eq(0, LowerBound.find(new int[]{},2), "empty lower bound");
        eq(0, LowerBound.find(new int[]{1,2,3},0), "before start");

        deep(new int[][]{{1,6},{8,10},{15,18}},
             MergeIntervals.merge(new int[][]{{1,3},{2,6},{8,10},{15,18}}), "merge overlaps");
        deep(new int[][]{{1,5}}, MergeIntervals.merge(new int[][]{{1,4},{4,5}}), "touch endpoints");
        deep(new int[][]{}, MergeIntervals.merge(new int[][]{}), "empty merge");
        List<Integer> top = TopKFrequent.find(new int[]{1,1,2,2,3},2);
        eq(Arrays.asList(1,2),top,"tie chooses smaller key");
        eq(Arrays.asList(2,1),TopKFrequent.find(new int[]{2,2,2,1,1,3},2),"top K rank");
        eq(Collections.emptyList(),TopKFrequent.find(new int[]{1,2},0),"zero K");

        eq(2, NumberOfIslands.count(new char[][]{
             "110".toCharArray(),"010".toCharArray(),"001".toCharArray()}),"islands");
        eq(0, NumberOfIslands.count(new char[][]{}),"empty islands");
        eq(0, NumberOfIslands.count(new char[][]{{}}),"zero columns");
        eq(true, CourseSchedule.canFinish(3,new int[][]{{1,0},{2,1}}),"valid topo");
        eq(false,CourseSchedule.canFinish(2,new int[][]{{1,0},{0,1}}),"cycle");
        eq(false,CourseSchedule.canFinish(1,new int[][]{{0,0}}),"self cycle");
        eq(true, CourseSchedule.canFinish(0,new int[][]{}),"zero nodes");

        LruCache<Integer,String> lru = new LruCache<>(2);
        lru.put(1,"one"); lru.put(2,"two"); lru.get(1); lru.put(3,"three");
        eq(false,lru.containsKey(2),"evicts least recently accessed");
        eq(true,lru.containsKey(1),"keeps accessed");
        lru.put(1,"updated"); eq("updated",lru.get(1),"updates existing");

        AtomicLong fakeClock = new AtomicLong(0L);
        TokenBucket bucket = new TokenBucket(2,1,fakeClock::get);
        eq(true,bucket.allow(),"token 1");
        eq(true,bucket.allow(),"token 2");
        eq(false,bucket.allow(),"empty bucket");
        fakeClock.set(1_000_000_000L);
        eq(true,bucket.allow(),"refilled token");
        eq(false,bucket.allow(),"not overfilled");
        fakeClock.set(100_000_000_000L);
        eq(true,bucket.allow(),"capacity bounded");
        eq(true,bucket.allow(),"second capacity token");
        eq(false,bucket.allow(),"third after cap rejected");
        System.out.println("PASS: " + assertions + " assertions across 9 Java 11 examples.");
    }

    private static void eq(Object expected,Object actual,String name) {
        assertions++;
        if (!expected.equals(actual)) throw new AssertionError(name + ": expected " + expected + ", got " + actual);
    }

    private static void deep(int[][] expected,int[][] actual,String name) {
        assertions++;
        if (!Arrays.deepEquals(expected,actual)) throw new AssertionError(name + ": output mismatch");
    }
}
