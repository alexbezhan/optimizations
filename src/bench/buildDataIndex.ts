export {}

type DataIndex<R> = { [column: string]: { [valueOrEmpty: string]: R[] | undefined } }
type DataIndexLight = { [column: string]: { [valueOrEmpty: string]: number[] } }

type BenchRow = {
    portfolio: string,
    campaign: string,
    adGroup: string,
    matchType: string,
    searchTerm: string,
    color: string,
    impressions: number,
    clicks: number,
    spend: number,
    sales: number,
    orders: number,
}

type Col<R> = {
    name: string,
    getValue: (row: R) => string | undefined,
    compare?: (a: any, b: any) => number,
    disabled?: boolean,
}


const rows: BenchRow[] = []
for (let i = 0; i < 100000; i++) {
    rows.push({
        portfolio: `portfolio-${i % 10}`,
        campaign: `campaign-${i % 10}`,
        adGroup: `adGroup-${i % 10}`,
        matchType: `matchType-${i % 10}`,
        searchTerm: `searchTerm-${i % 100}`,
        color: `color-${i % 5}`,
        impressions: (i % 100) * 100,
        clicks: (i % 50) * 10,
        spend: (i % 50) * 10,
        sales: (i % 50) * 10,
        orders: (i % 10),
    })
}
const portfolioColumn: Col<any> = { name: 'portfolio', getValue: (row) => row['portfolio'] }
const campaignColumn: Col<any> = { name: 'campaign', getValue: (row) => row['campaign'] }
const adGroupColumn: Col<any> = { name: 'adGroup', getValue: (row) => row['adGroup'] }
const matchTypeColumn: Col<any> = { name: 'matchType', getValue: (row) => row['matchType'] }
const searchTermColumn: Col<any> = { name: 'searchTerm', getValue: (row) => row['searchTerm'] }
const colorColumn: Col<any> = { name: 'color', getValue: (row) => row['color'] }
const impressionsColumn: Col<any> = { name: 'impressions', getValue: (row) => row['impressions'].toString() }
const clicksColumn: Col<any> = { name: 'clicks', getValue: (row) => row['clicks'].toString() }
const spendColumn: Col<any> = { name: 'spend', getValue: (row) => row['spend'].toString() }
const salesColumn: Col<any> = { name: 'sales', getValue: (row) => row['sales'].toString() }
const ordersColumn: Col<any> = { name: 'orders', getValue: (row) => row['orders'].toString() }
const columns: Col<any>[] = [
    portfolioColumn,
    campaignColumn,
    adGroupColumn,
    matchTypeColumn,
    searchTermColumn,
    colorColumn,
    impressionsColumn,
    clicksColumn,
    spendColumn,
    salesColumn,
    ordersColumn,
]

function benchCallBuildDataIndex<R>(data: R[], columns: Col<R>[]): DataIndex<R> {
    const dataIndexed: DataIndex<R> = {}
    for (const column of columns) {
        dataIndexed[column.name] = {}
    }
    for (const row of data) {
        for (const column of columns) {
            const valueOrEmpty = column.getValue(row) ?? ''
            const arr = dataIndexed[column.name]![valueOrEmpty] ?? []
            arr.push(row)
            dataIndexed[column.name]![valueOrEmpty] = arr;
        }
    }
    return dataIndexed
}

function benchCallBuildDataIndexUnroll2<R>(data: R[], columns: Col<R>[]): DataIndex<R> {
    const dataIndexed: DataIndex<R> = {}
    for (const column of columns) {
        dataIndexed[column.name] = {}
    }
    for (let i = 0; i < data.length; i += 2) {
        const rowA = data[i]!
        const rowB = data[i + 1]!
        for (const column of columns) {
            const valueANameOrEmpty = column.getValue(rowA) ?? ''
            const valueBNameOrEmpty = column.getValue(rowB) ?? ''
            const arrA = dataIndexed[column.name]![valueANameOrEmpty] ?? []
            const arrB = dataIndexed[column.name]![valueBNameOrEmpty] ?? []
            arrA.push(rowA)
            arrB.push(rowB)
            dataIndexed[column.name]![valueANameOrEmpty] = arrA;
            dataIndexed[column.name]![valueBNameOrEmpty] = arrB;
        }
    }
    return dataIndexed
}

function buildDataIndexTailored<R>(data: R[], columns: Col<any>[]): DataIndex<R> {
    const dataIndexed: DataIndex<R> = {
        'portfolio': {},
        'campaign': {},
        'adGroup': {},
        'matchType': {},
        'searchTerm': {},
        'color': {},
        'impressions': {},
        'clicks': {},
        'spend': {},
        'sales': {},
        'orders': {},
    }
    for (let i = 0; i < data.length; i++) {
        const row = data[i]!
        {
            const valueANameOrEmpty = portfolioColumn.getValue(row) ?? ''
            const arrA = dataIndexed[portfolioColumn.name]![valueANameOrEmpty] ?? []
            arrA.push(row)
            dataIndexed[portfolioColumn.name]![valueANameOrEmpty] = arrA;
        }
        {
            const valueANameOrEmpty = campaignColumn.getValue(row) ?? ''
            const arrA = dataIndexed[campaignColumn.name]![valueANameOrEmpty] ?? []
            arrA.push(row)
            dataIndexed[campaignColumn.name]![valueANameOrEmpty] = arrA;
        }
        {
            const valueANameOrEmpty = adGroupColumn.getValue(row) ?? ''
            const arrA = dataIndexed[adGroupColumn.name]![valueANameOrEmpty] ?? []
            arrA.push(row)
            dataIndexed[adGroupColumn.name]![valueANameOrEmpty] = arrA;
        }
        {
            const valueANameOrEmpty = matchTypeColumn.getValue(row) ?? ''
            const arrA = dataIndexed[matchTypeColumn.name]![valueANameOrEmpty] ?? []
            arrA.push(row)
            dataIndexed[matchTypeColumn.name]![valueANameOrEmpty] = arrA;
        }
        {
            const valueANameOrEmpty = searchTermColumn.getValue(row) ?? ''
            const arrA = dataIndexed[searchTermColumn.name]![valueANameOrEmpty] ?? []
            arrA.push(row)
            dataIndexed[searchTermColumn.name]![valueANameOrEmpty] = arrA;
        }
        {
            const valueANameOrEmpty = colorColumn.getValue(row) ?? ''
            const arrA = dataIndexed[colorColumn.name]![valueANameOrEmpty] ?? []
            arrA.push(row)
            dataIndexed[colorColumn.name]![valueANameOrEmpty] = arrA;
        }
        {
            const valueANameOrEmpty = impressionsColumn.getValue(row) ?? ''
            const arrA = dataIndexed[impressionsColumn.name]![valueANameOrEmpty] ?? []
            arrA.push(row)
            dataIndexed[impressionsColumn.name]![valueANameOrEmpty] = arrA;
        }
        {
            const valueANameOrEmpty = clicksColumn.getValue(row) ?? ''
            const arrA = dataIndexed[clicksColumn.name]![valueANameOrEmpty] ?? []
            arrA.push(row)
            dataIndexed[clicksColumn.name]![valueANameOrEmpty] = arrA;
        }
        {
            const valueANameOrEmpty = spendColumn.getValue(row) ?? ''
            const arrA = dataIndexed[spendColumn.name]![valueANameOrEmpty] ?? []
            arrA.push(row)
            dataIndexed[spendColumn.name]![valueANameOrEmpty] = arrA;
        }
        {
            const valueANameOrEmpty = salesColumn.getValue(row) ?? ''
            const arrA = dataIndexed[salesColumn.name]![valueANameOrEmpty] ?? []
            arrA.push(row)
            dataIndexed[salesColumn.name]![valueANameOrEmpty] = arrA;
        }
        {
            const valueANameOrEmpty = ordersColumn.getValue(row) ?? ''
            const arrA = dataIndexed[ordersColumn.name]![valueANameOrEmpty] ?? []
            arrA.push(row)
            dataIndexed[ordersColumn.name]![valueANameOrEmpty] = arrA;
        }
    }
    return dataIndexed
}

function buildDataIndexTailoredSeparateArrays<R>(data: R[], columns: Col<any>[]): DataIndex<R> {
    const portfolioRows: { [nameOrEmpty: string]: NonNullable<R>[] } = {}
    const campaignRows: { [nameOrEmpty: string]: NonNullable<R>[] } = {}
    const adGroupRows: { [nameOrEmpty: string]: NonNullable<R>[] } = {}
    const matchTypeRows: { [nameOrEmpty: string]: NonNullable<R>[] } = {}
    const searchTermRows: { [nameOrEmpty: string]: NonNullable<R>[] } = {}
    const colorRows: { [nameOrEmpty: string]: NonNullable<R>[] } = {}
    const impressionsRows: { [nameOrEmpty: string]: NonNullable<R>[] } = {}
    const clicksRows: { [nameOrEmpty: string]: NonNullable<R>[] } = {}
    const spendRows: { [nameOrEmpty: string]: NonNullable<R>[] } = {}
    const salesRows: { [nameOrEmpty: string]: NonNullable<R>[] } = {}
    const ordersRows: { [nameOrEmpty: string]: NonNullable<R>[] } = {}

    const dataIndexed: DataIndex<R> = {
        'portfolio': portfolioRows,
        'campaign': campaignRows,
        'adGroup': adGroupRows,
        'matchType': matchTypeRows,
        'searchTerm': searchTermRows,
        'color': colorRows,
        'impressions': impressionsRows,
        'clicks': clicksRows,
        'spend': spendRows,
        'sales': salesRows,
        'orders': ordersRows,
    }

    if (data.length === 0) {
        return dataIndexed
    }

    const length = data.length

    for (let i = 0; i < length; i++) {
        const row = data[i]!

        const portfolioNameOrEmpty = portfolioColumn.getValue(row) ?? ''
        const portfolioArr = portfolioRows[portfolioNameOrEmpty]
        if (portfolioArr === undefined) {
            portfolioRows[portfolioNameOrEmpty] = [row]
        } else {
            portfolioArr.push(row)
            portfolioRows[portfolioNameOrEmpty] = portfolioArr;
        }

        const campaignNameOrEmpty = campaignColumn.getValue(row) ?? ''
        const campaignArr = campaignRows[campaignNameOrEmpty]
        if (campaignArr === undefined) {
            campaignRows[campaignNameOrEmpty] = [row]
        } else {
            campaignArr.push(row)
            campaignRows[campaignNameOrEmpty] = campaignArr;
        }

        const adGroupNameOrEmpty = adGroupColumn.getValue(row) ?? ''
        const adGroupArr = adGroupRows[adGroupNameOrEmpty]
        if (adGroupArr === undefined) {
            adGroupRows[adGroupNameOrEmpty] = [row]
        } else {
            adGroupArr.push(row)
            adGroupRows[adGroupNameOrEmpty] = adGroupArr;
        }

        const matchTypeNameOrEmpty = matchTypeColumn.getValue(row) ?? ''
        const matchTypeArr = matchTypeRows[matchTypeNameOrEmpty]
        if (matchTypeArr === undefined) {
            matchTypeRows[matchTypeNameOrEmpty] = [row]
        } else {
            matchTypeArr.push(row)
            matchTypeRows[matchTypeNameOrEmpty] = matchTypeArr;
        }

        const searchTermNameOrEmpty = searchTermColumn.getValue(row) ?? ''
        const searchTermArr = searchTermRows[searchTermNameOrEmpty]
        if (searchTermArr === undefined) {
            searchTermRows[searchTermNameOrEmpty] = [row]
        } else {
            searchTermArr.push(row)
            searchTermRows[searchTermNameOrEmpty] = searchTermArr;
        }

        const colorNameOrEmpty = colorColumn.getValue(row) ?? ''
        const colorArr = colorRows[colorNameOrEmpty]
        if (colorArr === undefined) {
            colorRows[colorNameOrEmpty] = [row]
        } else {
            colorArr.push(row)
            colorRows[colorNameOrEmpty] = colorArr;
        }

        const impressionsNameOrEmpty = impressionsColumn.getValue(row) ?? ''
        const impressionsArr = impressionsRows[impressionsNameOrEmpty]
        if (impressionsArr === undefined) {
            impressionsRows[impressionsNameOrEmpty] = [row]
        } else {
            impressionsArr.push(row)
            impressionsRows[impressionsNameOrEmpty] = impressionsArr;
        }

        const clicksNameOrEmpty = clicksColumn.getValue(row) ?? ''
        const clicksArr = clicksRows[clicksNameOrEmpty]
        if (clicksArr === undefined) {
            clicksRows[clicksNameOrEmpty] = [row]
        } else {
            clicksArr.push(row)
            clicksRows[clicksNameOrEmpty] = clicksArr;
        }

        const spendNameOrEmpty = spendColumn.getValue(row) ?? ''
        const spendArr = spendRows[spendNameOrEmpty]
        if (spendArr === undefined) {
            spendRows[spendNameOrEmpty] = [row]
        } else {
            spendArr.push(row)
            spendRows[spendNameOrEmpty] = spendArr;
        }

        const salesNameOrEmpty = salesColumn.getValue(row) ?? ''
        const salesArr = salesRows[salesNameOrEmpty]
        if (salesArr === undefined) {
            salesRows[salesNameOrEmpty] = [row]
        } else {
            salesArr.push(row)
            salesRows[salesNameOrEmpty] = salesArr;
        }

        const ordersNameOrEmpty = ordersColumn.getValue(row) ?? ''
        const ordersArr = ordersRows[ordersNameOrEmpty]
        if (ordersArr === undefined) {
            ordersRows[ordersNameOrEmpty] = [row]
        } else {
            ordersArr.push(row)
            ordersRows[ordersNameOrEmpty] = ordersArr;
        }
    }
    return dataIndexed
}

function buildDataIndexTailoredSeparateArraysUnroll2<R>(data: R[], columns: Col<any>[]): DataIndex<R> {
    const portfolioRows: { [nameOrEmpty: string]: NonNullable<R>[] } = {}
    const campaignRows: { [nameOrEmpty: string]: NonNullable<R>[] } = {}
    const adGroupRows: { [nameOrEmpty: string]: NonNullable<R>[] } = {}
    const matchTypeRows: { [nameOrEmpty: string]: NonNullable<R>[] } = {}
    const searchTermRows: { [nameOrEmpty: string]: NonNullable<R>[] } = {}
    const colorRows: { [nameOrEmpty: string]: NonNullable<R>[] } = {}
    const impressionsRows: { [nameOrEmpty: string]: NonNullable<R>[] } = {}
    const clicksRows: { [nameOrEmpty: string]: NonNullable<R>[] } = {}
    const spendRows: { [nameOrEmpty: string]: NonNullable<R>[] } = {}
    const salesRows: { [nameOrEmpty: string]: NonNullable<R>[] } = {}
    const ordersRows: { [nameOrEmpty: string]: NonNullable<R>[] } = {}

    const dataIndexed: DataIndex<R> = {
        'portfolio': portfolioRows,
        'campaign': campaignRows,
        'adGroup': adGroupRows,
        'matchType': matchTypeRows,
        'searchTerm': searchTermRows,
        'color': colorRows,
        'impressions': impressionsRows,
        'clicks': clicksRows,
        'spend': spendRows,
        'sales': salesRows,
        'orders': ordersRows,
    }

    if (data.length === 0) {
        return dataIndexed
    }

    const length = data.length

    for (let i = 0; i < length; i += 2) {
        const rowA = data[i]!
        const rowB = data[i + 1]!

        const portfolioANameOrEmpty = portfolioColumn.getValue(rowA) ?? ''
        const portfolioBNameOrEmpty = portfolioColumn.getValue(rowB) ?? ''
        const campaignANameOrEmpty = campaignColumn.getValue(rowA) ?? ''
        const campaignBNameOrEmpty = campaignColumn.getValue(rowB) ?? ''
        const adGroupANameOrEmpty = adGroupColumn.getValue(rowA) ?? ''
        const adGroupBNameOrEmpty = adGroupColumn.getValue(rowB) ?? ''
        const matchTypeANameOrEmpty = matchTypeColumn.getValue(rowA) ?? ''
        const matchTypeBNameOrEmpty = matchTypeColumn.getValue(rowB) ?? ''
        const searchTermANameOrEmpty = searchTermColumn.getValue(rowA) ?? ''
        const searchTermBNameOrEmpty = searchTermColumn.getValue(rowB) ?? ''
        const colorANameOrEmpty = colorColumn.getValue(rowA) ?? ''
        const colorBNameOrEmpty = colorColumn.getValue(rowB) ?? ''
        const impressionsANameOrEmpty = impressionsColumn.getValue(rowA) ?? ''
        const impressionsBNameOrEmpty = impressionsColumn.getValue(rowB) ?? ''
        const clicksANameOrEmpty = clicksColumn.getValue(rowA) ?? ''
        const clicksBNameOrEmpty = clicksColumn.getValue(rowB) ?? ''
        const spendANameOrEmpty = spendColumn.getValue(rowA) ?? ''
        const spendBNameOrEmpty = spendColumn.getValue(rowB) ?? ''
        const salesANameOrEmpty = salesColumn.getValue(rowA) ?? ''
        const salesBNameOrEmpty = salesColumn.getValue(rowB) ?? ''
        const ordersANameOrEmpty = ordersColumn.getValue(rowA) ?? ''
        const ordersBNameOrEmpty = ordersColumn.getValue(rowB) ?? ''

        const portfolioAArr = portfolioRows[portfolioANameOrEmpty]
        const portfolioBArr = portfolioRows[portfolioBNameOrEmpty]
        const campaignAArr = campaignRows[campaignANameOrEmpty]
        const campaignBArr = campaignRows[campaignBNameOrEmpty]
        const adGroupAArr = adGroupRows[adGroupANameOrEmpty]
        const adGroupBArr = adGroupRows[adGroupBNameOrEmpty]
        const matchTypeAArr = matchTypeRows[matchTypeANameOrEmpty]
        const matchTypeBArr = matchTypeRows[matchTypeBNameOrEmpty]
        const searchTermAArr = searchTermRows[searchTermANameOrEmpty]
        const searchTermBArr = searchTermRows[searchTermBNameOrEmpty]
        const colorAArr = colorRows[colorANameOrEmpty]
        const colorBArr = colorRows[colorBNameOrEmpty]
        const impressionsAArr = impressionsRows[impressionsANameOrEmpty]
        const impressionsBArr = impressionsRows[impressionsBNameOrEmpty]
        const clicksAArr = clicksRows[clicksANameOrEmpty]
        const clicksBArr = clicksRows[clicksBNameOrEmpty]
        const spendAArr = spendRows[spendANameOrEmpty]
        const spendBArr = spendRows[spendBNameOrEmpty]
        const salesAArr = salesRows[salesANameOrEmpty]
        const salesBArr = salesRows[salesBNameOrEmpty]
        const ordersAArr = ordersRows[ordersANameOrEmpty]
        const ordersBArr = ordersRows[ordersBNameOrEmpty]

        if (portfolioAArr === undefined) {
            portfolioRows[portfolioANameOrEmpty] = [rowA]
        } else {
            portfolioAArr.push(rowA)
            portfolioRows[portfolioANameOrEmpty] = portfolioAArr;
        }
        if (portfolioBArr === undefined) {
            portfolioRows[portfolioBNameOrEmpty] = [rowB]
        } else {
            portfolioBArr.push(rowB)
            portfolioRows[portfolioBNameOrEmpty] = portfolioBArr;
        }

        if (campaignAArr === undefined) {
            campaignRows[campaignANameOrEmpty] = [rowA]
        } else {
            campaignAArr.push(rowA)
            campaignRows[campaignANameOrEmpty] = campaignAArr;
        }
        if (campaignBArr === undefined) {
            campaignRows[campaignBNameOrEmpty] = [rowB]
        } else {
            campaignBArr.push(rowB)
            campaignRows[campaignBNameOrEmpty] = campaignBArr;
        }

        if (adGroupAArr === undefined) {
            adGroupRows[adGroupANameOrEmpty] = [rowA]
        } else {
            adGroupAArr.push(rowA)
            adGroupRows[adGroupANameOrEmpty] = adGroupAArr;
        }
        if (adGroupBArr === undefined) {
            adGroupRows[adGroupBNameOrEmpty] = [rowB]
        } else {
            adGroupBArr.push(rowB)
            adGroupRows[adGroupBNameOrEmpty] = adGroupBArr;
        }

        if (matchTypeAArr === undefined) {
            matchTypeRows[matchTypeANameOrEmpty] = [rowA]
        } else {
            matchTypeAArr.push(rowA)
            matchTypeRows[matchTypeANameOrEmpty] = matchTypeAArr;
        }
        if (matchTypeBArr === undefined) {
            matchTypeRows[matchTypeBNameOrEmpty] = [rowB]
        } else {
            matchTypeBArr.push(rowB)
            matchTypeRows[matchTypeBNameOrEmpty] = matchTypeBArr;
        }

        if (searchTermAArr === undefined) {
            searchTermRows[searchTermANameOrEmpty] = [rowA]
        } else {
            searchTermAArr.push(rowA)
            searchTermRows[searchTermANameOrEmpty] = searchTermAArr;
        }
        if (searchTermBArr === undefined) {
            searchTermRows[searchTermBNameOrEmpty] = [rowB]
        } else {
            searchTermBArr.push(rowB)
            searchTermRows[searchTermBNameOrEmpty] = searchTermBArr;
        }

        if (colorAArr === undefined) {
            colorRows[colorANameOrEmpty] = [rowA]
        } else {
            colorAArr.push(rowA)
            colorRows[colorANameOrEmpty] = colorAArr;
        }
        if (colorBArr === undefined) {
            colorRows[colorBNameOrEmpty] = [rowB]
        } else {
            colorBArr.push(rowB)
            colorRows[colorBNameOrEmpty] = colorBArr;
        }

        if (impressionsAArr === undefined) {
            impressionsRows[impressionsANameOrEmpty] = [rowA]
        } else {
            impressionsAArr.push(rowA)
            impressionsRows[impressionsANameOrEmpty] = impressionsAArr;
        }
        if (impressionsBArr === undefined) {
            impressionsRows[impressionsBNameOrEmpty] = [rowB]
        } else {
            impressionsBArr.push(rowB)
            impressionsRows[impressionsBNameOrEmpty] = impressionsBArr;
        }

        if (clicksAArr === undefined) {
            clicksRows[clicksANameOrEmpty] = [rowA]
        } else {
            clicksAArr.push(rowA)
            clicksRows[clicksANameOrEmpty] = clicksAArr;
        }
        if (clicksBArr === undefined) {
            clicksRows[clicksBNameOrEmpty] = [rowB]
        } else {
            clicksBArr.push(rowB)
            clicksRows[clicksBNameOrEmpty] = clicksBArr;
        }

        if (spendAArr === undefined) {
            spendRows[spendANameOrEmpty] = [rowA]
        } else {
            spendAArr.push(rowA)
            spendRows[spendANameOrEmpty] = spendAArr;
        }
        if (spendBArr === undefined) {
            spendRows[spendBNameOrEmpty] = [rowB]
        } else {
            spendBArr.push(rowB)
            spendRows[spendBNameOrEmpty] = spendBArr;
        }

        if (salesAArr === undefined) {
            salesRows[salesANameOrEmpty] = [rowA]
        } else {
            salesAArr.push(rowA)
            salesRows[salesANameOrEmpty] = salesAArr;
        }
        if (salesBArr === undefined) {
            salesRows[salesBNameOrEmpty] = [rowB]
        } else {
            salesBArr.push(rowB)
            salesRows[salesBNameOrEmpty] = salesBArr;
        }

        if (ordersAArr === undefined) {
            ordersRows[ordersANameOrEmpty] = [rowA]
        } else {
            ordersAArr.push(rowA)
            ordersRows[ordersANameOrEmpty] = ordersAArr;
        }
        if (ordersBArr === undefined) {
            ordersRows[ordersBNameOrEmpty] = [rowB]
        } else {
            ordersBArr.push(rowB)
            ordersRows[ordersBNameOrEmpty] = ordersBArr;
        }
    }
    return dataIndexed
}

function buildDataIndexTailoredSeparateArraysUnroll2Indexes<R>(data: R[], columns: Col<any>[]): DataIndexLight {
    const portfolioIndexes: { [nameOrEmpty: string]: number[] } = {}
    const campaignIndexes: { [nameOrEmpty: string]: number[] } = {}
    const adGroupIndexes: { [nameOrEmpty: string]: number[] } = {}
    const matchTypeIndexes: { [nameOrEmpty: string]: number[] } = {}
    const searchTermIndexes: { [nameOrEmpty: string]: number[] } = {}
    const colorIndexes: { [nameOrEmpty: string]: number[] } = {}
    const impressionsIndexes: { [nameOrEmpty: string]: number[] } = {}
    const clicksIndexes: { [nameOrEmpty: string]: number[] } = {}
    const spendIndexes: { [nameOrEmpty: string]: number[] } = {}
    const salesIndexes: { [nameOrEmpty: string]: number[] } = {}
    const ordersIndexes: { [nameOrEmpty: string]: number[] } = {}

    const dataIndexed: DataIndexLight = {
        'portfolio': portfolioIndexes,
        'campaign': campaignIndexes,
        'adGroup': adGroupIndexes,
        'matchType': matchTypeIndexes,
        'searchTerm': searchTermIndexes,
        'color': colorIndexes,
        'impressions': impressionsIndexes,
        'clicks': clicksIndexes,
        'spend': spendIndexes,
        'sales': salesIndexes,
        'orders': ordersIndexes,
    }

    if (data.length === 0) {
        return dataIndexed
    }

    const length = data.length

    for (let i = 0; i < length; i += 2) {
        const j = i + 1
        const rowA = data[i]!
        const rowB = data[j]!

        const portfolioANameOrEmpty = portfolioColumn.getValue(rowA) ?? ''
        const portfolioBNameOrEmpty = portfolioColumn.getValue(rowB) ?? ''
        const campaignANameOrEmpty = campaignColumn.getValue(rowA) ?? ''
        const campaignBNameOrEmpty = campaignColumn.getValue(rowB) ?? ''
        const adGroupANameOrEmpty = adGroupColumn.getValue(rowA) ?? ''
        const adGroupBNameOrEmpty = adGroupColumn.getValue(rowB) ?? ''
        const matchTypeANameOrEmpty = matchTypeColumn.getValue(rowA) ?? ''
        const matchTypeBNameOrEmpty = matchTypeColumn.getValue(rowB) ?? ''
        const searchTermANameOrEmpty = searchTermColumn.getValue(rowA) ?? ''
        const searchTermBNameOrEmpty = searchTermColumn.getValue(rowB) ?? ''
        const colorANameOrEmpty = colorColumn.getValue(rowA) ?? ''
        const colorBNameOrEmpty = colorColumn.getValue(rowB) ?? ''
        const impressionsANameOrEmpty = impressionsColumn.getValue(rowA) ?? ''
        const impressionsBNameOrEmpty = impressionsColumn.getValue(rowB) ?? ''
        const clicksANameOrEmpty = clicksColumn.getValue(rowA) ?? ''
        const clicksBNameOrEmpty = clicksColumn.getValue(rowB) ?? ''
        const spendANameOrEmpty = spendColumn.getValue(rowA) ?? ''
        const spendBNameOrEmpty = spendColumn.getValue(rowB) ?? ''
        const salesANameOrEmpty = salesColumn.getValue(rowA) ?? ''
        const salesBNameOrEmpty = salesColumn.getValue(rowB) ?? ''
        const ordersANameOrEmpty = ordersColumn.getValue(rowA) ?? ''
        const ordersBNameOrEmpty = ordersColumn.getValue(rowB) ?? ''

        const portfolioAArr = portfolioIndexes[portfolioANameOrEmpty]
        const portfolioBArr = portfolioIndexes[portfolioBNameOrEmpty]
        const campaignAArr = campaignIndexes[campaignANameOrEmpty]
        const campaignBArr = campaignIndexes[campaignBNameOrEmpty]
        const adGroupAArr = adGroupIndexes[adGroupANameOrEmpty]
        const adGroupBArr = adGroupIndexes[adGroupBNameOrEmpty]
        const matchTypeAArr = matchTypeIndexes[matchTypeANameOrEmpty]
        const matchTypeBArr = matchTypeIndexes[matchTypeBNameOrEmpty]
        const searchTermAArr = searchTermIndexes[searchTermANameOrEmpty]
        const searchTermBArr = searchTermIndexes[searchTermBNameOrEmpty]
        const colorAArr = colorIndexes[colorANameOrEmpty]
        const colorBArr = colorIndexes[colorBNameOrEmpty]
        const impressionsAArr = impressionsIndexes[impressionsANameOrEmpty]
        const impressionsBArr = impressionsIndexes[impressionsBNameOrEmpty]
        const clicksAArr = clicksIndexes[clicksANameOrEmpty]
        const clicksBArr = clicksIndexes[clicksBNameOrEmpty]
        const spendAArr = spendIndexes[spendANameOrEmpty]
        const spendBArr = spendIndexes[spendBNameOrEmpty]
        const salesAArr = salesIndexes[salesANameOrEmpty]
        const salesBArr = salesIndexes[salesBNameOrEmpty]
        const ordersAArr = ordersIndexes[ordersANameOrEmpty]
        const ordersBArr = ordersIndexes[ordersBNameOrEmpty]

        if (portfolioAArr === undefined) {
            portfolioIndexes[portfolioANameOrEmpty] = [i]
        } else {
            portfolioAArr.push(i)
            portfolioIndexes[portfolioANameOrEmpty] = portfolioAArr;
        }
        if (portfolioBArr === undefined) {
            portfolioIndexes[portfolioBNameOrEmpty] = [j]
        } else {
            portfolioBArr.push(j)
            portfolioIndexes[portfolioBNameOrEmpty] = portfolioBArr;
        }

        if (campaignAArr === undefined) {
            campaignIndexes[campaignANameOrEmpty] = [i]
        } else {
            campaignAArr.push(i)
            campaignIndexes[campaignANameOrEmpty] = campaignAArr;
        }
        if (campaignBArr === undefined) {
            campaignIndexes[campaignBNameOrEmpty] = [j]
        } else {
            campaignBArr.push(j)
            campaignIndexes[campaignBNameOrEmpty] = campaignBArr;
        }

        if (adGroupAArr === undefined) {
            adGroupIndexes[adGroupANameOrEmpty] = [i]
        } else {
            adGroupAArr.push(i)
            adGroupIndexes[adGroupANameOrEmpty] = adGroupAArr;
        }
        if (adGroupBArr === undefined) {
            adGroupIndexes[adGroupBNameOrEmpty] = [j]
        } else {
            adGroupBArr.push(j)
            adGroupIndexes[adGroupBNameOrEmpty] = adGroupBArr;
        }

        if (matchTypeAArr === undefined) {
            matchTypeIndexes[matchTypeANameOrEmpty] = [i]
        } else {
            matchTypeAArr.push(i)
            matchTypeIndexes[matchTypeANameOrEmpty] = matchTypeAArr;
        }
        if (matchTypeBArr === undefined) {
            matchTypeIndexes[matchTypeBNameOrEmpty] = [j]
        } else {
            matchTypeBArr.push(j)
            matchTypeIndexes[matchTypeBNameOrEmpty] = matchTypeBArr;
        }

        if (searchTermAArr === undefined) {
            searchTermIndexes[searchTermANameOrEmpty] = [i]
        } else {
            searchTermAArr.push(i)
            searchTermIndexes[searchTermANameOrEmpty] = searchTermAArr;
        }
        if (searchTermBArr === undefined) {
            searchTermIndexes[searchTermBNameOrEmpty] = [j]
        } else {
            searchTermBArr.push(j)
            searchTermIndexes[searchTermBNameOrEmpty] = searchTermBArr;
        }

        if (colorAArr === undefined) {
            colorIndexes[colorANameOrEmpty] = [i]
        } else {
            colorAArr.push(i)
            colorIndexes[colorANameOrEmpty] = colorAArr;
        }
        if (colorBArr === undefined) {
            colorIndexes[colorBNameOrEmpty] = [j]
        } else {
            colorBArr.push(j)
            colorIndexes[colorBNameOrEmpty] = colorBArr;
        }

        if (impressionsAArr === undefined) {
            impressionsIndexes[impressionsANameOrEmpty] = [i]
        } else {
            impressionsAArr.push(i)
            impressionsIndexes[impressionsANameOrEmpty] = impressionsAArr;
        }
        if (impressionsBArr === undefined) {
            impressionsIndexes[impressionsBNameOrEmpty] = [j]
        } else {
            impressionsBArr.push(j)
            impressionsIndexes[impressionsBNameOrEmpty] = impressionsBArr;
        }

        if (clicksAArr === undefined) {
            clicksIndexes[clicksANameOrEmpty] = [i]
        } else {
            clicksAArr.push(i)
            clicksIndexes[clicksANameOrEmpty] = clicksAArr;
        }
        if (clicksBArr === undefined) {
            clicksIndexes[clicksBNameOrEmpty] = [j]
        } else {
            clicksBArr.push(j)
            clicksIndexes[clicksBNameOrEmpty] = clicksBArr;
        }

        if (spendAArr === undefined) {
            spendIndexes[spendANameOrEmpty] = [i]
        } else {
            spendAArr.push(i)
            spendIndexes[spendANameOrEmpty] = spendAArr;
        }
        if (spendBArr === undefined) {
            spendIndexes[spendBNameOrEmpty] = [j]
        } else {
            spendBArr.push(j)
            spendIndexes[spendBNameOrEmpty] = spendBArr;
        }

        if (salesAArr === undefined) {
            salesIndexes[salesANameOrEmpty] = [i]
        } else {
            salesAArr.push(i)
            salesIndexes[salesANameOrEmpty] = salesAArr;
        }
        if (salesBArr === undefined) {
            salesIndexes[salesBNameOrEmpty] = [j]
        } else {
            salesBArr.push(j)
            salesIndexes[salesBNameOrEmpty] = salesBArr;
        }

        if (ordersAArr === undefined) {
            ordersIndexes[ordersANameOrEmpty] = [i]
        } else {
            ordersAArr.push(i)
            ordersIndexes[ordersANameOrEmpty] = ordersAArr;
        }
        if (ordersBArr === undefined) {
            ordersIndexes[ordersBNameOrEmpty] = [j]
        } else {
            ordersBArr.push(j)
            ordersIndexes[ordersBNameOrEmpty] = ordersBArr;
        }
    }

    return dataIndexed
}

function benchBuildDataIndex() {
    gc!()
    {
        const { result: _result, time: time } = measure(rows, columns, benchCallBuildDataIndex)
        console.log('buildDataIndex Time: ', Math.round(time / 1000000).toString(), 'millis')
    }
    gc!()
    {
        const { result: _result, time: time } = measure(rows, columns, benchCallBuildDataIndexUnroll2)
        console.log('benchCallBuildDataIndexUnroll2 Time: ', Math.round(time / 1000000).toString(), 'millis')
    }
    gc!()
    {
        const { result: _result, time: time } = measure(rows, columns, buildDataIndexTailored)
        console.log('buildDataIndexTailored Time: ', Math.round(time / 1000000).toString(), 'millis')
    }
    gc!()
    {
        const { result: _result, time: time } = measure(rows, columns, buildDataIndexTailoredSeparateArrays)
        console.log('buildDataIndexTailoredSeparateArrays Time: ', Math.round(time / 1000000).toString(), 'millis')
    }
    gc!()
    {
        const { result: _result, time: time } = measure(rows, columns, buildDataIndexTailoredSeparateArraysUnroll2)
        console.log('buildDataIndexTailoredSeparateArraysUnroll2 Time: ', Math.round(time / 1000000).toString(), 'millis')
    }
    gc!()
    {
        const { result: _result, time: time } = measure(rows, columns, buildDataIndexTailoredSeparateArraysUnroll2Indexes)
        console.log('buildDataIndexTailoredSeparateArraysUnroll2Indexes Time: ', Math.round(time / 1000000).toString(), 'millis')
    }
}

type Measurements<R> = {
    result: R,
    time: number,
}
const measure = <R>(rows: BenchRow[], columns: Col<any>[], fn: (rows: BenchRow[], columns: Col<any>[]) => R) => {
    const tryCount = 100
    let time = Infinity
    let result: R | undefined = undefined
    for (let i = 0; i < tryCount; ++i) {
        const startTime = process.hrtime.bigint()
        result = fn(rows, columns)
        const endTime = process.hrtime.bigint()
        const currTime = Number(endTime - startTime)
        time = Math.min(currTime, time)
    }
    const measurements: Measurements<R> = {
        result: result as R,
        time: time,
    }
    return measurements
}

void benchBuildDataIndex()