# Xcode Project Update Instructions

## New File to Add

The following file needs to be added to the Xcode project:

### System Group
- `Boop/System/ScriptPreferences.swift`

## Steps to Add the File

1. Open `Boop.xcodeproj` in Xcode
2. Right-click on the `System` group in the Project Navigator
3. Select "Add Files to 'Boop'..."
4. Navigate to `Boop/System/ScriptPreferences.swift`
5. Ensure "Copy items if needed" is unchecked (file is already in correct location)
6. Ensure "Boop" target is selected
7. Click "Add"

## Verification

After adding the file, build the project (Cmd+B) to ensure:
- No compilation errors
- The file is properly included in the target
- All dependencies are resolved

## Alternative: Drag and Drop

You can also drag `ScriptPreferences.swift` from Finder directly into the `System` group in Xcode's Project Navigator.

Make sure the file appears in the correct group and has the Boop target checkbox selected in the File Inspector.
