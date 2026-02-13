# Supabase Storage Bucket সমস্যা সমাধান

## সমস্যা

Upload error হচ্ছে: "Upload failed. Please try again."

## সমাধান

### ধাপ ১: Bucket Create করুন (যদি এখনও না করে থাকেন)

1. Supabase Dashboard → **Storage**
2. **New Bucket** ক্লিক করুন
3. Name: `resource-files`
4. **Public bucket**: ❌ চেক করবেন না (we'll use signed URLs)
5. **Create bucket**

### ধাপ ২: Storage Policies যোগ করুন

**Option A: UI থেকে (সহজ)**

1. Storage → **resource-files** bucket select করুন
2. **Policies** tab এ যান
3. **New Policy** ক্লিক করুন

**Policy 1: Upload Permission**

- Name: `Allow admin uploads`
- Allowed operation: `INSERT`
- Target roles: `authenticated`
- Policy definition:

```sql
bucket_id = 'resource-files' 
AND auth.jwt() ->> 'email' = 'jisunahamed525@gmail.com'
```

**Policy 2: Read Permission**  

- Name: `Public read access`
- Allowed operation: `SELECT`
- Target roles: `public`
- Policy definition:

```sql
bucket_id = 'resource-files'
```

**Policy 3: Delete Permission**

- Name: `Allow admin deletes`
- Allowed operation: `DELETE`
- Target roles: `authenticated`
- Policy definition:

```sql
bucket_id = 'resource-files'
AND auth.jwt() ->> 'email' = 'jisunahamed525@gmail.com'
```

**Option B: SQL Editor থেকে (দ্রুত)**

1. SQL Editor এ যান
2. `supabase/storage_policies.sql` ফাইলের কোড copy করুন
3. **Run** করুন

### ধাপ ৩: Test করুন

1. Admin panel → Resources → যেকোনো page এর Upload icon  
2. একটা ছোট file (PDF/image) select করুন
3. Upload করুন
4. সফল হলে file list এ দেখা যাবে!

## Troubleshooting

### যদি এখনও error হয়

1. **Browser console check করুন:**
   - F12 → Console tab
   - কোন error message আছে কিনা দেখুন

2. **Supabase logs check করুন:**
   - Dashboard → Logs
   - Storage API logs দেখুন

3. **Authentication check করুন:**
   - নিশ্চিত করুন admin panel এ login আছে
   - Email: `jisunahamed525@gmail.com`

### সাধারণ কারণ

- ❌ Storage bucket তৈরি হয়নি
- ❌ Policies যোগ করা হয়নি  
- ❌ Admin email ভুল দেওয়া আছে policy তে
- ❌ File size খুব বড় (50MB+)

---

**After fixing:** Reload admin panel এবং আবার try করুন! 🚀
