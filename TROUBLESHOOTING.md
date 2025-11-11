# Troubleshooting 404 Errors

If you're seeing 404 errors for JavaScript and CSS files, follow these steps:

## Quick Fix

1. **Stop the development server** (Ctrl+C in the terminal where it's running)

2. **Clean the build cache**:
   ```bash
   Remove-Item -Path .next -Recurse -Force
   Remove-Item -Path node_modules\.cache -Recurse -Force
   ```

3. **Restart the development server**:
   ```bash
   npm run dev
   ```

4. **Clear your browser cache**:
   - Press Ctrl+Shift+Delete
   - Clear cached images and files
   - Or do a hard refresh: Ctrl+F5

## Common Causes

### 1. Development Server Not Running
- Make sure `npm run dev` is running
- Check that port 3000 is not being used by another application

### 2. Stale Build Cache
- The `.next` directory might have stale files
- Delete it and restart the server

### 3. Browser Cache
- Your browser might be caching old file references
- Clear browser cache or use incognito mode

### 4. Port Conflict
- If port 3000 is in use, Next.js will try another port
- Check the terminal output for the actual port number

## Verification Steps

1. **Check if server is running**:
   - Look for "Ready" message in terminal
   - Should see: "Local: http://localhost:3000"

2. **Check terminal for errors**:
   - Look for compilation errors
   - Check for missing dependencies

3. **Verify file structure**:
   - Make sure `src/app` directory exists
   - Check that `src/app/layout.tsx` exists
   - Verify `src/app/globals.css` exists

## If Issues Persist

1. **Reinstall dependencies**:
   ```bash
   Remove-Item -Path node_modules -Recurse -Force
   Remove-Item -Path package-lock.json -Force
   npm install
   ```

2. **Check Node.js version**:
   ```bash
   node --version
   ```
   - Should be Node.js 18+ for Next.js 14

3. **Check for TypeScript errors**:
   ```bash
   npm run build
   ```
   - This will show any compilation errors

## Development Server Commands

- **Start dev server**: `npm run dev`
- **Build for production**: `npm run build`
- **Start production server**: `npm start`
- **Check for linting errors**: `npm run lint`

## Browser Developer Tools

If errors persist:
1. Open Browser Developer Tools (F12)
2. Go to Network tab
3. Check which files are failing to load
4. Look at the Console tab for error messages

## Still Having Issues?

1. Check Next.js documentation: https://nextjs.org/docs
2. Verify your Node.js version is compatible
3. Make sure all dependencies are installed correctly
4. Try creating a fresh Next.js project to compare

