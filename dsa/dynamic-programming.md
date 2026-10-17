# Dynamic programming: define state before code

**Reliable script:** “A brute-force recursion explores all choices, but identical subproblems appear many times. I'll identify a state that captures the future, memoize it, and then see whether an iterative table is simpler.”

## Coin change (fewest coins)

Given nonnegative amount and positive coin denominations, define `dp[x]` as minimum coins needed for amount x, or sentinel if impossible. Base `dp[0]=0`, recurrence `dp[x] = min(dp[x-c]+1)` for all `c <= x` that are reachable. Time O(amount × denominations), space O(amount).

**Trap:** Greedy is incorrect for arbitrary coin sets: coins `[1,3,4]`, amount 6 → greedy 4+1+1 (3 coins), optimum 3+3 (2 coins).

## House robber

Two choices at index i: skip house i and carry best through i−1, or take it and add best through i−2. Recurrence `best(i) = max(best(i-1), nums[i] + best(i-2))`. Reduce memory to O(1) with two running states.

## DP readiness questions

- State: what exactly does `dp[i]` mean?
- Base: what values make the recurrence valid at boundaries?
- Transition: why do the choices cover all valid solutions?
- Evaluation: are dependencies already computed?
- Reconstruction: must I output the answer value or selected choices?
