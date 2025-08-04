import * as migration_20250804_182055 from './20250804_182055'

export const migrations = [
  {
    up: migration_20250804_182055.up,
    down: migration_20250804_182055.down,
    name: '20250804_182055',
  },
]
