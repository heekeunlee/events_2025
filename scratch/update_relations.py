import json
import os

file_path = '/Users/dasepa/events_2025/public/data.json'

relations = [
    "단골 단체 고객(교회)", "매장 직원", "협력 점주", "원두 공급업체", "납품업체",
    "가맹본부", "건물 관리사무소 관계자", "단골 단체 고객(은행)", "장비/커피머신 AS업체", "배달 플랫폼 담당자",
    "광고·마케팅 업체", "사업 자문업체", "청소·방역 업체", "인테리어 업체", "단골 단체 고객(학원)",
    "원두 공급업체", "납품업체", "가맹본부", "매장 직원", "단골 단체 고객(은행)",
    "협력 점주", "단골 단체 고객(교회)", "인테리어 업체", "배달 플랫폼 담당자", "광고·마케팅 업체",
    "가맹본부"
]

with open(file_path, 'r', encoding='utf-8') as f:
    data = json.load(f)

for i in range(len(data)):
    if i < len(relations):
        data[i]['relation'] = relations[i]

with open(file_path, 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print("Successfully updated relations in data.json")
