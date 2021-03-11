git log
查看提交记录（Q退出）

git commit --amend
修改最后一次提交

git remote
查看当前远程库

## git 分支

git branch -a
查看所有分支

git branch testing
创建testing分支

git checkout testing
切换至testing分支

git checkout -b testing
创建并切换至testing分支

git checkout master
git merge hotfix
git branch -d hotfix
先切换到主分支，然后对hotfix分支做合并操作，最后删除hotfix分支
冲突部分还是建议使用视图工具

## git 远程分支

git push origin serverfix
推送serverfix分支到origin仓库

