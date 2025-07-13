import useTheme from '../hooks/useTheme';

export default function ThemeSwitcher() {
  const { theme, changeTheme } = useTheme();

  return (
    <div className="flex items-center gap-2">
      <label className="text-sm font-medium text-gray-700 dark:text-gray-200">Theme:</label>
      <select
        value={theme}
        onChange={(e) => changeTheme(e.target.value)}
        className="border rounded px-2 py-1 text-sm dark:bg-gray-800 dark:text-gray-200 not-dark:bg-white not-dark:text-gray-700"
      >
        <option value="system">System</option>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </div>
  );
}
