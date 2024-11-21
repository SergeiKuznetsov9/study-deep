// eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
const fs = require("fs/promises");

// Кэш нужно удалить в случае установки новых пакетов (зависимостей)
(async () => {
  try {
    await fs.rm("./node_modules/.cache", { recursive: true, force: true });
    console.log("Папка успешно удалена!");
  } catch (err) {
    console.error(`Ошибка при удалении папки: ${err}`);
  }
})();
