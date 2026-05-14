import * as migration_20250929_111647 from './20250929_111647';
import * as migration_20260513_202507 from './20260513_202507';
import * as migration_20260514_120202 from './20260514_120202';
import * as migration_20260514_135429 from './20260514_135429';

export const migrations = [
  {
    up: migration_20250929_111647.up,
    down: migration_20250929_111647.down,
    name: '20250929_111647',
  },
  {
    up: migration_20260513_202507.up,
    down: migration_20260513_202507.down,
    name: '20260513_202507',
  },
  {
    up: migration_20260514_120202.up,
    down: migration_20260514_120202.down,
    name: '20260514_120202',
  },
  {
    up: migration_20260514_135429.up,
    down: migration_20260514_135429.down,
    name: '20260514_135429'
  },
];
