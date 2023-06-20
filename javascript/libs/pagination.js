const getRange = (start, end) => {
  return new Array(end - start + 1).fill().map((v, i) => i + start);
};

const pagination = (currentPage, pageCount) => {
  let delta;

  //  case #1: 전체 페이지 수가 7이하인 경우: delta = 7
  if (pageCount <= 7) {
    delta = 7;
  } else {
    // case #2: 현재 페이지가 4보다 크고 동시에 전체 페이지 수에서 3을 뺀 값보다 작은 경우
    // [1, ..., 숫자 3개, ..., 페이지 수]: delta: 2
    // case #3: 현재 페이지가 4보다 작고 동시에 전체 페이지 수에서 3을 뺀 값보다 큰 경우
    // [1, 2, 3, 4, 5, ..., 페이지 수]: delta: 4

    delta = currentPage > 4 && currentPage < pageCount - 3 ? 2 : 4;
  }

  const range = {
    start: Math.round(currentPage - delta / 2),
    end: Math.round(currentPage + delta / 2),
  };

  // 끝에서 네번째 해당되는 예외를 처리하려고, 총 페이지 수가 20일 때, 17의 경우
  if (range.start - 1 === 1 || range.end + 1 === pageCount) {
    range.start += 1;
    range.end += 1;
  }

  let pages =
    currentPage > delta
      ? getRange(
          Math.min(range.start, pageCount - delta),
          Math.min(range.end, pageCount)
        )
      : getRange(1, Math.min(pageCount, delta + 1));

  const withDots = (value, pair) =>
    pages.length + 1 !== pageCount ? pair : [value];

  if (pages[0] !== 1) {
    pages = withDots(1, [1, "..."]).concat(pages);
  }

  if (pages[pages.length - 1] < pageCount) {
    pages = pages.concat(withDots(pageCount, ["...", pageCount]));
  }

  return pages;
};
