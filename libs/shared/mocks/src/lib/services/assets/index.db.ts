import { faker } from '@faker-js/faker';
import { factory, primaryKey } from '@mswjs/data';
import { nanoid } from '@reduxjs/toolkit';

const db = factory({
  assets: {
    _id: primaryKey(nanoid),
    album_id: Array,
    updated_at: String,
    unique_file_name: String,
    original_file_name: String,
    description: String,
    original_file_size: () => null,
    file_extension: String,
    mime_type: String,
    media_type: String,
    media_files: Array,
    created_at: String,
    is_active: Boolean,
    is_finalized: Boolean,
    is_visible: Boolean,
    is_deleted: Boolean,
    is_published: Boolean,
    __v: () => 0,
  },
});

// Generate assets data
for (let i = 0; i < 50; i++) {
  db.assets.create({
    album_id: [],
    updated_at: new Date().toISOString(),
    unique_file_name: nanoid(),
    original_file_name: nanoid(),
    description: '',
    file_extension: '.jpg',
    mime_type: 'image/jpeg',
    media_type: 'file',
    media_files: [
      {
        url: faker.image.url(),
        format_label: 'source',
        file_extension: '.mp4',
        mime_type: 'video/mp4',
        description: '',
        created_at: new Date().toISOString(),
        is_finalized: true,
      },
      // Add more objects if you want multiple files in the media_files array
    ],
    created_at: new Date().toISOString(),
    is_active: true,
    is_finalized: true,
    is_visible: true,
    is_deleted: false,
    is_published: true,
  });
}

export default db;
