import React, { useEffect } from "react";
function MultiCheckBoxColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
}: {
  column: {
    filterValue: any;
    setFilter: any;
    preFilteredRows: any;
    id: any;
  };
}) {
  const options = React.useMemo(() => {
    let counts: any = {};
    preFilteredRows.forEach((x: any) => {
      x = x.values[id]?.toString();
      counts[x] = (counts[x] || 0) + 1;
    });
    return counts;
  }, [id, preFilteredRows]);
  const [checked, setChecked] = React.useState<string[]>([]);

  useEffect(() => {
    if (filterValue) {
      setChecked(filterValue);
    } else {
      setChecked(Object.keys(options));
    }
  }, [options, filterValue]);

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const t = e.target.name.toString();
    if (checked && checked.includes(t)) {
      setFilter(checked.filter((v) => v !== t));
      // setChecked((p) => p.filter((v) => v !== t));
      setChecked((prevChecked) => {
        if (prevChecked.length === 1) return Object.keys(options);
        return prevChecked.filter((v) => v !== t);
      });
    } else {
      setFilter([...checked, t]);
      setChecked((prevChecked) => [...prevChecked, t]);
    }
  };

  return (
    <div className="ml-10">
      <div className="text-lg mb-2">Column Filters - {id}</div>
      <div className="h-72 overflow-auto">
        {Object.entries(options).map(([option, count], i) => {
          // if (option === "undefined") return;
          return (
            <div key={i}>
              <label htmlFor={option}>
                <input
                  type="checkbox"
                  name={option}
                  id={option}
                  checked={checked.includes(option)}
                  onChange={onChange}
                  title={`${option} (${count})`}
                />{" "}
                {option} ({count})
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MultiCheckBoxColumnFilter;
