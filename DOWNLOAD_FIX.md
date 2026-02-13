# Download Error Troubleshooting

## সমস্যা

Public users download করতে পারছে না। "Download failed" error দেখাচ্ছে।

## মূল কারণ

Supabase Storage bucket এর **public read permission** নেই।

## সমাধান (অতি গুরুত্বপূর্ণ!)

### Option 1: SQL দিয়ে (সবচেয়ে সহজ)

**Supabase Dashboard → SQL Editor** তে এই code run করুন:

```sql
-- Allow public users to read files (for downloads)
CREATE POLICY "Public users can read files"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'resource-files');
```

### Option 2: UI থেকে

1. **Supabase Dashboard → Storage**
2. **resource-files** bucket select করুন
3. **Policies** tab এ যান
4. **New Policy** button
5. Settings:
   - **Policy name:** `Public read access`
   - **Allowed operation:** `SELECT` (read)
   - **Target roles:** `public`
   - **Policy definition:**

     ```sql
     bucket_id = 'resource-files'
     ```

6. **Save policy**

---

## Test করার জন্য

1. Policy যোগ করার পর
2. Resource page reload করুন
3. Email দিয়ে download try করুন
4. Browser console (F12) খুলুন logs দেখার জন্য

### Console এ যা দেখবেন

✅ **সফল হলে:**

```
📧 Tracking download for: {...}
✅ Download tracked successfully
🔗 File URL: https://...
📂 Extracted path: messenger/...
🔐 Signed URL generated: {...}
⬇️ Starting download...
✅ Download initiated
```

❌ **Error থাকলে:**

```
❌ Download error: [error message]
```

---

## গুরুত্বপূর্ণ নোট

**Admin upload করার জন্য** আলাদা policy লাগবে যেটা আগেই add করেছিলাম `storage_policies.sql` এ:

- Admin: INSERT, UPDATE, DELETE permission
- Public: শুধু SELECT (read) permission

**উভয় policies একসাথে থাকতে হবে!**

---

## সম্পূর্ণ Policy List

আপনার bucket এ এই policies থাকতে হবে:

1. ✅ **Admin upload** - authenticated users (admin email)
2. ✅ **Admin update** - authenticated users (admin email)  
3. ✅ **Admin delete** - authenticated users (admin email)
4. ✅ **Public read** - public users (সবাই)

---

**After adding the public read policy, downloads will work!** 🚀
