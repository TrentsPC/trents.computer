Rules in semi-chronological order from 14 Minesweeper Variants

- [V] Vanilla: Nothing special

Placement Rules

- [Q] Quad: There must be at least 1 mine in every 2x2 area
- [C] Connected: All Mines are orthogonally or diagonally connected
- [T] Triplet: Mines may not form row of three orthogonally or diagonally
- [O] Outside: All non-mines are orthogonally connected and all mines are orthogonally connected to the outside
- [D] Dual: All mines must form 1x2 or 2x1 blocks. Blocks do not touch each other.
- [S] Snake: All mines form a single snake whose body does not touch itself
- [B] Balance: The Number of mines in each row and column is the same

Clue Rules

- [M] Multiple: Each mine in a colored cell counts as two (Remaining mine count is unaffected by this rule)
- [L] Liar: Each clue is either one greater or one less than the actual value
- [W] Wall: The clue indicates the lengths of consecutive mines in the neighboring 8 cells
- [N] Negation: The clue indicates the difference in the number of mines between adjacent colored and uncolored cells
- [X] Cross: The clue indicates the number of mines in a cross region within distance 2
- [P] Partition: The clue indicates the number of consecutive groups of mines in the neighboring 8 cells
- [E] Eyesight: The clue indicates the number of non-mines it can see in 4 directions (including itself). A mine in the way blocks the sight.

End rules:

- [+] Combined: Two random rules are combined. {one of the 7 placement rules + one of the 7 clue rules}
- [#] Hashtag: Clues may have different rules; the rule of each clue is annotated individually. {the 7 clue rules + vanilla}

- [#+] Hashtag: Clues may have different rules; the rule of each clue is annotated individually. {Plus one random placement rule}

Colorings:
- [@c] Checkerboard coloring: This level is checkerboard colored


## +' Section: Combining two placement rules or two clue rules.

- [CD]
- [CQ]
- [CT]
- [OQ]
- [OT]
- [QT]
- [LM]
- [MX]
- [MN]
- [NX]
- [UW]

# ? Section: Cutting room floor rules

- [X'] Mini Cross: The clue indicates the number of mines in a cross region within distance 1
- [K] Knight: The clue indicates the number of mines within a knight's move
- [W'] Longest Wall: The clue indicates the largest length of consecutive mines in the neighboring 8 cells
- [T'] Triplet': Mines must be part of a row of three orthogonally or diagonally
- [D'] Battleship: All mines must form 1x1, 1x2, 1x3, or 1x4 blocks. Blocks do not touch each other (even diagonally).
- [A] Anti-knight: No two mines can be a knight's move away from each other
- [H] Horizontal: No two mines can touch horizontally
- [E'] Eyesight': The clue indicates the difference of non-mines it can see vertically and horizontally. A mine in the way blocks the sight. An arrow indicates the direction of the longer length.

- [#'] Hashtag: Clues may have different rules; the rule of each clue is annotated individually. {7 rules + vanilla + [N][X] + [M][X] + [M][N] + [L][M] + [X'] + [E'] + [W'] + [K]}


## 14 Minesweeper Variants 2

