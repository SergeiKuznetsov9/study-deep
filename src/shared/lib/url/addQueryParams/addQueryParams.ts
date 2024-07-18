// Аргументом будем передавать объект, который в качестве ключа будет содержать
// наименование параметра строки запроса, а в качестве значения - значение этого
// параметра
export function addQueryParams(params: OptionalRecord<string, string>) {
  // Создадим объект класса URLSearchParams. В него передаем строку, которая
  // распарсится и превратиться в объект похожего на аргумент вида. Это будет
  // объект с уже существующими параметрами, которые уже есть в строке запроса
  const searchParams = new URLSearchParams(window.location.search);

  // Добавляем то что передали к уже существующим параметрам
  Object.entries(params).forEach(([name, value]) => {
    if (value !== undefined) {
      searchParams.set(name, value);
    }
  });

  // Результат добавляем в строку запроса
  window.history.pushState(null, "", `?${searchParams.toString()}`);
}
