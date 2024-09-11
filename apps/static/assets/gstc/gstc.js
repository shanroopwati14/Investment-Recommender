import GSTC from '/static/assets/gstc/dist/gstc.wasm.esm.min.js';
import { Plugin as TimelinePointer } from '/static/assets/gstc/dist/plugins/timeline-pointer.esm.min.js';
import { Plugin as Selection } from '/static/assets/gstc/dist/plugins/selection.esm.min.js';
import { Plugin as ItemMovement } from '/static/assets/gstc/dist/plugins/item-movement.esm.min.js';
import { Plugin as ItemResizing } from '/static/assets/gstc/dist/plugins/item-resizing.esm.min.js';
import { Plugin as CalendarScroll } from '/static/assets/gstc/dist/plugins/calendar-scroll.esm.min.js';
import { Plugin as HighlightWeekends } from '/static/assets/gstc/dist/plugins/highlight-weekends.esm.min.js';
import { Plugin as ProgressBar } from '/static/assets/gstc/dist/plugins/progress-bar.esm.min.js';
import { Plugin as TimeBookmarks } from '/static/assets/gstc/dist/plugins/time-bookmarks.esm.min.js';
import { Plugin as DependencyLines } from '/static/assets/gstc/dist/plugins/dependency-lines.esm.min.js';
import { Plugin as ExportImage } from '/static/assets/gstc/dist/plugins/export-image.esm.min.js';
import { Plugin as ExportPDF } from '/static/assets/gstc/dist/plugins/export-pdf.esm.min.js';

globalThis.GSTC = GSTC;

const iterations = 100;
const GSTCID = GSTC.api.GSTCID;
const addDays = 30;

function getImage() {
  return `/static/assets/gstc/faces/face-${Math.ceil(Math.random() * 50)}.jpg`;
}

const colors = ['#E74C3C', '#DA3C78', '#7E349D', '#0077C0', '#07ABA0', '#0EAC51', '#F1892D'];
function getRandomColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}

const startDate = GSTC.api.date('2022-02-01');
const startTime = startDate.valueOf();
const endDate = GSTC.api.date('2035-03-31').endOf('day');
const getInitialRows = () => {
  /**
   * @type {import("static/assets/gstc/dist/gstc").Rows}
   */
  const rows = {};

  // Detailed Goals
  rows[GSTCID('0')] = {
    id: GSTCID('0'),
    label: 'Financial Independence',
    parentId: undefined,
    expanded: true,
    img: 'fa fa-dollar-sign',
    progress: 60,
    visible: true,
  };
  rows[GSTCID('1')] = {
    id: GSTCID('1'),
    label: 'Retirement Planning',
    parentId: GSTCID('0'),
    expanded: true,
    img: 'fa fa-calendar-alt',
    progress: 40,
    visible: true,
  };
  rows[GSTCID('2')] = {
    id: GSTCID('2'),
    label: 'Children’s Education',
    parentId: GSTCID('0'),
    expanded: true,
    img: 'fa fa-graduation-cap',
    progress: 70,
    visible: true,
  };
  rows[GSTCID('3')] = {
    id: GSTCID('3'),
    label: 'Home Purchase',
    parentId: GSTCID('0'),
    expanded: true,
    img: 'fa fa-home',
    progress: 20,
    visible: true,
  };
  rows[GSTCID('4')] = {
    id: GSTCID('4'),
    label: 'Emergency Fund',
    parentId: GSTCID('0'),
    expanded: true,
    img: 'fa fa-medkit',
    progress: 90,
    visible: true,
  };

  // Subsections for each goal
  rows[GSTCID('10')] = {
    id: GSTCID('10'),
    label: 'Savings Plan',
    parentId: GSTCID('1'),
    expanded: true,
    img: 'fa fa-piggy-bank',
    progress: 50,
    visible: true,
  };
  rows[GSTCID('11')] = {
    id: GSTCID('11'),
    label: 'Pension Fund',
    parentId: GSTCID('1'),
    expanded: true,
    img: 'fa fa-briefcase',
    progress: 30,
    visible: true,
  };

  rows[GSTCID('20')] = {
    id: GSTCID('20'),
    label: 'School Fees',
    parentId: GSTCID('2'),
    expanded: true,
    img: 'fa fa-book',
    progress: 60,
    visible: true,
  };
  rows[GSTCID('21')] = {
    id: GSTCID('21'),
    label: 'University Fees',
    parentId: GSTCID('2'),
    expanded: true,
    img: 'fa fa-university',
    progress: 80,
    visible: true,
  };

  rows[GSTCID('30')] = {
    id: GSTCID('30'),
    label: 'Down Payment',
    parentId: GSTCID('3'),
    expanded: true,
    img: 'fa fa-hand-holding-usd',
    progress: 10,
    visible: true,
  };
  rows[GSTCID('31')] = {
    id: GSTCID('31'),
    label: 'Mortgage',
    parentId: GSTCID('3'),
    expanded: true,
    img: 'fa fa-money-bill-wave',
    progress: 30,
    visible: true,
  };

  // Funds Sections as Subsections
  rows[GSTCID('40')] = {
    id: GSTCID('40'),
    label: 'HSBC Aggressive Hybrid Fund - Direct Plan',
    parentId: GSTCID('10'),
    expanded: true,
    img: 'fa fa-fund',
    progress: 0,
    visible: true,
  };
  rows[GSTCID('41')] = {
    id: GSTCID('41'),
    label: 'HSBC Balanced Advantage Fund - Direct Plan',
    parentId: GSTCID('10'),
    expanded: true,
    img: 'fa fa-fund',
    progress: 0,
    visible: true,
  };

  rows[GSTCID('42')] = {
    id: GSTCID('42'),
    label: 'HSBC Credit Risk Fund - Direct Plan',
    parentId: GSTCID('11'),
    expanded: true,
    img: 'fa fa-fund',
    progress: 0,
    visible: true,
  };
  rows[GSTCID('43')] = {
    id: GSTCID('43'),
    label: 'HSBC Conservative Hybrid Fund - Direct Plan',
    parentId: GSTCID('11'),
    expanded: true,
    img: 'fa fa-fund',
    progress: 0,
    visible: true,
  };

  rows[GSTCID('44')] = {
    id: GSTCID('44'),
    label: 'HSBC Flexi Cap Fund - Direct Plan',
    parentId: GSTCID('20'),
    expanded: true,
    img: 'fa fa-fund',
    progress: 0,
    visible: true,
  };
  rows[GSTCID('45')] = {
    id: GSTCID('45'),
    label: 'HSBC Equity Savings Fund - Direct Plan',
    parentId: GSTCID('20'),
    expanded: true,
    img: 'fa fa-fund',
    progress: 0,
    visible: true,
  };

  rows[GSTCID('46')] = {
    id: GSTCID('46'),
    label: 'HSBC Consumption Fund - Direct Plan',
    parentId: GSTCID('21'),
    expanded: true,
    img: 'fa fa-fund',
    progress: 0,
    visible: true,
  };
  rows[GSTCID('47')] = {
    id: GSTCID('47'),
    label: 'HSBC Global Equity Climate Change FoF - Direct Plan',
    parentId: GSTCID('21'),
    expanded: true,
    img: 'fa fa-fund',
    progress: 0,
    visible: true,
  };

  rows[GSTCID('48')] = {
    id: GSTCID('48'),
    label: 'HSBC Corporate Bond Fund - Direct Plan',
    parentId: GSTCID('30'),
    expanded: true,
    img: 'fa fa-fund',
    progress: 0,
    visible: true,
  };
  rows[GSTCID('49')] = {
    id: GSTCID('49'),
    label: 'HSBC Dynamic Bond Fund - Direct Plan',
    parentId: GSTCID('30'),
    expanded: true,
    img: 'fa fa-fund',
    progress: 0,
    visible: true,
  };

  rows[GSTCID('50')] = {
    id: GSTCID('50'),
    label: 'HSBC Aggressive Hybrid Fund - Direct Plan',
    parentId: GSTCID('31'),
    expanded: true,
    img: 'fa fa-fund',
    progress: 0,
    visible: true,
  };
  rows[GSTCID('51')] = {
    id: GSTCID('51'),
    label: 'HSBC Gilt Fund - Direct Plan',
    parentId: GSTCID('31'),
    expanded: true,
    img: 'fa fa-fund',
    progress: 0,
    visible: true,
  };

  return rows;
}

const generateItemsForDaysView = () => {
  /**
   * @type {import("static/assets/gstc/dist/gstc").Items}
   */
  const items = {};

  // Detailed Goals with Subsections
  items[GSTCID('0')] = {
    id: GSTCID('0'),
    label: 'Financial Independence',
    progress: 60,
    style: { background: '#3498db' },
    time: {
      start: new Date('2023-01-01').getTime(),
      end: new Date('2028-01-01').getTime(),
    },
    rowId: GSTCID('0'),
    img: 'fa fa-dollar-sign',
    classNames: ['goal-item'],
    description: 'Long-term goal to achieve financial independence.',
  };
  items[GSTCID('1')] = {
    id: GSTCID('1'),
    label: 'Retirement Planning',
    progress: 40,
    style: { background: '#e74c3c' },
    time: {
      start: new Date('2023-01-01').getTime(),
      end: new Date('2033-01-01').getTime(),
    },
    rowId: GSTCID('1'),
    img: 'fa fa-calendar-alt',
    classNames: ['goal-item'],
    description: 'Plan for a secure and comfortable retirement.',
  };
  items[GSTCID('2')] = {
    id: GSTCID('2'),
    label: 'Children’s Education',
    progress: 70,
    style: { background: '#2ecc71' },
    time: {
      start: new Date('2023-01-01').getTime(),
      end: new Date('2033-01-01').getTime(),
    },
    rowId: GSTCID('2'),
    img: 'fa fa-graduation-cap',
    classNames: ['goal-item'],
    description: 'Fund children’s primary, secondary, and higher education.',
  };
  items[GSTCID('3')] = {
    id: GSTCID('3'),
    label: 'Home Purchase',
    progress: 20,
    style: { background: '#f39c12' },
    time: {
      start: new Date('2023-01-01').getTime(),
      end: new Date('2026-01-01').getTime(),
    },
    rowId: GSTCID('3'),
    img: 'fa fa-home',
    classNames: ['goal-item'],
    description: 'Save for the down payment and other home purchasing costs.',
  };
  items[GSTCID('4')] = {
    id: GSTCID('4'),
    label: 'Emergency Fund',
    progress: 90,
    style: { background: '#9b59b6' },
    time: {
      start: new Date('2023-01-01').getTime(),
      end: new Date('2025-01-01').getTime(),
    },
    rowId: GSTCID('4'),
    img: 'fa fa-medkit',
    classNames: ['goal-item'],
    description: 'Maintain an emergency fund for unexpected expenses.',
  };

  // Subsections for each goal
  items[GSTCID('10')] = {
    id: GSTCID('10'),
    label: 'Savings Plan',
    progress: 50,
    style: { background: '#3498db' },
    time: {
      start: new Date('2023-01-01').getTime(),
      end: new Date('2028-01-01').getTime(),
    },
    rowId: GSTCID('1'),
    img: 'fa fa-piggy-bank',
    classNames: ['subsection-item'],
    description: 'Plan for consistent savings to build retirement corpus.',
  };
  items[GSTCID('11')] = {
    id: GSTCID('11'),
    label: 'Pension Fund',
    progress: 30,
    style: { background: '#e74c3c' },
    time: {
      start: new Date('2023-01-01').getTime(),
      end: new Date('2033-01-01').getTime(),
    },
    rowId: GSTCID('1'),
    img: 'fa fa-briefcase',
    classNames: ['subsection-item'],
    description: 'Invest in pension funds to secure retirement income.',
  };

  items[GSTCID('20')] = {
    id: GSTCID('20'),
    label: 'School Fees',
    progress: 60,
    style: { background: '#2ecc71' },
    time: {
      start: new Date('2023-01-01').getTime(),
      end: new Date('2028-01-01').getTime(),
    },
    rowId: GSTCID('2'),
    img: 'fa fa-book',
    classNames: ['subsection-item'],
    description: 'Save for school tuition and related costs.',
  };
  items[GSTCID('21')] = {
    id: GSTCID('21'),
    label: 'University Fees',
    progress: 80,
    style: { background: '#2ecc71' },
    time: {
      start: new Date('2023-01-01').getTime(),
      end: new Date('2033-01-01').getTime(),
    },
    rowId: GSTCID('2'),
    img: 'fa fa-university',
    classNames: ['subsection-item'],
    description: 'Save for university tuition and related costs.',
  };

  items[GSTCID('30')] = {
    id: GSTCID('30'),
    label: 'Down Payment',
    progress: 10,
    style: { background: '#f39c12' },
    time: {
      start: new Date('2023-01-01').getTime(),
      end: new Date('2026-01-01').getTime(),
    },
    rowId: GSTCID('3'),
    img: 'fa fa-hand-holding-usd',
    classNames: ['subsection-item'],
    description: 'Save for the down payment on a new home.',
  };
  items[GSTCID('31')] = {
    id: GSTCID('31'),
    label: 'Mortgage',
    progress: 30,
    style: { background: '#f39c12' },
    time: {
      start: new Date('2023-01-01').getTime(),
      end: new Date('2028-01-01').getTime(),
    },
    rowId: GSTCID('3'),
    img: 'fa fa-money-bill-wave',
    classNames: ['subsection-item'],
    description: 'Plan for mortgage payments and related expenses.',
  };

  // Funds Sections
  items[GSTCID('40')] = {
    id: GSTCID('40'),
    label: 'HSBC Aggressive Hybrid Fund - Direct Plan',
    progress: 0,
    style: { background: '#3498db' },
    time: {
      start: new Date('2023-01-01').getTime(),
      end: new Date('2025-02-01').getTime(),
    },
    rowId: GSTCID('10'),
    img: 'fa fa-fund',
    classNames: ['subsection-item'],
    description: 'Invest in HSBC Aggressive Hybrid Fund - Direct Plan.',
  };
  items[GSTCID('41')] = {
    id: GSTCID('41'),
    label: 'HSBC Balanced Advantage Fund - Direct Plan',
    progress: 0,
    style: { background: '#3498db' },
    time: {
      start: new Date('2025-02-01').getTime(),
      end: new Date('2028-01-01').getTime(),
    },
    rowId: GSTCID('10'),
    img: 'fa fa-fund',
    classNames: ['subsection-item'],
    description: 'Invest in HSBC Balanced Advantage Fund - Direct Plan.',
  };

  items[GSTCID('42')] = {
    id: GSTCID('42'),
    label: 'HSBC Credit Risk Fund - Direct Plan',
    progress: 0,
    style: { background: '#e74c3c' },
    time: {
      start: new Date('2023-01-01').getTime(),
      end: new Date('2025-02-01').getTime(),
    },
    rowId: GSTCID('11'),
    img: 'fa fa-fund',
    classNames: ['subsection-item'],
    description: 'Invest in HSBC Credit Risk Fund - Direct Plan.',
  };
  items[GSTCID('43')] = {
    id: GSTCID('43'),
    label: 'HSBC Conservative Hybrid Fund - Direct Plan',
    progress: 0,
    style: { background: '#e74c3c' },
    time: {
      start: new Date('2025-02-01').getTime(),
      end: new Date('2033-01-01').getTime(),
    },
    rowId: GSTCID('11'),
    img: 'fa fa-fund',
    classNames: ['subsection-item'],
    description: 'Invest in HSBC Conservative Hybrid Fund - Direct Plan.',
  };

  items[GSTCID('44')] = {
    id: GSTCID('44'),
    label: 'HSBC Flexi Cap Fund - Direct Plan',
    progress: 0,
    style: { background: '#2ecc71' },
    time: {
      start: new Date('2023-01-01').getTime(),
      end: new Date('2025-02-01').getTime(),
    },
    rowId: GSTCID('20'),
    img: 'fa fa-fund',
    classNames: ['subsection-item'],
    description: 'Invest in HSBC Flexi Cap Fund - Direct Plan.',
  };
  items[GSTCID('45')] = {
    id: GSTCID('45'),
    label: 'HSBC Equity Savings Fund - Direct Plan',
    progress: 0,
    style: { background: '#2ecc71' },
    time: {
      start: new Date('2025-02-01').getTime(),
      end: new Date('2028-01-01').getTime(),
    },
    rowId: GSTCID('20'),
    img: 'fa fa-fund',
    classNames: ['subsection-item'],
    description: 'Invest in HSBC Equity Savings Fund - Direct Plan.',
  };

  items[GSTCID('46')] = {
    id: GSTCID('46'),
    label: 'HSBC Consumption Fund - Direct Plan',
    progress: 0,
    style: { background: '#2ecc71' },
    time: {
      start: new Date('2023-06-01').getTime(),
      end: new Date('2027-06-01').getTime(),
    },
    rowId: GSTCID('21'),
    img: 'fa fa-fund',
    classNames: ['subsection-item'],
    description: 'Invest in HSBC Consumption Fund - Direct Plan.',
  };
  items[GSTCID('47')] = {
    id: GSTCID('47'),
    label: 'HSBC Global Equity Climate Change FoF - Direct Plan',
    progress: 0,
    style: { background: '#2ecc71' },
    time: {
      start: new Date('2027-06-01').getTime(),
      end: new Date('2033-01-01').getTime(),
    },
    rowId: GSTCID('21'),
    img: 'fa fa-fund',
    classNames: ['subsection-item'],
    description: 'Invest in HSBC Global Equity Climate Change FoF - Direct Plan.',
  };

  items[GSTCID('48')] = {
    id: GSTCID('48'),
    label: 'HSBC Corporate Bond Fund - Direct Plan',
    progress: 0,
    style: { background: '#f39c12' },
    time: {
      start: new Date('2023-06-01').getTime(),
      end: new Date('2026-06-01').getTime(),
    },
    rowId: GSTCID('30'),
    img: 'fa fa-fund',
    classNames: ['subsection-item'],
    description: 'Invest in HSBC Corporate Bond Fund - Direct Plan.',
  };
  items[GSTCID('49')] = {
    id: GSTCID('49'),
    label: 'HSBC Dynamic Bond Fund - Direct Plan',
    progress: 0,
    style: { background: '#f39c12' },
    time: {
      start: new Date('2026-06-01').getTime(),
      end: new Date('2028-01-01').getTime(),
    },
    rowId: GSTCID('30'),
    img: 'fa fa-fund',
    classNames: ['subsection-item'],
    description: 'Invest in HSBC Dynamic Bond Fund - Direct Plan.',
  };

  items[GSTCID('50')] = {
    id: GSTCID('50'),
    label: 'HSBC Aggressive Hybrid Fund - Direct Plan',
    progress: 0,
    style: { background: '#f39c12' },
    time: {
      start: new Date('2026-06-01').getTime(),
      end: new Date('2028-06-01').getTime(),
    },
    rowId: GSTCID('31'),
    img: 'fa fa-fund',
    classNames: ['subsection-item'],
    description: 'Invest in HSBC Aggressive Hybrid Fund - Direct Plan.',
  };
  items[GSTCID('51')] = {
    id: GSTCID('51'),
    label: 'HSBC Gilt Fund - Direct Plan',
    progress: 0,
    style: { background: '#f39c12' },
    time: {
      start: new Date('2028-06-01').getTime(),
      end: new Date('2033-01-01').getTime(),
    },
    rowId: GSTCID('31'),
    img: 'fa fa-fund',
    classNames: ['subsection-item'],
    description: 'Invest in HSBC Gilt Fund - Direct Plan.',
  };

  return items;
}


const columns = {
  data: {
    [GSTCID('id')]: {
      id: GSTCID('id'),
      data: ({ row }) => GSTC.api.sourceID(row.id),
      width: 80,
      sortable: ({ row }) => Number(GSTC.api.sourceID(row.id)),
      header: {
        content: 'ID',
      },
    },
    [GSTCID('label')]: {
      id: GSTCID('label'),
      data: 'label',
      sortable: 'label',
      expander: true,
      isHTML: false,
      width: 315,
      header: {
        content: 'Label',
      },
    },
    [GSTCID('progress')]: {
      id: GSTCID('progress'),
      data({ row, vido }) {
        return vido.html`<div style="text-align:center">${row.progress}</div>`;
      },
      width: 100,
      sortable: 'progress',
      header: {
        content: 'Progress',
      },
    },
  },
};

/**
 * @type {import("static/assets/gstc/dist/plugins/time-bookmarks").Bookmarks}
 */
const bookmarks = {};
for (let i = 0; i < 3; i++) {
  const id = `Bookmark ${i}`;
  bookmarks[id] = {
    time: startDate
      .add(Math.round(Math.random() * addDays), 'day')
      .startOf('day')
      .valueOf(),
    label: id,
    style: {
      background: getRandomColor(),
    },
  };
}

function itemSlot(vido, props) {
  const { html, onChange, update } = vido;

  let imageSrc = '';
  let description = '';
  onChange((newProps) => {
    props = newProps;
    if (!props || !props.item) return;
    imageSrc = props.item.img;
    description = props.item.description;
    update();
  });

  return (content) =>
    html`<div
        class="item-image"
        style="background:url(${imageSrc}),transparent;flex-shrink:0;border-radius:100%;width:34px;height:34px;vertical-align: middle;background-size: 100%;margin: 4px 11px 0px 0px;"
      ></div>
      <div class="item-text">
        <div class="item-label">${content}</div>
        <div class="item-description" style="font-size:11px;margin-top:2px;color:#fffffff0;line-height:1em;">
          ${description}
        </div>
      </div>`;
}

function rowSlot(vido, props) {
  const { html, onChange, update, api } = vido;

  let img = '';
  onChange((newProps) => {
    props = newProps;
    if (!props || !props.row) return;
    img = props.row.img;
    update();
  });

  return (content) => {
    if (!props || !props.column) return content;
    return api.sourceID(props.column.id) === 'label'
      ? html`<div class="row-content-wrapper" style="display:flex">
          <div class="row-content" style="flex-grow:1;">${content}</div>
          <div
            class="row-image"
            style="background:url(${img}),transparent;border-radius:100%;width:34px;height:34px;vertical-align: middle;background-size: 100%;margin: auto 10px;flex-shrink:0;"
          ></div>
        </div>`
      : content;
  };
}

let snapTime = true;
function snapStart({ startTime, vido }) {
  if (!snapTime) return startTime;
  const date = vido.api.time.findOrCreateMainDateAtTime(startTime.valueOf());
  return date.leftGlobalDate;
}
function snapEnd({ endTime, vido }) {
  if (!snapTime) return endTime;
  const date = vido.api.time.findOrCreateMainDateAtTime(endTime.valueOf());
  return date.rightGlobalDate;
}

function canMove(item) {
  const row = gstc.api.getRow(item.rowId);
  if (row.vacations) {
    for (const vacation of row.vacations) {
      const vacationStart = vacation.from;
      const vacationEnd = vacation.to;
      // item start time inside vacation
      if (item.time.start >= vacationStart && item.time.start <= vacationEnd) {
        return false;
      }
      // item end time inside vacation
      if (item.time.end >= vacationStart && item.time.end <= vacationEnd) {
        return false;
      }
      // vacation is between item start and end
      if (item.time.start <= vacationStart && item.time.end >= vacationEnd) {
        return false;
      }
      // item start and end time is inside vacation
      if (item.time.start >= vacationStart && item.time.end <= vacationEnd) {
        return false;
      }
    }
  }
  return true;
}

/**
 * @type {import('/static/assets/gstc/dist/plugins/item-movement').Options}
 */
const itemMovementOptions = {
  threshold: {
    horizontal: 25,
    vertical: 25,
  },
  snapToTime: {
    start: snapStart,
    end({ endTime }) {
      return endTime;
    },
  },
  events: {
    onMove({ items }) {
      for (let i = 0, len = items.after.length; i < len; i++) {
        const item = items.after[i];
        if (!canMove(item)) return items.before;
      }
      return items.after;
    },
  },
};

/**
 * @type {import('/static/assets/gstc/dist/plugins/item-resizing').Options}
 */
const itemResizeOptions = {
  threshold: 25,
  snapToTime: {
    start: snapStart,
    end: snapEnd,
  },
  events: {
    onResize({ items }) {
      for (const item of items.after) {
        if (!canMove(item)) return items.before;
      }
      return items.after;
    },
  },
};

let hideWeekends = false;
function onLevelDates({ dates, level, format, time }) {
  if (time.period !== 'day') return dates;
  if (format.period !== time.period) return dates;
  if (!hideWeekends) return dates;
  return dates.filter((date) => date.leftGlobalDate.day() !== 0 && date.leftGlobalDate.day() !== 6);
}

function onItemClick(ev) {
  const itemElement = ev.target.closest('.gstc__chart-timeline-items-row-item');
  const itemId = itemElement.dataset.gstcid;
  const item = gstc.api.getItem(itemId);
  console.log('Item click from template', item);
}

// Typescript usage:
// import { Template } from 'gantt-schedule-timeline-calendar';
// const chartTimelineItemsRowItemTemplate: Template = function chartTimelineItemsRowItemTemplate(...);
/**
 * @type {import("static/assets/gstc/dist/gstc").Template} // or {import("gantt-schedule-timeline-calendar").Template}
 */
function chartTimelineItemsRowItemTemplate({
  className,
  labelClassName,
  styleMap,
  cache,
  shouldDetach,
  cutterLeft,
  cutterRight,
  getContent,
  actions,
  slots,
  html,
  vido,
  props,
}) {
  const detach = shouldDetach || !props || !props.item;
  return cache(
    detach
      ? null
      : slots.html(
          'outer',
          html`
            <div
              class=${className}
              data-gstcid=${props.item.id}
              data-actions=${actions()}
              style=${styleMap.directive()}
              @click=${onItemClick}
            >
              ${slots.html(
                'inner',
                html`
                  ${cutterLeft()}
                  <div class=${labelClassName}>${slots.html('content', getContent())}</div>
                  ${cutterRight()}
                `
              )}
            </div>
          `
        )
  );
}

function myItemSlot(vido, props) {
  const { onChange } = vido;

  function onClick() {
    console.log('Item click from slot', props.item);
  }

  onChange((changedProps) => {
    // if current element is reused to display other item data just update your data so when you click you will display right alert
    props = changedProps;
  });

  // return render function
  return (content) =>
    vido.html`<div class="my-item-wrapper" @click=${onClick} style="width:100%;display:flex;overflow:hidden;pointer-events:none;">${content}</div>`;
}

function onCellCreateVacation({ time, row, vido, content }) {
  if (!row.vacations) return content;
  let isVacation = false;
  for (const vacation of row.vacations) {
    if (time.leftGlobal >= vacation.from && time.rightGlobal <= vacation.to) {
      isVacation = true;
      break;
    }
  }
  if (isVacation) {
    return vido.html`<div title="🏖️ VACATION" style="height:100%;width:100%;background:#A0A0A010;"></div>${content}`;
  }
  return content;
}

function myVacationRowSlot(vido, props) {
  const { onChange, html, update, api, state } = vido;

  let vacationContent = [];
  onChange((changedProps) => {
    props = changedProps;
    if (!props || !props.row || !props.row.vacations) {
      vacationContent = [];
      return update();
    }
    const configTime = state.get('config.chart.time');
    vacationContent = [];
    for (const vacation of props.row.vacations) {
      if (vacation.to < configTime.leftGlobal || vacation.from > configTime.rightGlobal) continue; // birthday date is out of the current view
      const leftPx = api.time.getViewOffsetPxFromDates(api.time.date(vacation.from));
      const rightPx = api.time.getViewOffsetPxFromDates(api.time.date(vacation.to));
      const widthPx = rightPx - leftPx - 1;
      if (widthPx < 0) continue;
      let textAlign = 'left';
      if (widthPx <= 100) textAlign = 'center';
      vacationContent.push(
        html`<div
          style="position:absolute;left:${leftPx}px;width:${widthPx}px;height:14px;white-space: nowrap;text-overflow:ellipsis;overflow:hidden;font-size:11px;background:#A0A0A0;color:white;text-align:${textAlign};"
        >
          Vacation
        </div>`
      );
    }
    update();
  });

  return (content) => html`${vacationContent}${content}`;
}

function onCellCreateBirthday({ time, row, vido, content }) {
  if (!row.birthday) return content;
  let isBirthday = false;
  for (const birthday of row.birthday) {
    if (time.leftGlobal >= birthday.from && time.rightGlobal <= birthday.to) {
      isBirthday = true;
      break;
    }
  }
  if (isBirthday) {
    return vido.html`<div title="🎁 BIRTHDAY" style="height:100%;width:100%;font-size:18px;background:#F9B32F10;"></div>${content}`;
  }
  return content;
}

function myBirthdayRowSlot(vido, props) {
  const { onChange, html, update, api, state } = vido;

  let birthdayContent = [];
  onChange((changedProps) => {
    props = changedProps;
    if (!props || !props.row || !props.row.birthday) {
      birthdayContent = [];
      return update();
    }
    const configTime = state.get('config.chart.time');
    birthdayContent = [];
    for (const birthday of props.row.birthday) {
      if (birthday.to < configTime.leftGlobal || birthday.from > configTime.rightGlobal) continue; // birthday date is out of the current view
      const leftPx = api.time.getViewOffsetPxFromDates(api.time.date(birthday.from));
      const rightPx = api.time.getViewOffsetPxFromDates(api.time.date(birthday.to));
      const widthPx = rightPx - leftPx - 1;
      if (widthPx < 0) continue;
      let textAlign = 'left';
      if (widthPx <= 100) textAlign = 'center';

      birthdayContent.push(
        html`<div
          style="position:absolute;left:${leftPx}px;width:${widthPx}px;height:14px;white-space: nowrap;text-overflow:ellipsis;overflow:hidden;font-size:11px;background:#F9B32F;color:white;text-align:${textAlign};"
        >
          🎁 Birthday
        </div>`
      );
    }
    update();
  });

  return (content) => html`${birthdayContent}${content}`;
}

// Typescript usage:
// import { Config } from 'gantt-schedule-timeline-calendar';
// const config: Config = {...};
/**
 * @type {import("static/assets/gstc/dist/gstc").Config} // or {import("gantt-schedule-timeline-calendar").Config}
 */
const config = {
  licenseKey:
    '====BEGIN LICENSE KEY====\neoOlN+zEfCN+dHJixEBIdlGTnULkfrD/cyzx+TFgif+GWo4V2fse2PdyMBk7KVdeMfuIYIt/4jsAupqZ5vYwYmqYcBqNu/+EmWiFdDUjjGQ1HzeSOgeXIVtaBn6e2Vc8XxXqOxtFzmlC1QKVmUPPtsclNsx+v8S9kMHkYlTmeWg9C7akdGGKfbzjyKuu0phIUQtaIsgyZN5oxtdrkQYlA/ljYhjlU00NxtsvJupkVKtXHNNL+N7k5o5oEubXsywXHK+jgoU7rQesP+dDTRudsJlHxRNRCPqCj2GqJnUWyZVAHDrZgRqjp+7OVmZK9CjFJCB1RcS2u6AnRr4JSDgudA==||U2FsdGVkX1/JdPBZkV7qPd0lxhAsNyj0Vj0oQOwlEMuIdKPDx5+0auzp2dZuHu45mdAOGTme9kB/pCTF35Up7VVvuvqyql/+LjeHa6ZA8Ro=\nRHyWsppnnMUiVvf6dse+zyZyjCcXNcMVUnThoipgo/Vux5rVU8gUsQZ+NvpK5nNlTxAmQaeuJ3ROwkxICzpaA/gJi+pxhuLsf1SrmmgmL/6jYpS2JCjaxovDtZFXr1LLhX/gXcK4OePAnBxPQnYxXhw/YjtrmIYZqfvZlCT+Xx1W7z0Qi28exPahUY4KLHUqbH6mCftdDLqy/B+twyKbEWUjlZLT6bEt/2KGhIBwXnFKWVqnutCdwsSOACUXDaZ59urAiiPIJzZQ6lBbgE/Et0TpILfyXPd56bHGhP0QeD8IXF9TKpvys9TMHDGIaXMiMe/IKrUTx16UHgL2pigfGg==\n====END LICENSE KEY====',
  innerHeight: 700,
  //autoInnerHeight: true,
  plugins: [
    HighlightWeekends(),
    TimelinePointer(), // timeline pointer must go first before selection, resizing and movement
    Selection({
      events: {
        onEnd(selected) {
          console.log('Selected', selected);
          return selected;
        },
      },
    }),
    ItemResizing(itemResizeOptions), // resizing must fo before movement
    ItemMovement(itemMovementOptions),
    CalendarScroll(),
    ProgressBar(),
    TimeBookmarks({
      bookmarks,
    }),
    DependencyLines({
      onLine: [
        (line) => {
          line.type = GSTC.api.sourceID(line.fromItem.id) === '3' ? 'smooth' : 'square';
          return line;
        },
      ],
    }),
    ExportImage(),
    ExportPDF(),
  ],
  list: {
    row: {
      height: 68,
    },
    rows: getInitialRows(),
    columns,
  },
  chart: {
    time: {
      from: startDate.valueOf(),
      to: endDate.valueOf(),
      onLevelDates: [onLevelDates],
    },
    item: {
      height: 50,
      gap: {
        top: 14,
        //bottom: 0,
      },
    },
    items: generateItemsForDaysView(),
    grid: {
      cell: {
        onCreate: [onCellCreateVacation, onCellCreateBirthday],
      },
    },
  },
  scroll: {
    vertical: { precise: true, byPixels: true },
    horizontal: { precise: true, byPixels: true },
  },
  slots: {
    'chart-timeline-items-row-item': { content: [itemSlot], inner: [myItemSlot] },
    'list-column-row': { content: [rowSlot] },
    'chart-timeline-grid-row': { content: [myBirthdayRowSlot, myVacationRowSlot] },
  },
  templates: {
    'chart-timeline-items-row-item': chartTimelineItemsRowItemTemplate,
  },
  //utcMode: true,
};

let gstc;
let state;
function mountGSTC() {
  state = GSTC.api.stateFromConfig(config);
  const element = document.createElement('div');
  element.id = 'gstc';
  document.querySelector('#toolbox')?.after(element);
  gstc = GSTC({
    element,
    state,
  });
  //@ts-ignore
  globalThis.state = state;
  //@ts-ignore
  globalThis.gstc = gstc;
}

mountGSTC();

// TOOLBOX BUTTONS

// Select first two cells
function selectCells() {
  const api = gstc.api;
  const allCells = api.getGridCells();
  api.plugins.Selection.selectCells([allCells[0].id, allCells[1].id]);
  console.log(api.plugins.Selection.getSelection());
}

// scroll to first item
function scrollToFirstItem() {
  const api = gstc.api;
  const firstItem = gstc.state.get(`config.chart.items.${api.GSTCID('1')}`);
  api.scrollToTime(firstItem.time.start, false);
}

globalThis.scrollToFirstItem = scrollToFirstItem;

function downloadImage() {
  gstc.api.plugins.ExportImage.download();
}

async function downloadPdf() {
  await gstc.api.plugins.ExportPDF.download('timeline.pdf');
  console.log('PDF downloaded');
}

async function takeShotPdf() {
  const img = await gstc.api.plugins.ExportPDF.takeShot();
  console.log('PDF shot taken', img);
  alert(
    `\nScreenshot taken\n\nYou can add more screenshots and then download them all together with "Get screenshots" button.`
  );
}

async function getPdf() {
  await gstc.api.plugins.ExportPDF.getPDF('timeline.pdf');
  await gstc.api.plugins.ExportPDF.clearPDF(); // don't forget to clear pdf after you are done with it
  console.log('PDF downloaded');
}

function downloadPdfFull() {
  gstc.api.plugins.ExportPDF.downloadFull('timeline.pdf');
}

let darkModeEnabled = true;
const el = document.getElementById('gstc');
el?.classList.add('gstc--dark');
document.body.classList.add('gstc--dark');
function toggleDarkMode(ev) {
  darkModeEnabled = ev.target.checked;
  const el = document.getElementById('gstc');
  if (darkModeEnabled) {
    el?.classList.add('gstc--dark');
    document.body.classList.add('gstc--dark');
  } else {
    el?.classList.remove('gstc--dark');
    document.body.classList.remove('gstc--dark');
  }
}

function toggleHideWeekends(ev) {
  hideWeekends = ev.target.checked;
  gstc.api.time.recalculateTime();
}

function toggleSnapTime(ev) {
  snapTime = ev.target.checked;
}

function toggleExpandTime(ev) {
  const expandTime = ev.target.checked;
  const moveOutEl = document.getElementById('move-out');
  if (moveOutEl && expandTime) {
    // @ts-ignore
    moveOutEl.checked = expandTime;
    toggleMoveOut({ target: moveOutEl });
  }
  state.update('config.chart.time.autoExpandTimeFromItems', expandTime);
}

function toggleMoveOut(ev) {
  const moveOut = ev.target.checked;
  const expandTimeEl = document.getElementById('expand-time');
  if (expandTimeEl && !moveOut) {
    // @ts-ignore
    expandTimeEl.checked = moveOut;
    toggleExpandTime({ target: expandTimeEl });
  }
  state.update('config.plugin.ItemMovement.allowItemsToGoOutsideTheArea', moveOut);
  state.update('config.plugin.ItemResizing.allowItemsToGoOutsideTheArea', moveOut);
}

function zoomChangeSelect(ev) {
  const period = ev.target.value;
  let zoom = 20;
  let from = gstc.api.time.date('2020-02-01').startOf('day').valueOf();
  let to = gstc.api.time.date('2100-03-01').endOf('month').valueOf();
  switch (period) {
    case 'hours':
      zoom = 16;
      from = gstc.api.time.date('2020-02-01').startOf('day').valueOf();
      to = gstc.api.time.date('2100-03-01').endOf('month').valueOf();
      break;
    case 'days':
      zoom = 20;
      from = gstc.api.time.date('2020-02-01').startOf('day').valueOf();
      to = gstc.api.time.date('2100-03-01').endOf('month').valueOf();
      break;
    case 'weeks':
      zoom = 23;
      from = gstc.api.time.date('2020-02-01').startOf('day').valueOf();
      to = gstc.api.time.date('2100-08-01').endOf('month').valueOf();
      break;
    case 'months':
      zoom = 26;
      from = gstc.api.time.date('2020-01-01').startOf('day').valueOf();
      to = gstc.api.time.date('2100-01-10').endOf('year').valueOf();
      break;
  }

  state.update('config.chart.time', (time) => {
    time.zoom = zoom;
    time.from = from;
    time.to = to;
    return time;
  });
  const zoomRange = document.getElementById('zoom-range');
  //@ts-ignore
  if (zoomRange) zoomRange.value = zoom;
}

function zoomChangeRange(ev) {
  const zoom = Number(ev.target.value);
  let period = 'days';
  let from = gstc.api.time.date('2020-02-01').startOf('day');
  let to = gstc.api.time.date('2100-03-01').endOf('month');

  if (zoom >= 16) {
    period = 'hours';
    from = gstc.api.time.date('2020-02-01').startOf('day');
    to = gstc.api.time.date('2100-03-01').endOf('month');
  }
  if (zoom >= 20) {
    period = 'days';
    from = gstc.api.time.date('2020-02-01').startOf('day');
    to = gstc.api.time.date('2100-03-01').endOf('month');
  }
  if (zoom >= 20) {
    period = 'weeks';
    from = gstc.api.time.date('2020-02-01').startOf('day');
    to = gstc.api.time.date('2100-08-01').endOf('month');
  }
  if (zoom >= 23) {
    period = 'months';
    from = gstc.api.time.date('2020-01-01').startOf('day');
    to = gstc.api.time.date('2100-01-10').endOf('year');
  }

  gstc.state.update('config.chart.time', (time) => {
    time.zoom = zoom;
    time.from = from.valueOf();
    time.to = to.valueOf();
    return time;
  });
  const zoomSelect = document.getElementById('zoom');
  // @ts-ignore
  if (zoomSelect) zoomSelect.value = period;
}

function searchRows(event) {
  const copiedRows = getInitialRows();
  const search = String(event.target.value).trim();
  console.log('search', search);
  const regex = new RegExp(`[\s\S]?${search}[\s\S]?`, 'gi');
  const rowsToKeep = [];
  for (const rowId in copiedRows) {
    const row = copiedRows[rowId];
    const rowData = gstc.api.getRowData(rowId);
    if (regex.test(row.label)) {
      rowsToKeep.push(rowId);
      for (const childRowId of rowData.allChildren) {
        rowsToKeep.push(childRowId);
      }
      for (const parentRowId of rowData.parents) {
        rowsToKeep.push(parentRowId);
        if (search) copiedRows[parentRowId].expanded = true;
      }
    }
    regex.lastIndex = 0;
  }
  const uniqueRowsToKeep = [...new Set(rowsToKeep)]; // js way to get only unique row id's- we don't want duplicates here
  for (const rowId in copiedRows) {
    if (uniqueRowsToKeep.includes(rowId)) {
      copiedRows[rowId].visible = true;
    } else {
      copiedRows[rowId].visible = false;
    }
  }
  state.update('config.list.rows', (currentRows) => {
    return copiedRows;
  });
}

const historyStates = [];
globalThis.historyStates = historyStates;
let currentStateName = '';
function saveCurrentState(stateName) {
  const items = GSTC.api.merge({}, state.get('config.chart.items'));
  historyStates.push({ name: stateName, state: items });
  currentStateName = stateName;
  updateToolBox();
}

function restoreState(stateName) {
  const historyState = historyStates.find((s) => s.name == stateName);
  currentStateName = stateName;
  const clonedState = GSTC.api.merge({}, historyState.state);
  state.update('config.chart.items', clonedState);
  updateToolBox();
}

function onRestoreStateChange(ev) {
  const name = ev.target.value;
  restoreState(name);
}

function openSaveCurrentStateDialog() {
  const stateName = prompt('Enter current state name');
  saveCurrentState(stateName);
}

function deleteSelectedItems() {
  const selectedItems = gstc.api.plugins.Selection.getSelected()['chart-timeline-items-row-item']; // cloned items
  gstc.api.plugins.Selection.selectItems([]); // clear selection
  state.update('config.plugin.Selection.lastSelecting.chart-timeline-items-row-item', []);
  state.update('config.chart.items', (items) => {
    for (const item of selectedItems) {
      delete items[item.id];
    }
    return items;
  });
}

const html = GSTC.lithtml.html;

function updateToolBox() {
  const searchBoxHTML = html`<input type="text" @input=${searchRows} placeholder="Search" />`;
  const historyStateHTML = html`<button @click="${openSaveCurrentStateDialog}">Save items</button>
    <label>Restore items:</label>
    <select @change=${onRestoreStateChange}>
      ${historyStates.map(
        (historyState) =>
          html`<option value=${historyState.name} ?selected=${historyState.name === currentStateName}>
            ${historyState.name}
          </option>`
      )}
    </select>`;

  const toolboxButtons = html` <div class="toolbox-row">
    <div class="toolbox-item"><button @click=${selectCells}>Select first cells</button></div>
    <div class="toolbox-item"><button @click=${scrollToFirstItem}>Scroll to first item</button></div>
    <div class="toolbox-item"><button @click=${downloadImage}>Download image</button></div>
    <div class="toolbox-item"><button @click=${downloadPdf}>PDF (current view)</button></div>
    <div class="toolbox-item"><button @click=${downloadPdfFull}>PDF (full)</button></div>
    <div class="toolbox-item"><button @click=${takeShotPdf}>Take screenshot</button></div>
    <div class="toolbox-item">-></div>
      <div class="toolbox-item"><button @click=${getPdf}>Get screenshots</button></div>
      <div class="toolbox-item">${historyStateHTML}</div>
      <div class="toolbox-item">
        <label>Zoom:</label>
        <select @change="${zoomChangeSelect}" id="zoom">
          <option value="hours">Hours</option>
          <option value="days" selected>Days</option>
          <option value="weeks">Weeks</option>
          <option value="months">Months</option>
        </select>
      </div>
      <div class="toolbox-item">
        <button @click=${deleteSelectedItems}>Delete selected items</button>
      </div>
    </div>
    <div class="toolbox-row">
      <div class="toolbox-item">${searchBoxHTML}</div>
      <div class="toolbox-item">
        <input type="checkbox" id="dark-mode" @change=${toggleDarkMode} checked /> <label for="dark-mode">Dark mode</label>
      </div>
      <div class="toolbox-item">
        <input type="checkbox" id="snap-time" @change=${toggleSnapTime} checked />
        <label for="snap-time">Snap time (item movement)</label>
      </div>
      <div class="toolbox-item">
        <input type="checkbox" id="hide-weekends" @change=${toggleHideWeekends} />
        <label for="hide-weekends">Hide weekends</label>
      </div>
      <div class="toolbox-item">
        <input type="checkbox" id="expand-time" @change=${toggleExpandTime} />
        <label for="expand-time">Expand view when item is outside</label>
      </div>
      <div class="toolbox-item">
        <input type="checkbox" id="move-out" @change=${toggleMoveOut} checked />
        <label for="move-out">Alow items to move outside area</label>
      </div>
      <div class="toolbox-item">
        <label for="zoom">Zoom:</label>
        <input
          id="zoom-range"
          type="range"
          min="16"
          max="26"
          value="20"
          step="0.1"
          @change=${zoomChangeRange}
          style="width:200px"
        />
      </div>
    </div>
  </div>`;
  // @ts-ignore
  GSTC.lithtml.render(toolboxButtons, document.getElementById('toolbox'));
}
updateToolBox();

const gstcEl = document.getElementById('gstc');
gstcEl?.addEventListener('gstc-loaded', () => {
  console.log('GSTC loaded!');
  saveCurrentState('Initial');
});
