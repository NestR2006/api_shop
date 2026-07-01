import "../../styles/filters.css";

interface FiltersProps{
  onChangeSizeFilter: (size: string) => void,
  activeSizeFilter: string,
  onChangePriceRange: (price: number) => void,
  onChangeMaterialFilter: (material : string) => void,
  currentMaxPriceRange: number,
  onFilterReset: () => void,
  activeMaterialFilter: string,
}

const Filters = ({
  onChangeSizeFilter,
  activeSizeFilter,
  onChangePriceRange,
  onChangeMaterialFilter,
  currentMaxPriceRange,
  onFilterReset,
  activeMaterialFilter,
}: FiltersProps) => {

  let startValue = 1000;
  let maxEndValue = 24000;

  const changePriceFilterHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChangePriceRange(Number(event.target.value));
  };

  return (
    <div className="filters">
      <h4>Главная/Каталог</h4>
      <h1 className="title">Дакимакуры</h1>
      <p className="sub-text">Найди свою идеальную вайфу</p>
      <button className="show-filters">Фильтры</button>

      <div className="price-filter">
        <h4 className="title">Цена</h4>
        <input
          type="range"
          min={startValue}
          max={maxEndValue}
          className="slider"
          id="price-range"
          onChange={changePriceFilterHandler}
        />
        <p id="start-value">{startValue}₴</p>
        <p id="end-value">{currentMaxPriceRange}₴</p>
      </div>

      <div className="size-filter">
        <h4 className="title">Размер</h4>
        <div className="sizes">
          {["150x50", "160x50", "180x60"].map((size) => {
            return (
              <button
                key={size}
                className={
                  "filter-btn" +
                  (activeSizeFilter === size ? " active-filter" : "")
                }
                onClick={() => onChangeSizeFilter(size)}
              >
                {size}
              </button>
            );
          })}
        </div>

        <div className="material-filter">
          <h4 className="title">Материал</h4>
          <div className="sizes">
            {["Атлас", "Полистер", "Черемша"].map((material) => {
              return (
                <button
                  key={material}
                  className={
                    "filter-btn" +
                    (activeMaterialFilter === material ? " active-filter" : "")
                  }
                  onClick={() => onChangeMaterialFilter(material)}
                >
                  {material}
                </button>
              );
            })}
          </div>
        </div>
      </div>
      <button className="filterReset" onClick={onFilterReset}>
        Сбросить фильтры
      </button>
    </div>
  );
};

export default Filters;
