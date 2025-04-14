<template>
  <div class="app-container">
    <!-- 上方標題 -->
    <div class="header">
      <h1>旅遊分帳應用程式</h1>
    </div>

    <!-- 中間：分成左右 -->
    <div class="middle-section">
      <!-- 左：成員列表 -->
      <div class="member-list" ref="memberListRef">
        <h2>分帳成員</h2>
        <ul>
          <li v-for="(member, index) in members"
              :key="index" @click="selectMember(index)"
              :class="{ selected: selectedMemberIndex === index }">
              {{ member.name }}
              <span v-if="selectedMemberIndex !== index" :class="balanceClass(member.name)">
                {{ balanceText(member.name) }}
              </span>

            <div v-if="selectedMemberIndex === index" class="add-expense-section">
              <button class="btn small-btn" @click.stop="showAddExpense = true">➕ 支出</button>
            </div>
          </li>
        </ul>

      </div>

      <!-- 右：帳款列表 -->
      <div class="expense-list">
        <h2>支出清單</h2>
        <div v-if="expenses.length === 0">尚無支出紀錄</div>
        <ul v-else>
          <li v-for="(expense, index) in expenses" :key="index" class="expense-row">
            <span class="label">
              <strong>{{ expense.member }}</strong> 支出 - {{ expense.category }}
            </span>
            <span class="amount">${{ Math.round(expense.amount) }}</span>
            <button class="btn delete-btn" @click="deleteExpense(index)">❌</button>
          </li>
        </ul>

        <!-- 總計 -->
        <div class="expense-row total-row">
          <span class="label">總計</span>
          <span class="amount">${{ totalAmount }}</span>
          <span style="width: 32px;"></span> <!-- 空白欄對齊刪除按鈕 -->
        </div>

        <!-- 旅程結束 -->
        <div style="margin-top: 20px;">
          <button class="btn danger" @click="endTrip">🚨 旅程結束（清空所有資料）</button>
        </div>


      </div>
    </div>

    <!-- 底部：新增成員 -->
    <div class="bottom-section">
      <input
        v-model="newMemberName"
        class="member-input"
        placeholder="輸入成員姓名"
        @keyup.enter="addMember"
      />
      <button class="btn add-btn" @click="addMember">➕ 新增成員</button>
    </div>

    <!-- Modal: 新增支出款項 -->
    <div v-if="showAddExpense" class="modal-backdrop">
      <div class="modal">
        <h3>新增支出</h3>
        <label>支出項目：</label>
        <input
          list="category-options"
          v-model="selectedCategory"
          placeholder="輸入或選擇項目"
        />
        <datalist id="category-options">
          <option v-for="cat in expenseCategories" :key="cat" :value="cat" />
        </datalist>

        <label>金額：</label>
        <input
          v-model.number="expenseAmount"
          type="number"
          placeholder="輸入金額"
        />

        <div class="modal-buttons">
          <button class="btn confirm" @click="addExpense">確認</button>
          <button class="btn cancel" @click="showAddExpense = false">取消</button>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, watch, onMounted, nextTick,computed } from 'vue'

const members = ref([])
const newMemberName = ref('')
const memberListRef = ref(null)
const selectedMemberIndex = ref(null)
const showAddExpense = ref(false)

// 支出項目選項
const expenseCategories = ref(['餐飲', '住宿', '門票', '交通', '其他'])
const defaultExpenseItems = ref([])
const selectedCategory = ref('')
const expenseAmount = ref(0)

// 支出清單資料
const expenses = ref([])
const totalAmount = computed(() =>
  expenses.value.reduce((sum, e) => sum + e.amount, 0)
)

// ➕ 新增成員
function addMember() {
  const name = newMemberName.value.trim()
  if (name !== '' && !members.value.some(m => m.name === name)) {
    members.value.push({ name })
    newMemberName.value = ''
    nextTick(() => {
      const el = memberListRef.value
      if (el) el.scrollTop = el.scrollHeight
    })
  }
}

// ✋ 選取成員
function selectMember(index) {
  if (selectedMemberIndex.value === index) {
    selectedMemberIndex.value = null
    showAddExpense.value = false
  } else {
    selectedMemberIndex.value = index
    showAddExpense.value = false
  }
}

// 💰 新增支出
function addExpense() {
  const member = members.value[selectedMemberIndex.value]
  const trimmedCategory = selectedCategory.value.trim()

  if (member && trimmedCategory && expenseAmount.value > 0) {
    expenses.value.push({
      member: member.name,
      category: trimmedCategory,
      amount: expenseAmount.value
    })

    if (!expenseCategories.value.includes(trimmedCategory)) {
      expenseCategories.value.push(trimmedCategory)
    }

    selectedCategory.value = ''
    expenseAmount.value = 0
    showAddExpense.value = false
  } else {
    alert('請輸入有效的項目與金額')
  }
  selectedMemberIndex.value = null
}

// ❌ 刪除支出
function deleteExpense(index) {
  expenses.value.splice(index, 1)
}

// 儲存到 localStorage 的方法
function saveToLocalStorage(){
  localStorage.setItem('splitBill_members', JSON.stringify(members.value)) 
  localStorage.setItem('splitBill_expenses', JSON.stringify(expenses.value))
  localStorage.setItem('splitBill_defaultItems', JSON.stringify(defaultExpenseItems.value))
}

// 計算個別成員的淨支出金額
function getMemberBalance(name) {
  const paid = expenses.value
    .filter(e => e.member === name)
    .reduce((sum, e) => sum + e.amount, 0)

  const total = expenses.value.reduce((sum, e) => sum + e.amount, 0)
  const average = members.value.length > 0 ? total / members.value.length : 0

  return paid - average
}

// 回傳文字描述
function balanceText(name) {
  const balance = getMemberBalance(name)
  if (balance > 0) return `應收 $${Math.round(balance)}`
  if (balance < 0) return `應付 $${Math.round(Math.abs(balance))}`

  return '結清'
}


// 回傳對應的 class
function balanceClass(name) {
  const balance = getMemberBalance(name)
  if (balance > 0) return 'credit'
  if (balance < 0) return 'debt'
  return ''
}


// 載入 localStorage 中的資料
function loadFromLocalStorage(){
  const savedMembers = localStorage.getItem('splitBill_members')
  const savedExpenses = localStorage.getItem('splitBill_expenses')
  const savedItems = localStorage.getItem('splitBill_defaultItems')

  if(savedMembers) members.value = JSON.parse(savedMembers)
  if(savedExpenses) expenses.value = JSON.parse(savedExpenses)
  if(savedItems) defaultExpenseItems.value = JSON.parse(savedItems)


}

function endTrip() {
  if (confirm("確定要結束旅程？這將刪除所有資料！")) {
    members.value = []
    expenses.value = []
    localStorage.removeItem("trip_members")
    localStorage.removeItem("trip_expenses")
  }
}


// 監聽 members、expenses、defaultExpenseItems 有變動就儲存
watch([members,expenses,defaultExpenseItems],saveToLocalStorage , {deep: true})

// 初始化時載入
onMounted(()=>{
  loadFromLocalStorage()
})
</script>


<style scoped>
  h1 {
    font-size: 2rem;
  }
.app-container {
  max-width: 800px;
  margin: auto;
  font-family: Arial, sans-serif;
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: space-between;
}

.header {
  font-size: 1.5em;
  font-weight: 600;
  color: #5e3a4a;
  text-align: center;
  padding: 10px;
  background-color: #f8e6e6;
  border-bottom: 2px solid #d16a7b;
}

.middle-section {
  flex-grow: 1;
  display: flex;
  padding: 10px;
  gap: 10px;
  overflow-y: auto;
}

.member-list, .expense-list {
  flex: 1;
  background: #fdfdfd;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
  overflow-y: auto;
}

.member-list ul, .expense-list ul {
  list-style: none;
  padding: 0;
}

li {
  margin: 5px 0;
  background: #f8f8f8;
  padding: 8px;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.owe {
  color: red;
}

.bottom-section {
  padding: 10px;
  background-color: #f8e6e6;
  border-top: 2px solid #d16a7b;
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;
}

.member-input {
  flex: 1;
  min-width: 200px;
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.add-btn {
  padding: 10px 20px;
}

.btn {
  background-color: #d16a7b;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn:hover {
  background-color: #b85967;
}

.selected {
  background-color: #ffe6e6;
}

.small-btn {
  margin-top: 8px;
  font-size: 14px;
  padding: 6px 10px;
}

.delete-btn {
  background-color: #f44336;
  padding: 4px 8px;
  font-size: 14px;
}


.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.4);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  min-width: 300px;
  text-align: center;
  box-shadow: 0 0 10px rgba(0,0,0,0.3);
}

.modal input {
  width: 80%;
  padding: 8px;
  margin: 10px 0;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.modal-buttons {
  display: flex;
  justify-content: space-between;
  gap: 10px;
}

.credit {
  color: green;
  font-weight: bold;
}

.debt {
  color: red;
  font-weight: bold;
}


.amount {
  text-align: right;
  display: inline-block;
  min-width: 80px; /* 根據需要調整寬度 */
}
.expense-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 0;
  gap: 8px;
}

.expense-row .label {
  flex: 1;
}

.expense-row .amount {
  min-width: 80px;
  text-align: right;
}

.expense-row .delete-btn {
  width: 32px;
  text-align: center;
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 16px;
}

.total-row {
  border-top: 1px dashed #ccc;
  margin-top: 10px;
  padding-top: 10px;
  font-weight: bold;
}

.btn.danger {
  background-color: #b85967;
  color: white;
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn.danger:hover {
  background-color: #c0392b;
}

</style>